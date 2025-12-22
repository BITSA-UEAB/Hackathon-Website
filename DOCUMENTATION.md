# BITS Association (BITSA) Website Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Backend Documentation](#backend-documentation)
5. [Frontend Documentation](#frontend-documentation)
6. [API Documentation](#api-documentation)
7. [Authentication System](#authentication-system)
8. [Database Models](#database-models)
9. [Components Overview](#components-overview)
10. [Development Setup](#development-setup)
11. [Deployment](#deployment)

## Project Overview

BITS Association (BITSA) is a comprehensive full-stack web application designed to serve the BITS Association community. The platform provides features for managing leadership information, events, blog posts, user authentication, and gallery management.

### Key Features
- **User Authentication & Authorization**: JWT-based authentication system with role-based access control
- **Leadership Management**: Display and manage BITSA leadership information with different categories
- **Event Management**: Create, view, and manage events with attendee registration
- **Blog System**: Publish and read blog posts with categories and tags
- **Gallery**: Image gallery for events and community photos
- **Admin Dashboard**: Comprehensive admin interface for managing all platform content
- **Responsive Design**: Mobile-first responsive design using Tailwind CSS

### Target Audience
- BITSA members and students
- Event organizers
- Blog contributors
- Admin staff

## Technology Stack

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: Simple JWT (JSON Web Tokens)
- **CORS**: django-cors-headers
- **File Storage**: Django Media Files

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI components)
- **State Management**: React Context API
- **HTTP Client**: Fetch API with Axios
- **Routing**: React Router DOM 6.30.1
- **Forms**: React Hook Form with Zod validation
- **Data Fetching**: TanStack React Query 5.83.0

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Type Checking**: TypeScript 5.8.3
- **CSS Framework**: Tailwind CSS with PostCSS

## Project Structure

```
Hackathon-Website-main/
├── bitsa-backend/                 # Django Backend
│   ├── bitsa_project/            # Django Project Configuration
│   │   ├── settings.py          # Django Settings
│   │   ├── urls.py              # Main URL Configuration
│   │   └── wsgi.py              # WSGI Configuration
│   ├── accounts/                # User Authentication App
│   ├── about/                   # Leadership & About Information
│   ├── blogs/                   # Blog Management
│   ├── events/                  # Event Management
│   ├── gallery/                 # Image Gallery
│   └── media/                   # Media Files Storage
├── src/                         # React Frontend
│   ├── components/              # Reusable React Components
│   │   ├── ui/                  # shadcn/ui Components
│   │   ├── About.tsx            # About Page Component
│   │   ├── Blog.tsx             # Blog Component
│   │   ├── Events.tsx           # Events Component
│   │   ├── Hero.tsx             # Hero Section
│   │   ├── Navbar.tsx           # Navigation Component
│   │   └── ...
│   ├── contexts/                # React Context Providers
│   │   └── AuthContext.tsx      # Authentication Context
│   ├── hooks/                   # Custom React Hooks
│   ├── lib/                     # Utility Functions
│   ├── pages/                   # Page Components
│   │   ├── Home.tsx             # Homepage
│   │   ├── AboutPage.tsx        # About Page
│   │   ├── EventsPage.tsx       # Events Page
│   │   ├── BlogPage.tsx         # Blog Page
│   │   ├── LoginPage.tsx        # Login Page
│   │   ├── RegisterPage.tsx     # Registration Page
│   │   └── AdminDashboard.tsx   # Admin Dashboard
│   └── types/                   # TypeScript Type Definitions
├── public/                      # Static Public Assets
├── media/                       # User Uploaded Media Files
└── README.md                    # Project README
```

## Backend Documentation

### Django Applications

#### 1. accounts
**Purpose**: Handles user authentication and authorization
**Models**: Extends Django's built-in User model
**Features**:
- Custom user registration
- JWT token management
- User profile management
- Role-based access control

#### 2. about
**Purpose**: Manages leadership and about page information
**Models**: Leadership
**Features**:
- Leadership profile management
- Position and department tracking
- Image upload for profiles
- Display ordering control

#### 3. blogs
**Purpose**: Blog post management system
**Models**: BlogPost
**Features**:
- Blog post creation and editing
- Category and tag management
- Publishing workflow
- Image support
- Read time estimation

#### 4. events
**Purpose**: Event management and attendee registration
**Models**: Event
**Features**:
- Event creation and management
- Attendee registration system
- Event categorization
- Capacity management
- Event status tracking

#### 5. gallery
**Purpose**: Image gallery management
**Models**: Gallery Image
**Features**:
- Image upload and storage
- Gallery organization
- Category-based filtering

### Django REST Framework Endpoints

#### Authentication Endpoints
```
POST /api/auth/register/     # User registration
POST /api/auth/login/        # User login
POST /api/auth/refresh/      # Token refresh
POST /api/auth/logout/       # User logout
```

#### About Endpoints
```
GET    /api/about/leadership/         # List all leadership
GET    /api/about/leadership/{id}/    # Get specific leadership
POST   /api/about/leadership/         # Create leadership
PUT    /api/about/leadership/{id}/    # Update leadership
DELETE /api/about/leadership/{id}/    # Delete leadership
```

#### Blog Endpoints
```
GET    /api/blogs/            # List all blog posts
GET    /api/blogs/{id}/       # Get specific blog post
POST   /api/blogs/            # Create blog post
PUT    /api/blogs/{id}/       # Update blog post
DELETE /api/blogs/{id}/       # Delete blog post
```

#### Event Endpoints
```
GET    /api/events/           # List all events
GET    /api/events/{id}/      # Get specific event
POST   /api/events/           # Create event
PUT    /api/events/{id}/      # Update event
DELETE /api/events/{id}/      # Delete event
POST   /api/events/{id}/attend/   # Register for event
DELETE /api/events/{id}/unattend/ # Unregister from event
```

### Database Configuration
- **Engine**: PostgreSQL
- **Database Name**: bitsa_db
- **Port**: 5432
- **Host**: localhost

### CORS Configuration
The backend is configured to accept requests from:
- http://localhost:3000
- http://localhost:5173 (Vite default)
- http://localhost:8080

## Frontend Documentation

### React Application Structure

#### Core Components

##### AuthContext
**Purpose**: Manages authentication state across the application
**Features**:
- User login/logout functionality
- JWT token management
- User profile updates
- Persistent authentication state

**Key Methods**:
- `login(credentials)`: Authenticates user with email/password
- `register(data)`: Registers new user account
- `logout()`: Clears user session
- `updateProfile(updates)`: Updates user profile information

#### Page Components

##### Home (Homepage)
- Hero section with call-to-action
- Featured events preview
- Recent blog posts
- Leadership highlights

##### AboutPage
- Leadership team display
- Organization information
- Contact details

##### EventsPage
- Event listing with filtering
- Event details view
- Registration functionality
- Calendar integration

##### BlogPage
- Blog post listing
- Category filtering
- Search functionality
- Individual post viewing

##### LoginPage & RegisterPage
- User authentication forms
- Form validation
- Error handling
- Redirect handling

##### AdminDashboard
- Content management interface
- User management
- Event management
- Blog post management

#### UI Components (shadcn/ui)
The application uses shadcn/ui components built on Radix UI:
- **Button**: Interactive buttons with variants
- **Card**: Content containers
- **Dialog**: Modal dialogs
- **Form**: Form components with validation
- **Input**: Text input fields
- **NavigationMenu**: Navigation components
- **Sheet**: Slide-out panels
- **Table**: Data tables
- **Tabs**: Tabbed interfaces

### State Management

#### Authentication State
Managed through React Context (`AuthContext`):
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

#### Data Fetching
Uses TanStack React Query for:
- API data caching
- Background updates
- Optimistic updates
- Error handling

### Routing
React Router DOM handles navigation:
```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/events" element={<EventsPage />} />
  <Route path="/blog" element={<BlogPage />} />
  <Route path="/blog/:id" element={<BlogPostPage />} />
  <Route path="/gallery" element={<GalleryPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/profile" element={<ProfilePage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## API Documentation

### Authentication

#### User Registration
```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "user@example.com",
  "email": "user@example.com",
  "password": "password123",
  "password_confirm": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response**:
```json
{
  "user": {
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_staff": false,
    "is_superuser": false
  },
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### User Login
```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "password123"
}
```

### Leadership Management

#### Create Leadership
```http
POST /api/about/leadership/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "John Doe",
  "position": "PRESIDENT",
  "department": "Computer Science",
  "student_id": "CS2021001",
  "leadership_type": "student",
  "is_active": true,
  "order": 1
}
```

#### List Leadership
```http
GET /api/about/leadership/
Authorization: Bearer {access_token} (optional for public access)
```

**Response**:
```json
[
  {
    "id": 1,
    "name": "Jane Smith",
    "position": "BITSA Chair",
    "department": "Administration",
    "leadership_type": "top",
    "is_active": true,
    "order": 1,
    "image_url": "/media/leadership/jane.jpg"
  }
]
```

### Event Management

#### Create Event
```http
POST /api/events/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "Annual Tech Conference",
  "description": "Our annual technology conference featuring industry speakers",
  "location": "Main Auditorium",
  "category": "conference",
  "start_time": "2024-12-15T10:00:00Z",
  "end_time": "2024-12-15T18:00:00Z",
  "capacity": 500,
  "is_public": true
}
```

#### Register for Event
```http
POST /api/events/{id}/attend/
Authorization: Bearer {access_token}
```

### Blog Management

#### Create Blog Post
```http
POST /api/blogs/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "Getting Started with BITSA",
  "content": "Welcome to BITS Association...",
  "excerpt": "Learn about our association and how to get involved",
  "category": "General",
  "tags": "welcome, introduction, BITSA",
  "read_time": 5,
  "is_published": true
}
```

## Authentication System

### JWT Token Structure
The application uses JWT tokens for authentication:

#### Access Token
- **Lifetime**: 60 minutes
- **Purpose**: API requests authentication
- **Format**: Bearer token in Authorization header

#### Refresh Token
- **Lifetime**: 1 day
- **Purpose**: Renew access tokens
- **Usage**: Automatic token refresh on expiration

### Authentication Flow

1. **Registration**: User creates account → Receives tokens → Auto-login
2. **Login**: User provides credentials → Backend validates → Returns tokens
3. **API Requests**: Include access token in Authorization header
4. **Token Refresh**: Automatic refresh on 401 responses
5. **Logout**: Clear tokens from storage

### Role-Based Access Control

#### User Roles
- **Student**: Basic member access
- **Admin**: Administrative privileges
- **Superuser**: Full system access

#### Permission Matrix
| Feature | Student | Admin | Superuser |
|---------|---------|-------|-----------|
| View Content | ✓ | ✓ | ✓ |
| Register Events | ✓ | ✓ | ✓ |
| Create Blog Posts | ✗ | ✓ | ✓ |
| Manage Users | ✗ | ✓ | ✓ |
| Manage Leadership | ✗ | ✓ | ✓ |
| System Configuration | ✗ | ✗ | ✓ |

## Database Models

### Leadership Model
```python
class Leadership(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES)
    department = models.CharField(max_length=100, blank=True)
    student_id = models.CharField(max_length=20, blank=True)
    image = models.ImageField(upload_to='leadership/', blank=True, null=True)
    leadership_type = models.CharField(max_length=10, choices=LEADERSHIP_TYPE_CHOICES)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**Fields**:
- `name`: Full name of the leader
- `position`: Leadership position (static choices)
- `department`: Associated department/organization
- `student_id`: Student ID for student leaders
- `image`: Profile photo upload
- `leadership_type`: "top" or "student"
- `is_active`: Visibility control
- `order`: Display ordering

### Event Model
```python
class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=50, default='hackathon')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    is_public = models.BooleanField(default=True)
    capacity = models.PositiveIntegerField(null=True, blank=True)
    attendees = models.ManyToManyField(User, blank=True, related_name='events_attending')
    image = models.ImageField(upload_to='events/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

**Key Features**:
- **Status Tracking**: Automatic status calculation (upcoming/ongoing/completed)
- **Capacity Management**: Prevents overbooking
- **Attendee Management**: Many-to-many relationship with users
- **Category System**: Event categorization

### BlogPost Model
```python
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    excerpt = models.TextField(blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=100, default="General")
    tags = models.CharField(max_length=500, blank=True)
    read_time = models.PositiveIntegerField(default=5)
    is_published = models.BooleanField(default=False)
    image = models.ImageField(upload_to='blogs/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
```

**Features**:
- **Publishing Workflow**: Draft and published states
- **Metadata**: Read time estimation, categories, tags
- **Auto-timestamps**: Automatic created/updated tracking
- **Image Support**: Featured image uploads

## Components Overview

### Layout Components

#### Navbar
- Responsive navigation with mobile menu
- Dynamic menu items based on authentication status
- Active route highlighting
- User profile dropdown

#### Footer
- Site links and contact information
- Social media links
- Copyright and legal information

#### Hero
- Eye-catching banner section
- Call-to-action buttons
- Background imagery
- Responsive design

### Content Components

#### About
- Leadership team grid display
- Organization information
- Contact details
- Interactive leadership profiles

#### Events
- Event card grid layout
- Filtering by category and status
- Search functionality
- Registration buttons

#### Blog
- Blog post grid with excerpts
- Category and tag filtering
- Search functionality
- Pagination support

#### Gallery
- Image grid with lightbox
- Category filtering
- Responsive image loading
- Upload functionality (admin)

### UI Components

#### Forms
- Login and registration forms
- Form validation with Zod
- Error handling and display
- Loading states

#### Cards
- Reusable content cards
- Event cards with registration
- Blog post cards with metadata
- Leadership profile cards

#### Modals
- Image lightbox
- Confirmation dialogs
- Form overlays
- Detail views

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL 12+
- Git

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd bitsa-backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Database setup**:
   ```bash
   # Create PostgreSQL database
   createdb bitsa_db
   
   # Run migrations
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser**:
   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to project root**:
   ```bash
   cd ..
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

### Environment Configuration

#### Backend (.env)
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=postgres://postgres:12345678@localhost:5432/bitsa_db
ALLOWED_HOSTS=localhost,127.0.0.1
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=BITSA
```

### Development Tools

#### Code Quality
```bash
# Lint frontend code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

#### Testing
```bash
# Run backend tests
python manage.py test

# Run frontend tests
npm test
```

## Deployment

### Backend Deployment

#### Production Settings
Update `settings.py` for production:
```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# Security settings
SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Static files
STATIC_ROOT = '/var/www/bitsa/static/'
MEDIA_ROOT = '/var/www/bitsa/media/'
```

#### Deployment Options

1. **Django + Gunicorn + Nginx**
   ```bash
   # Install Gunicorn
   pip install gunicorn
   
   # Start Gunicorn
   gunicorn bitsa_project.wsgi:application --bind 0.0.0.0:8000
   ```

2. **Docker Deployment**
   ```dockerfile
   FROM python:3.11-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
   ```

### Frontend Deployment

#### Build for Production
```bash
npm run build
```

#### Static File Hosting
- **Netlify**: Drag and drop build folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Upload build files to S3 bucket
- **GitHub Pages**: Deploy from GitHub Actions

#### Environment Variables
Set production environment variables:
```env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=BITSA
```

### Database Deployment

#### PostgreSQL Setup
```bash
# Create production database
createdb bitsa_production

# Run migrations
python manage.py migrate --settings=bitsa_project.settings.production

# Collect static files
python manage.py collectstatic
```

#### Backup Strategy
```bash
# Database backup
pg_dump bitsa_production > backup.sql

# Media files backup
tar -czf media_backup.tar.gz media/
```

### Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **HTTPS**: Use SSL certificates for production
3. **CORS**: Restrict allowed origins in production
4. **Database**: Use connection pooling and secure credentials
5. **File Uploads**: Validate file types and sizes
6. **Authentication**: Use strong passwords and 2FA where possible

### Monitoring and Maintenance

1. **Logging**: Configure proper logging levels
2. **Error Tracking**: Set up error monitoring (Sentry, etc.)
3. **Performance**: Monitor response times and database queries
4. **Updates**: Regular security updates for dependencies
5. **Backups**: Automated daily database backups

### Scaling Considerations

1. **Database**: Consider read replicas for read-heavy workloads
2. **Caching**: Implement Redis or Memcached for session storage
3. **CDN**: Use CDN for static file delivery
4. **Load Balancing**: Multiple application server instances
5. **Monitoring**: Set up application and infrastructure monitoring

---

## Additional Resources

### Documentation Links
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

### Support and Contact
For technical support or questions about the BITSA website, please contact the development team or create an issue in the project repository.

---

*Last updated: November 2024*
*Version: 1.0.0*
