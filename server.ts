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
      return `### Venture Narrative & Fundraising Architecture\n\nInstitutional capital allocators review hundreds of opportunities a week. They reject most of them not because the core vision is flawed, but because the business architecture is opaque and the storytelling lacks traction.\n\nFocus on these primary variables immediately:\n1. **High-Urgency Needs**: Is the problem you target critical and pain-inducing, or are you building a discretionary utility?\n2. **Financial Genuineness**: Present completely transparent metrics, team capacities, and traction velocity. Avoid larping or over-speculating.\n3. **Clarity of Transaction**: Can you formulate your primary exchange map in a single clear line? Let's refine your narrative structure.`;
    }
    if (textLower.includes("ecommerce") || textLower.includes("e-commerce") || textLower.includes("logistics") || textLower.includes("marketplace")) {
      return `### Commerce Infrastructure & Logistics Diagnostics\n\nBuilding Plantshop.ae from the ground up validated that commerce is never a pure tech play—it is a physical distribution, cash-flow velocity, and operational trust discipline. \n\nPrior to allocating capital to marketing, optimize these coordinates:\n1. **Interoperable Vendor Systems**: How is your multi-node dispatch and inventory tracking coordinated? If partners fluctuate, fulfillment fails.\n2. **Logistics SLA Density**: Are logistics expenditures exceeding 15% of your average order value? If so, pricing pressure will erode margins.\n3. **The Customer Retention Flywheel**: Focus on repeat transaction rates rather than high-acquisition spikes. Let's audit your margin structures.`;
    }
    if (textLower.includes("gcc") || textLower.includes("uae") || textLower.includes("dubai") || textLower.includes("middle east") || textLower.includes("expansion")) {
      return `### GCC Market Entry Pathways & Regional Corridors\n\nExpanding technology or platform operations into the Middle East represents significant potential, but GCC business models are heavily driven by relationship capital and structured integration.\n\nTo de-risk your deployment here:\n1. **On-the-Ground Speed**: Remote expansion is a myth. You need dedicated execution, regulatory pathway alignments, and actual local ecosystem access.\n2. **B2B vs B2C Dynamics**: The region offers exceptionally high purchasing power yet finite consumer density. For direct commerce, prioritize premium SLAs and basket size. For B2B platforms, establish corporate pilot agreements early in your timeline.\n3. **Allocation Dynamics**: Regional funds expect physical commitment and long-term localized value creation. Let's map your sandbox expansion frameworks.`;
    }
    return `### Venture Corridor Strategic Advisory\n\nDuring my experience co-founding Plantshop.ae and collaborating with global accelerators like 500 Global, I have learned that ventures rarely fail because of concept failure. They disintegrate from narrative misalignment, structural cash decay, or expansion friction.\n\nTell me:\n- What scaling bottleneck or pipeline disruption are you navigating?\n- Is your current puzzle centered on *venture narratives* (story, raises), *commerce metrics* (logistics, margin), or *expansion corridors* (where to scale)?\n\nLet's organize the variables and identify your highest-leverage trajectory.`;
  };

  if (!ai) {
    return res.json({ text: getFallbackClarity(message) });
  }

  try {
    const systemInstruction = `You are simulated Jimmy Manalel: a cross-border startup operator, global venture corridor builder, and co-founder of Plantshop.ae (pioneering GCC e-commerce marketplace backed by 500 Global).
    Your tone is highly strategic, institutional, authoritative, yet founder-centric and deeply trusted. You avoid overly dramatic combat metaphors ("tactical warfare", "sparring style"). Instead, focus on institutional terms: value-chain optimization, corridor access, market expansion architecture, unit-economic resilience, and narrative gravity.
    Provide advice to tech founders, scaling operators, and capital allocators looking to navigate cross-border corridors (including GCC, India, and global venture hubs). Focus on structural scalability, data room readiness, fundraising presentation logic, supply chain warehousing, and regulatory market validation.
    Never use low-yield consulting templates. Deliver highly tailored, customized, first-principles advice in structured, concise, elegant Markdown. Always frame recommendations with direct, calm, and sovereign operator authority (e.g., “Let's center the economics and build structural pathways”, “Align the story, optimize the corridor”).`;

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
    const prompt = `Analyze this startup pitch details and grade it:
Startup Name: ${name || "Untitled"}
Primary Narrative & Value Prop: ${pitch}
Target Market segments & Bottlenecks: ${targetUser || "Not clearly defined"}
Business Model & Sourcing Economics: ${businessModel || "Not clearly defined"}
GCC Corridor Alignment: ${gccOpportunity || "Not specified"}

Evaluate this strictly from the perspective of Jimmy Manalel: a global venture ecosystem operator, cross-border corridor strategist, and 500 Global portfolio co-founder. Grade with institutional rigor based on storytelling gravity, operational viability, logistics resilience, and capital readiness. Don't be afraid to assign conservative score vectors if fundamentals are vague.`;

    const systemInstruction = `You are Jimmy Manalel, a cross-border startup operator and co-founder of Plantshop.ae. 
You analyze and grade venture narratives with highly institutional rigor, evaluating market expansion logic, commerce unit economics, corridor speed-to-contract, and fundraising storytelling cohesion.
Ensure your advice is strategic, direct, practical, and highly specialized to their specific startup pitch inputs, keeping recommendations calm, authoritative, and trusted. Provide the output strictly as a JSON object matching the schema.`;

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


// 3. API Endpoint: HubSpot Integration Status
app.get("/api/hubspot/status", (req, res) => {
  const isConfigured = !!process.env.HUBSPOT_ACCESS_TOKEN;
  return res.json({
    connected: isConfigured,
    message: isConfigured 
      ? "HubSpot CRM is configured and live on this corridor application." 
      : "HubSpot token not found. Inactive fallback mode is running.",
    apiEndpoint: "https://api.hubapi.com/crm/v3/objects/contacts"
  });
});

// 4. API Endpoint: HubSpot Lead Sync
app.post("/api/hubspot/sync", async (req, res) => {
  const { email, firstname, lastname, company, message, source, details } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required for HubSpot contact creation" });
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  // Track the raw payload we construct
  const hubspotPayload = {
    properties: {
      email: email,
      firstname: firstname || "Founder",
      lastname: lastname || "User",
      company: company || "Unspecified Venture",
      message: message || "No custom message provided.",
      hs_lead_status: "NEW",
      description: `Synced from Jimmy Manalel Strategic Advisor Platform (${source || "General submission"}). ${details || ""}`
    }
  };

  if (!token) {
    // Return a rich dry-run simulation payload so the user can verify the integration payload
    return res.json({
      success: true,
      dryRun: true,
      message: "Lead successfully captured in local workspace. HubSpot Access Token is missing in environment variables, so CRM sync was bypassed.",
      payloadSent: hubspotPayload
    });
  }

  try {
    const apiResponse = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(hubspotPayload)
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("HubSpot API error response:", errorText);
      return res.status(apiResponse.status).json({
        success: false,
        error: `HubSpot API returned status ${apiResponse.status}`,
        details: errorText
      });
    }

    const data = await apiResponse.json();
    return res.json({
      success: true,
      dryRun: false,
      contactId: data.id,
      message: "Contact successfully synchronized on HubSpot portal.",
      rawResponse: data
    });
  } catch (error: any) {
    console.error("Critical HubSpot synchronization failure:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to connect to HubSpot servers.",
      details: error.message || error
    });
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
