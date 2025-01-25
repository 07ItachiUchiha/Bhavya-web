const router = require('express').Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'name email');
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create event (protected route)
router.post('/', auth, async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            organizer: req.user.id
        });
        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router; 