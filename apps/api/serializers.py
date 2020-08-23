from rest_framework import serializers

from assets.models import Zone_Assets


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone_Assets
        fields = ('id', 'zone_name')