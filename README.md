# 🎓 Student Career Tracker

A full-stack web application to track and manage student placement status — built with Node.js, Express, and MongoDB Atlas.

🔗 **Live Demo:** [student-career-tracker.onrender.com](https://student-career-tracker.onrender.com)

---

## ✨ Features

- 📊 **Analytics Dashboard** — Real-time placement stats with Doughnut & Bar charts
- ➕ **Add / Edit / Delete** students with instant UI updates
- 🔍 **Search** students by name
- 📈 **Placement Progress Bar** — visual progress tracker
- 🌙 **Dark Mode** toggle
- ☁️ **Cloud Database** — data persists via MongoDB Atlas
- 📱 **Responsive Design** — works on all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Render |

---

## 📁 Project Structure

```
student-career-tracker/
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
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/shreyasharmaaa-developer/student-career-tracker.git
cd student-career-tracker

# 2. Install dependencies
npm install

# 3. Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string

# 4. Start the server
node backend/server.js
```

Open `http://localhost:5000` in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| POST | `/api/students` | Add new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |

---

## 👩‍💻 Author

**Shreya Sharma**
- GitHub: [@shreyasharmaaa-developer](https://github.com/shreyasharmaaa-developer)