const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;
let model;

const getModel = () => {
  if (!model && process.env.GEMINI_API_KEY) {
    const key = process.env.GEMINI_API_KEY;
    genAI = new GoogleGenerativeAI(key);
    model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest", 
      generationConfig: { responseMimeType: "application/json" }
    });
  }
  return model;
};

// POST /api/audit - Save audit and generate AI intelligence
router.post('/', async (req, res) => {
  console.log("🚀 Incoming Audit Request:", req.body.id);
  try {
    const auditData = req.body;
    
    let aiSummary = "Your audit is ready. We've identified significant savings in your AI stack.";
    let researchedDiscounts = [];
    
    const activeModel = getModel();
    if (activeModel) {
      try {
        const prompt = `You are a Senior SaaS Procurement Researcher.
        
        CONTEXT:
        Team Primary Focus: ${auditData.primaryFocus || 'General Business'}
        Tool Stack: ${JSON.stringify(auditData.tools)}
        
        YOUR MISSION:
        Provide market-accurate 2024 enterprise volume discount estimates and strategic tool classification.
        For tools with 10+ seats, determine the most realistic discount percentage based on current SaaS benchmarks.
        
        CONTEXT-AWARE GUIDANCE:
        If the team focus is 'Engineering', prioritize developer efficiency tools.
        If 'Marketing', prioritize content velocity tools.
        Adjust your reasoning based on how critical these tools are to this specific department.
        
        Return ONLY a JSON object with this structure:
        {
          "summary": "A high-impact, 3-sentence summary of the savings strategy.",
          "intelligence": [
            { 
              "toolId": "id-of-tool", 
              "discount": 0.15, 
              "purpose": "A 2-3 word uppercase purpose (e.g. 'NEURAL RESEARCH' or 'CODE ACCELERATION')",
              "reasoning": "A professional insight tailored to a ${auditData.primaryFocus || 'General Business'} team." 
            }
          ]
        }
        
        If a tool is "custom", identify its purpose. If unrecognized, use 'GENERAL AI'.`;
        
        console.log("-----------------------------------------");
        console.log("📤 GEMINI PROMPT:\n", prompt);
        console.log("-----------------------------------------");
        
        const result = await activeModel.generateContent(prompt);
        const text = result.response.text();
        
        console.log("📥 GEMINI RAW RESPONSE:\n", text);
        console.log("-----------------------------------------");
        
        // Robust JSON extraction using Regex
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("No JSON found in Gemini response");
        
        const aiResponse = JSON.parse(jsonMatch[0]);
        console.log("✅ AI RESEARCH PARSED:", JSON.stringify(aiResponse.intelligence, null, 2));
        
        aiSummary = aiResponse.summary;
        researchedDiscounts = aiResponse.intelligence;

        // DYNAMICALLY UPDATE RECOMMENDATIONS BASED ON AI RESEARCH
        auditData.recommendations = auditData.recommendations.map(rec => {
          const intel = researchedDiscounts.find(i => i.toolId === rec.toolId);
          const tool = auditData.tools.find(t => t.toolId === rec.toolId);
          const actualPrice = tool?.actualPrice || 20;
          const seats = tool?.seats || 1;

          if (intel) {
            if (rec.action === 'consolidate') {
              const newSavings = Math.round((actualPrice * intel.discount) * seats);
              return {
                ...rec,
                message: `AI ESTIMATE: ${intel.reasoning}`,
                purpose: intel.purpose,
                savings: newSavings,
                calculation: `${seats} seats × ${Math.round(intel.discount * 100)}% AI-Estimated discount on $${actualPrice} = $${newSavings}/mo`,
                confidence: 'High'
              };
            } else if (rec.action === 'keep') {
              const currentMonthly = actualPrice * seats;
              return {
                ...rec,
                message: intel.reasoning || "This tool is appropriately priced and scaled for your team.",
                purpose: intel.purpose,
                calculation: `Current: $${currentMonthly}/mo | Recommended: No change (Market Best at $${actualPrice}/seat)`,
                confidence: 'High'
              };
            }
          }
          return rec;
        });

        // Update totals based on new AI math
        auditData.potentialMonthlySavings = auditData.recommendations.reduce((sum, r) => sum + r.savings, 0);
        auditData.potentialAnnualSavings = auditData.potentialMonthlySavings * 12;

      } catch (aiErr) {
        console.error("AI Research failed, falling back to static math:", aiErr);
      }
    }

    const audit = new Audit({
      ...auditData,
      uuid: auditData.id,
      useCase: auditData.primaryFocus || 'general',
      aiSummary
    });

    await audit.save();
    res.status(201).json(audit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/audit/test-ai - Diagnostic route
router.get('/test-ai', async (req, res) => {
  try {
    require('dotenv').config(); 
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "API Key missing in .env" });

    const testerAI = new GoogleGenerativeAI(apiKey);
    const activeModel = testerAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await activeModel.generateContent("Return this JSON: { \"status\": \"Gemini is alive\" }");
    res.json({
      status: "SUCCESS!",
      model: "gemini-pro",
      message: result.response.text()
    });
  } catch (error) {
    if (error.message.includes("429")) {
      return res.status(429).json({
        error: "RATE LIMIT REACHED",
        suggestion: "Please wait 60 seconds and try again. Google Free Tier limits are strict."
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// GET /api/audit/:id - Fetch audit by UUID
router.get('/:id', async (req, res) => {
  try {
    const audit = await Audit.findOne({ uuid: req.params.id });
    if (!audit) return res.status(404).json({ message: 'Audit not found' });
    res.json(audit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
