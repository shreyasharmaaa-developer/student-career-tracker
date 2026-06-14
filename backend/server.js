const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require("./routes/students");
app.use("/api/students", studentRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    family: 4
})
.then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT} ✅`);
    });
})
.catch(err => console.log(err));