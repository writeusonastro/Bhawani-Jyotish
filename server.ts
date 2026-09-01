import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

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
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚩 भवानी ज्योतिष सर्वर http://localhost:${PORT} पर प्रारंभ हुआ`);
  });
}

startServer();
