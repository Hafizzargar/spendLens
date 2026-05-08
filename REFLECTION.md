# Project Reflection & Future Roadmap 🧠

Building SpendLens was an exercise in balancing technical excellence with product-led growth mechanics. Here is a reflection on what went well, the tradeoffs made, and what I would do differently next time.

## 🎯 What Went Well
1. **The Deterministic/Generative Split:** Keeping the financial math strictly inside a deterministic React engine (`auditEngine.ts`) while using AI strictly for conversational summaries was the best architectural decision made. It completely eliminates the risk of AI math hallucinations while still providing a personalized UX.
2. **MongoDB Schemas:** Elevating NoSQL to handle relational-style constraints (strict sub-schemas, enum constraints, virtual populates) proved that MongoDB can be highly structured when engineered properly.
3. **Unit Economics:** Swapping to Gemini 1.5 Flash drove our variable COGS down to fractions of a penny, making an ungated, free-to-use public tool financially viable.

## 🤔 What I Would Do Differently
1. **Database Selection:** While our advanced MongoDB indexing works flawlessly, an application that deals with financial data, invoices, and strict relationships (User -> Company -> Audits -> Tools) is naturally suited for a SQL database. If I had more time, I would have used **Supabase (PostgreSQL)** paired with Prisma ORM to get native foreign keys and easier analytics aggregation out of the box.
2. **Next.js API Routes vs. Express:** Decoupling the frontend and backend is great for massive scale, but for an MVP, building the API directly inside Next.js 14 API routes (`/src/app/api`) would have reduced deployment complexity and eliminated CORS issues entirely during development.

## 🚀 Future Roadmap (v2.0)
1. **Plaid/Ramp Integration:** Instead of manual dropdowns, users could authenticate via Plaid or Ramp, allowing us to automatically scan their credit card transactions and identify AI SaaS tools instantly.
2. **Programmatic SEO Pages:** Auto-generating comparison pages (e.g., "ChatGPT vs Claude for Enterprise") using our `pricingData.ts` to drive massive organic search traffic.
3. **Admin Dashboard:** A secured portal for the Credex consulting team to view lead volume, conversion rates, and the most common redundant tools across the industry.
