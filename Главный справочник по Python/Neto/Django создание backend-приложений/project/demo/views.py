import datetime
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse

# Create your views here.

def hello (request):
    return HttpResponse("Hello, world")
def time (request):
    return HttpResponse("Current time: ", datetime.datetime.now())


def index(request):
    return HttpResponse(f"<a href='{reverse('main')}'>Главная страница</a>")