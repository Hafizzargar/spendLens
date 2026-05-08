# SpendLens: AI-Assisted Spend Optimization

SpendLens is a professional-grade spend optimization tool that combines **deterministic finance logic** with **AI-generated human-friendly summaries** to help teams identify redundant subscriptions and optimize software spend with 100% transparent math.

The platform uses a hybrid engine to analyze AI stacks, providing context-aware recommendations that are defensible, explainable, and financially sound.

---

# Live Demo

```text
https://your-deployment-url.vercel.app
```

---

# Screenshots

## Landing Page
(Add screenshot here)

## Audit Results
(Add screenshot here)

## Optimization Breakdown
(Add screenshot here)

---

# Key Features

## 1. Hybrid Architecture (Baseline First)

SpendLens uses a **Baseline-First Hybrid Engine** that prioritizes deterministic logic over AI assumptions.

*   **Foundation:** The **Frontend (Next.js)** calculates a baseline audit instantly using deterministic rules, ensuring mathematical accuracy and zero hallucination.
*   **Enrichment:** The **Backend (Express)** then leverages **Gemini 1.5** as a reasoning layer to enrich the baseline with tool-overlap analysis and industry-trained benchmarks.

### Intelligence Layers:
- **Price Rigidity Analysis:** Differentiates between "Established Incumbents" (low discount) and "Market Challengers" (high discount).
- **Redundancy Detection:** Automatically identifies overlapping capabilities across the AI stack.
- **Dynamic Math:** Savings are calculated using researched benchmarks tailored to your specific team size.

---

## 2. Intelligent Progress Experience

Because deep market research takes time, SpendLens features a cinematic loading experience:
- **0-100% Progress Tracking:** Smooth simulation to maintain user engagement.
- **Rotating Status Badges:** Professional audit updates (e.g., "Fetching Benchmarks," "Analyzing Redundancies").

---

## 2. Context-Aware Intelligence

The audit engine adapts recommendations based on the team’s primary workflow and usage context.

### Engineering Overrides
Engineering teams often require multiple LLMs for:
- API testing
- model comparison
- development workflows

In these cases, SpendLens may issue a `KEEP` recommendation instead of aggressively removing overlapping tools.

### Marketing Overrides
Marketing teams frequently depend on specialized writing and workflow tools such as:
- Copy.ai
- Jasper
- Notion AI

The engine avoids unrealistic recommendations that would negatively impact content production workflows.

### Workflow Overlap Analysis
SpendLens identifies overlapping tooling patterns and suggests standardization opportunities to reduce unnecessary software sprawl.

---

## 3. Vendor-Specific Pricing Intelligence

The platform uses conservative vendor-specific discount assumptions instead of flat universal percentages.

Current estimated discount assumptions:

| Vendor | Estimated Discount |
|---|---|
| Notion AI | 15% |
| Claude | 20% |
| GitHub Copilot | 10% |
| Copy.ai | 25% |

These estimates are based on publicly available pricing and common enterprise negotiation ranges.

---

## 4. Finance-Oriented UX

The platform is intentionally designed to feel transparent and trustworthy for finance and operations teams.

### Features
- Estimated savings labels
- Confidence scoring
- Transparent math breakdowns
- Professional recommendation terminology

### Recommendation Types
- `STANDARDIZE`
- `VOLUME DISCOUNT`
- `KEEP`
- `REMOVE`

---

# Product Decisions & Tradeoffs

## 1. Why AI Research Instead of Static Rules?

Static rules go stale the moment a SaaS vendor changes their pricing. SpendLens uses **AI-Assisted Estimation** to ensure your audit is backed by industry-trained benchmarks and common procurement strategies.

### The Guardrail
We use **JSON Mime-Type Enforcement** and **Math Traceability** to ensure the AI's research is always converted into accurate, defensible financial formulas.

---

## 2. Why No Authentication?

The product is designed as a frictionless lead-generation funnel.

Users can generate an audit instantly without creating an account, reducing onboarding friction and improving conversion rates.

### Tradeoff
The platform does not currently support persistent user dashboards or historical account management.

---

## 3. Why Separate Frontend & Backend?

The frontend (Next.js) and backend (Express.js) are intentionally decoupled.

This allows:
- independent backend scaling
- isolated AI inference workloads
- cleaner separation of concerns

### Tradeoff
The architecture introduces additional deployment and API coordination complexity.

---

## 4. Why MongoDB?

MongoDB was chosen to support flexible and evolving audit payload structures during rapid MVP iteration.

Different combinations of tools, recommendations, and reasoning outputs made a document-oriented schema easier to evolve during development.

### Tradeoff
Relational databases such as PostgreSQL may provide stronger long-term analytics and reporting capabilities.

---

## 5. Why a Professional & Responsive Interface?

The audit results page is designed to be clean, professional, and easy to interpret.

The goal was to create a sense of trust and clarity, ensuring that financial data is presented in a way that is immediately actionable for a reviewer.

### Tradeoff
Building a detailed, responsive UI requires additional development time and careful state management.

---

# Technical Stack

## Frontend
- Next.js
- React
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## AI Integration
- Google Gemini 1.5 API (Market Research & Reasoning)
- JSON Mode (Deterministic Output Extraction)

## Email
- Resend API

---

# Local Development

## Install Dependencies

```bash
npm install
```

---

## Frontend Environment Variables

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
```

---

## Backend Environment Variables

Create:

```text
backend/.env
```

Add:

```env
PORT=3001
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

---

## Run Frontend

```bash
cd frontend
npm run dev
```

---

## Run Backend

```bash
cd backend
npm run dev
```

---

# Project Structure

```text
/frontend
  /src/app
  /src/components
  /src/lib

/backend
  /routes
  /models
  /services
```

---

# Known Limitations

- Enterprise pricing varies significantly across vendors and contract sizes.
- Savings estimates are based on public pricing and conservative negotiation assumptions.
- The current audit engine is heuristic-based and does not integrate directly with billing providers or SaaS procurement APIs.

---

# Future Improvements

- Historical audit tracking
- PDF export support
- Benchmarking against company-size averages
- Shareable public audit pages
- Vendor negotiation recommendations
- Procurement workflow integrations

---

# Entrepreneurial Documentation

This repository also includes:
- `ARCHITECTURE.md`
- `DEVLOG.md`
- `REFLECTION.md`
- `TESTS.md`
- `PRICING_DATA.md`
- `PROMPTS.md`
- `GTM.md`
- `ECONOMICS.md`
- `USER_INTERVIEWS.md`
- `LANDING_COPY.md`
- `METRICS.md`

---

# Assignment Context

This project was built as part of the Credex Web Development Internship Round 1 assignment focused on shipping a production-quality AI spend audit platform.
