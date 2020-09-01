from rest_framework import serializers

from assets.models import Zone_Assets
from duty.models import Duty_List


class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone_Assets
        fields = ('id', 'zone_name')

class DutySerializer(serializers.ModelSerializer):
    class Meta:
        model = Duty_List
        fields = ('id','title','start','order')