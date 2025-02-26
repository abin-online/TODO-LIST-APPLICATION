# Todo List Application

## 🚀 Live Demo
[Todo List App](https://todo-list-application-4.onrender.com/)

## 📌 Overview
This is a simple and intuitive **Todo List Application** that allows users to add, manage, and delete tasks efficiently. The app is built using **React (Vite)** for the frontend and is deployed on **Render**.

## ✨ Features
- ✅ Add new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- 📌 Mark tasks as completed
- 🌙 Dark Mode Support (if implemented)
- 🔥 Responsive Design for Mobile & Desktop
- 🛠️ Toast Notifications for Actions (Success & Errors)

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS
- **State Management:** useState, useEffect
- **Notifications:** React-Toastify
- **Deployment:** Render

## 📦 Installation & Setup
Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/todo-list-application.git
cd todo-list-application
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```
This will run the app on `http://localhost:5173/`.

### 4️⃣ Build for Production
```sh
npm run build
```

## 🌍 Deployment
The app is deployed on **Render**. If you want to deploy your version:
1. **Push your changes to GitHub**
2. **Connect GitHub Repo to Render**
3. **Render will automatically build and deploy your app**

## 🔔 Toast Notifications (React-Toastify)
Toast notifications enhance user experience by providing feedback for actions. Implemented using:
```jsx
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast.success('Task added successfully!');

<ToastContainer position="top-right" autoClose={2000} style={{ fontSize: '14px' }}/>
```

## 🔥 Future Enhancements
- 📅 Due Date & Reminders
- 📌 Drag & Drop Task Reordering
- 🌟 User Authentication (Login/Signup)
- 📊 Task Analytics Dashboard

## 🤝 Contributing
Feel free to contribute! Fork the repo, make your changes, and submit a PR.

## 📜 License
This project is **MIT Licensed**.

