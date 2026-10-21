# BCS English Master

A [Next.js](https://nextjs.org) app for BCS (Bangladesh Civil Service) English preparation: vocabulary, quizzes, English ↔ Bangla passage translation with AI evaluation, and free-hand writing practice with AI feedback.

The AI evaluation is powered by [Groq](https://console.groq.com) (`/api/evaluate-translation` and `/api/evaluate-writing`).

## Local setup

```bash
npm install
cp .env.example .env.local   # then paste your Groq key into GROQ_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `GROQ_API_KEY` | yes | Create one at <https://console.groq.com/keys>. No quotes, no trailing spaces. |
| `GROQ_MODEL` | no | Defaults to `openai/gpt-oss-120b`. Only set this if Groq retires the default; pick a current production model from <https://console.groq.com/docs/models>. |

If `GROQ_API_KEY` is missing, both evaluation buttons show *"GROQ_API_KEY is not configured"*.

## Deploying on Vercel

1. Import the repo at <https://vercel.com/new> (or push to `main` if the project is already connected — Vercel redeploys automatically).
2. In the Vercel project go to **Settings → Environment Variables** and add `GROQ_API_KEY` for **Production**, **Preview** and **Development**.
3. Environment variables are baked in at deploy time, so after adding or changing one go to **Deployments → ⋯ → Redeploy**.
4. If an evaluation fails, the exact Groq error is shown in the UI and logged under **Deployments → (latest) → Logs**.

### Why evaluation broke in Aug 2026

The routes originally hard-coded Groq's `llama-3.3-70b-versatile`, which Groq retired for free/developer keys on 2026-08-16 ([deprecations](https://console.groq.com/docs/deprecations)). Every request then failed with a *"model decommissioned"* error. The app now defaults to Groq's recommended replacement and lets you override the model with `GROQ_MODEL` without a code change.

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run lint` – ESLint
- `node scripts/scrape-passages.mjs` – regenerate `data/passages.ts`
