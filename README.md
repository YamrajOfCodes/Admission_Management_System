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

## 📁 Project Structure

client/ # React frontend
└── src/
├── components/
├── pages/
└── App.js
server/ # Node.js backend
├── controllers/
├── models/
├── routes/
└── server.js

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/admission-system.git
cd admission-system
2. Setup Backend
bash
Copy
Edit
cd server
npm install
Create .env file in server/
ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
bash
Copy
Edit
npm run dev
3. Setup Frontend
bash
Copy
Edit
cd ../client
npm install
npm start
🔗 API Endpoints
POST /api/enquiries – Submit enquiry

GET /api/enquiries – List enquiries

POST /api/applications – Create application

PUT /api/applications/:id – Approve/reject application

GET /api/dashboard/counts – Dashboard metrics

🧪 Technologies Used
React.js

TailwindCSS

Express.js

MongoDB + Mongoose

Nodemailer

