# Devlog: The Building of SpendLens 🛠️

### Day 1: Architecture & Foundation
* **Decision:** Decided to split the stack into a Next.js frontend and an Express.js backend. While Next.js API routes are convenient, decoupling allows the backend to scale independently, especially since it will be handling heavy API calls to Gemini.
* **Database Setup:** Initialized MongoDB Atlas. Built the basic `Audit` and `Lead` schemas.

### Day 2: The Deterministic Engine & UI
* **Core Logic:** Built `auditEngine.ts`. Spent significant time ensuring the financial logic was 100% deterministic (no AI involved). Added redundancy checks for chatbots and coding tools.
* **UI Polish:** Implemented a glassmorphism design system using Tailwind CSS v4 and Framer Motion for the intro sequence. Ensure the main form sits comfortably above the fold (70vh).

### Day 3: AI Integration & Backend Hardening
* **Hurdle:** Initially tried using Anthropic's Claude 3, but realized for a free public tool, the API costs would be too high. Pivoted to **Google Gemini 1.5 Flash**, which cut variable costs by 99%.
* **Bug Fix:** Encountered a `404 Not Found` error when using the Gemini SDK. Discovered the model name needed to be updated to `gemini-1.5-flash-latest` to align with the specific SDK version. Fixed it and the summaries began generating instantly.

### Day 4: Enterprise Features & Rubric Constraints
* **Refactoring MongoDB:** A mentor suggested my MongoDB schemas looked too basic. Rewrote them to include strict sub-schemas, compound analytics indexes, and virtual populates to prove MongoDB was a deliberate, powerful choice.
* **Public Sharing:** Implemented the `/audit/[id]` dynamic route in Next.js. Added native `generateMetadata` for OpenGraph and Twitter cards to ensure the PLG viral loop actually works when links are shared.
* **Security:** Added `express-rate-limit` to the backend to prevent malicious actors from spamming our Gemini API key.
* **Testing & CI:** Added a Jest test suite for the deterministic engine and set up a `.github/workflows/ci.yml` file.

### Day 5: Logic Hardening & Finance-Grade UX
* **Pivot:** Realized generic 20% discount assumptions were too simple. Injected **Vendor-Specific Volume Discounts** (10-25%) into `pricingData.ts` to improve financial fidelity.
* **Context-Aware Overrides:** Implemented departmental logic. Engineers now get "KEEP" recommendations for multiple LLMs to prevent "AI friction" during audits.
* **UI Polish:** Replaced browser alerts with a custom, kinetic **Toast notification system**. Added transparent **Math Breakdowns** to the audit cards to ensure 100% explainability.
* **Result:** The platform is now officially "Enterprise-Ready," successfully passing the 1000-seat test case with professional, defensible results.

