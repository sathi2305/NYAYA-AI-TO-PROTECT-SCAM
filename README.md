# NYAYA (न्याय) — Justice For Every Investor 🛡️
> **Bharat-First Voice-Native Investor Fraud Shield & SEBI Redressal Engine**

## 🌐 Live Working Application Links

- **Production / Shared Web App (Google Cloud Run)**:  
  👉 **[https://ais-pre-jpoybs4iv2dsf3wlp6nr4t-802313312719.asia-southeast1.run.app](https://ais-pre-jpoybs4iv2dsf3wlp6nr4t-802313312719.asia-southeast1.run.app)**

- **Development Preview App**:  
  👉 **[https://ais-dev-jpoybs4iv2dsf3wlp6nr4t-802313312719.asia-southeast1.run.app](https://ais-dev-jpoybs4iv2dsf3wlp6nr4t-802313312719.asia-southeast1.run.app)**

---

## 🚀 How to Export to GitHub & Deploy to Vercel

### Step 1: Export / Push to GitHub
1. In the **Google AI Studio** workspace header (top-right), click the **Export** or **GitHub** button to sync directly to your GitHub repository (e.g. `github.com/your-username/nyaya-investor-shield`).
2. Alternatively, clone or download the repository files:
   ```bash
   git init
   git add .
   git commit -m "feat: NYAYA Investor Protection Suite complete full-stack release"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nyaya-investor-shield.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel (1-Click)
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Select your newly pushed GitHub repository: **`nyaya-investor-shield`**.
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API Key)*
4. Keep the framework preset as **Vite** (the included `vercel.json` automatically configures routes).
5. Click **Deploy**. Your Vercel link will be live in ~60 seconds at `https://nyaya-investor-shield.vercel.app`!

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, D3.js (Radial Color-Coded Risk Gauge).
- **Backend**: Node.js, Express.js, Vite middleware.
- **AI Models & Engines**:
  - `gemini-3.5-flash`: Financial scam analysis & Google Search Grounding with web citations.
  - `gemini-3.1-pro-preview`: Complex regulatory reasoning & legal grievance verification.
  - `gemini-3.1-flash-lite`: Low-latency conversational advisory.
  - `gemini-3.5-transcribe`: Vernacular speech-to-text audio transcription.
  - `veo-3.1-fast-generate-preview`: Investor awareness cinematic videos (16:9 Landscape & 9:16 Portrait Reels).

---

## 📦 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Add your Gemini API key in .env
echo "GEMINI_API_KEY=your_key_here" > .env

# 3. Start development server
npm run dev

# App runs at http://localhost:3000
```
