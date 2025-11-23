from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django.utils import timezone
from .models import Event
from .serializers import EventSerializer
from accounts.serializers import UserSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

class IsOrganizerOrAdmin(permissions.BasePermission):
    """
    Allow safe methods to all. Allow modifications only to the organizer or staff.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.organizer == request.user or request.user.is_staff

@method_decorator(csrf_exempt, name='dispatch')
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        elif self.action == 'rsvp':
            return [permissions.IsAuthenticated()]
        elif self.action == 'my_events':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAuthenticated(), IsOrganizerOrAdmin()]

    @action(detail=False, methods=['get'], url_path='my-events', permission_classes=[permissions.IsAuthenticated])
    def my_events(self, request):
        """
        List events the authenticated user has RSVP'd to.
        """
        user = request.user
        events = Event.objects.filter(attendees=user).order_by('-start_time')
        page = self.paginate_queryset(events)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    def get_queryset(self):
        qs = Event.objects.all()
        # Visibility: all events for everyone (for viewing purposes)

        # Filters
        organizer = self.request.query_params.get('organizer')
        if organizer:
            qs = qs.filter(organizer__id=organizer)
        search = self.request.query_params.get('search')
        if search:
            qs = qs.filter(
                models.Q(title__icontains=search) |
                models.Q(description__icontains=search) |
                models.Q(location__icontains=search)
            )
        upcoming = self.request.query_params.get('upcoming')
        if upcoming and upcoming.lower() in ['1', 'true', 'yes']:
            qs = qs.filter(start_time__gte=timezone.now())

        return qs.order_by('-start_time')

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def rsvp(self, request, pk=None):
        """
        Toggle RSVP for the authenticated user.
        If capacity is set and full, return 400 when trying to join.
        Does NOT allow admin to RSVP.
        """
        # Enhanced logging for debugging RSVP 403 issues
        import logging
        logger = logging.getLogger(__name__)
        logger.debug(f"RSVP called: user={request.user}, is_authenticated={request.user.is_authenticated}, is_staff={request.user.is_staff}, method={request.method}, path={request.path}")

        if not request.user.is_authenticated:
            logger.warning(f"RSVP denied: unauthenticated access attempt. Headers: {dict(request.headers)}")
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        if request.user.is_staff:
            logger.info(f"RSVP forbidden for staff user: {request.user}")
            return Response({'error': 'Admins cannot confirm attendance.'}, status=status.HTTP_403_FORBIDDEN)

        event = self.get_object()
        user = request.user

        if user in event.attendees.all():
            logger.debug(f"RSVP removing user {user} from attendees of event {event.id}")
            event.attendees.remove(user)
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)

        if event.capacity is not None and event.attendees_count >= event.capacity:
            logger.debug(f"RSVP attempt failed: event {event.id} is full")
            return Response({'error': 'Event is full'}, status=status.HTTP_400_BAD_REQUEST)

        logger.debug(f"RSVP adding user {user} to attendees of event {event.id}")
        event.attendees.add(user)
        return Response({'status': 'added'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAdminUser])
    def attendees(self, request, pk=None):
        """
        List attendees of the event (admin-only).
        """
        event = self.get_object()
        attendees = event.attendees.all()
        serializer = UserSerializer(attendees, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def publish(self, request, pk=None):
        """Admin-only: make an event public"""
        if not request.user.is_staff:
            return Response({'error': 'Only admins can publish events'}, status=status.HTTP_403_FORBIDDEN)
        event = self.get_object()
        event.is_public = True
        event.save()
        return Response(self.get_serializer(event).data)

    @action(detail=True, methods=['patch'])
    def unpublish(self, request, pk=None):
        """Admin-only: make an event private"""
        if not request.user.is_staff:
            return Response({'error': 'Only admins can unpublish events'}, status=status.HTTP_403_FORBIDDEN)
        event = self.get_object()
        event.is_public = False
        event.save()
        return Response(self.get_serializer(event).data)
