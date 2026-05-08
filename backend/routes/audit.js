const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;
let model;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
}

// POST /api/audit - Save audit and generate AI summary
router.post('/', async (req, res) => {
  try {
    const auditData = req.body;
    
    // Generate AI Summary using Gemini
    let aiSummary = "Your audit is ready. We've identified significant savings in your AI stack.";
    
    if (process.env.GEMINI_API_KEY && model) {
      try {
        const prompt = `You are an expert SaaS auditor. A user submitted the following AI tools they use: ${JSON.stringify(auditData.tools)}. 
        
        Our engine provided these automated recommendations: ${JSON.stringify(auditData.recommendations)}.
        
        Please provide a punchy, 3-sentence summary of how to optimize their stack. If you notice any custom tools that look like gibberish (e.g. "gyshdwh"), politely call it out. If there are unknown but real AI tools, acknowledge them.`;
        
        const result = await model.generateContent(prompt);
        aiSummary = result.response.text();
      } catch (aiErr) {
        console.error("AI Summary generation failed:", aiErr);
      }
    }

    const audit = new Audit({
      ...auditData,
      uuid: auditData.id,
      aiSummary
    });

    await audit.save();
    res.status(201).json(audit);
  } catch (error) {
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
