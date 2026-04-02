import os
import django
import sys

# Set up Django environment
sys.path.append(r'c:\Users\ADMIN\Desktop\SmFootwear\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

def test_login(username, password):
    print(f"Testing login for {username}...")
    try:
        user = authenticate(username=username, password=password)
        if user is None:
            print("Authentication failed: user is None")
            return

        print(f"User authenticated: {user.username}")
        if not user.is_staff:
            print("User is not staff")
            return

        token, created = Token.objects.get_or_create(user=user)
        print(f"Token: {token.key}, Created: {created}")
    except Exception as e:
        import traceback
        print(f"Error during login: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    # Test with smadmin if we knew the password, but we don't.
    # Let's try to just check the Token model with the first staff user.
    staff_user = User.objects.filter(is_staff=True).first()
    if staff_user:
        print(f"Testing Token creation for {staff_user.username}")
        try:
            token, created = Token.objects.get_or_create(user=staff_user)
            print(f"Token: {token.key}, Created: {created}")
        except Exception as e:
            import traceback
            print(f"Error during Token creation: {e}")
            traceback.print_exc()
    else:
        print("No staff user found.")
