# Leadership Section Simplification Plan

## Objective
Simplify the adminDashboard Leadership section to meet the user's requirements:
- Only show Position, Name, and Photo Upload fields
- Allow editing and updating
- Ensure each position has only one person

## Current Analysis
The current Leadership form has these fields:
- name ✓ (keep)
- position ✓ (keep - make dropdown)
- department ✗ (remove)
- student_id ✗ (remove)
- leadership_type ✗ (remove - auto-detect from position)
- image ✓ (keep - optional)

## Required Changes

### 1. Frontend (AdminDashboard.tsx)
- **Form Simplification**: Remove department, student_id, leadership_type fields
- **Position Dropdown**: Replace text input with select dropdown using predefined positions
- **Auto-detection**: Auto-set leadership_type based on selected position
- **Single Person per Position**: Add validation to prevent duplicate positions
- **Table Display**: Show only Name, Position, Image status
- **Edit Form**: Same simplified structure

### 2. Backend (if needed)
- **API Updates**: Remove department, student_id from required fields
- **Validation**: Add position uniqueness validation
- **Auto-leadership-type**: Auto-set leadership_type based on position

### 3. Predefined Positions (from models.py)
**Top Leadership:**
- BITSA Chair
- BITSA Patron

**Student Leadership:**
- PRESIDENT
- VICE PRESIDENT  
- TREASURER
- SECRETARY
- CHAPLAIN
- NETWORKING REPRESENTATIVE
- SOFTWARE ENGINEERING REPRESENTATIVE
- BBIT REPRESENTATIVE
- PUBLIC RELATION OFFICER

## Implementation Steps
1. Update state management (remove unused fields)
2. Modify addLeadership function (simplify form data)
3. Modify editLeadership function (simplify form data)
4. Update form validation (position uniqueness)
5. Update table display (show only relevant columns)
6. Update dialog forms (simplify UI)
7. Test the changes

## Expected Behavior
- Admin can only add/edit Name, Position (dropdown), and Photo
- Each position can have only one person
- Leadership type is automatically determined from position
- Clean, simple interface focused on essential information
