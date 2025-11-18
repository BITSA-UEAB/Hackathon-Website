# Events CRUD Implementation Plan

## Backend Implementation
- [x] Create Event model with fields: title, description, date, time, location, category, status, created_at, updated_at
- [x] Create EventSerializer
- [x] Create EventViewSet with CRUD operations
- [x] Create URLs for events API
- [x] Register Event model in admin
- [x] Include events URLs in main API URLs
- [x] Run migrations after model creation

## Frontend Updates
- [ ] Update Events.tsx to fetch events from API
- [ ] Update AdminDashboard.tsx events tab with full CRUD UI (add, edit, delete events)

## Followup Steps
- [ ] Run migrations after model creation
- [ ] Test API endpoints
- [ ] Test frontend integration
