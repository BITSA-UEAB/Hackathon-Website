
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from blogs.models import BlogPost
from events.models import Event
from gallery.models import Photo
from .serializers import RegisterSerializer, UserSerializer, CustomTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def stats(request):
    """
    Get general stats for the platform
    """
    # Active members: count of all users
    active_members = User.objects.count()

    # Annual events: count of events in the current year
    from django.utils import timezone
    current_year = timezone.now().year
    annual_events = Event.objects.filter(start_time__year=current_year).count()

    # Projects: count of published blog posts (assuming projects are documented as blog posts)
    projects = BlogPost.objects.filter(is_published=True).count()

    return Response({
        'active_members': active_members,
        'annual_events': annual_events,
        'projects': projects
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        # Generate tokens for the new user
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'User registered successfully',
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom token obtain pair view using CustomTokenObtainPairSerializer
    """
    serializer_class = CustomTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_users(request):
    """
    Get all users (admin only)
    """
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def add_user(request):
    """
    Add a new user (admin only)
    """
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User added successfully',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated, IsAdminUser])
def toggle_user_block(request, user_id):
    """
    Toggle user block status (admin only)
    """
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.is_active = not user.is_active
    user.save()
    return Response({
        'message': f'User {"unblocked" if user.is_active else "blocked"} successfully',
        'user': UserSerializer(user).data
    })
