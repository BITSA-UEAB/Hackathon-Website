# TODO for Investigating RSVP 403 Forbidden Issue

- [ ] Confirm backend logs of RSVP print statements showing user info and authentication status during 403 errors.
- [ ] Verify frontend correctly stores and sends JWT access token in Authorization header.
- [ ] Check if user is not staff, as staff users cannot RSVP.
- [ ] Add frontend token expiration handling to avoid sending expired tokens.
- [ ] Review custom middleware/settings for any 403-causing configurations.
- [ ] Add enhanced backend logging in RSVP view if current logs insufficient.
- [ ] Provide detailed diagnostics and fix based on findings.

Next steps:
- Get backend logs from user or developer.
- Review frontend login flow and AuthContext for token handling.
- Fix issues found and retest RSVP endpoint.
