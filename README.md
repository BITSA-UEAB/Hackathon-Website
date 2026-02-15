# BITSA Website

BITSA (BITS Africa) is a comprehensive full-stack web platform designed to serve as a hub for IT students and tech enthusiasts. The platform provides a collaborative environment for learning, networking, and professional development in the technology sector.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn-ui components
- **State Management**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives with shadcn-ui
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Framework**: Django 5.2.6
- **API**: Django REST Framework
- **Authentication**: JWT (Simple JWT)
- **Database**: PostgreSQL
- **CORS**: django-cors-headers

## Features.

- User Authentication (Registration, Login, Profile Management)
- Admin Dashboard
- Events Management (Create, Update, Delete Events)
- Blog System (Create, Read, Update, Delete Blog Posts)
- Image Gallery
- About Section
- Responsive Design
- Interactive UI Components

## Project Structure

```
hackathon-website/
├── src/                          # Frontend source code
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # shadcn-ui components
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   └── ScrollToTop.tsx
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                      # Utility functions
│   │   └── utils.ts
│   ├── pages/                    # Page components
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   └── AboutPage.tsx
│   │   ├── Auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── Blogs/
│   │   │   ├── Blog.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   └── BlogPostPage.tsx
│   │   ├── contact/
│   │   │   ├── Contact.tsx
│   │   │   └── ContactPage.tsx
│   │   ├── Events/
│   │   │   ├── Events.tsx
│   │   │   └── EventsPage.tsx
│   │   ├── Gallery/
│   │   │   ├── Gallery.tsx
│   │   │   └── GalleryPage.tsx
│   │   ├── home/
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── Home.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── bitsa-backend/                # Django backend
│   ├── bitsa_project/            # Main Django project
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── accounts/                 # User accounts app
│   ├── events/                   # Events management app
│   ├── blogs/                    # Blog system app
│   ├── gallery/                  # Gallery app
│   ├── about/                    # About section app
│   └── media/                    # Media files
├── public/                       # Static assets
├── index.html
├── package.json                  # Frontend dependencies
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup

```bash
# Navigate to backend directory
cd bitsa-backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# Or on macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt pillow

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
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

## Environment Variables

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api
```

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

