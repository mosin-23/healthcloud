// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');
const userRoutes = require('./routes/authRoutes');
const uploadRoute=require('./contoller/upload')
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/patients', patientRoutes);
app.use('/users',userRoutes)
app.use('/data', uploadRoute);
// Root route
app.get('/', (req, res) => {
  res.send('Healthcare Backend API is Running 🚑');
});

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("Connected to MongoDB")
  app.listen(process.env.PORT||8000,()=>{
      console.log('Running on port 8000')
  })
})
.catch((err)=>{console.log(err)});