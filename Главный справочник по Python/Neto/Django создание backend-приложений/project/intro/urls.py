"""
URL configuration for intro project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
import debug_toolbar
from django.contrib import admin
from django.urls import include, path

from demo import converters
from demo.views import AdvViewSet, CommentViewSet, DemoView, MessageViewSet, WeaponView, create_car,list_car, create_person,list_person,hello,time, index, hello_view,hi,sumFn, r_view, pagi, list_orders
from django.urls import register_converter
from rest_framework.routers import DefaultRouter

register_converter(converters.DateConverter, 'dateCustom')

r = DefaultRouter()
r.register("adv", AdvViewSet, basename="adv")
r.register("comments", CommentViewSet, basename="comment")
r.register("messages", MessageViewSet, basename="message")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("hello/", hello, name="hello"),
    path("current-time/", time, name="time"),
    path("", index, name="main"),
    path("message/", hello_view, name="hello_view"),
    path("hi/", hi, name="hi"),
    path("sum/<int:op1>/<int:op2>/", sumFn, name="sum"),
    path("pagi/", pagi),
    # path("date/<dateCustom: date>/", r_view, name="r_view")
    
    path("new_car/", create_car, name="create_car"),
    path("cars/", list_car, name="list_car"),
    path("new_person/", create_person, name="new_person"),
    path("persons/", list_person, name="list_persons"),
    path("orders/", list_orders, name="list_orders"),
    path('__debug__/', include(debug_toolbar.urls)),
    #---------------------------------------------------
    path("demo/", DemoView.as_view()),
    path('weapon/<pk>/', WeaponView.as_view()),
    #---------------------------------------------------
] + r.urls
