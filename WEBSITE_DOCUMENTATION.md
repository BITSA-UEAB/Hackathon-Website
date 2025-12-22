# BITSA Website Documentation

## Overview

BITSA (BITS Africa) is a comprehensive full-stack web platform designed to serve as a hub for IT students and tech enthusiasts. The platform provides a collaborative environment for learning, networking, and professional development in the technology sector.

## Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn-ui components
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with shadcn-ui
- **Icons**: Lucide React

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework
- **Authentication**: JWT (Simple JWT)
- **Database**: PostgreSQL
- **CORS**: django-cors-headers
- **Media Management**: Django's built-in media handling

## Features

### Core Features
1. **User Authentication**
   - Registration and login
   - JWT-based authentication
   - Profile management
   - Admin dashboard

2. **Events Management**
   - Event creation and management
   - Event categories
   - Event registration
   - Event gallery

3. **Blog System**
   - Blog post creation and management
   - Rich media support (images)
   - Blog categories
   - Individual blog post pages

4. **Gallery**
   - Image gallery management
   - Media upload and storage
   - Gallery categorization

5. **About Section**
   - Organization information
   - Mission and vision
   - Contact details

### User Interface Features
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Interactive Components**: Animated sliders, hover effects, transitions
- **Real-time Statistics**: Dynamic counters for members, events, and projects
- **Navigation**: Smooth scrolling, active link highlighting
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Project Structure

```
hackathon-website-main/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn-ui components
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── Events.tsx
│   │   ├── Gallery.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   ├── pages/                    # Page components
│   │   ├── Home.tsx
│   │   ├── AboutPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── ProfilePage.tsx
│   │   └── ...
│   ├── types/                    # TypeScript type definitions
│   └── ...
├── bitsa-backend/                # Django backend
│   ├── bitsa_project/            # Main Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── ...
│   ├── accounts/                 # User accounts app
│   ├── events/                   # Events management app
│   ├── blogs/                    # Blog system app
│   ├── gallery/                  # Gallery app
│   ├── about/                    # About section app
│   └── media/                    # Media files
├── public/                       # Static assets
├── package.json                  # Frontend dependencies
└── README.md                     # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/auth/stats/` - Get platform statistics

### Events
- `GET /api/events/` - List all events
- `POST /api/events/` - Create new event (admin)
- `GET /api/events/{id}/` - Get event details
- `PUT /api/events/{id}/` - Update event (admin)
- `DELETE /api/events/{id}/` - Delete event (admin)

### Blogs
- `GET /api/blogs/` - List all blog posts
- `POST /api/blogs/` - Create new blog post (admin)
- `GET /api/blogs/{id}/` - Get blog post details
- `PUT /api/blogs/{id}/` - Update blog post (admin)
- `DELETE /api/blogs/{id}/` - Delete blog post (admin)

### Gallery
- `GET /api/gallery/` - List gallery images
- `POST /api/gallery/` - Upload new image (admin)
- `DELETE /api/gallery/{id}/` - Delete image (admin)

### About
- `GET /api/about/` - Get about information
- `PUT /api/about/` - Update about information (admin)

## Database Models

### Events App
```python
class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='events/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Blogs App
```python
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blogs/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

### Gallery App
```python
class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
```

### About App
```python
class About(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    mission = models.TextField()
    vision = models.TextField()
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    updated_at = models.DateTimeField(auto_now=True)
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL database

### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend directory
cd bitsa-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

### Database Configuration
Update `bitsa-backend/bitsa_project/settings.py` with your PostgreSQL credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'bitsa_db',
        'USER': 'your_username',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Deployment

### Frontend Deployment
The frontend can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment
The backend can be deployed to platforms like:
- Heroku
- DigitalOcean App Platform
- AWS EC2/ECS
- Google Cloud Run

### Environment Variables
Create `.env` files for both frontend and backend with necessary configuration:

**Frontend (.env)**
```
VITE_API_BASE_URL=https://your-backend-url.com/api
```

**Backend (.env)**
```
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@host:port/database
DEBUG=False
ALLOWED_HOSTS=your-domain.com
```

## Key Components

### Hero Component
The main landing section featuring:
- Animated image slider
- Real-time statistics display
- Feature highlights
- Call-to-action buttons
- Achievement showcase

### Authentication Context
Manages user authentication state across the application:
- Login/logout functionality
- JWT token management
- Protected routes
- User profile data

### Admin Dashboard
Administrative interface for content management:
- CRUD operations for events, blogs, gallery
- User management
- Analytics and statistics
- Content approval workflows

## Styling & Theming

### Design System
- **Primary Colors**: Blue variants (#3B82F6, #1D4ED8)
- **Secondary Colors**: Slate grays (#64748B, #475569)
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent spacing scale using Tailwind classes
- **Shadows**: Subtle shadows for depth and focus

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly interactive elements

## Performance Optimizations

### Frontend
- Code splitting with Vite
- Lazy loading of components
- Image optimization
- Bundle analysis and tree shaking

### Backend
- Database query optimization
- Caching strategies
- API rate limiting
- Media file compression

## Security Features

### Authentication & Authorization
- JWT token-based authentication
- Password hashing with Django's auth system
- Role-based access control
- CSRF protection

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- Secure file uploads

## Testing

### Frontend Testing
- Component testing with React Testing Library
- E2E testing with Playwright/Cypress
- Unit tests for utilities and hooks

### Backend Testing
- Django's test framework
- API endpoint testing
- Model and serializer testing
- Integration tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Email: contact@bitsafrica.com
- Documentation: [Internal Wiki]
- Issues: [GitHub Issues]

---

**Last Updated**: December 2025
**Version**: 1.0.0
**Maintainers**: BITSA Development Team

