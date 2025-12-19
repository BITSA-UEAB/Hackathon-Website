# Leadership Frontend Simplification Plan

## Objective
Simplify the AdminDashboard Leadership section to only show:
- **Position** (dropdown with predefined titles)
- **Name** (text input)
- **Photo Upload** (optional file input)

## Current Issues Found
1. **Too many fields**: department, student_id, leadership_type are currently required
2. **Position input**: Currently text input, should be dropdown
3. **Manual selection**: leadership_type should be auto-detected from position
4. **Validation complexity**: Current validation is overly complex

## Implementation Plan

### 1. State Management Updates
**Remove from newLeadership state:**
- department (string)
- student_id (string) 
- leadership_type (string)

**Keep in newLeadership state:**
- name (string) ✓
- position (string) ✓
- image (File | null) ✓

**Remove from editLeadership state:**
- department (string)
- student_id (string)
- leadership_type (string)

**Keep in editLeadership state:**
- name (string) ✓
- position (string) ✓
- image (File | null) ✓

### 2. Form Field Changes

#### Add Leadership Dialog
**Current fields to remove:**
```jsx
// REMOVE THESE:
<div>
  <Label htmlFor="leadership_department">Department *</Label>
  <Input id="leadership_department" ... />
</div>
<div>
  <Label htmlFor="leadership_student_id">Student ID *</Label>
  <Input id="leadership_student_id" ... />
</div>
<div>
  <Label htmlFor="leadership_type">Leadership Type</Label>
  <Select ...>
    <SelectItem value="executive">Executive</SelectItem>
    <SelectItem value="departmental">Departmental</SelectItem>
    <SelectItem value="committee">Committee</SelectItem>
  </Select>
</div>
```

**Current fields to modify:**
```jsx
// CHANGE FROM TEXT INPUT TO DROPDOWN:
<div>
  <Label htmlFor="leadership_position">Position *</Label>
  <Input
    id="leadership_position"
    value={newLeadership.position}
    onChange={(e) => setNewLeadership({ ...newLeadership, position: e.target.value })}
    placeholder="Enter position"
  />
</div>

// CHANGE TO:
<div>
  <Label htmlFor="leadership_position">Position *</Label>
  <Select 
    value={newLeadership.position} 
    onValueChange={(value) => setNewLeadership({ ...newLeadership, position: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a position" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="BITSA Chair">BITSA Chair</SelectItem>
      <SelectItem value="BITSA Patron">BITSA Patron</SelectItem>
      <SelectItem value="PRESIDENT">PRESIDENT</SelectItem>
      <SelectItem value="VICE PRESIDENT">VICE PRESIDENT</SelectItem>
      <SelectItem value="TREASURER">TREASURER</SelectItem>
      <SelectItem value="SECRETARY">SECRETARY</SelectItem>
      <SelectItem value="CHAPLAIN">CHAPLAIN</SelectItem>
      <SelectItem value="NETWORKING REPRESENTATIVE">NETWORKING REPRESENTATIVE</SelectItem>
      <SelectItem value="SOFTWARE ENGINEERING REPRESENTATIVE">SOFTWARE ENGINEERING REPRESENTATIVE</SelectItem>
      <SelectItem value="BBIT REPRESENTATIVE">BBIT REPRESENTATIVE</SelectItem>
      <SelectItem value="PUBLIC RELATION OFFICER">PUBLIC RELATION OFFICER</SelectItem>
    </SelectContent>
  </Select>
</div>
```

#### Edit Leadership Dialog
**Same changes as Add Dialog:**
- Remove department, student_id, leadership_type fields
- Change position input to dropdown

### 3. Table Display Updates
**Current table columns:**
```jsx
<TableRow>
  <TableHead>Name</TableHead>
  <TableHead>Position</TableHead>
  <TableHead>Department</TableHead>        // REMOVE
  <TableHead>Student ID</TableHead>        // REMOVE
  <TableHead>Type</TableHead>              // REMOVE
  <TableHead>Status</TableHead>
  <TableHead>Actions</TableHead>
</TableRow>
```

**New table columns:**
```jsx
<TableRow>
  <TableHead>Name</TableHead>
  <TableHead>Position</TableHead>
  <TableHead>Photo</TableHead>             // ADD - show image thumbnail or "No photo"
  <TableHead>Status</TableHead>
  <TableHead>Actions</TableHead>
</TableRow>
```

### 4. API Function Updates

#### addLeadership function
**Current complexity:**
```jsx
const addLeadership = async () => {
  // Complex validation
  // Department, student_id required checks
  // FormData with all fields
}
```

**Simplified version:**
```jsx
const addLeadership = async () => {
  if (!newLeadership.name || !newLeadership.position) {
    toast.error('Please fill in all required fields');
    return;
  }

  // Auto-detect leadership_type based on position
  const autoLeadershipType = isChairOrPatron(newLeadership.position) ? 'top' : 'student';

  // Check if position already exists
  const positionExists = leadership.some(member => 
    member.position === newLeadership.position
  );

  if (positionExists) {
    toast.error(`A member already holds the position of ${newLeadership.position}`);
    return;
  }

  const formData = new FormData();
  formData.append('name', newLeadership.name);
  formData.append('position', newLeadership.position);
  formData.append('leadership_type', autoLeadershipType);
  if (newLeadership.image) {
    formData.append('image', newLeadership.image);
  }

  // API call...
}
```

#### editLeadershipSubmit function
**Simplified version:**
```jsx
const editLeadershipSubmit = async () => {
  if (!selectedLeadership || !editLeadership.name || !editLeadership.position) {
    toast.error('Please fill in all required fields');
    return;
  }

  // Auto-detect leadership_type
  const autoLeadershipType = isChairOrPatron(editLeadership.position) ? 'top' : 'student';

  const formData = new FormData();
  formData.append('name', editLeadership.name);
  formData.append('position', editLeadership.position);
  formData.append('leadership_type', autoLeadershipType);
  if (editLeadership.image) {
    formData.append('image', editLeadership.image);
  }

  // API call...
}
```

### 5. Backend API Compatibility
**Expected API changes (if backend needs updates):**
- Backend should accept simplified leadership data
- Auto-calculate leadership_type from position
- Make department and student_id optional/removed

### 6. Helper Function Enhancement
**Update isChairOrPatron function:**
```jsx
const isChairOrPatron = (position: string) => {
  return position === 'BITSA Chair' || position === 'BITSA Patron';
};
```

## Expected User Experience
1. **Admin clicks "Add Leadership Member"**
2. **Sees simple form with:**
   - Name field (required)
   - Position dropdown (required)
   - Photo upload (optional)
3. **Selects position from predefined list**
4. **System auto-determines if it's "top" or "student" leadership**
5. **Save button creates the member**
6. **Table shows simplified view: Name, Position, Photo status, Actions**

## Benefits
- **Cleaner interface**: Only essential fields visible
- **Less user error**: Predefined positions prevent typos
- **Automatic categorization**: No manual leadership_type selection
- **Consistent data**: Position titles are standardized
- **Faster data entry**: Fewer fields to fill

## Files to Modify
1. `src/pages/AdminDashboard.tsx` - Main implementation
2. Potential backend API updates if needed

## Testing Checklist
- [ ] Add new leadership member works
- [ ] Edit existing leadership member works
- [ ] Position dropdown shows all predefined positions
- [ ] Photo upload/preview works
- [ ] Table displays simplified columns
- [ ] Validation prevents duplicate positions
- [ ] Auto-detection of leadership_type works
- [ ] Responsive design maintained
