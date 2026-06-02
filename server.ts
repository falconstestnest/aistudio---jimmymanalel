import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GenAI client gracefully
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("GoogleGenAI initialized successfully with API key");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.warn("GEMINI_API_KEY is not defined in environment variables. Falling back to local advisory engine.");
}

// 1. API Endpoint: Founder Clarity Chat
app.post("/api/clarity", async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Fallback advice if Gemini is unavailable
  const getFallbackClarity = (msg: string) => {
    const textLower = msg.toLowerCase();
    if (textLower.includes("pitch") || textLower.includes("investor") || textLower.includes("raise") || textLower.includes("deck")) {
      return `### Jimmy's Take on Fundraising & Storytelling\n\nVCs review hundreds of decks a week. They reject most of them not because the idea is bad, but because the structure is confusing and the narrative is weak. \n\nHere is what you need to focus on right now:\n1. **Primal Problem**: Is the pain point you are solving glaring and urgent, or are you building a "nice-to-have" utility?\n2. **Architectural Honesty**: Be extremely clear about your metrics, team capabilities, and current traction. Never try to larp or inflate numbers.\n3. **Decisive Next Steps**: Refine your elevator pitch into exactly one sentence. Can you explain your business model to a 10-year old? Let's work on sharpening that.`;
    }
    if (textLower.includes("ecommerce") || textLower.includes("e-commerce") || textLower.includes("logistics") || textLower.includes("marketplace")) {
      return `### Jimmy's Take on E-commerce & Marketplaces\n\nBuilding Plantshop.ae from scratch taught me that e-commerce is not a tech game—it's a logistics, cash flow, and trust game. \n\nBefore you spend another dollar on marketing, ask yourself:\n1. **Vendor Systems**: How reliable is your sourcing and inventory coordination? If your suppliers fluctuate, your client experience collapses.\n2. **Logistics Density**: Are you spending more than 15-20% of your basket value on delivery? If so, your unit economics will bleed indefinitely.\n3. **The Post-Purchase Loop**: Re-acquiring customers is too expensive. What is your strategy to turn a one-time buyer into a repeat advocate? Let's audit your funnel operations.`;
    }
    if (textLower.includes("gcc") || textLower.includes("uae") || textLower.includes("dubai") || textLower.includes("middle east") || textLower.includes("expansion")) {
      return `### Jimmy's Take on GCC & Middle East Market Entry\n\nExpanding from India or emerging markets into the Middle East is a fantastic growth move, but UAE/GCC startup dynamics are highly relationship-driven.\n\nTo succeed here, keep in mind:\n1. **Local Presence**: You cannot build relationships remotely. You need ground execution, licensing navigation, and genuine ecosystem integration.\n2. **B2B vs B2C Dynamics**: The UAE has a highly affluent population but relatively compact B2C market size compared to India. If you are B2C, focus heavily on premium logistics and basket size. If B2B, validate your corporate speed-to-contract early.\n3. **Venture Capital Realities**: Local VCs expect you to be committed to the region, with concrete business development. Let's map your localized messaging.`;
    }
    return `### Jimmy's Founder Advisory\n\nIn my experience co-founding Plantshop.ae and working with 500 Global, I've seen that startups don't fail because of bad ideas. They fail because of unclear thinking, co-founder friction, poor storytelling, and running out of money before validating demand.\n\nTell me: \n- What is the single biggest bottleneck that is keeping you awake tonight?\n- Are you struggling with *storytelling* (pitch and raises), *operations* (marketplace, economics), or *clarity* (not knowing where to play)?\n\nLet's cut through the noise and figure out your next decisive move.`;
  };

  if (!ai) {
    return res.json({ text: getFallbackClarity(message) });
  }

  try {
    const systemInstruction = `You are simulated Jimmy Manalel: Co-founder of Plantshop.ae (Middle East marketplace backed by 500 Global), Startup Advisor, and Ecosystem Builder between UAE and India.
Your tone is highly practical, professional, direct, constructive, and empathetic but absolutely anti-fluff. You hate generic textbook business theory ("You need to do marketing"). You focus on execution, cash-flow reality, storytelling narrative clarity, and operational details.
Use your real background (banking career exit, co-founding Plantshop in 2015, UAE marketplace operations, logistics, fundraising experiences, accelerator learning) to advise early-stage startup founders.
Deliver answers formatted in elegant Markdown. Keep your replies structured, concise, and highly useful. Always sign off or frame responses in Jimmy's direct coaching style (e.g., “Let’s cut the noise and execute”, “Speak sharply, move decisively”).`;

    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini Clarity Chat error:", error);
    return res.json({ text: getFallbackClarity(message) });
  }
});

// 2. API Endpoint: Pitch Grader
app.post("/api/pitch-grader", async (req, res) => {
  const { name, pitch, targetUser, businessModel, gccOpportunity } = req.body;
  
  if (!pitch) {
    return res.status(400).json({ error: "Pitch description is required" });
  }

  const getFallbackGrader = () => {
    return {
      overallScore: 68,
      storytellingGrade: "B-",
      executionGrade: "C+",
      marketFitGrade: "B",
      summary: `Jimmy's Quick Assessment: Your concept for "${name || 'Your Startup'}" has genuine seeds, but the core narrative remains slightly soft. It reads like a solution looking for a problem rather than a high-intensity pain relief.`,
      constructiveCritiques: [
        "Your hook doesn't immediately define why this represents an urgent business or customer need.",
        "Monetization paths feel broad; focus on one primary transaction loop before adding multi-tier subscriptions.",
        "Operational logistics are glossed over; a marketplace is fundamentally a logistics and trust game."
      ],
      actionableSteps: [
        "Condense your elevator pitch into 1 key statement: 'We help [Target] do [Action] by removing [Pain].'",
        "Map your unit economics: calculate the exact cost to fulfill one order/transaction.",
        "Create a simple landing page and run a manual test (smoke test) within 48 hours to validate commitment."
      ],
      middleEastAdvisory: "If expanding to the UAE/GCC, note that acquisition costs are high. You need high margin offsets or clear corporate partnerships to justify local customer acquisition budgets."
    };
  };

  if (!ai) {
    return res.json(getFallbackGrader());
  }

  try {
    const prompt = `Analyze this startup pitch deck details and grade it:
Startup Name: ${name || "Untitled"}
Elevator Pitch: ${pitch}
Target Customer & Problem: ${targetUser || "Not clearly defined"}
Business Model & Monetization: ${businessModel || "Not clearly defined"}
GCC Expansion interest: ${gccOpportunity || "Not specified"}

Evaluate this strictly from the perspective of Jimmy Manalel: an active startup advisor, 500 Global-backed founder, with direct experience building UAE marketplaces and advising emerging market founders. Give incredibly high-value, direct, honest feedback. Don't be afraid to give average grades if the details are vague or lacking.`;

    const systemInstruction = `You are Jimmy Manalel, a seasoned startup mentor and cofounder of Plantshop.ae. 
You grade pitches honestly, focusing on storytelling clarity, operational feasibility, and transactional realism. 
Provide your response strictly as a JSON object matching the requested schema. Ensure the advice is direct, practical, and highly customized to their specific startup pitch inputs.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["overallScore", "storytellingGrade", "executionGrade", "marketFitGrade", "summary", "constructiveCritiques", "actionableSteps", "middleEastAdvisory"],
          properties: {
            overallScore: {
              type: Type.NUMBER,
              description: "Overall rating out of 100 representing founder pitch and execution feasibility readiness."
            },
            storytellingGrade: {
              type: Type.STRING,
              description: "Grade for narrative/pitch clarity from A+ to F."
            },
            executionGrade: {
              type: Type.STRING,
              description: "Grade for operational realism and business model depth from A+ to F."
            },
            marketFitGrade: {
              type: Type.STRING,
              description: "Grade for customer alignment and target market approach from A+ to F."
            },
            summary: {
              type: Type.STRING,
              description: "Jimmy's candid verbal high-level take on this business concept (2-3 honest, insightful sentences)."
            },
            constructiveCritiques: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly direct, constructive, non-textbook critique points about their deck/plan shortcomings."
            },
            actionableSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 practical, immediate, high-impact tactical actions they can execute this week to gain traction."
            },
            middleEastAdvisory: {
              type: Type.STRING,
              description: "Dedicated advice on Middle East market access, positioning, logistics, or funding opportunities relevant to this vertical."
            }
          }
        },
        temperature: 0.75,
      }
    });

    const resultText = response.text.trim();
    const resultObj = JSON.parse(resultText);
    return res.json(resultObj);
  } catch (error) {
    console.error("Gemini Pitch Grader error:", error);
    return res.json(getFallbackGrader());
  }
});


// Vite middleware for development or static serving
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jimmy Manalel Advisor Platform listening on http://localhost:${PORT}`);
  });
}

startServer();
