# SmFootware: The Ultimate "All-In-One" Render Guide

This guide will help you deploy your entire store (Backend + Frontend) in one single dashboard on **Render.com**.

---

## Step 1: Push your code to GitHub
Render connects directly to GitHub to manage both your apps.

1. Create a **Private Repository** on GitHub named `SmFootware`.
2. Push your project from your computer to GitHub:
   ```bash
   git init
   git add .
   git commit -m "All-in-one deployment ready"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/SmFootware.git
   git push -u origin main
   ```

---

## Step 2: Set up your Helpers (Supabase & Cloudinary)
Even though we host on Render, we need these two free services to keep your **data and images safe forever.**

1. **Supabase**: [Sign up here](https://supabase.com/). Create a project and save your **Database Connection String (URI)**.
2. **Cloudinary**: [Sign up here](https://cloudinary.com/). Go to your dashboard and save your **Cloud Name**, **API Key**, and **API Secret**.

---

## Step 3: Deploy the Backend API (on Render)
This is the "Brain" of your store.

1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New + > Web Service**.
3. Select your `SmFootware` repository.
4. **Settings**:
   - **Name**: `smfootware-api`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --no-input`
   - **Start Command**: `gunicorn config.wsgi`
5. **Environment Variables** (Add these):
   - `DATABASE_URL`: (Your Supabase URI)
   - `CLOUDINARY_CLOUD_NAME`: (Your Cloudinary Name)
   - `CLOUDINARY_API_KEY`: (Your Cloudinary Key)
   - `CLOUDINARY_API_SECRET`: (Your Cloudinary Secret)
   - `SECRET_KEY`: (Any random text)
   - `DEBUG`: `False`
6. Click **Create Web Service**. **Copy your Backend URL** once it finishes (e.g., `smfootware-api.onrender.com`).

---

## Step 4: Deploy the Frontend Storefront (on Render)
This is the "Face" of your store, in the same dashboard!

1. Go back to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New + > Static Site**.
3. Select the **same** `SmFootware` repository.
4. **Settings**:
   - **Name**: `smfootware-store`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
5. **Environment Variables** (Add this one):
   - `REACT_APP_API_BASE_URL`: (Paste your Backend URL from Step 3 + `/api`)
     *Example: `https://smfootware-api.onrender.com/api`*
6. Click **Create Static Site**.

---

## Final Step: Connect them securely
1. Go to your `smfootware-api` (Backend) settings on Render.
2. Add one more Environment Variable:
   - `ALLOWED_HOSTS`: (Paste your Frontend URL from Step 4 without https://)
3. **That's it!** You now have both your Storefront and your API managed in one Render account.

### 🎉 All-in-one setup complete! Your store is LIVE on Render.
