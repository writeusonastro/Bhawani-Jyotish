import express, { Request, Response } from "express";
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

app.use(express.json());

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
      server: { middlewareMode: true },
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
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚩 भवानी ज्योतिष सर्वर http://localhost:${PORT} पर प्रारंभ हुआ`);
  });
}

startServer();
