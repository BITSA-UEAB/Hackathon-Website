from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LeadershipViewSet

# Create router and register viewsets
router = DefaultRouter()
router.register(r'leadership', LeadershipViewSet, basename='leadership')

app_name = 'about'

urlpatterns = [
    # API endpoints will be registered via the router
    path('api/', include(router.urls)),
]
