const User = require('../Modal/userModal'); // Assuming you save User model in models directory
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, phoneno, password, role = 'patient' } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({ name, email, phoneno, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Log in user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare hashed password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get all users (admin or authorized only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById
};
