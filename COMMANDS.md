# Command Reference Guide

## Starting the Application

### Terminal 1 - Backend
```bash
cd backend
python manage.py runserver
# Server runs on http://localhost:8000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

Both servers are currently running in the background.

## Django Management Commands

### Database Operations
```bash
# Create migrations for changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Reset database
rm db.sqlite3
python manage.py migrate

# Create new superuser
python manage.py createsuperuser

# Change password
python manage.py changepassword admin
```

### Server
```bash
# Run on default port (8000)
python manage.py runserver

# Run on custom port
python manage.py runserver 8001
```

### Admin Interface
```bash
# Interactive shell
python manage.py shell

# Create admin user programmatically
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.create_superuser('username', 'email@example.com', 'password')
```

## Frontend Commands

### Development
```bash
# Start dev server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Custom Port
```bash
PORT=3001 npm start
```

### Debugging
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install

# Check for outdated packages
npm outdated
```

## API Testing

### Using curl
```bash
# Get all categories (public)
curl http://localhost:8000/api/categories/

# Get all products (public)
curl http://localhost:8000/api/products/

# Get specific product
curl http://localhost:8000/api/products/1/

# Filter by category
curl "http://localhost:8000/api/products/?category=1"

# Search products
curl "http://localhost:8000/api/products/?search=shoes"
```

### Using Python
```bash
import requests

# Get products
response = requests.get('http://localhost:8000/api/products/')
products = response.json()
```

## File Management

### Images
```bash
# Images stored in:
backend/media/products/

# Clear media
rm -rf backend/media/products/*
```

### Database
```bash
# Database location:
backend/db.sqlite3

# Backup database
cp backend/db.sqlite3 backend/db.sqlite3.backup

# Restore from backup
cp backend/db.sqlite3.backup backend/db.sqlite3
```

## Troubleshooting Commands

### Check if ports are in use
```bash
# Windows
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :8000
lsof -i :3000
```

### Kill processes on ports
```bash
# Windows (if needed)
taskkill /PID <pid> /F

# Linux/Mac (if needed)
kill -9 <pid>
```

### Reset everything
```bash
# Backend reset
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.create_superuser('admin', 'admin@example.com', 'admin123')

# Frontend reset
cd frontend
rm -rf node_modules
npm install
npm start
```

## Useful Django Admin Commands

```bash
# Create test data
python manage.py shell
>>> from catalog.models import Category, Product
>>> c = Category.objects.create(name="Men", description="Men's shoes")
>>> p = Product.objects.create(name="Test Shoe", category=c, description="Test", show_price=True, price=100)

# List all users
python manage.py shell
>>> from django.contrib.auth.models import User
>>> for u in User.objects.all(): print(u.username)

# Delete specific admin
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.filter(username='admin').delete()
```

## Environment Variables (Optional)

Create `.env` in backend/:
```
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///db.sqlite3
```

Create `.env.local` in frontend/:
```
REACT_APP_API_URL=http://localhost:8000
```

## Production Commands

### Build frontend
```bash
cd frontend
npm run build
# Creates 'build' folder ready for deployment
```

### Collect static files
```bash
cd backend
python manage.py collectstatic --noinput
```

### Run with Gunicorn
```bash
pip install gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## Useful Tips

### View all API endpoints quickly
```bash
# Install Django REST Framework browser
# Go to http://localhost:8000/api/
```

### Check Django version
```bash
python -m django --version
```

### Check Python version
```bash
python --version
```

### Check Node version
```bash
node --version
npm --version
```

### View database tables (SQLite)
```bash
# Using SQLite CLI
sqlite3 backend/db.sqlite3
sqlite> .tables
sqlite> .schema
sqlite> .quit

# Or use SQLite browser tool
```

---

**All commands should be run from the project root directory:**
```
c:\Users\ADMIN\Desktop\SmFootware\
```

Happy developing! 🚀
