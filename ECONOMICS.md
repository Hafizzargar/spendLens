# Unit Economics & Costs 💰

Because SpendLens is a free, ungated lead-generation tool, managing Cost of Goods Sold (COGS) is our primary architectural constraint. The application must be virtually free to run at scale.

## 📊 Variable COGS (Per Audit)

Our absolute highest priority was minimizing the variable cost of the AI inference. 

* **AI Inference (Google Gemini 1.5 Flash):** 
  * The prompt requires ~250 input tokens and generates ~100 output tokens.
  * Gemini 1.5 Flash costs $0.075 per 1M input tokens and $0.30 per 1M output tokens.
  * **Cost per Audit = ~$0.00004**
  * *Tradeoff validated:* Using Anthropic Claude 3 Opus or GPT-4o would cost roughly $0.01 to $0.03 per audit. By using Gemini, we cut variable COGS by 99.8%.

* **Database (MongoDB Atlas Serverless):**
  * $0.10 per million reads/writes.
  * **Cost per Audit = Negligible ($0.0000002)**

* **Transactional Email (Resend):**
  * $0.001 per email sent (Lead capture confirmation).
  * **Cost per Lead = $0.001**

**Total Variable COGS per 1,000 Audits:** ~$0.04 (Four cents).

## 🏢 Fixed / Infrastructure Costs
* **Frontend Hosting:** Vercel (Hobby/Pro) = $0 - $20/mo.
* **Backend Hosting:** Railway / Render = ~$5 - $10/mo.
* **Domain Name:** $12/yr.
* **Total Fixed Run Rate:** ~$30/mo.

## 💎 Return on Investment (ROI)
Since this is a lead-gen tool for Credex:
* **Customer Acquisition Cost (CAC):** $0.001 (Cost of the email + API call) + organic distribution.
* **Lifetime Value (LTV):** A qualified B2B SaaS consulting contract or platform subscription for Credex is easily worth $500 - $5,000+.

**Conclusion:** The unit economics are highly asymmetric. We can afford to process 100,000 free audits for $4.00, knowing that capturing even a single qualified lead yields a 12,500x return on COGS.
