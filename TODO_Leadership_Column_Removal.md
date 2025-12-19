# Leadership Management Column Removal Plan

## Objective
Remove Department column from leadership management table and make Student ID optional while keeping other columns as input fields.

## Changes Required

### 1. Remove Department Column from Leadership Table
- Remove "Department" from table header
- Remove department display from table body
- Remove department field from edit dialog

### 2. Make Student ID Optional
- Remove asterisk (*) from Student ID label in edit form
- Update validation to make Student ID optional
- Update the editLeadershipSubmit function validation

### 3. Keep Other Columns as Input Fields
- Name field (required)
- Position field (required) 
- Student ID field (now optional)
- Leadership Type field (required)
- Image field (optional)

## Files to Modify
- `src/pages/AdminDashboard.tsx`

## Steps
1. Update table header to remove Department column
2. Update table body to remove Department column display
3. Update edit leadership dialog to remove Department field
4. Update Student ID validation to be optional
5. Test the changes

## Expected Result
- Leadership table shows: Position, Name, Student ID, Photo, Action columns
- Student ID field is optional in the edit form
- Department field completely removed from management interface
