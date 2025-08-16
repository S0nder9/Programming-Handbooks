from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.PositiveIntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    favorites = models.ManyToManyField(User, related_name="favorites", blank=True)
    
    def __str__(self):
        return self.name
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    products = models.ManyToManyField(Product, through="OrderItem", related_name="orders")
    
    def __str__(self):
        return self.user.username
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="positions")
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="positions")
    count = models.PositiveBigIntegerField(default=1)