# User Interviews & Problem Validation 🗣️

Before building SpendLens, we conducted exploratory interviews with our target demographic to validate the pain point. Below are synthesized notes from three key personas.

---

## 🧑‍💻 Persona 1: The Engineering Manager
**Name:** David T.  
**Role:** VP of Engineering at a 50-person SaaS company.  

**The Pain:** 
*"Since the generative AI boom, my developers are just throwing everything on their corporate Ramp cards. One guy has GitHub Copilot, another is using Cursor, and three others are expensing ChatGPT Plus. I have no idea what the overlap is, but finance is yelling at me about our 'software bucket' ballooning."*

**Validation:**
David needs a way to instantly see redundancy (e.g., Cursor vs. Copilot) without digging through dense spreadsheets. A visual, 60-second tool solves this.

---

## 📊 Persona 2: The Fractional CFO
**Name:** Sarah M.  
**Role:** Fractional CFO for multiple Series A startups.  

**The Pain:** 
*"My job is to extend runway. The easiest place to cut is SaaS bloat, but I am not an engineer. When I see an expense for 'Poe' and another for 'Claude Pro', I don't know if those are redundant or strictly necessary. If I suggest cutting the wrong one, the engineering team revolts."*

**Validation:**
Sarah needs *deterministic ROI math* combined with plain-English AI explanations. Our Gemini 3-sentence summary ("Poe is an aggregator, you can cancel Claude Pro to save $240/yr") is exactly what she needs to confidently present cuts to the CEO.

---

## 🚀 Persona 3: The Agency Founder
**Name:** Marcus J.  
**Role:** Founder, Digital Marketing Agency.  

**The Pain:** 
*"We use Jasper for copywriting, Midjourney for images, and ChatGPT for general tasks. It's costing us hundreds a month. I suspect we are overpaying, but nobody has the time to sit down and audit the pricing pages of 10 different AI companies to figure out the most efficient stack."*

**Validation:**
Marcus lacks the time to do research. Our pre-populated `pricingData.ts` database acting as an instant lookup table provides him with immediate, zero-effort value.
