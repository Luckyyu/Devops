"""devops URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url,include
from devops.views import index
from django.conf.urls import handler404, handler403


urlpatterns = [
    url('admin/', admin.site.urls),
    url('^$',index.Index.as_view()),
    url('^login/$',index.login),
    url('^logout/$',index.logout),
    url('^api/',include('api.urls')),
    url('^assets/',include('assets.urls')),
    url('^account/',include('account.urls')),
    url('^duty/',include('duty.urls')),
]

handler404 = index.PageError.as_view()
handler403 = index.Permission.as_view()