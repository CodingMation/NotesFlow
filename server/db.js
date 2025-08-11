require('dotenv').config();
const mongoose = require('mongoose');


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

mongoose.connection.on("connected",()=> console.log("MongoDB on"))
mongoose.connection.on("error",()=> console.log("MongoDB off"))

module.exports = mongoose