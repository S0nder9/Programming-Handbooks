import datetime
import random
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import reverse

from demo.models import Car, Order, Person
from demo.permissions import IsOwner
from demo.serializers import AdvSerializer, CommentSerializer, MessageSerializer, WeaponSerializer
from intro import settings
from django.core.paginator import Paginator
# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Adv, Weapon
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.viewsets import ViewSet, ModelViewSet
from .models import Comment
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import AnonRateThrottle
from .models import Message

def hello (request):
    return HttpResponse("Hello, world")
def time (request):
    return HttpResponse("Current time: ", datetime.datetime.now())

def index(request):
    return HttpResponse(f"<a href='{reverse('main')}'>Главная страница</a>")

def hello_view (request):
    msg = f"Hi! Свяжись с админом: {settings.ADMIN_EMAIL}"
    return HttpResponse(msg)

def hi (request):
    name = request.GET.get("name", "Anonymous")
    age = int(request.GET.get("age", 20))
    context = {"name": name, "age": age, "data": [1, 2, 10], "val": "hello" } # переменные, доступные в шаблоне
    return render(request, "demo.html", context)

def sumFn(request, op1, op2):
    res = op1 + op2
    return HttpResponse(f"Sum: {res}")

def r_view(request, year, month, day):
    return HttpResponse(f"Date: {year}-{month}-{day}")

CONTENT = [str(i) for i in range(1, 10_001)]
def pagi (request):
    page_number = request.GET.get("page", 1)
    paginator = Paginator(CONTENT, 10)
    page = paginator.get_page(page_number)
    context = {
        "paginator": paginator,
        "page": page
    }
    return render(request, "pagi.html", context )


def create_car(request):
    car = Car(brand=random.choice(['B1', 'B2', 'B3']), model=random.choice(['M1', 'M2', 'M3']), color=random.choice(['C1', 'C2', 'C3']))
    res = car.save()
    
    return HttpResponse(f"Car created: {car.brand} {car.model} {car.color}")

def list_car(request):
    # car_objects = Car.objects.all()
    # car_objects = Car.objects.filter(brand = 'B1')
    # car_objects = Car.objects.filter(brand__contains = '2')
    car_objects = Car.objects.all()
    
    cars = [f"{c.id} {c.brand} {c.model} {c.color} | {c.owners.count()}" for c in car_objects]
    return HttpResponse("<br>".join(cars))

def create_person(request):
    cars = Car.objects.all()
    
    for car in cars:
        Person(name=f"Person {car.id}", car=car).save()
        # Person.objects.create(name=f"Person {car.id}", car=car) # то же самое
    return HttpResponse("Person created")

def list_person(request):
    person_objects = Person.objects.all()
    persons = [f"{p.id} {p.name} {p.car.brand} {p.car.model} {p.car.color}" for p in person_objects]
    return HttpResponse("<br>".join(persons))

def list_orders(request):
    orders = Order.objects.filter(positions__product__price__lte=600)
    context = {"orders": orders}
    return render(request, "orders.html", context)


# ----------------------------------------- 

# @api_view(["GET", "POST"])
# def demo(request):
#     if request.method == "GET":
#         weapons = Weapon.objects.all()
#         ser= WeaponSerializer(weapons, many=True)
        
#     if request.method == "POST":
#         return Response("POST")
#     return Response(ser.data)


class DemoView(APIView):
    def get(self, request):
        weapons = Weapon.objects.all()
        ser= WeaponSerializer(weapons, many=True)
        return Response(ser.data)
    def  post(self, request):
        return Response("POST")
    

class DemoView(ListAPIView):
    queryset = Weapon.objects.all() # откуда берем данные
    serializer_class = WeaponSerializer # класс сериализации
    
    def post(self, request):
        return Response("POST")
    
class WeaponView(RetrieveAPIView):
    queryset = Weapon.objects.all()
    serializer_class = WeaponSerializer
    
#-----------------------------------------------

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ["user"]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["text"]
    ordering_fields = ["id", "user", "text", "created_at"]
    pagination_class = LimitOffsetPagination
    
#-----------------------------------------------

class AdvViewSet(ModelViewSet):
    queryset = Adv.objects.all()
    serializer_class = AdvSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    throttle_classes = [AnonRateThrottle]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

#-----------------------------------------------

class MessageViewSet(ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

#-----------------------------------------------