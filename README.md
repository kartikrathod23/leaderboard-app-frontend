# 🏆 Leaderboard App

A full-stack web application for managing a dynamic leaderboard, where users can claim random points, view real-time rankings, and track claim history. Built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage.

---

## 🚀 Live Demo
- **Frontend:** [https://leaderboard-app-frontend.vercel.app/](https://leaderboard-app-frontend.vercel.app/)
- **Backend API:** [https://leaderboard-app-backend-p30q.onrender.com/api](https://leaderboard-app-backend-p30q.onrender.com/api)

---

## 📋 Features
- **User Selection:** View and select from a list of users (add new users as well).
- **Claim Points:** Award random points (1-10) to the selected user with a single click.
- **Leaderboard:** See real-time user rankings, with a styled podium for the top 3.
- **Claim History:** Track every claim event in a dedicated history section.
- **Responsive UI:** Clean, modern, and mobile-friendly design using Tailwind CSS.
- **Pagination:** Efficient pagination for user lists and history.

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Deployment:** Vercel (frontend), Render/Railway (backend)

---

## ⚙️ Setup Instructions

### 1. Clone the Repositories
```sh
git clone <frontend-repo-url>
git clone <backend-repo-url>
```

### 2. Install Dependencies
- **Frontend:**
  ```sh
  cd frontend
  npm install
  ```
- **Backend:**
  ```sh
  cd backend
  npm install
  ```

### 3. Environment Variables
- **Backend:** Create a `.env` file in the backend folder:
  ```env
  MONGODB_URI=your-mongodb-connection-string
  PORT=5000
  ```
- **Frontend:** Set the API URL in `frontend/server.js` or use an environment variable (e.g., `VITE_API_URL`).

### 4. Run Locally
- **Backend:**
  ```sh
  npm start
  ```
- **Frontend:**
  ```sh
  npm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment

### Backend
- Deploy to [Render](https://render.com/), [Railway](https://railway.app/), or similar.
- Set environment variables in the dashboard.
- Use the public API URL in your frontend.

### Frontend
- Deploy to [Vercel](https://vercel.com/).
- Set the API URL to your deployed backend.
- Configure build command (`npm run build`) and output directory (`dist` for Vite).

---

## 📦 Submission Guidelines
- **Frontend URL:** [https://your-frontend.vercel.app](https://your-frontend.vercel.app)
- **DB Open URL:**
  ```
  mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
  ```
- **GitHub Repositories:**
  - [Frontend Repo](https://github.com/your-username/leaderboard-frontend)
  - [Backend Repo](https://github.com/your-username/leaderboard-backend)

---

## 📝 Notes
- **CORS:** Backend must allow requests from both local and deployed frontend URLs.
- **Seeding:** Run `seed.js` to initialize the database with 10 users.
- **Security:** Do not commit your `.env` file or real DB credentials to public repos.

---

## 👨‍💻 Author
- [Your Name](https://github.com/your-username)

---

## 📸 UI Preview
![Leaderboard App Screenshot](./screenshot.png)

---

## 🏅 Bonus Points
- Clean, modern, and responsive UI
- Efficient pagination
- Well-structured, commented code
- Easy deployment and configuration
