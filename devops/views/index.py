# _#_ coding:utf-8 _*_

from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect,JsonResponse
from django.shortcuts import render
from django.views.generic import View
from django.contrib import auth

class Index(LoginRequiredMixin,View):
    login_url = '/login/'
    def get(self,request,*args,**kwagrs):
        return render(request,"index.html",{"user":request.user})

def login(request):
        if request.session.get('username') is not None:
            return HttpResponseRedirect('/',{"user":request.user})
        else:
            username = request.POST.get('username')
            password = request.POST.get('password')
            user = auth.authenticate(username=username, password=password)
            if user and user.is_active:
                auth.login(request, user)
                request.session['username'] = username
                return HttpResponseRedirect('/', {"user": request.user})
            else:
                if request.method == "POST":
                    return render(request, 'login.html', {"login_error_info": "用户名或者密码错误", "username": username}, )
                else:
                    return render(request, 'login.html')
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/login')


class Permission(LoginRequiredMixin, View):
    login_url = '/login/'

    def get(self, request, *args, **kwagrs):
        return render(request, '403.html', {"user": request.user})



class PageError(LoginRequiredMixin,View):
    login_url = '/login/'

    def get(self,request,*args,**kwagrs):
        return render(request, '404.html', {"user": request.user})


