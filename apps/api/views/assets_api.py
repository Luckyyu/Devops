from rest_framework.decorators import api_view
from rest_framework.response import Response

from api import serializers
from rest_framework import status
from assets.models import Zone_Assets


@api_view(['GET','POST'])
def zone_list(request,fromate=None):
    """
    list all zone,orcreate a zone
    """
    if request.method == 'GET':
        snippets = Zone_Assets.objects.get(id=1)
        serializer = serializers.ZoneSerializer(snippets)
        print(serializer.data)
        return Response(serializer.data,status=status.HTTP_200_OK)

    elif request.method =='POST':
        serializer = serializers.ZoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
