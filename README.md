# Real-Time Chat App

A real-time chat application built with **Next.js**, **Socket.IO**, and a RESTful **NestJS** backend. Users can sign up, log in, and chat in dynamically generated rooms. Messages are persisted in a MongoDB database.

---

## DEMO

[![Demo Video](/frontend/public/secret-echo-youtube-thumbnail.png)](https://youtu.be/3wxy1AJ4NrM)

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/secret-echo.git
cd secret-echo
```

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in both `backend/` and `frontend/` directories:

**backend/.env**

```
PORT=4000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

**frontend/.env**

```
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

### 4. Run the App

#### Backend

```bash
cd backend
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm run dev
```

---

## 🏗 Architecture and Design Decisions

### Frontend

-   Built using **Next.js** for fast routing and SSR support.
-   Custom CSS is used for styling instead of a CSS framework.
-   WebSocket connection established via Socket.IO for real-time communication.
-   Authentication context manages login state and JWT-based auth.

### Backend

-   Built with **NestJS**, a progressive Node.js framework.
-   RESTful endpoints for authentication and chat history.
-   Socket.IO gateway handles real-time events.
-   MongoDB is used with TypeORM for persistence.

### Key Features

-   Room-based chat system with persistent message history.
-   User authentication with signup/login.
-   Real-time messaging with typing indicator for AI.
-   Auto-scroll for new messages.

---

## ✨ Author

Developed by Aman Dubey

