<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Witness Gaza (Evidence-first Interactive Dashboard)

An **evidence-first, human-rights documentation interface** that turns publicly cited data into a clear, interactive experience:
dashboards, evidence cards, map views, timeline exploration, and AI-assisted inquiry — with a focus on **source transparency** and **non-incendiary language**.

> **Important:** This project is for documentation, research, and educational use.
> It is not a substitute for official legal investigations or judicial determinations.

## Features
- **Truth Dashboard:** key indicators with filters (date, region, category)
- **Evidence Cards:** short summaries with citation placeholders
- **Map + Timeline views:** explore patterns across time and geography
- **AI Inquiry:** ask questions and get answers grounded in in-app evidence
- **Export:** generate a report snapshot (UI flow)

## Data & Sources
This repository ships with UI + templates. Add your sources and methodology here:
- `docs/methodology.md`
- `docs/data-sources.md`
- `docs/legal-disclaimer.md`

## Run Locally
**Prerequisites:** Node.js (LTS)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` and set your Gemini key:
   ```bash
   GEMINI_API_KEY=YOUR_KEY_HERE
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## Build
```bash
npm run build
npm run preview
```

## Repo Hygiene
- Never commit secrets (API keys, private datasets).
- `.env.local` is ignored by git via `*.local`.

## License
MIT — see `LICENSE`.
