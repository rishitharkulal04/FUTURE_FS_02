# 🚀 Mini CRM Dashboard (Full Stack)

A modern, production-ready Mini CRM application built as part of the **Future Interns – Task 2** assignment.  
This project demonstrates full-stack development skills including frontend UI design, backend API development, database integration, and cloud deployment.

---

## 🌐 Live Demo

### 🔗 Frontend (Netlify)
👉 https://future-fs.netlify.app

### 🔗 Backend API (Render)
👉 https://future-fs-02-tndz.onrender.com

---

## 📌 Features

- 📊 Modern Dashboard UI
- 🍩 Donut Chart (Customer Distribution – Active / Inactive)
- ➕ Add Customer
- 📋 View Customer List
- ✏️ Edit Customer
- ❌ Delete Customer
- 🔍 Search Functionality
- 🌐 Fully Deployed (Frontend + Backend)
- 📱 Responsive Design

---

## 🛠 Tech Stack

### 💻 Frontend
- React.js
- React Router DOM
- Axios
- React Icons
- Recharts (Donut Chart)
- CSS

### 🖥 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- CORS
- dotenv

### ☁ Deployment
- Frontend → Netlify
- Backend → Render
- Database → MongoDB Atlas

---

## 📂 Project Structure

FUTURE_FS_02
├── backend
│ ├── config
│ │ └── db.js
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── .env
│ ├── package.json
│ └── server.js
│
└── frontend
├── public
├── src
│ ├── components
│ ├── services
│ ├── styles
│ ├── App.js
│ └── index.js
├── package.json
└── build


---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/rishitharkulal04/FUTURE_FS_02.git
cd FUTURE_FS_02
2️⃣ Backend Setup
cd backend
npm install
Create a .env file inside backend:

MONGO_URI=your_mongodb_connection_string
PORT=5000
Run backend:

npm run dev
Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start
Frontend runs on:

http://localhost:3000
🔌 API Endpoints
Method	Endpoint	Description
GET	/api/customers	Get all customers
POST	/api/customers	Add new customer
PUT	/api/customers/:id	Update customer
DELETE	/api/customers/:id	Delete customer
🎯 Project Highlights
Clean and modern dashboard layout

Reusable component structure

RESTful API architecture

MongoDB cloud integration

Production-level deployment

Environment variable management

Full CRUD functionality

🚀 Deployment Architecture
User → Netlify (React Frontend)
        ↓
     Render (Node/Express API)
        ↓
   MongoDB Atlas (Database)
📈 Future Improvements
🔐 Authentication (JWT)

👥 Role-based access control

📄 Pagination

📊 Advanced analytics

📁 Export to CSV / Excel

🌙 Dark mode

👨‍💻 Developer
Rishitha R kulal

GitHub:
https://github.com/rishitharkulal04
