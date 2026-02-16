import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bitsa_project.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.core.management import call_command

def run_migrations():
    print("Running migrations...")
    call_command('makemigrations')
    call_command('migrate')

def get_admin_credentials():
    User = get_user_model()
    admins = User.objects.filter(is_superuser=True)
    if not admins.exists():
        print("No admin (superuser) accounts found.")
        print("To create one, run: python manage.py createsuperuser")
        return
    print("Admin (superuser) accounts:")
    for admin in admins:
        print(f"Username: {admin.username}")
        print(f"Email: {admin.email}")
        print("Password: [hidden for security]")
        print("-" * 30)

if __name__ == "__main__":
    run_migrations()
    get_admin_credentials()