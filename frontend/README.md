# SpendLens Frontend 🚀

The frontend of SpendLens is built with **Next.js 14**, React, Tailwind CSS v4, and Framer Motion. It serves as the high-fidelity UI where users input their team's AI tool stack and receive instant, beautiful ROI audits.

## 🛠 Tech Stack
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State & Data:** React Hooks + Axios

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env.local` file in the `frontend/` directory if it does not exist:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:3001
```
*(This ensures the frontend can communicate with your local Express backend).*

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
You can run the frontend individually:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. 
*(Note: To ensure the app works properly, we recommend running both servers from the root directory using the master start script).*

## 🧩 Key Features
* **Cinematic Onboarding**: A Framer Motion powered splash screen introduces new users to the app.
* **Deterministic Audit Engine**: The `auditEngine.ts` uses strict, deterministic hard-coded logic to identify redundancies (e.g. `if chatbots > 1 -> consolidate`) and calculate savings. No AI is used for math.
* **Custom Tool Support**: Users can add custom/unknown AI tools. The backend AI only generates a conversational summary, while all financial calculations remain strictly deterministic.
* **Glassmorphism UI**: Beautiful, premium styling using custom CSS combined with Tailwind utilities.

## 📂 Directory Structure
* `/src/app/`: Next.js page routing and global layouts.
* `/src/components/`: Reusable UI components (`SpendForm`, `AuditResults`, `LeadCapture`).
* `/src/lib/`: Core logic and data (e.g., `pricingData.ts`, `auditEngine.ts`).
