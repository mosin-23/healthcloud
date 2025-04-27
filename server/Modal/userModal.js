const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'staff','admin'],
    default: 'patient'
  },
  phoneno: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Ensure phone number is exactly 10 digits
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password:{
    type:String,
    required:true
  },
  qualification: {
    type: String,
    trim: true,
    default: null
  },
  experience: {
    type: String,
    trim: true,
    default: null
  },
  specialization: {
    type: String,
    trim: true,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
