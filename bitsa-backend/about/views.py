
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Leadership
from .serializers import LeadershipSerializer, LeadershipListSerializer


class LeadershipViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing BITSA leadership information
    
    GET /api/leadership/ - List all active leadership
    GET /api/leadership/?type=top - List only top leadership
    GET /api/leadership/?type=student - List only student leadership
    POST /api/leadership/ - Create new leader (admin only)
    PUT /api/leadership/{id}/ - Update leader (admin only)
    DELETE /api/leadership/{id}/ - Delete leader (admin only)
    """
    

    queryset = Leadership.objects.filter(is_active=True).order_by('leadership_type', 'order', 'name')
    permission_classes = [AllowAny]  # Allow public read access
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return LeadershipListSerializer
        return LeadershipSerializer
    
    def get_queryset(self):
        """Custom queryset with filtering options"""
        queryset = super().get_queryset()
        
        # Filter by leadership type if specified
        leadership_type = self.request.query_params.get('type')
        if leadership_type in ['top', 'student']:
            queryset = queryset.filter(leadership_type=leadership_type)
        
        return queryset
    
    def get_permissions(self):
        """Set permissions based on action"""
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only authenticated users can modify
            permission_classes = [IsAuthenticated]
        else:
            # Anyone can read
            permission_classes = [AllowAny]
        
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def positions(self, request):
        """
        Get list of available positions
        GET /api/leadership/positions/
        """
        positions = dict(Leadership.POSITION_CHOICES)
        return Response(positions)
    
    @action(detail=False, methods=['get'])
    def types(self, request):
        """
        Get list of leadership types
        GET /api/leadership/types/
        """
        types = dict(Leadership.LEADERSHIP_TYPE_CHOICES)
        return Response(types)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get leadership statistics
        GET /api/leadership/stats/
        """
        total_leaders = Leadership.objects.filter(is_active=True).count()
        top_leaders = Leadership.objects.filter(is_active=True, leadership_type='top').count()
        student_leaders = Leadership.objects.filter(is_active=True, leadership_type='student').count()
        
        stats = {
            'total_leaders': total_leaders,
            'top_leaders': top_leaders,
            'student_leaders': student_leaders,
        }
        
        return Response(stats)
    
    def create(self, request, *args, **kwargs):
        """Create new leader with validation"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        # Return the created leader
        created_serializer = LeadershipSerializer(serializer.instance, context={'request': request})
        return Response(created_serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        """Update leader with validation"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Return the updated leader
        updated_serializer = LeadershipSerializer(instance, context={'request': request})
        return Response(updated_serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        """Soft delete by setting is_active to False"""
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        
        return Response(
            {'message': 'Leadership entry deactivated successfully'},
            status=status.HTTP_200_OK
        )
