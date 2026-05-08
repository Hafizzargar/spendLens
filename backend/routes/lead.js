const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { Resend } = require('resend');

let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// POST /api/lead - Save lead and send confirmation
router.post('/', async (req, res) => {
  try {
    const { email, auditId, savingsPotential } = req.body;
    
    const lead = new Lead({ email, auditId, savingsPotential });
    await lead.save();

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'SpendLens <onboarding@resend.dev>',
          to: email,
          subject: 'Your AI Spend Audit Results',
          html: `<p>Your audit is complete! You could save up to <strong>$${savingsPotential}</strong> annually. View your full report at: <a href="https://spendlens.credex.ai/audit/${auditId}">Your Report</a></p>`
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
      }
    }

    res.status(201).json({ message: 'Lead captured successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
