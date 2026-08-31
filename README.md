# 💻 DevTinder – Developer Networking Platform

![React](https://img.shields.io/badge/React-19-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![DaisyUI](https://img.shields.io/badge/DaisyUI-UI%20Components-purple)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

A Tinder-inspired networking platform built for **developers** to discover, connect, and grow their professional network.

DevTinder allows users to create and manage profiles, discover other developers, send connection requests, respond to incoming requests, and build meaningful professional connections.

🔗 **Live Demo:** https://devtinder-social.vercel.app

🔗 **Backend Repository:** https://github.com/yuvrajk-dev/DevTinder-Backend

---

## ✨ Features

* 🔐 User authentication with signup and login
* 👤 Create and manage developer profiles
* 🔍 Discover developers through a card-based feed
* ❤️ Send connection requests
* ❌ Ignore developers you're not interested in
* 🤝 Accept or reject incoming connection requests
* 👥 View accepted connections and pending requests
* 🚫 Prevent duplicate connection requests
* 🔒 Protected routes for authenticated users
* ⚡ Global state management using Redux Toolkit
* 🔄 Dynamic feed updates without unnecessary page reloads
* 📱 Fully responsive design across desktop, tablet, and mobile
* 🎨 Modern UI built with Tailwind CSS and DaisyUI

---

## 🛠️ Tech Stack

| Category         | Technology             |
| ---------------- | ---------------------- |
| Frontend         | React.js, React Router |
| State Management | Redux Toolkit          |
| Styling          | Tailwind CSS, DaisyUI  |
| HTTP Client      | Axios                  |
| Build Tool       | Vite                   |
| Deployment       | Vercel                 |

---

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components
├── pages/           # Application pages
├── utils/           # Redux slices and constants
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yuvrajk-dev/DevTinder-Frontend.git
cd DevTinder-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory:

```env
VITE_BASE_URL=your_backend_api_url
```

Example:

```env
VITE_BASE_URL=http://localhost:7777
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the URL shown in your terminal.

---

## 🔐 Authentication Flow

DevTinder uses a backend authentication system based on **JWT and HTTP-only cookies**.

1. Users sign up or log in.
2. The backend authenticates the user.
3. A JWT is stored in an HTTP-only cookie.
4. Protected API requests include credentials using Axios.
5. The frontend manages authenticated user state using Redux Toolkit.

---

## 🔄 Connection System

The platform manages developer interactions through connection requests.

Users can:

* ❤️ Send an **Interested** request
* ❌ **Ignore** a developer
* 🤝 **Accept** incoming requests
* 🚫 **Reject** incoming requests

The feed automatically filters developers that the user has already interacted with, preventing duplicate connection requests and repeated profiles.

---

## 💡 Why I Built This

I built DevTinder to strengthen my **full-stack JavaScript development skills** by building a real-world networking application from scratch.

The project helped me practice:

* Authentication and authorization
* REST API integration
* Redux state management
* Protected routes
* Dynamic UI updates
* Connection request workflows
* Responsive UI design
* Frontend and backend integration

---

## 🌐 Deployment

The frontend application is deployed on **Vercel**.

🔗 **Live Demo:** https://devtinder-social.vercel.app

The backend is deployed separately and provides the REST APIs used by the frontend.

---

## 👨‍💻 Author

**Yuvraj Kumar**

* GitHub: https://github.com/yuvrajk-dev
* LinkedIn: https://linkedin.com/in/yuvrajkumar01
* Portfolio: https://yuvrajk-dev.vercel.app
