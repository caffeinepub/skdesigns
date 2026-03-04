# SKdesigns

## Current State
- Motoko backend stores contact form submissions (name, email, projectType, message, timestamp) with `submit`, `getAll`, and `getById` endpoints — no authentication.
- Frontend has 6 pages: Home, Web Design, Graphic Design, UI/UX Design, Video Creation, Contact.
- Contact page submits to backend via `actor.submit(...)`.
- No admin area exists.

## Requested Changes (Diff)

### Add
- Backend: `adminLogin(username, password)` function returning a session token on success, error on failure. Hardcoded credentials: username `suryanshswaraj100@gmail.com`, password `surya_6745`.
- Backend: `getSubmissions(token)` protected endpoint — only returns submissions if token is valid.
- Backend: `getSubmissionCount(token)` — returns total count if token is valid.
- Frontend: `/admin` route — outside the main Layout (no header/footer), standalone page.
- Frontend: Admin Login page at `/admin` — username + password form, JWT-style session stored in localStorage.
- Frontend: Admin Dashboard at `/admin` (post-login) — shows total submission count, a table of all submissions (name, email, project type, message, date), with a logout button.

### Modify
- `App.tsx` — add `/admin` route that renders AdminPage outside the main Layout.

### Remove
- Nothing removed.

## Implementation Plan
1. Update `main.mo` to add `adminLogin`, `getSubmissions`, `getSubmissionCount` with hardcoded credential check and simple token validation.
2. Create `src/frontend/src/pages/AdminPage.tsx` with login form + dashboard view, session stored in localStorage.
3. Update `App.tsx` to add `/admin` route outside the Layout wrapper.
