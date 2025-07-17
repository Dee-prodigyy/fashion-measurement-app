const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    default: 'Male'
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  style: {
    type: String,
    default: ''
  },
  styleImage: {
    type: String,
    default: ''
  },
  measurements: {
    bust: String,
    waist: String,
    hips: String,
    inseam: String,
    // Add more if needed
  },
  image: String, // base64-encoded image
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);