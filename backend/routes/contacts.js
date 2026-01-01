const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required' });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message: message || ''
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('DELETE request received for ID:', id);
    
    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid ObjectId format:', id);
      return res.status(400).json({ message: 'Invalid contact ID format' });
    }
    
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      console.log('Contact not found with ID:', id);
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    console.log('Contact deleted successfully:', deletedContact._id);
    res.json({ message: 'Contact deleted successfully', contact: deletedContact });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});

module.exports = router;

