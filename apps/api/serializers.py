from rest_framework import serializers

from assets.models import Zone_Assets,IDC_Assets,Idel_Assets
from duty.models import Duty_List
from rest_framework.pagination import CursorPagination

class PageConfig(CursorPagination):
    cursor_query_param = 'offset'
    page_size = 100
    ordering = '-id'
    page_size_query_param = None
    max_page_size = 200

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        pass

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

class IdelSerializer(serializers.ModelSerializer):
    idc_name = IdcSerializer(source='idc.idc_name',read_only=True)
    update_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    class Meta:
        model = Idel_Assets
        fields = ('id','idc_name','idle_name','idle_number','idle_user','idle_desc','update_time')

