# Leadership Section Update - TODO List

## Task Summary
Update admin dashboard on leadership section to be dynamic so admin can:
- Upload name, Student Id (optional), and photo field
- Backend should fetch all position names
- Actions (add, edit, delete) should be working

Also ensure leadership is displayed on the About page for users.

## Files to Edit

### 1. src/pages/AdminDashboard.tsx
- [ ] Add state for `positions` (fetched from backend)
- [ ] Add state for `leadershipTypes` (fetched from backend)
- [ ] Add state for `addLeadershipDialogOpen` 
- [ ] Add state for `newLeadership` object
- [ ] Add `fetchPositions()` function
- [ ] Add `fetchLeadershipTypes()` function  
- [ ] Add `addLeadership()` function
- [ ] Add "Add New Leadership" button and dialog
- [ ] Fix edit dialog's leadership_type dropdown options
- [ ] Replace hardcoded `leadershipPositions` with fetched positions
- [ ] Update useEffect to fetch positions and types

### 2. src/pages/About/About.tsx
- [ ] Already implemented - fetches from backend
- [ ] No changes needed

## Backend (Already implemented)
- `/api/leadership/positions/` - returns position choices
- `/api/leadership/types/` - returns leadership type choices
- `/api/leadership/` - CRUD operations

## Status
- [ ] Plan confirmed by user
- [ ] AdminDashboard.tsx updated
- [ ] Testing completed
