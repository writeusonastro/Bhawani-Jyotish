import express from "express";
import type { Request, Response } from "express";
import path from "path";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable ultra-fast gzip/deflate compression for all requests
app.use(compression({
  level: 6,
  threshold: 1024, // compress anything above 1kb
}));

// Canonical 301 Redirect for www to non-www and protocol consistency
app.use((req: Request, res: Response, next) => {
  const host = req.headers.host || "";
  if (host.startsWith("www.bhawanijyotish.online")) {
    return res.redirect(301, `https://bhawanijyotish.online${req.originalUrl}`);
  }
  next();
});

app.use(express.json());

// Serve static assets from public folder (favicon, icons, images, sitemap, robots, etc.)
app.use(express.static(path.join(process.cwd(), "public")));

// Direct fallbacks for favicon and logo to guarantee 0 error responses in browser devtools
app.get("/favicon.ico", (_req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "favicon.ico"));
});

app.get("/logo.png", (_req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "logo.png"));
});

// Lazy-initialized Gemini instance
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "Bhavani Jyotish Backend", city: "Mehsana, Gujarat" });
});

// Google Search Console Verification
app.get("/googlef76376acedff709c.html", (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send("google-site-verification: googlef76376acedff709c.html\n");
});

// Places search endpoint (Google Maps / Photon / Nominatim proxy)
app.get("/api/places/search", async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string || "").trim();
    if (!q || q.length < 2) {
      return res.json({ results: [] });
    }

    const results: any[] = [];
    const seen = new Set<string>();

    // 1. Try Google Maps Geocoding / Places API if key is present
    if (process.env.GOOGLE_MAPS_API_KEY) {
      try {
        const gUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(q + ", India")}&key=${process.env.GOOGLE_MAPS_API_KEY}&region=in`;
        const gRes = await fetch(gUrl, { signal: AbortSignal.timeout(3000) });
        if (gRes.ok) {
          const gData = await gRes.json();
          if (gData.results && Array.isArray(gData.results)) {
            for (const item of gData.results.slice(0, 6)) {
              const lat = item.geometry?.location?.lat;
              const lon = item.geometry?.location?.lng;
              const formatted = item.formatted_address || "";
              const key = `${Math.round(lat * 100)},${Math.round(lon * 100)}`;
              if (lat && lon && !seen.has(key)) {
                seen.add(key);
                results.push({
                  id: item.place_id || `g_${key}`,
                  name: item.address_components?.[0]?.long_name || formatted.split(",")[0],
                  displayName: formatted,
                  subTitle: formatted.split(",").slice(1).join(", ").trim(),
                  lat,
                  lon,
                  source: "google"
                });
              }
            }
          }
        }
      } catch (err) {
        console.warn("Google Maps Geocoding API lookup failed:", err);
      }
    }

    // 2. Photon API (OpenStreetMap Elasticsearch - super-fast Autocomplete)
    if (results.length < 8) {
      try {
        const pUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=8`;
        const pRes = await fetch(pUrl, {
          signal: AbortSignal.timeout(3500),
          headers: { "Accept": "application/json" }
        });
        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData?.features && Array.isArray(pData.features)) {
            for (const feat of pData.features) {
              const props = feat.properties || {};
              const coords = feat.geometry?.coordinates || [];
              const lon = coords[0];
              const lat = coords[1];
              if (!lat || !lon) continue;

              const key = `${Math.round(lat * 100)},${Math.round(lon * 100)}`;
              if (seen.has(key)) continue;
              seen.add(key);

              const placeName = props.name || props.city || props.town || props.village || q;
              const parts = [
                props.district,
                props.county,
                props.state,
                props.country || "India"
              ].filter(Boolean);

              results.push({
                id: `osm_${feat.properties?.osm_id || key}`,
                name: placeName,
                displayName: `${placeName}, ${parts.join(", ")}`,
                subTitle: parts.join(", "),
                type: props.osm_value || props.type || "place",
                lat,
                lon,
                source: "photon"
              });
            }
          }
        }
      } catch (err) {
        console.warn("Photon search failed:", err);
      }
    }

    // 3. Fallback to Nominatim if results are still empty
    if (results.length === 0) {
      try {
        const nUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q + ", India")}&format=json&countrycodes=in&limit=6&addressdetails=1`;
        const nRes = await fetch(nUrl, {
          signal: AbortSignal.timeout(4000),
          headers: {
            "Accept": "application/json",
            "User-Agent": "BhavaniJyotish-Kundli/1.0"
          }
        });
        if (nRes.ok) {
          const nData = await nRes.json();
          if (Array.isArray(nData)) {
            for (const item of nData) {
              const lat = parseFloat(item.lat);
              const lon = parseFloat(item.lon);
              const addr = item.address || {};
              const placeName = addr.village || addr.town || addr.city || item.name || q;
              const subParts = [addr.county || addr.state_district, addr.state, addr.country].filter(Boolean);
              
              results.push({
                id: `nom_${item.place_id}`,
                name: placeName,
                displayName: item.display_name || `${placeName}, ${subParts.join(", ")}`,
                subTitle: subParts.join(", "),
                type: item.type || "place",
                lat,
                lon,
                source: "nominatim"
              });
            }
          }
        }
      } catch (err) {
        console.warn("Nominatim search failed:", err);
      }
    }

    res.json({ results });
  } catch (err: any) {
    console.error("Places search endpoint error:", err);
    res.status(500).json({ results: [], error: err.message });
  }
});

// Reverse Geocode endpoint (from GPS coords to Place Name)
app.get("/api/places/reverse", async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.lon as string);

    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: "Invalid lat/lon coordinates" });
    }

    // 1. Try Photon reverse
    try {
      const pUrl = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`;
      const pRes = await fetch(pUrl, { signal: AbortSignal.timeout(3500) });
      if (pRes.ok) {
        const pData = await pRes.json();
        const feat = pData?.features?.[0];
        if (feat) {
          const props = feat.properties || {};
          const name = props.name || props.city || props.town || props.village || props.district || "ज्ञात स्थान";
          const state = props.state || "गुजरात";
          const parts = [props.city || props.town || props.village, props.district, props.county, props.state].filter(Boolean);
          return res.json({
            name,
            displayName: `${name} (${parts.join(", ")})`,
            state,
            lat,
            lon
          });
        }
      }
    } catch {
      // Continue to Nominatim
    }

    // 2. Nominatim reverse fallback
    try {
      const nUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const nRes = await fetch(nUrl, {
        signal: AbortSignal.timeout(4000),
        headers: { "User-Agent": "BhavaniJyotish-Kundli/1.0" }
      });
      if (nRes.ok) {
        const nData = await nRes.json();
        const addr = nData.address || {};
        const name = addr.village || addr.town || addr.city || addr.suburb || "वर्तमान स्थान";
        const state = addr.state || "गुजरात";
        return res.json({
          name,
          displayName: nData.display_name || name,
          state,
          lat,
          lon
        });
      }
    } catch {
      // Fallback
    }

    res.json({
      name: `स्थान (${lat.toFixed(3)}°, ${lon.toFixed(3)}°)`,
      displayName: `GPS स्थिति: ${lat.toFixed(4)}° N, ${lon.toFixed(4)}° E`,
      state: "गुजरात (Gujarat)",
      lat,
      lon
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// In-memory cache for IP Geolocation (30 minutes TTL)
const ipGeoCache = new Map<string, { data: any; timestamp: number }>();
const GEO_CACHE_TTL = 30 * 60 * 1000;

// Intelligent Regional Language Classifier based on Geography
export function classifyGeoToLanguage(
  countryCode: string,
  regionName: string,
  cityName: string
): { language: 'hi' | 'gu' | 'en'; zone: 'gujarat' | 'north_india' | 'south_india' | 'abroad' | 'india_other'; reason: string } {
  const cCode = (countryCode || '').trim().toUpperCase();
  const reg = (regionName || '').toLowerCase().trim();
  const city = (cityName || '').toLowerCase().trim();

  // 1. Outside India -> Abroad (USA, UK, Canada, Australia, UAE, Europe, etc.) -> English ('en')
  if (cCode && cCode !== 'IN' && cCode !== 'INDIA') {
    return {
      language: 'en',
      zone: 'abroad',
      reason: `विदेश / International NRI audience (${countryCode || 'Outside India'})`
    };
  }

  // 2. Pure Gujarat (Entire Gujarat State) -> Gujarati ('gu')
  const isGujarat =
    reg.includes('gujarat') ||
    reg === 'gj' ||
    city.includes('ahmedabad') ||
    city.includes('surat') ||
    city.includes('vadodara') ||
    city.includes('baroda') ||
    city.includes('rajkot') ||
    city.includes('bhavnagar') ||
    city.includes('jamnagar') ||
    city.includes('junagadh') ||
    city.includes('gandhinagar') ||
    city.includes('mehsana') ||
    city.includes('mahesana') ||
    city.includes('anand') ||
    city.includes('navsari') ||
    city.includes('morbi') ||
    city.includes('nadiad') ||
    city.includes('surendranagar') ||
    city.includes('bharuch') ||
    city.includes('porbandar') ||
    city.includes('godhra') ||
    city.includes('vapi') ||
    city.includes('valsad') ||
    city.includes('bhuj') ||
    city.includes('palanpur') ||
    city.includes('patan') ||
    city.includes('himatnagar') ||
    city.includes('dahod') ||
    city.includes('amreli') ||
    city.includes('botad');

  if (isGujarat) {
    return {
      language: 'hi',
      zone: 'gujarat',
      reason: 'गुजरात क्षेत्र (Gujarat State) - सर्वसुलभ हिंदी डिफ़ॉल्ट + 1-क्लिक गुजराती विकल्प'
    };
  }

  // 3. South India (Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana) -> English ('en')
  const isSouthIndia =
    reg.includes('tamil nadu') ||
    reg.includes('tamilnadu') ||
    reg === 'tn' ||
    reg.includes('karnataka') ||
    reg === 'ka' ||
    reg.includes('kerala') ||
    reg === 'kl' ||
    reg.includes('andhra') ||
    reg === 'ap' ||
    reg.includes('telangana') ||
    reg === 'tg' ||
    reg === 'ts' ||
    reg.includes('puducherry') ||
    reg.includes('pondicherry') ||
    city.includes('bengaluru') ||
    city.includes('bangalore') ||
    city.includes('chennai') ||
    city.includes('madras') ||
    city.includes('hyderabad') ||
    city.includes('kochi') ||
    city.includes('cochin') ||
    city.includes('thiruvananthapuram') ||
    city.includes('trivandrum') ||
    city.includes('visakhapatnam') ||
    city.includes('vizag') ||
    city.includes('coimbatore') ||
    city.includes('mysuru') ||
    city.includes('mysore') ||
    city.includes('kozhikode') ||
    city.includes('calicut') ||
    city.includes('vijayawada') ||
    city.includes('warangal') ||
    city.includes('mangaluru') ||
    city.includes('mangalore');

  if (isSouthIndia) {
    return {
      language: 'en',
      zone: 'south_india',
      reason: 'दक्षिण भारत क्षेत्र (South India: TN, KA, KL, AP, Telangana) - English'
    };
  }

  // 4. North India & Hindi Belt (Delhi / NCR, UP, Rajasthan, MP, Bihar, Haryana, Punjab, Uttarakhand, Himachal, Jharkhand, Chhattisgarh, Chandigarh, J&K) -> Hindi ('hi')
  const isNorthIndiaOrHindi =
    reg.includes('delhi') ||
    reg.includes('nct') ||
    reg === 'dl' ||
    reg.includes('uttar pradesh') ||
    reg === 'up' ||
    reg.includes('rajasthan') ||
    reg === 'rj' ||
    reg.includes('madhya pradesh') ||
    reg === 'mp' ||
    reg.includes('bihar') ||
    reg === 'br' ||
    reg.includes('haryana') ||
    reg === 'hr' ||
    reg.includes('punjab') ||
    reg === 'pb' ||
    reg.includes('uttarakhand') ||
    reg.includes('uttaranchal') ||
    reg === 'uk' ||
    reg.includes('himachal') ||
    reg === 'hp' ||
    reg.includes('jharkhand') ||
    reg === 'jh' ||
    reg.includes('chhattisgarh') ||
    reg === 'cg' ||
    reg === 'ct' ||
    reg.includes('chandigarh') ||
    reg === 'ch' ||
    reg.includes('jammu') ||
    reg.includes('kashmir') ||
    reg === 'jk' ||
    reg.includes('ladakh') ||
    city.includes('delhi') ||
    city.includes('noida') ||
    city.includes('gurgaon') ||
    city.includes('gurugram') ||
    city.includes('faridabad') ||
    city.includes('ghaziabad') ||
    city.includes('lucknow') ||
    city.includes('jaipur') ||
    city.includes('kanpur') ||
    city.includes('bhopal') ||
    city.includes('indore') ||
    city.includes('patna') ||
    city.includes('varanasi') ||
    city.includes('agra') ||
    city.includes('prayagraj') ||
    city.includes('allahabad') ||
    city.includes('dehradun') ||
    city.includes('shimla') ||
    city.includes('chandigarh') ||
    city.includes('ludhiana') ||
    city.includes('amritsar') ||
    city.includes('ranchi') ||
    city.includes('raipur');

  if (isNorthIndiaOrHindi) {
    return {
      language: 'hi',
      zone: 'north_india',
      reason: 'उत्तर भारत व हिंदी पट्टी (Delhi/NCR, UP, MP, Rajasthan, Haryana, Punjab, Bihar etc.) - हिंदी'
    };
  }

  // 5. Default for other Indian states (Maharashtra, West Bengal, Odisha, etc.) -> Hindi ('hi')
  return {
    language: 'hi',
    zone: 'india_other',
    reason: 'भारत (वैदिक ज्योतिष सार्वभौमिक भाषा) - हिंदी'
  };
}

// Dedicated endpoint to detect user's geographic region and appropriate language
app.get("/api/geo/detect", async (req: Request, res: Response) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    let clientIp = "";
    if (typeof forwarded === "string") {
      // Pick first public IP if multiple IPs are forwarded
      const ips = forwarded.split(",").map((s) => s.trim());
      clientIp = ips.find((ip) => !ip.startsWith("10.") && !ip.startsWith("192.168.") && !ip.startsWith("127.") && ip !== "::1") || ips[0];
    } else {
      clientIp = (req.socket.remoteAddress || "").trim();
    }

    // Direct Cloudflare/CDN header hints if available
    const cfCountry = (req.headers["cf-ipcountry"] as string || "").trim().toUpperCase();
    const cfRegion = (req.headers["cf-region"] as string || req.headers["cf-region-code"] as string || "").trim();
    const cfCity = (req.headers["cf-ipcity"] as string || "").trim();

    // Local / private IP fallback
    const isPrivateIp = !clientIp || clientIp === "127.0.0.1" || clientIp === "::1" || clientIp.startsWith("10.") || clientIp.startsWith("192.168.");
    if (isPrivateIp && !cfCountry) {
      const fallbackResult = {
        country: "India",
        countryCode: "IN",
        region: "गुजरात (Gujarat)",
        city: "मेहसाणा (Mehsana)",
        language: "hi" as const,
        zone: "gujarat" as const,
        reason: "Default / Headquarters Location (Mehsana, Gujarat) - Universal Hindi with 1-click Gujarati switch",
        isFallback: true
      };
      return res.json(fallbackResult);
    }

    // Check cache
    const cacheKey = !isPrivateIp ? clientIp : `${cfCountry}_${cfRegion}_${cfCity}`;
    const cached = ipGeoCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < GEO_CACHE_TTL) {
      return res.json(cached.data);
    }

    // If Cloudflare tells us it's abroad
    if (cfCountry && cfCountry !== "IN") {
      const classification = classifyGeoToLanguage(cfCountry, cfRegion, cfCity);
      const result = {
        country: cfCountry,
        countryCode: cfCountry,
        region: cfRegion || "International",
        city: cfCity || "Abroad",
        ...classification,
        isFallback: false
      };
      ipGeoCache.set(cacheKey, { data: result, timestamp: Date.now() });
      return res.json(result);
    }

    // Query external fast IP Geo services
    let geoData: any = null;

    // 1. Try FreeIPApi (HTTPS, JSON)
    try {
      const targetUrl = clientIp ? `https://freeipapi.com/api/json/${clientIp}` : `https://freeipapi.com/api/json`;
      const fRes = await fetch(targetUrl, {
        signal: AbortSignal.timeout(3000),
        headers: { "User-Agent": "BhavaniJyotish-Kundli/1.0" }
      });
      if (fRes.ok) {
        const d = await fRes.json();
        if (d && (d.countryCode || d.countryName)) {
          geoData = {
            country: d.countryName || "India",
            countryCode: d.countryCode || "IN",
            region: d.regionName || cfRegion || "Delhi",
            city: d.cityName || cfCity || "Delhi",
            lat: d.latitude,
            lon: d.longitude
          };
        }
      }
    } catch {
      // Continue to next provider
    }

    // 2. Try IP-API.com if FreeIPApi didn't resolve
    if (!geoData) {
      try {
        const ipApiUrl = clientIp ? `http://ip-api.com/json/${clientIp}` : `http://ip-api.com/json/`;
        const iRes = await fetch(ipApiUrl, {
          signal: AbortSignal.timeout(3000),
          headers: { "User-Agent": "BhavaniJyotish-Kundli/1.0" }
        });
        if (iRes.ok) {
          const d = await iRes.json();
          if (d && d.status === "success") {
            geoData = {
              country: d.country || "India",
              countryCode: d.countryCode || "IN",
              region: d.regionName || cfRegion || "Delhi",
              city: d.city || cfCity || "Delhi",
              lat: d.lat,
              lon: d.lon
            };
          }
        }
      } catch {
        // Continue
      }
    }

    // Use CF hints if external APIs timed out
    if (!geoData && (cfCountry || cfRegion)) {
      geoData = {
        country: cfCountry === "IN" ? "India" : cfCountry,
        countryCode: cfCountry || "IN",
        region: cfRegion || (cfCountry === "IN" ? "Delhi" : "International"),
        city: cfCity || "Delhi"
      };
    }

    if (geoData) {
      const classification = classifyGeoToLanguage(geoData.countryCode, geoData.region, geoData.city);
      const finalResult = {
        country: geoData.country,
        countryCode: geoData.countryCode,
        region: geoData.region,
        city: geoData.city,
        lat: geoData.lat,
        lon: geoData.lon,
        ...classification,
        isFallback: false
      };
      ipGeoCache.set(cacheKey, { data: finalResult, timestamp: Date.now() });
      return res.json(finalResult);
    }

    // Safe fallback for India: default to Hindi
    const defaultIndiaResult = {
      country: "India",
      countryCode: "IN",
      region: "उत्तर भारत (North India / Delhi)",
      city: "नई दिल्ली (New Delhi)",
      language: "hi" as const,
      zone: "north_india" as const,
      reason: "Safe India Fallback (North India / Hindi)",
      isFallback: true
    };
    return res.json(defaultIndiaResult);
  } catch (err: any) {
    return res.json({
      country: "India",
      countryCode: "IN",
      region: "Delhi / North India",
      city: "Delhi",
      language: "hi" as const,
      zone: "north_india" as const,
      reason: "Error Fallback - Hindi Default",
      isFallback: true
    });
  }
});

// Auto-detect location via IP (smooth fallback when GPS is blocked/unavailable)
app.get("/api/places/ip-location", async (req: Request, res: Response) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    let ip = "";
    if (typeof forwarded === "string") {
      const ips = forwarded.split(",").map((s) => s.trim());
      ip = ips.find((addr) => !addr.startsWith("10.") && !addr.startsWith("192.168.") && !addr.startsWith("127.") && addr !== "::1") || ips[0];
    } else {
      ip = (req.socket.remoteAddress || "").trim();
    }

    // Default fallback (Mehsana, Gujarat)
    const fallbackLocation = {
      name: "मेहसाणा (Mehsana)",
      displayName: "मेहसाणा, गुजरात (Mehsana, Gujarat)",
      state: "गुजरात",
      lat: 23.5880,
      lon: 72.3693,
      isFallback: true
    };

    if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("10.") || ip.startsWith("192.168.")) {
      return res.json(fallbackLocation);
    }

    // 1. Try FreeIPApi first (reliable HTTPS)
    try {
      const fRes = await fetch(`https://freeipapi.com/api/json/${ip}`, {
        signal: AbortSignal.timeout(3000),
        headers: { "User-Agent": "BhavaniJyotish-Kundli/1.0" }
      });
      if (fRes.ok) {
        const data = await fRes.json();
        if (data && data.latitude && data.longitude) {
          const cityName = data.cityName || data.regionName || "वर्तमान स्थान";
          return res.json({
            name: `${cityName}`,
            displayName: `${cityName}, ${data.regionName || "गुजरात"}, ${data.countryName || "India"}`,
            state: data.regionName || "गुजरात",
            lat: parseFloat(data.latitude.toFixed(4)),
            lon: parseFloat(data.longitude.toFixed(4)),
            isFallback: false
          });
        }
      }
    } catch {
      // Continue to next provider
    }

    // 2. Try IP-API.com
    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}`, {
        signal: AbortSignal.timeout(3000),
        headers: { "User-Agent": "BhavaniJyotish-Kundli/1.0" }
      });
      if (geoRes.ok) {
        const data = await geoRes.json();
        if (data && data.status === "success" && data.lat && data.lon) {
          const cityName = data.city || data.regionName || "वर्तमान स्थान";
          return res.json({
            name: `${cityName}`,
            displayName: `${cityName}, ${data.regionName || "गुजरात"}, ${data.country || "India"}`,
            state: data.regionName || "गुजरात",
            lat: parseFloat(data.lat.toFixed(4)),
            lon: parseFloat(data.lon.toFixed(4)),
            isFallback: false
          });
        }
      }
    } catch {
      // ignore
    }

    res.json(fallbackLocation);
  } catch (err) {
    res.json({
      name: "मेहसाणा (Mehsana)",
      displayName: "मेहसाणा, गुजरात (Mehsana, Gujarat)",
      state: "गुजरात",
      lat: 23.5880,
      lon: 72.3693,
      isFallback: true
    });
  }
});

// AI Vedic Astrologer Consultation endpoint
app.post("/api/astrology/consult", async (req: Request, res: Response) => {
  try {
    const { question, birthDetails, rashi, lang } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "कृपया अपना ज्योतिषीय प्रश्न दर्ज करें (Please enter your question)" });
    }

    const ai = getAI();
    if (!ai) {
      // Fallback structured Vedic response if API key is not configured
      return res.json({
        answer: `🚩 जय माँ भवानी! वैदिक ज्योतिषीय गणना के अनुसार आपके प्रश्न "${question}" पर विचार किया गया।\n\nग्रह-गोचर की वर्तमान स्थिति के अनुसार, बृहस्पति एवं शनि की अनुकूल दृष्टि आपके कार्यों में सकारात्मक बदलाव ला रही है। \n\nउपाय: प्रतिदिन सूर्य देव को तांबे के लोटे से अर्घ्य दें एवं ॐ नमः शिवाय का 108 बार जाप करें।\n\nव्यक्तिगत एवं विस्तृत कुंडली समाधान के लिए पंडित जी से सीधे मेहसाणा कार्यालय में संपर्क करें।`,
        isOfflineFallback: true
      });
    }

    const prompt = `आप "भवानी ज्योतिष - मेहसाणा, गुजरात" के प्रख्यात वैदिक ज्योतिषी एवं पंडित जी हैं। 
आपको श्रद्धालु/जातक का प्रश्न प्राप्त हुआ है:
जातक का प्रश्न: "${question}"
${rashi ? `जातक की राशि: ${rashi}` : ""}
${birthDetails ? `जन्म विवरण: ${JSON.stringify(birthDetails)}` : ""}
भाषा प्राथमिकता: ${lang || 'हिंदी'} (Vedic Hindi with authentic Sanskrit shlokas and astrological warmth)

कृपया वैदिक ज्योतिष (पाराशर होरा शास्त्र, नवग्रह प्रभाव, गोचर, दशा, रत्न व सरल सात्विक उपाय) के आधार पर गहन, सकारात्मक, मार्गदर्शनकारी और सटीक फलादेश उत्तर दें।
उत्तर की संरचना:
1. माँ भवानी का मंगलाचरण / संक्षिप्त वैदिक आशीर्वाद
2. ग्रह-नक्षत्रों का प्रभाव एवं प्रश्न का ज्योतिषीय विश्लेषण
3. आगामी शुभ समय / दिशा निर्देश
4. अचूक वैदिक उपाय (मंत्र, दान, व्रत, दिनचर्या या रत्न परामर्श)
5. समापन आशीर्वाद

उत्तर सरल, आत्मीय, प्रामाणिक और आशावादी होना चाहिए।`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
    });

    return res.json({
      answer: response.text || "भवानी ज्योतिष - आपका मार्गदर्शन सदा कल्याणकारी हो।",
      isOfflineFallback: false,
    });
  } catch (error: any) {
    console.error("Gemini astrology consultation error:", error);
    return res.status(500).json({
      error: "परामर्श प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।",
      fallback: "🚩 माँ भवानी की कृपा से आपकी समस्त मनोकामनाएं पूर्ण हों। कृपया प्रत्यक्ष परामर्श हेतु भवानी ज्योतिष केंद्र, मेहसाणा से संपर्क करें।"
    });
  }
});

// Vite middleware and production static handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        maxAge: "1d",
        setHeaders: (res, filePath) => {
          if (filePath.includes("/assets/")) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else {
            res.setHeader("Cache-Control", "public, max-age=3600");
          }
        },
      })
    );
    app.get("*", (_req: Request, res: Response) => {
      res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=86400");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚩 भवानी ज्योतिष सर्वर http://localhost:${PORT} पर प्रारंभ हुआ`);
  });
}

startServer();
