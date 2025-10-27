# Simple backend for SkillSwap demo

This is a minimal Express server used by the frontend for the college SkillSwap project.

- Start: npm run dev (requires installing dependencies first inside `server/`)
- Port: default 4000

Endpoints:
- GET /api/health
- GET /api/skills
- GET /api/skills/:id
- POST /api/skills
- GET /api/requests
- POST /api/requests
- PATCH /api/requests/:id
- GET /api/profile
- PUT /api/profile
- POST /api/auth/signup
- POST /api/auth/login

By default the server uses a file-backed `data.json` inside the `server/` folder. If you prefer MongoDB, set `SERVERLINK` in a `.env` and update the server to connect directly (there's already `database.js` in this folder as a helper).
