# 👨‍💻 Kabir Patel — Full-Stack Portfolio

A modern, dynamic, and fully responsive personal portfolio built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features a sleek user interface and a completely custom **Admin Panel** that acts as a headless CMS, allowing easy management of projects, skills, experience, and resume uploads without touching the code.

---

## 🌐 Live Demo

Frontend: [https://portfolio-kabir-28.vercel.app/](https://portfolio-kabir-28.vercel.app/)  
Backend: [https://kabir-backend.vercel.app/](https://kabir-backend.vercel.app/)

---

## 🚀 Key Features

- **Modern & Responsive UI:** Built with React, Tailwind CSS, and animated with Framer Motion.
- **Dynamic CMS / Admin Panel:** A secure, JWT-authenticated dashboard to add, edit, and delete Projects, Skills, and Experience.
- **File Uploads:** Upload your latest Profile Photo and Resume/CV directly from the admin panel (stored locally/cloud).
- **RESTful API:** Robust Node.js & Express backend serving dynamic data to the frontend.
- **Contact Form:** Real-time messages sent directly to the database.

---

## 🛠️ Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Lucide React (Icons)
- React Router DOM

**Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for Authentication
- Multer (File Uploads)

---

## 📂 Local Installation & Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Kabirpatel4518/portfolio.git
cd portfolio
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:

```bash
npm run dev
```

_(The backend will run on `http://localhost:5000`)_

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

_(The frontend will run on `http://localhost:5173`)_

---

## 🔒 Default Admin Credentials

Upon the first run, the backend will automatically generate a default admin account in MongoDB:

- **Username:** `kabir`
- **Password:** `@Kabir4518`

_(You can change these credentials directly from the Admin Panel's profile settings)._

---

## 📬 Contact

📧 kabirpatel2882004@gmail.com  
📞 +91 9328008309  
📍 At & Po Katwad Himmatnagar, Sabarkantha S.K

---

⭐ **Star the repo if you like it!**

**Designed & Developed by Kabir Patel**
GitHub - https://github.com/Kabirpatel4518
