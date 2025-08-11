require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const db = require('./db')

const userRoute = require('./routes/users/user')
const noteRoute = require('./routes/notes/note')
// Routes
app.use("/api/auth",userRoute)
// Notes CRUD
app.use("/api/notes",noteRoute)


app.get('/',(req,res)=>res.send("Hello from server"))

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));