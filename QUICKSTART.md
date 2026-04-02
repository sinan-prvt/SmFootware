# 🚀 Quick Start Guide

## Status
✅ **Backend**: Django server running on http://localhost:8000  
✅ **Frontend**: React app running on http://localhost:3000  
✅ **Database**: SQLite ready (auto-created)  

## 🔑 Admin Credentials
- **URL**: http://localhost:8000/admin/
- **Username**: `smadmin`
- **Password**: `9495381001`

## 📱 Application URLs

### Public Catalog
Visit: http://localhost:3000
- Browse all products
- Search & filter by category
- View product images
- Contact via WhatsApp

### Admin Panel
Visit: http://localhost:3000/admin/login
- Login with admin credentials
- Manage categories
- Add/Edit/Delete products
- Upload product images

### Django Admin
Visit: http://localhost:8000/admin/
- Full Django admin interface
- Manage users & permissions
- Direct database management

## 🛠️ First Time Setup (Already Done)

The following are already completed:
```bash
✅ Backend initialized with Django 4.2
✅ Frontend initialized with React 18
✅ Database migrations created and applied
✅ Superuser account created
✅ Both servers running
```

## 📝 Add Your First Product

### Option 1: Via Admin Panel (Recommended)
1. Go to http://localhost:3000/admin/login
2. Login with smadmin / 9495381001
3. Create categories first (Men, Women, Kids, etc.)
4. Add products with images
5. Set pricing (optional)

### Option 2: Via Django Admin
1. Go to http://localhost:8000/admin/
2. Login with smadmin / 9495381001
3. Add Categories
4. Add Products
5. Upload Product Images

## 🎨 Customize

### Change WhatsApp Number
Edit `frontend/src/components/public/ProductModal.js` line 17:
```javascript
const phoneNumber = '8801234567890'; // Change this
```

### Change Admin Password
```bash
cd backend
python manage.py changepassword smadmin
```

### Database
Default: SQLite (for development)
- File: `backend/db.sqlite3`
- To reset: Delete file and run migrations again

## 🚀 Production Deployment

### Backend
```bash
# Set DEBUG = False in backend/config/settings.py
# Change SECRET_KEY
# Use PostgreSQL instead of SQLite
# Deploy with Gunicorn
```

### Frontend
```bash
cd frontend
npm run build
# Deploy the 'build' folder to static hosting
```

## ⚠️ Important Notes

1. **Images**: Uploaded to `backend/media/` folder
2. **Static Files**: Served automatically in development
3. **CORS**: Already configured for localhost:3000
4. **API**: RESTful, JSON responses
5. **Auth**: Session-based (similar to Gmail)

## 🐛 Troubleshooting

**Backend not responding?**
```bash
# Check if server is running
curl http://localhost:8000/api/categories/

# Restart if needed
cd backend
python manage.py runserver
```

**Frontend not loading?**
```bash
# Check if npm start is running
# Restart if needed
cd frontend  
npm start
```

**Database error?**
```bash
cd backend
rm db.sqlite3
python manage.py migrate
```

**Port already in use?**
```bash
# Use different port
python manage.py runserver 8001
# OR
PORT=3001 npm start
```

## 📚 File Structure

```
SmFootwear/
├── backend/
│   ├── catalog/              ← Main app
│   ├── config/               ← Settings
│   ├── manage.py
│   ├── db.sqlite3            ← Database (auto-created)
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/            ← Login, Admin, Catalog
│   │   ├── components/       ← UI components
│   │   ├── styles/           ← CSS
│   │   └── api.js            ← API client
│   └── package.json
│
├── README.md                 ← Full documentation
└── QUICKSTART.md             ← This file
```

## ✨ Next Steps

1. ✅ Backend & Frontend running
2. ✅ Admin account created
3. 👉 **Add some categories** (Men, Women, Kids, Sports)
4. 👉 **Add some products** with images
5. 👉 **Test the public catalog**
6. 👉 **Deploy to production** (when ready)

---

**Happy Selling! 🎉**
