# 🎓 Student Career Tracker

A full stack web app to track student placement status.

## Features
- Add / Edit / Delete students
- Track placement progress
- Dark mode
- Search students
- Data saved in MongoDB Atlas (cloud database)

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Project Structure

Student Career Tracker/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Student.js
│   └── routes/
│       └── students.js
├── .env
├── .gitignore
├── package.json
└── README.md

## How to Run

1. Clone the repo
git clone https://github.com/shreyasharmaaa-developer/student-career-tracker.git

2. Install dependencies
npm install

3. Create .env file in root folder
PORT=5000
MONGO_URI=your_mongodb_connection_string

4. Start server
node backend/server.js

5. Open frontend/index.html in browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| POST | /api/students | Add new student |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

## Author
Shreya Sharma
