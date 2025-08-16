from django.contrib import admin
from django.forms import BaseInlineFormSet
from products.models import Order, Product, OrderItem
from django.core.exceptions import ValidationError

class OrderItemInlineFormset(BaseInlineFormSet):
    def clean(self):
        if not self.forms:
            raise ValidationError("Добавьте хотя бы 1 продукт")
        return super().clean()

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    formset = OrderItemInlineFormset

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "price"]

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id"]
    inlines = [OrderItemInline]
    list_select_related = ["user"]

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["id", "count"]
    list_select_related = ["order", "product"]