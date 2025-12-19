# Leadership Table Update Plan

## Objective
Convert Leadership management from card-based interface to editable table with fixed positions

## Current Issues
- Using cards for display
- Has "Add Leadership Member" button and dialog
- Positions are selected via dropdown when adding
- Shows only existing members

## Required Changes

### 1. Remove Add Functionality
- Remove "Add Leadership Member" button
- Remove addLeadershipDialog and related states
- Remove addLeadership function
- Remove newLeadership state

### 2. Create Fixed Position Table
- Show all positions from `leadershipPositions` array pre-filled
- Each row represents one position (fixed, not editable)
- Position column shows position name but is not editable
- Other columns: Name, Department, Student ID, Photo, Actions

### 3. Table Structure
- Position (fixed, non-editable)
- Name (editable)
- Department (editable) 
- Student ID (editable)
- Photo (editable)
- Actions (edit/delete)

### 4. Data Management
- Create helper function to get member by position
- When editing, update existing member or create if empty
- Maintain existing edit/delete functionality
- Ensure all positions are displayed even if empty

### 5. UI Improvements
- Make position column read-only
- Remove position dropdown from edit dialog
- Simplify edit dialog for other fields only
- Improve table layout and styling

## Files to Modify
- `src/pages/AdminDashboard.tsx` - Main leadership section

## Steps
1. Remove add leadership functionality
2. Create fixed position table structure
3. Update edit functionality to work with fixed positions
4. Test and verify functionality
