# 🚀 Ladder – Competitive Programming Training Platform

**Ladder** is a web-based platform developed to help competitive programmers, especially members of the **IIUC Competitive Programming Society (IIUCCPS)**, improve their Codeforces ratings through structured and curated problem ladders. **Ladder** is a modern, admin-controlled CP ladder platform designed to help users train on Codeforces problems by difficulty while tracking real-time progress using their handle.

This project is developed and maintained by **Abdullah Al Azad** as a solo full-stack application, inspired by IIUCCPS bootcamps and problem-solving activities.

---

## 🎯 Key Features

- 📊 **Track Your Progress**  
  Users can submit their Codeforces handle to visualize their progress on a ladder of problems.
- 📊 **Codeforces API Integration**
  Shows `AC`, `WA`, `TLE`, or `X` for each problem

- 🧩 **Curated Problems by Difficulty (800–1400)**  
  Problems are structured in increasing difficulty to ensure gradual improvement.

- 🛠 **Admin Panel with Role-Based Access**  
  Only approved admins can add/edit/delete problems. The main admin controls approval.

- 🔐 **Admin Authentication**
  Main Admin + Multi Admin Roles, Admin request for access and main admin can approve and deny the request.

- 🌙 **Light/Dark/System Themes**  
  Users can switch between multiple theme modes for a better experience.

- ⚡ **Fast, Scalable & Clean UI**  
  Built with performance and scalability in mind using modern frontend & backend technologies.

- ☁️ **Full-Stack Render Deployment**

---

## 🧠 Tech Stack

### 🔹 Frontend

- React (Vite)
- React Router
- Raw CSS (custom theming)
- Axios

### 🔹 Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT Auth

### 🔹 External API

- Codeforces API

### 🔹 Hosting

- Render

---

## 🔐 Admin Flow

1. **Main Admin Login**

- Logs in directly with credentials (pre-saved in DB).
- Login, approve/deny admins, manage problems, approve deletions

2. **New Admin Request**

- Requests access using email – marked as `isApproved: false`.
- Request access, add/edit problems, request deletion

3. **User**

- View ladder, submit Codeforces handle to track progress

---

## 🛠 Setup Instructions

### 🖥 Backend

```bash
cd backend
npm install
node server.js
```

Create a `.env` file in the `backend` folder:

```
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/Ladder
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
PORT=5000
```

### 🌐 Frontend

```bash
cd frontend
npm install
npm run dev
```

Make sure the backend server is running and matches the frontend `API_BASE_URL`.

---

## 🌍 Deployment

Deployed on [Render](https://render.com/)  
Separate frontend and backend services

---

## 🧪 Seeding Main Admin (MongoDB)

To manually seed a main admin in MongoDB:

```js
{
  username: "mainadmin",
  email: "mainadmin@example.com",
  password: "hashedpassword",
  role: "main_admin",
  isApproved: true
}
```

---

## 🙌 Credits

Built with ❤️ by **Abdullah Al Azad**  
Solo full-stack developer | IIUCCPS Bootcamp Coordinator

---

## 📬 Contact & Contribution

For issues, ideas, or contributions:

- Open an [Issue](https://github.com/your-username/ladder/issues)
- Submit a Pull Request
- Or reach out directly to **Abdullah Al Azad**

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
