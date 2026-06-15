const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

// Frontend serve karo
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT} ✅`);
    });
})
.catch(err => console.log(err));