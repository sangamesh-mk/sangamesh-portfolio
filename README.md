# Sangamesh M Kuri — Portfolio

Interactive personal portfolio for Sangamesh M Kuri, a Computer Science and Engineering student and hybrid technology innovator associated with Matured Mind Technologies (M²TECHS).

The site is a React experience with a FastAPI backend for public profile data, a portfolio assistant, and honest contact handling.

## Technology stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, Motion, GSAP, React Three Fiber, Lucide
- Backend: Python, FastAPI, Pydantic, SlowAPI, httpx
- Tests: Vitest, React Testing Library, Pytest, Playwright (optional)

## Directory structure

```
sangamesh-portfolio/
  frontend/          React application
  backend/           FastAPI application
  docs/              Deployment notes
  .env.example       Combined environment template
  README.md
```

## Prerequisites

- Node.js 20+
- Python 3.11+
- Git

## Installation

### PowerShell

```powershell
cd "$env:USERPROFILE\sangamesh-portfolio"

# Frontend
cd frontend
copy .env.example .env
npm install

# Backend
cd ..\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

### macOS / Linux

```bash
cd ~/sangamesh-portfolio
cd frontend && cp .env.example .env && npm install
cd ../backend && python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Local development

Run both services.

Frontend:

```powershell
cd frontend
npm run dev
```

Backend:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```

Open `http://127.0.0.1:5173`. With `VITE_API_BASE_URL` empty, Vite proxies `/api` to the backend.

## Environment variables

Frontend (`frontend/.env`):

- `VITE_API_BASE_URL` — public API origin in production. Leave empty for local proxy use.
- `VITE_SITE_URL` — optional canonical site URL. Do not invent a domain.

Backend (`backend/.env`):

- `ENVIRONMENT` — `development` or `production`
- `CORS_ORIGINS` — comma-separated allowed frontend origins
- `GEMINI_API_KEY` — optional; when empty the chatbot uses labeled demo mode
- `GEMINI_MODEL` — defaults to `gemini-2.0-flash`
- `CONTACT_EMAIL` — optional; prepares a mailto draft instead of sending mail
- `RATE_LIMIT` — default `30/minute`

Never put provider secrets in `VITE_` variables.

## Tests and builds

```powershell
# Frontend
cd frontend
npm run test
npm run typecheck
npm run lint
npm run build

# Optional browser smoke test
npx playwright install chromium
npm run test:e2e

# Backend
cd ..\backend
.\.venv\Scripts\Activate.ps1
pytest -q
```

## AI assistant

`POST /api/chat` answers from a verified knowledge file in `backend/app/core/knowledge.py`.

- No `GEMINI_API_KEY`: deterministic demo replies, clearly labeled in the UI.
- With key: Gemini is called server-side. Failures fall back to demo text.

## Contact form

The form validates on the client and server. If no email delivery provider is configured, the API accepts a demo submission and states that no email was sent. Set `CONTACT_EMAIL` to generate a mailto draft.

## Configuration points

- Profile and social links: `frontend/src/config/profile.ts`
- Projects: `frontend/src/data/projects.ts`
- Skills: `frontend/src/data/skills.ts`
- Journey: `frontend/src/data/journey.ts`
- Assistant knowledge: `backend/app/core/knowledge.py`
- Profile photo: set `profileImageSrc` in the frontend profile config. Until then a monogram placeholder is shown.

## Deployment

See `docs/deployment.md`. The repository is not deployed until you connect GitHub and a host.

## Troubleshooting

- Chat or contact fails: confirm the backend is running on port 8000.
- CORS errors in production: set `CORS_ORIGINS` to the exact frontend origin.
- 3D scene missing: WebGL may be unavailable; the page still reads without it.
- Theme flash: the inline script in `frontend/index.html` applies the stored or system theme before React loads.

## Known limitations

- No LinkedIn, email, resume, or custom domain is configured.
- Project repository and live demo buttons stay hidden until real URLs are added.
- Contact does not send email unless you later add a delivery provider.
- Chatbot demo mode is not an LLM.
- Sitemap uses a placeholder origin until `VITE_SITE_URL` is a real domain.
- SQLite is not used; there is no persistent message store.
