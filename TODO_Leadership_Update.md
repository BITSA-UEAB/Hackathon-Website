# Leadership Management Update Plan

## Objective
Modify the admin Dashboard Leadership section to implement the following requirements:
- Only Name should be editable
- Position should be static (select from predefined options)
- Image should be optional for everyone
- Student ID should only be shown for non-Chair/Patron positions

## Changes Required

### 1. Update Add Leadership Dialog
- Remove editable Position input field
- Replace with Position select dropdown
- Remove Department field (no longer needed)
- Add conditional Student ID field (hidden for Chair/Patron)
- Keep Image as optional
- Update validation logic

### 2. Update Edit Leadership Dialog
- Same changes as Add dialog
- Pre-populate Position dropdown with current value
- Conditionally show Student ID field

### 3. Update Leadership Table Display
- Show: Name, Position (static), Image status, Student ID (conditional)
- Remove: Department, Leadership Type columns

### 4. Update API calls
- Remove department from payload
- Update validation to match new requirements
- Handle student_id conditionally

## Predefined Positions
From About page analysis:
- Top Leaders: BITSA Chair, BITSA Patron
- Student Leaders: Vice Chair, Secretary, Treasurer, Program Coordinator, Event Coordinator, Public Relations

## Implementation Steps
1. Update state management for new form structure
2. Modify addLeadership function
3. Modify editLeadership function
4. Update form validation
5. Update table display
6. Test the changes
