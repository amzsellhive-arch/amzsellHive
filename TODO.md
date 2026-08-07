# TODO — Contact Form → Database Save + Admin Notification

## Goal
Ensure the contact page form data is ALWAYS saved to the `leads` database table,
the existing frontend thank-you message stays exactly as-is, and admin gets an
email notification with client details (dummy email for now: ishfaq@sellhive.com).

## Root Cause Found
- Backend Laravel server was NOT running → frontend caught the network error,
  silently showed "thank you", and NO data reached the database.
- Backend code (`LeadController`, `ContactController`) already saves leads + sends
  emails — verified working once the backend is running.

## Implementation Steps

- [x] 0. Investigate & confirm root cause (backend server not running)
- [x] 1. Create `frontend/src/lib/leadQueue.js` — localStorage retry queue so
       submissions are never lost even if the backend is temporarily down
- [x] 2. Update `frontend/src/pages/Contact.jsx` — use queue; keep thank-you message
       unchanged
- [x] 3. Update `frontend/src/pages/Audit.jsx` — same queue protection
- [x] 4. Update `frontend/src/main.jsx` — flush pending queue on app load
- [x] 5. Update `backend/.env` — set MAIL_ADMIN_ADDRESS to ishfaq@sellhive.com
       (dummy; user will replace later)
- [x] 6. Create `start-servers.bat` — one-click start for backend + frontend
- [x] 7. Update `README.md` with run instructions + email setup notes
- [x] 8. Clean up temp file `backend/storage/tmp_check_leads.php`
- [x] 9. Test: submit a contact form → confirm row in `leads` table + email logged
       (Verified: lead id=5 saved, admin email "New lead: Javaria Test" to
       ishfaq@sellhive.com with full client details)

