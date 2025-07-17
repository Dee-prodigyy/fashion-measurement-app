const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to 10mb
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Also increase for urlencoded


// Routes
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
