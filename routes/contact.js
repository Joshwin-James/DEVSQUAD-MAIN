const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
