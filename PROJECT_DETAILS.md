# 👟 SmFootware: Project Overview & Tech Stack

A high-performance, mobile-first digital catalog and inventory management system designed for footwear retail.

## 🚀 Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React (v18)** | Interactive User Interface & State Management |
| **Styling** | **Vanilla CSS** | Custom, high-performance responsive design |
| **Backend** | **Django (v4.2)** | Robust business logic and API management |
| **API** | **Django REST Framework** | Powerful, flexible API construction |
| **Database** | **PostgreSQL (Supabase)** | Scalable cloud database for production |
| **Images** | **Cloudinary** | Optimized cloud storage and delivery of product photos |
| **Icons** | **Lucide React** | Modern, lightweight UI icons |
| **Deployment** | **Vercel** | Global hosting for both Frontend and Backend |

---

## 🛠️ How it Works (Data Flow)

1.  **Frontend (React)**: The user interacts with the website at `http://localhost:3000`. It uses **Axios** to fetch data from the backend.
2.  **Backend (Django)**: Acts as the "Brain" at `http://localhost:8000`. It receives requests, checks permissions (is the user an admin?), and queries the database.
3.  **Database (Supabase/Postgres)**: Stores all text data like product names, descriptions, categories, and prices.
4.  **Media (Cloudinary)**: When an admin uploads a sneaker photo, it is sent to Cloudinary. Cloudinary provides a fast, optimized URL which is then saved in the database.
5.  **WhatsApp Integration**: When a customer wants a product, they click a "WhatsApp" button. The app generates a pre-filled message link that opens directly on their phone.

---

## ✨ Core Features

### 🛒 Public Storefront
*   **Dynamic Catalog**: Browse footwear by category (e.g., Men, Women, Kids).
*   **Search Engine**: Real-time searching for specific sneaker models.
*   **Product Modal**: Detailed view with multiple images, pricing, and descriptions.
*   **Responsive Design**: Optimized specifically for mobile scrolling ("App-like" feel).

### 🔐 Admin Dashboard
*   **Secure Login**: Token-based authentication for administrative access.
*   **Category management**: Create, Rename, or Delete entire product categories.
*   **Product Inventory**: Full control over adding, editing, and deleting products.
*   **Multi-Image Upload**: Support for uploading multiple angles of a single shoe.

---

## 🔐 Administrative Access

| Field | Detail |
| :--- | :--- |
| **Username** | `smadmin` |
| **Password** | `9495381001` |
| **Django Admin** | `http://localhost:8000/admin/` |
| **Frontend Admin** | `http://localhost:3000/admin/login` |

---

## 📂 Project Structure Summary

*   **`backend/catalog/`**: The heart of the backend. Contains logic for Products, Categories, and Images.
*   **`frontend/src/`**: All the React visual components and pages.
*   **`deployment_guide.md`**: Your manual for pushing this project to the live web for free.
