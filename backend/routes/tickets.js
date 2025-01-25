const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ date: 1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tickets' });
    }
});

// Get single ticket
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ticket' });
    }
});

// Create ticket (protected route)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, date, location, price, availableQuantity, image } = req.body;
        const ticket = new Ticket({
            title,
            description,
            date,
            location,
            price,
            availableQuantity,
            image
        });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Error creating ticket' });
    }
});

// Update ticket (protected route)
router.put('/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(400).json({ message: 'Error updating ticket' });
    }
});

// Delete ticket (protected route)
router.delete('/:id', auth, async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket' });
    }
});

module.exports = router; 