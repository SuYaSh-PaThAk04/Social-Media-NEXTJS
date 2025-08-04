
markdown
Copy
Edit
# 🌐 Social Media App

A full-stack real-time social media web application where users can register, log in, follow/unfollow other users, and receive real-time notifications when followed.

## 🚀 Live Demo

- **Frontend (Next.js)**: [https://social-media-nextjs-xi.vercel.app](https://social-media-nextjs-xi.vercel.app)
- **Backend (NestJS + MongoDB)**: [https://cleverbook.onrender.com](https://cleverbook.onrender.com)

---

## 📦 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [React Context API](https://reactjs.org/docs/context.html)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Socket.IO (WebSockets)](https://socket.io/)

---

## 🔑 Features

- User registration and login
- JWT-based authentication
- Follow/unfollow users
- Real-time follow notifications
- CORS-enabled API
- Modular NestJS architecture with services, gateways, and controllers

---

## 🛠️ Getting Started (Locally)

### 1. Clone the Repos

```bash
git clone https://github.com/yourusername/social-media-nextjs
git clone https://github.com/yourusername/social-media-nestjs
2. Install Dependencies
Frontend
bash
Copy
Edit
cd social-media-nextjs
npm install
Backend
bash
Copy
Edit
cd social-media-nestjs
npm install
3. Configure Environment Variables
Backend .env example:
env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Frontend .env.local example:
env
Copy
Edit
NEXT_PUBLIC_API_BASE_URL=https://cleverbook.onrender.com
4. Start Locally
Backend
bash
Copy
Edit
npm run start:dev
Frontend
bash
Copy
Edit
npm run dev
🔔 Real-Time Notifications
When a user follows another user:

The backend (NestJS) emits a real-time notification via WebSockets.

The frontend (Next.js) listens for the notification event and shows a pop-up/toast.

📁 Folder Structure Highlights
Backend (NestJS)
ruby
Copy
Edit
src/
│
├── auth/          // Auth module (JWT)
├── users/         // User controller/service/model
├── posts/         // Post module (optional)
├── notifications/ // WebSocket gateway
└── app.module.ts
Frontend (Next.js)
bash
Copy
Edit
/components
/context
/pages
/services
/utils
🧪 Testing
✅ Login with two accounts in different tabs

✅ Follow from one → notification should appear in the other

🙌 Contribution
Feel free to fork and contribute by submitting a pull request.

📬 Contact
For any questions or feedback, connect on Twitter or email at your@email.com.


---


