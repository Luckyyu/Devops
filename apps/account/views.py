# _#_ coding:utf-8 _*_

from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views.generic import View

# Create your views here.


class UserManage(LoginRequiredMixin,View):
    login_url = '/login/'
    def get(self,request,*args,**kwargs):
        return render(request,'account/user_center.html',{"user":request.user})
