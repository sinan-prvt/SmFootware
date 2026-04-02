# 🚀 SmFootwear: Ultimate Free Deployment Guide

This guide will walk you through deploying your **Django Backend** and **React Frontend** for **FREE**. 

---

## 🏗️ Pre-deployment Checklist

1.  **GitHub Repo**: ✅ Done ([sinan-prvt/SmFootwear](https://github.com/sinan-prvt/SmFootwear))
2.  **Supabase Account**: [Sign up here](https://supabase.com/) (Database)
3.  **Cloudinary Account**: [Sign up here](https://cloudinary.com/) (Images)

---

## 📋 Step 1: Set up your "External Helpers"
*(Keep your database URI and Cloudinary credentials ready)*

---

## ⚡ Option A & B (Render & Koyeb)
*If you have a credit card or a fresh Render account, these are the fastest.*

---

## 🏆 Option C: The "No-Card" Hero (Vercel Backend)
*Use this if Render is full and Koyeb asks for a card. 100% Free.*

### 🧠 C.1: Deploy Backend (Vercel)
1.  Go to [Vercel Dashboard](https://vercel.com/new).
2.  Import your `SmFootwear` repo.
3.  **Project Configuration**:
    - **Name**: `sm-footwear-api`
    - **Root Directory**: `backend`
    - **Framework Preset**: `Other`
4.  **Environment Variables** (Add these):
    - `DATABASE_URL`: (Supabase URI)
    - `CLOUDINARY_CLOUD_NAME`: (Cloudinary)
    - `CLOUDINARY_API_KEY`: (Cloudinary)
    - `CLOUDINARY_API_SECRET`: (Cloudinary)
    - `SECRET_KEY`: (Any random string)
    - `DEBUG`: `False`
5.  Click **Deploy**.
6.  Once live, copy the URL (e.g., `https://sm-footwear-api.vercel.app`).

### ✅ C.1.1: Run Production Migrations (Required)
Vercel does not automatically run Django migrations for your database.

Run these commands locally from the `backend` folder using the same production `DATABASE_URL`:

```bash
python manage.py migrate
python manage.py set_admin
```

If `set_admin` is not desired, create your own staff user instead:

```bash
python manage.py createsuperuser
```

Without this step, `/api/token-auth/` can return server errors in production.

### 🎨 C.2: Deploy Frontend (Vercel)
1.  Go to [Vercel Dashboard](https://vercel.com/new).
2.  Import the **same** repo again.
3.  **Project Configuration**:
    - **Name**: `sm-footwear-store`
    - **Root Directory**: `frontend`
    - **Framework Preset**: `Create React App`
4.  **Environment Variables**:
    - `REACT_APP_API_BASE_URL`: (Paste your Backend URL + `/api`)
      *Example: `https://sm-footwear-api.vercel.app/api`*
5.  Click **Deploy**.

---

## 🔒 Final Step: Domain Security
1.  Go to your **Backend Service** settings on Vercel > **Environment Variables**.
2.  Add `ALLOWED_HOSTS` = (Your Frontend URL without `https://`)

### 🎉 Congratulations! Your store is now LIVE globally on Vercel.


