# SportsCoaching Frontend

React + Vite frontend for the SportsCoaching Spring Boot API.

## Run locally

1. Install Node.js (current LTS).
2. Open this folder in a terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env` if you need to change the backend URL.
5. Run `npm run dev`.
6. Open the URL printed by Vite (usually http://localhost:5173).

The default backend URL is `http://localhost:8081`. API routes used:
- `POST /sportscoaching/add`
- `GET /sportscoaching/displayall`
- `GET /sportscoaching/display/{id}`
- `PUT /sportscoaching/update/{id}`
- `DELETE /sportscoaching/delete/{id}`

The Add form intentionally has no ID field. The database generates the ID.

## Backend CORS

Allow `http://localhost:5173` in the Spring Boot controller using `@CrossOrigin(origins = "http://localhost:5173")` above `@RestController`, or configure an equivalent global CORS policy.
