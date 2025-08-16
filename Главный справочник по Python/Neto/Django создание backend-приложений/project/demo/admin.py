from django.contrib import admin
from .models import Car, Person, Product, Order, OrderPosition
# Register your models here.

class OrderPositionInline(admin.TabularInline):
    model = OrderPosition
    extra = 3

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ["id", "brand", "model", "color"]
    list_filter = ["brand", "model"]
    
@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "car"]
    

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "category", "price"]
    list_filter = ["category"]
    

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id"]
    inlines = [OrderPositionInline]