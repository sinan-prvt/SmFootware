from django.apps import AppConfig


class CatalogConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'catalog'

    def ready(self):
        # We wrap this in a try-except to avoid issues during initial migrations
        try:
            from django.contrib.auth.models import User
            if not User.objects.filter(username='smadmin').exists():
                # Remove any existing user named 'admin' if requested (optional but helpful)
                User.objects.filter(username='admin').delete()
                
                # Create the new admin
                User.objects.create_superuser(
                    username='smadmin',
                    email='admin@smfootwear.com',
                    password='9495381001'
                )
                print("Startup: Created smadmin superuser.")
        except Exception:
            pass
