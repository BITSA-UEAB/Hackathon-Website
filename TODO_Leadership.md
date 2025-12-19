# Dynamic Leadership Management Implementation Plan

## Objective
Make the BITSA Leadership section on the About page dynamic where admins can upload and manage leadership content through the admin dashboard, while keeping position titles static.

## Requirements Analysis
- **Static Titles**: Chair, Patron, President, Vice President, Treasurer, Secretary, etc.
- **Dynamic Content**: Names, departments, student IDs, profile images
- **Admin Management**: Full CRUD operations through admin dashboard
- **Public Display**: About page fetches and displays current leadership

## Implementation Plan

### 1. Backend Development
#### 1.1 Create Leadership Model
- Create `Leadership` model with fields:
  - name (CharField)
  - position (CharField - limited to predefined titles)
  - department (CharField)
  - student_id (CharField - for student leaders)
  - image (ImageField - optional)
  - is_active (BooleanField)
  - order (IntegerField - for sorting)
  - leadership_type (CharField - 'top' or 'student')

#### 1.2 Create API Endpoints
- GET `/api/leadership/` - Fetch all active leadership
- POST `/api/leadership/` - Create new leader (admin only)
- PUT `/api/leadership/<id>/` - Update leader (admin only)
- DELETE `/api/leadership/<id>/` - Delete leader (admin only)

#### 1.3 Update Admin Dashboard
- Add leadership management section
- Form for adding/editing leaders
- Image upload functionality
- Drag-and-drop reordering

### 2. Frontend Development
#### 2.1 Update About Page
- Replace static data with API calls
- Add loading states
- Error handling with fallback
- Responsive design for dynamic content

#### 2.2 Admin Dashboard Updates
- Leadership management interface
- Image upload with preview
- Position selection dropdown
- Active/inactive toggle

### 3. Database Setup
#### 3.1 Migrations
- Create migration for Leadership model
- Seed with current leadership data
- Set up proper relationships

#### 3.2 Static Titles Configuration
- Define allowed position titles
- Create position hierarchy/ordering

## Technical Implementation Steps

### Backend Files to Create/Modify:
1. `bitsa-backend/leadership/models.py` - Leadership model
2. `bitsa-backend/leadership/admin.py` - Admin interface
3. `bitsa-backend/leadership/serializers.py` - API serializers
4. `bitsa-backend/leadership/views.py` - API views
5. `bitsa-backend/leadership/urls.py` - API routing
6. Update main project URLs

### Frontend Files to Modify:
1. `src/components/About.tsx` - Dynamic data fetching
2. `src/pages/AdminDashboard.tsx` - Leadership management UI
3. Create leadership management components

### Static Position Titles:
```
Top Leadership:
- BITSA Chair
- BITSA Patron

Student Leadership:
- PRESIDENT
- VICE PRESIDENT  
- TREASURER
- SECRETARY
- CHAPLAIN
- NETWORKING REPRESENTATIVE
- SOFTWARE ENGINEERING REPRESENTATIVE
- BBIT REPRESENTATIVE
- PUBLIC RELATION OFFICER
```

## Benefits
- **Flexibility**: Easy to update leadership without code changes
- **Admin Control**: Non-technical admins can manage content
- **Consistency**: Position titles remain standardized
- **Scalability**: Easy to add new positions or leaders
- **Professional**: Clean, maintainable codebase

## Success Criteria
- ✅ Admins can add/edit/remove leaders through dashboard
- ✅ About page displays real-time leadership data
- ✅ Position titles remain static and consistent
- ✅ Image uploads work properly
- ✅ Responsive design maintained
- ✅ Loading and error states implemented
