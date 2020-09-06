from rest_framework.decorators import api_view
from rest_framework.response import Response

from api import serializers
from rest_framework import status
from assets.models import Zone_Assets,IDC_Assets,Idel_Assets


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

@api_view(['PUT','DELETE'])
def zone_detail(request,id,formate=None):
    '''
    update,delete zone
    :param request:
    :param id:
    :param formate:
    :return:
    '''
    try:
        snippet = Zone_Assets.objects.get(id=id)
    except Zone_Assets.DoesNotExits:
        return Response(sttus=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = serializers.ZoneSerializer(snippet,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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

@api_view(["PUT","DELETE"])
def idc_detail(request,id,format=None):
    '''
    update,delete idc
    :param request:
    :param id:
    :param format:
    :return:
    '''
    try:
        snippet = IDC_Assets.objects.get(id=id)
    except IDC_Assets.DoesNotExits:
        return Response(sttus=status.HTTP_404_NOT_FOUND)

    if request.method=='PUT':

        serializer = serializers.IdcSerializer(snippet,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    elif request.method=="DELETE":

        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def idel_list(request,formate=None):
    if request.method == 'GET':
        snippets = Idel_Assets.objects.all()
        serializer = serializers.IdelSerializer(snippets)
        return Response(serializer.data, status=status.HTTP_200_OK)


