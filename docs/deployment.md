# Deployment

This project is not deployed by default. Configure the two services separately.

## Frontend (Vercel)

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Set the root directory to `frontend`.
4. Build command: `npm run build`
5. Output directory: `dist`
6. Environment variables:
   - `VITE_API_BASE_URL` = public backend URL, for example `https://your-api.example.com`
   - `VITE_SITE_URL` = public frontend URL when you have one
7. `vercel.json` already rewrites unknown paths to `index.html`.

Do not add Gemini or SMTP keys to Vercel frontend variables.

## Backend (Render, Fly.io, Railway, or similar)

1. Set the root to `backend` or start with:
   `uvicorn app.main:app --host 0.0.0.0 --port 8000`
2. Environment variables:
   - `ENVIRONMENT=production`
   - `CORS_ORIGINS` = exact frontend origin, for example `https://your-frontend.vercel.app`
   - `GEMINI_API_KEY` only if you want live model answers
   - `CONTACT_EMAIL` only if you want mailto drafts
3. Health check: `GET /api/health`
4. This API does not require a database. If you later add SQLite, do not assume the file persists on ephemeral disks. Use PostgreSQL for production persistence.

## Local integration check

Run the backend on port 8000 and the frontend on port 5173. Vite proxies `/api` to the backend when `VITE_API_BASE_URL` is empty.
