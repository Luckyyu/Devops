# _#_ coding:utf-8 _*_

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import View
from util.base import method_decorator_adaptor
from django.contrib.auth.decorators import permission_required
from django.http import JsonResponse,HttpResponseRedirect

# Create your views here.


class UserManage(LoginRequiredMixin,View):
    login_url = '/login/'

    @method_decorator_adaptor(permission_required, "asset.assets_read_user", "/403/")
    def get(self,request,*args,**kwargs):
        if request.GET.get('type'):
            res = self.allowcator(request.GET.get('type'), request)
            if isinstance(res, str): return JsonResponse({'msg': res, "code": 500, 'data': []})
            return JsonResponse({'msg': "查询成功", "code": 200, 'data': res})
        return render(request,'account/user_manage.html',{"user":request.user})
