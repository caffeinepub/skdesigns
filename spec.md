# SKdesigns

## Current State
Full-stack portfolio site with admin portal. Backend stores contact form submissions and portfolio items. Admin login uses hardcoded credentials in Motoko. The frontend `AdminPage.tsx` was not restoring the session token from localStorage on mount, always showing the login screen. A stale token from a prior deployment may also cause "unauthorized" errors even after a fresh login.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Backend: refresh the admin token string to bust stale cached tokens from prior deployments; keep credentials identical (`suryanshswaraj100@gmail.com` / `surya_6745`)
- Frontend (already done): AdminPage now restores session from localStorage on mount; login form trims whitespace from username/password before submission

### Remove
- Nothing

## Implementation Plan
1. Regenerate backend with a fresh token string to invalidate stale sessions from prior deployments
2. Frontend AdminPage fixes already applied (session restore + trim)
3. Validate and deploy
