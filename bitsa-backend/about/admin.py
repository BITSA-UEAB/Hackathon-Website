from django.contrib import admin
from .models import Leadership


@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    """Admin interface for managing BITSA leadership"""
    
    list_display = [
        'name', 
        'position', 
        'department', 
        'leadership_type', 
        'is_active', 
        'order',
        'created_at'
    ]
    
    list_filter = [
        'leadership_type', 
        'is_active', 
        'position',
        'created_at'
    ]
    
    search_fields = [
        'name', 
        'department', 
        'student_id',
        'position'
    ]
    
    ordering = ['leadership_type', 'order', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'position', 'leadership_type')
        }),
        ('Details', {
            'fields': ('department', 'student_id', 'order')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Settings', {
            'fields': ('is_active',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def get_queryset(self, request):
        """Custom queryset to show active leaders first"""
        qs = super().get_queryset(request)
        return qs.order_by('-is_active', 'leadership_type', 'order', 'name')
