from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from dao.duty import DutyBase
from django.shortcuts import render
import time

# Create your views here.

class pro_duty(LoginRequiredMixin,DutyBase,View):
    login_url = '/login/'
    def get(self,request,*args,**kwargs):
        return render(request,"duty/duty.html",{"user":request.user,"data":self.duty(),"nowday":time.strftime('%Y-%m-%d',time.localtime())})

class duty(LoginRequiredMixin,DutyBase,View):
    login_url = '/login/'
    def get(self,request,*args,**kwargs):

        return render(request,'duty/calv1.html',{"user":request.user,"data":self.duty(),"nowday":time.strftime('%Y-%m-%d',time.localtime())})