# SpendLens Backend ⚙️

The backend of SpendLens is a robust Express.js API designed to store audit data, generate AI summaries using Google Gemini, and trigger email sequences via Resend.

## 🛠 Tech Stack
* **Framework:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/) (Mongoose)
* **AI Engine:** [Google Generative AI](https://ai.google.dev/) (Gemini 1.5 Pro)
* **Email:** [Resend](https://resend.com/)

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_ai_studio_key
RESEND_API_KEY=your_resend_api_key
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
You can run the backend individually:
```bash
npm run dev
```
The server will start on `http://0.0.0.0:3001` to ensure network resolution works flawlessly with Next.js locally.

*(Note: We recommend running both servers from the root directory using `npm run dev` in the root `package.json`).*

## 🧩 Key API Routes

### `POST /api/audit`
Receives the user's AI tool stack and calculated savings from the frontend.
* Saves the audit state to MongoDB.
* The frontend handles all deterministic financial logic (math, savings, redundancies) before sending data here.
* Uses **Google Gemini** strictly to read the deterministic output and generate a conversational 3-sentence summary (no AI is used for math or decision making).

### `POST /api/lead`
Receives a captured lead (email address) linked to an audit ID.
* Saves the lead to MongoDB.
* Uses the **Resend SDK** to dispatch a beautifully formatted HTML email containing their audit summary and a CTA to book a consultation with Credex.

## 🏗 Architecture Notes
* The backend is decoupled from the frontend, allowing it to be independently deployed to platforms like Render, Railway, or Heroku.
* External SDK integrations (Gemini, Resend) are wrapped in conditional checks so the server boots safely even if an API key is missing.
