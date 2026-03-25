from django.contrib import admin
from .models import Category, Product, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'show_price', 'created_at']
    list_filter = ['category', 'show_price', 'created_at']
    search_fields = ['name', 'description']
    fieldsets = (
        ('Basic Info', {'fields': ('name', 'category', 'description')}),
        ('Pricing', {'fields': ('price', 'show_price')}),
    )


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ['product', 'is_primary', 'created_at']
    list_filter = ['is_primary', 'product']
    search_fields = ['product__name', 'alt_text']
