from rest_framework import serializers
from .models import Leadership


class LeadershipSerializer(serializers.ModelSerializer):
    """Serializer for BITSA Leadership model"""
    
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Leadership
        fields = [
            'id',
            'name',
            'position',
            'department',
            'student_id',
            'image',
            'image_url',
            'leadership_type',
            'is_active',
            'order',
            'created_at',
            'updated_at'
        ]
    
    def get_image_url(self, obj):
        """Get the full image URL or return None"""
        if obj.image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def validate(self, attrs):
        position = attrs.get('position')
        if position is None and self.instance is not None:
            position = self.instance.position

        if not position:
            return attrs

        queryset = Leadership.objects.filter(position=position, is_active=True)
        if self.instance is not None:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError({
                'position': f'{position} already exists. Delete the existing one first.'
            })

        return attrs


class LeadershipListSerializer(serializers.ModelSerializer):
    """Simplified serializer for list views"""
    
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Leadership
        fields = [
            'id',
            'name',
            'position',
            'student_id',
            'image_url',
        ]
    
    def get_image_url(self, obj):
        """Get the full image URL or return None"""
        if obj.image:
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
