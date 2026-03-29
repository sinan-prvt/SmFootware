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

# Categories (Brand-Centric)
CATEGORIES = ["Nike", "Adidas", "Puma", "New Balance"]

# Detailed Product Data (Brand-Centric Categories)
PRODUCTS = [
    {
        "name": "Nike Air Max Terrascape 90",
        "brand_name": "Nike",
        "gender": "MEN",
        "category_name": "Nike",
        "price": 140.00,
        "article": "ART-TX90",
        "colors": "Grey, Neon, Black",
        "sizes": "7, 8, 9, 10, 11",
        "images": ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"]
    },
    {
        "name": "Adidas Forum Low Classic",
        "brand_name": "Adidas",
        "gender": "WOMEN",
        "category_name": "Adidas",
        "price": 100.00,
        "article": "ART-F80",
        "colors": "White, Blue, Pink",
        "sizes": "6, 7, 8, 9",
        "images": ["https://images.unsplash.com/photo-1551107643-d64e9a360cc2?w=800&q=80"]
    },
    {
        "name": "Puma Deviate Nitro 2",
        "brand_name": "Puma",
        "gender": "MEN",
        "category_name": "Puma",
        "price": 160.00,
        "article": "ART-DN2",
        "colors": "Sunset Glow, Black",
        "sizes": "8, 9, 10, 11",
        "images": ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"]
    },
    {
        "name": "New Balance 2002R Protection Pack",
        "brand_name": "New Balance",
        "gender": "UNISEX",
        "category_name": "New Balance",
        "price": 180.00,
        "article": "ART-2002RP",
        "colors": "Rain Cloud, Phantom",
        "sizes": "7, 8, 9, 10",
        "images": ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"]
    },
    {
        "name": "Nike Dunk Low Panda",
        "brand_name": "Nike",
        "gender": "KIDS",
        "category_name": "Nike",
        "price": 90.00,
        "article": "ART-DKP",
        "colors": "Black, White",
        "sizes": "4, 5, 6",
        "images": ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"]
    },
    {
        "name": "Adidas Yeezy Slide Onyx",
        "brand_name": "Adidas",
        "gender": "MEN",
        "category_name": "Adidas",
        "price": 70.00,
        "article": "ART-YZYSL",
        "colors": "Onyx, Bone, Pure",
        "sizes": "8, 9, 10, 11",
        "images": ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"]
    },
    {
        "name": "Puma MB.02 Phenom",
        "brand_name": "Puma",
        "gender": "KIDS",
        "category_name": "Puma",
        "price": 120.00,
        "article": "ART-MB02",
        "colors": "Teal, Gold, Red",
        "sizes": "5, 6, 7",
        "images": ["https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80"]
    },
    {
        "name": "New Balance 550 Retro",
        "brand_name": "New Balance",
        "gender": "MEN",
        "category_name": "New Balance",
        "price": 110.00,
        "article": "ART-NB550",
        "colors": "White, Green, Navy",
        "sizes": "7, 8, 9, 10, 11",
        "images": ["https://images.unsplash.com/photo-1512374382149-433a7ad7b73b?w=800&q=80"]
    },
    {
        "name": "Nike Pegasus 40 Run",
        "brand_name": "Nike",
        "gender": "WOMEN",
        "category_name": "Nike",
        "price": 130.00,
        "article": "ART-PEG40",
        "colors": "Fuchsia, White, Black",
        "sizes": "6, 7, 8, 9",
        "images": ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"]
    },
    {
        "name": "Adidas Samba OG Core",
        "brand_name": "Adidas",
        "gender": "MEN",
        "category_name": "Adidas",
        "price": 100.00,
        "article": "ART-SAMBA",
        "colors": "Black, White, Gum",
        "sizes": "7, 8, 9, 10",
        "images": ["https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=800&q=80"]
    },
    {
        "name": "Puma Velocity Nitro 2",
        "brand_name": "Puma",
        "gender": "WOMEN",
        "category_name": "Puma",
        "price": 120.00,
        "article": "ART-VN2",
        "colors": "Lavender, Black",
        "sizes": "6, 7, 8",
        "images": ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80"]
    },
    {
        "name": "New Balance 990v6 Grey",
        "brand_name": "New Balance",
        "gender": "MEN",
        "category_name": "New Balance",
        "price": 200.00,
        "article": "ART-990V6",
        "colors": "Grey, Navy",
        "sizes": "7, 8, 9, 10, 11, 12",
        "images": ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"]
    }
]

def run():
    print("🚀 Seeding Technical Catalog v2.2 (Brand-Centric)...")
    
    # 1. Create categories
    category_objects = {}
    for cat_name in CATEGORIES:
        cat, created = Category.objects.get_or_create(name=cat_name)
        category_objects[cat_name] = cat
        if created:
            print(f"✅ Created category: {cat_name}")

    # 2. Create products
    for prod_data in PRODUCTS:
        cat = category_objects.get(prod_data["category_name"])
        product, created = Product.objects.get_or_create(
            name=prod_data["name"],
            defaults={
                "brand_name": prod_data["brand_name"],
                "gender": prod_data["gender"],
                "category": cat,
                "price": prod_data["price"],
                "article": prod_data["article"],
                "colors": prod_data["colors"],
                "sizes": prod_data["sizes"]
            }
        )
        
        if created:
            print(f"👟 Created product: {product.name} ({product.article})")
            # 3. Download and save images
            for idx, img_url in enumerate(prod_data["images"]):
                try:
                    response = requests.get(img_url, timeout=10)
                    if response.status_code == 200:
                        img_name = f"{product.article}_{idx}.jpg"
                        
                        product_image = ProductImage(
                            product=product,
                            is_primary=(idx == 0)
                        )
                        product_image.image.save(img_name, ContentFile(response.content), save=True)
                        print(f"  📸 Saved image: {img_name}")
                    else:
                        print(f"  ⚠️ Failed image download: {img_url} (Status: {response.status_code})")
                except Exception as e:
                    print(f"  ❌ Error downloading image: {e}")
        else:
            print(f"⏩ Skipping existing product: {product.name}")

    print("\n✨ Database seeding completed successfully!")

if __name__ == "__main__":
    run()
