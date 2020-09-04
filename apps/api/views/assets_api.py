from rest_framework.decorators import api_view
from rest_framework.response import Response

from api import serializers
from rest_framework import status
from assets.models import Zone_Assets,IDC_Assets


@api_view(['GET','POST'])
def zone_list(request,formate=None):
    """
    list all zone,orcreate a zone
    """
    if request.method == 'GET':
        # snippets = Zone_Assets.objects.get(id=1)
        # serializer = serializers.ZoneSerializer(snippets)
        snippets = Zone_Assets.objects.all()
        serializer = serializers.ZoneSerializer(snippets,many=True)
        print(serializer.data)
        return Response(serializer.data,status=status.HTTP_200_OK)

    elif request.method =='POST':
        serializer = serializers.ZoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def idc_list(request,formate=None):
    """
        list all idc,orcreate a idc
        """
    if request.method == "GET":
        snippets = IDC_Assets.objects.all()
        serializer = serializers.IdcSerializer(snippets,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "POST":
        print(request.data)
        try:
            zone = Zone_Assets.objects.get(id=request.data["zone"])
        except Exception as ex:
            return Response(ex, status=status.HTTP_400_BAD_REQUEST)

        serializer = serializers.IdcSerializer(data=request.data, context={"zone": zone})
        print(serializer)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

