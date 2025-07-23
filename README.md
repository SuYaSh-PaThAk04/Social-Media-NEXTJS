Social Media App
A full-stack social media application built with Next.js (Frontend) and NestJS (Backend), featuring authentication, posts, likes, and real-time notifications.

🚀 Live Demo
Frontend: https://social-media-nextjs.vercel.app

Backend API: https://social-media-nextjs.onrender.com
(Currently deployed frontend is having issue with api requests i'm trying to fix it so the url may not work but backend is full functional )

Postman Collection - https://suyash-9446953.postman.co/workspace/Suyash's-Workspace~5f6ecb9f-cdd9-4d5a-8747-0270e794743a/collection/45090808-9fcf969a-d86b-491d-9e44-7bbb31724ad8?action=share&creator=45090808
(replace localhost 3000 with the deployed backend url and you'll be able to use all endpoints

Demo Video Link - https://drive.google.com/file/d/1dDQANoHydDhtKspfiYgN6TamQarLGDC1/view?usp=drive_link

🛠 Tech Stack
Frontend
Next.js 15

React

Axios

TailwindCSS (or your CSS approach)

Toast Notifications

Backend
NestJS

MongoDB with Mongoose

JWT Authentication

Passport.js

Socket.IO (Real-time Notifications)

BullMQ & Redis (for queues)

📂 Project Structure
bash
Copy
Edit
.
├── frontend/   # Next.js app (UI)
├── backend/    # NestJS app (API)
🔑 Features
✅ User Authentication (Signup/Login)
✅ JWT-based Authorization
✅ Create, Like, and Explore Posts
✅ Profile Management
✅ Real-Time Notifications using WebSockets
✅ Secure API with CORS enabled for frontend

⚙️ Setup & Installation
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/SuYaSh-PaThAk04/Social-Media-NEXTJS.git
cd Social-Media-NEXTJS
2. Backend Setup (NestJS)
bash
Copy
Edit
cd backend
npm install --legacy-peer-deps
Environment Variables
Create a .env file inside backend/:

ini
Copy
Edit
PORT=3000
MONGO_URI=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key
REDIS_HOST=your-redis-host
REDIS_PORT=6379
Run the backend:

bash
Copy
Edit
npm run start:dev
Backend will be live at http://localhost:3000

3. Frontend Setup (Next.js)
bash
Copy
Edit
cd frontend
npm install
Environment Variables
Create a .env.local file inside frontend/:

ini
Copy
Edit
NEXT_PUBLIC_API_URL=https://social-media-nextjs.onrender.com
Run the frontend:

bash
Copy
Edit
npm run dev
Frontend will be live at http://localhost:3001 (or Next.js default port)

🌍 Deployment
Frontend: Vercel Deployment Guide

Backend: Render Deployment Guide

Important:

Set NEXT_PUBLIC_API_URL in Vercel environment variables to your Render backend URL.

Enable CORS in NestJS for your Vercel domain.

🛠 API Endpoints
Auth
bash
Copy
Edit
POST /auth/signup
POST /auth/login
Posts
bash
Copy
Edit
GET /posts
POST /posts/create
🎥 Demo
Add screenshots or Loom video link:

scss
Copy
Edit
![Demo Screenshot](./assets/demo.png)
📌 Future Enhancements
✅ Add image upload for posts

✅ Add comments and chat system

✅ Add dark mode support

👨‍💻 Author
Suyash Pathak

GitHub: SuYaSh-PaThAk04

LinkedIn: www.linkedin.com/in/suyash-pathak-4347b5283

