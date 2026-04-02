from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Resets admin credentials'

    def handle(self, *args, **options):
        print("Resetting Admin Credentials...")
        
        # Delete existing users/admins
        User.objects.all().delete()
        print("- Existing users removed.")
        
        # Create new admin
        User.objects.create_superuser(
            username='smadmin',
            email='admin@smfootwear.com',
            password='9495381001'
        )
        print("- New admin 'smadmin' created with password '9495381001'.")
        print("Done!")
