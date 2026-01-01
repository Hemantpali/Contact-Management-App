const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contactmanagement')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/contacts', require('./routes/contacts'));

// Debug: Log all registered routes
console.log('Registered routes:');
console.log('  GET    /api/contacts');
console.log('  POST   /api/contacts');
console.log('  DELETE /api/contacts/:id');

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Contact Management API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

