from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.shortcuts import render
from dao.assets import AssetsBase

# Create your views here.

class Config(LoginRequiredMixin,AssetsBase,View):
    login_url = '/login/'
    def get(self,request,*args,**kwargs):
        return render(request,'assets/assets_config.html',{"user":request.user,"assets":self.base()})
