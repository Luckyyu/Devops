from rest_framework import serializers

from assets.models import Zone_Assets,IDC_Assets
from duty.models import Duty_List


class DutySerializer(serializers.ModelSerializer):
    class Meta:
        model = Duty_List
        fields = ('id','title','start','order')

class IdcSerializer(serializers.ModelSerializer):
    zone_name = serializers.CharField(source='zone.zone_name', read_only=True)
    class Meta:
        model = IDC_Assets
        fields = ('id','zone_name','idc_name','idc_bandwidth','idc_contact','idc_phone','idc_network','idc_address','idc_desc')

    def create(self,  validated_data):
        return IDC_Assets.objects.create(zone=self.context["zone"], **validated_data)

class ZoneSerializer(serializers.ModelSerializer):
    idc_assets = IdcSerializer(many=True,read_only=True,required=False)
    class Meta:
        model = Zone_Assets
        fields = ('id', 'zone_name','idc_assets')