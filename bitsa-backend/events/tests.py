from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Event
from django.utils import timezone
from datetime import timedelta
from rest_framework.test import APIClient
from rest_framework import status

class EventModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='u1', password='pass')
        self.event = Event.objects.create(
            title='Test Event',
            description='Desc',
            organizer=self.user,
            start_time=timezone.now() + timedelta(days=1),
            is_public=True
        )

    def test_attendees_count_property(self):
        self.assertEqual(self.event.attendees_count, 0)

    def test_str(self):
        self.assertEqual(str(self.event), 'Test Event')

class EventViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.organizer = User.objects.create_user(username='organizer', password='pass')
        self.staff_user = User.objects.create_user(username='staff', password='pass', is_staff=True)
        self.regular_user = User.objects.create_user(username='regular', password='pass')
        self.event = Event.objects.create(
            title='Test Event',
            description='Desc',
            organizer=self.organizer,
            start_time=timezone.now() + timedelta(days=1),
            capacity=2,
            is_public=True
        )
        self.rsvp_url = f'/events/{self.event.id}/rsvp/'
        self.attendees_url = f'/events/{self.event.id}/attendees/'
        self.publish_url = f'/events/{self.event.id}/publish/'
        self.unpublish_url = f'/events/{self.event.id}/unpublish/'

    def test_rsvp_toggle_authenticated_user(self):
        self.client.login(username='regular', password='pass')
        # RSVP add
        response = self.client.post(self.rsvp_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('added', response.data['status'])
        # RSVP remove
        response = self.client.post(self.rsvp_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('removed', response.data['status'])
        self.client.logout()

    def test_rsvp_forbidden_for_staff(self):
        self.client.login(username='staff', password='pass')
        response = self.client.post(self.rsvp_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.logout()

    def test_rsvp_unauthenticated(self):
        response = self.client.post(self.rsvp_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_rsvp_fails_when_event_full(self):
        self.client.login(username='regular', password='pass')
        # Fill the event capacity
        self.event.attendees.add(self.organizer)
        self.event.attendees.add(User.objects.create_user(username='user2', password='pass'))
        self.event.save()
        response = self.client.post(self.rsvp_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Event is full', response.data['error'])
        self.client.logout()

    def test_attendees_list_admin_only(self):
        # Login as admin/staff
        self.client.login(username='staff', password='pass')
        response = self.client.get(self.attendees_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

        # Login as non-admin
        self.client.login(username='regular', password='pass')
        response = self.client.get(self.attendees_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.logout()

    def test_publish_unpublish_restricted_to_staff(self):
        # Non-staff user trying to publish
        self.client.login(username='regular', password='pass')
        response = self.client.patch(self.publish_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        response = self.client.patch(self.unpublish_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.client.logout()

        # Staff user can publish/unpublish
        self.client.login(username='staff', password='pass')
        response = self.client.patch(self.publish_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.patch(self.unpublish_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()
