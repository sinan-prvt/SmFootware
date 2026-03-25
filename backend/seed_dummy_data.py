import os
import django
import sys
import requests
from django.core.files.base import ContentFile

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from catalog.models import Category, Product, ProductImage

# Dummy data
CATEGORIES = ["Nike", "Adidas", "Puma", "New Balance", "Vans"]

PRODUCTS = [
    {
        "name": "Nike Air Max 270",
        "brand_name": "Nike",
        "price": 150.00,
        "code": "NK-AM270-BLK",
        "sizes": "7, 7.5, 8, 8.5, 9, 10, 11",
        "description": "The Nike Air Max 270 delivers visible air under every step. Updated for modern comfort, it nods to the original 1991 Air Max 180 with its exaggerated tongue top and heritage tongue logo.",
        "images": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop"
        ]
    },
    {
        "name": "Adidas UltraBoost",
        "brand_name": "Adidas",
        "price": 180.00,
        "code": "AD-UB21-WHT",
        "sizes": "8, 9, 10, 11, 12",
        "description": "Ultraboost is made for comfort and energy return. Featuring a lightweight Primeknit upper and responsive Boost midsole to keep you moving.",
        "images": [
            "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&h=600&fit=crop"
        ]
    },
    {
        "name": "Puma RS-X",
        "brand_name": "Puma",
        "price": 110.00,
        "code": "PU-RSX-MULT",
        "sizes": "6, 7, 8, 9, 10",
        "description": "The RS-X is back. The future-retro silhouette of this sneaker returns with progressive aesthetic and angular details, complete with nubuck and suede overlays.",
        "images": [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop"
        ]
    },
    {
        "name": "New Balance 574 Core",
        "brand_name": "New Balance",
        "price": 85.00,
        "code": "NB-574-GRY",
        "sizes": "7, 8, 8.5, 9, 10, 11.5",
        "description": "The 574 was built to be a reliable shoe that could do a lot of different things well. The 574 brings you a classic, versatile sneaker.",
        "images": [
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop"
        ]
    }
]

def run():
    print("Seeding database...")
    
    # 1. Create categories
    category_objects = {}
    for cat_name in CATEGORIES:
        cat, created = Category.objects.get_or_create(name=cat_name)
        category_objects[cat_name] = cat
        if created:
            print(f"Created category: {cat_name}")

    # 2. Create products
    for prod_data in PRODUCTS:
        cat = category_objects.get(prod_data["brand_name"])
        product, created = Product.objects.get_or_create(
            name=prod_data["name"],
            defaults={
                "category": cat,
                "price": prod_data["price"],
                "code": prod_data["code"],
                "sizes": prod_data["sizes"],
                "description": prod_data["description"]
            }
        )
        
        if created:
            print(f"Created product: {product.name}")
            # 3. Download and save images
            for idx, img_url in enumerate(prod_data["images"]):
                response = requests.get(img_url)
                if response.status_code == 200:
                    img_name = f"{product.name.replace(' ', '_')}_{idx}.jpg"
                    
                    product_image = ProductImage(
                        product=product,
                        is_primary=(idx == 0)
                    )
                    product_image.image.save(img_name, ContentFile(response.content), save=True)
                    print(f"  -> Saved image: {img_name}")
                else:
                    print(f"  -> Failed to download image: {img_url}")

    print("Database seeding completed successfully!")

if __name__ == "__main__":
    run()
