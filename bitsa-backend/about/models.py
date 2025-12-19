
from django.db import models
from django.core.validators import FileExtensionValidator


class Leadership(models.Model):
    """Model for managing BITSA leadership information"""
    
    # Leadership type choices
    LEADERSHIP_TYPE_CHOICES = [
        ('top', 'Top Leadership'),
        ('student', 'Student Leadership'),
    ]
    
    # Position choices (static titles)
    POSITION_CHOICES = [
        # Top Leadership
        ('BITSA Chair', 'BITSA Chair'),
        ('BITSA Patron', 'BITSA Patron'),
        
        # Student Leadership
        ('PRESIDENT', 'PRESIDENT'),
        ('VICE PRESIDENT', 'VICE PRESIDENT'),
        ('TREASURER', 'TREASURER'),
        ('SECRETARY', 'SECRETARY'),
        ('CHAPLAIN', 'CHAPLAIN'),
        ('NETWORKING REPRESENTATIVE', 'NETWORKING REPRESENTATIVE'),
        ('SOFTWARE ENGINEERING REPRESENTATIVE', 'SOFTWARE ENGINEERING REPRESENTATIVE'),
        ('BBIT REPRESENTATIVE', 'BBIT REPRESENTATIVE'),
        ('PUBLIC RELATION OFFICER', 'PUBLIC RELATION OFFICER'),
    ]
    
    # Fields
    name = models.CharField(max_length=100, help_text="Full name of the leader")
    position = models.CharField(
        max_length=50, 
        choices=POSITION_CHOICES,
        help_text="Leadership position (static title)"
    )
    department = models.CharField(
        max_length=100, 
        blank=True, 
        help_text="Department or organization"
    )
    student_id = models.CharField(
        max_length=20, 
        blank=True, 
        help_text="Student ID (for student leaders)"
    )
    image = models.ImageField(
        upload_to='leadership/', 
        blank=True, 
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'webp'])],
        help_text="Profile image"
    )
    leadership_type = models.CharField(
        max_length=10, 
        choices=LEADERSHIP_TYPE_CHOICES,
        help_text="Type of leadership"
    )
    is_active = models.BooleanField(
        default=True, 
        help_text="Whether this leader should be displayed"
    )
    order = models.PositiveIntegerField(
        default=0, 
        help_text="Display order (lower numbers appear first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['leadership_type', 'order', 'name']
        verbose_name = 'Leadership'
        verbose_name_plural = 'Leadership'
        
    def __str__(self):
        return f"{self.name} - {self.position}"
    
    @property
    def image_url(self):
        """Return the image URL or default placeholder"""
        if self.image:
            return self.image.url
        return None
