# Mini Team Chat (Slack-like)

A real-time team chat application built for a full-stack internship assignment.

## Live Links
- Frontend:https://teamchat-z3xh.onrender.com
- Backend:https://mini-chat-app-backend-dpwg.onrender.com

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Socket.IO Client
- Backend: Node.js, Express, Socket.IO, JWT Auth
- Database: MongoDB Atlas
- Deployment: Render (frontend), Render (backend)

## Features
- User signup & login with JWT
- Channel creation and joining
- offline presence indicator
- Real-time messaging in channels (Socket.IO)
- Message history with pagination ("Load older messages")

## Running Locally

### Backend
```bash
cd backend
npm install
# set .env with MONGO_URI, JWT_SECRET, CLIENT_URL
npm run dev
