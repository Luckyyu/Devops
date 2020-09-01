from rest_framework.decorators import api_view
from api import serializers
from duty.models import Duty_List
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def cal(request,format=None):
    if request.method == "GET":
        dutys = Duty_List.objects.all()
        serializer = serializers.DutySerializer(dutys,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    elif request.method == 'POST':
        event1 = {"title":request.data["name"],"start":request.data["start"],"order":1}
        event2 = {"title": request.data["phone"], "start": request.data["start"], "order": 2}
        serializer1 = serializers.DutySerializer(data=event1)
        serializer2 = serializers.DutySerializer(data=event2)
        if serializer1.is_valid() and serializer2.is_valid():
            serializer1.save()
            serializer2.save()
            return Response(serializer1.data, status=status.HTTP_201_CREATED)
        return Response(serializer1.errors, status=status.HTTP_400_BAD_REQUEST)