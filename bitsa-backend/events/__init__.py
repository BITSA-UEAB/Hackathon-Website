from django.db import models
from django.conf import settings

class Event(models.Model):
    CATEGORY_CHOICES = [
        ("hackathon", "Hackathon"),
        ("workshop", "Workshop"),
        ("talk", "Talk"),
        ("meeting", "Meeting"),
        ("competition", "Competition"),
        ("other", "Other"),
    ]

    STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("ongoing", "Ongoing"),
        ("past", "Past"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=255, blank=True)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default="hackathon")
    status = models.CharField(max_length=16, choices=STATUS_CHOICES, default="upcoming")
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name="posted_events")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "-time"]

    def __str__(self):
        return f"{self.title} ({self.date})"