# 🎓 Admission Management System

This is a full-stack web application for managing admissions built using:

- **Frontend**: React.js + TailwindCSS
- **Backend**: Node.js + Express.js + MongoDB

## ✨ Features

- Enquiry form submission with popup UI
- Convert enquiries into applications
- Admin dashboard:
  - Count of enquiries, applications, and students
  - Approve/Reject applications
- Auto student creation on approval
- Email notifications for:
  - Enquiry submission
  - Application approval




🚀 Getting Started
Prerequisites

Node.js (v14 or higher) 📦
MongoDB (local or cloud) 🍃
npm package manager 📋

1️⃣ Clone Repository
bash git clone https://github.com/your-username/admission-system.git
cd admission-system
2️⃣ Backend Setup
bash cd server
npm install
Create .env file in server/ directory:
env files:
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password 
Start backend server:
bash npm run dev

3️⃣ Frontend Setup
Open new terminal:
bash cd ../client
npm install
npm start




🎯 Application Flow

📝 Student Submits Enquiry
           ↓
📧 Email Notification Sent
           ↓
👨‍💼 Admin Reviews Enquiry
           ↓
🔄 Convert to Application
           ↓
✅ Approve Application
           ↓
🎓 Student Auto-Created
           ↓
📬 Approval Email Sent




🧪 Technologies Used

React.js

TailwindCSS

Express.js

MongoDB + Mongoose

Nodemailer

