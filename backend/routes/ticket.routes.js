const router = require('express').Router();
const auth = require('../middleware/auth');
const Exhibition = require('../models/Exhibition');

// Update ticket availability
router.patch('/exhibitions/:id/tickets/:ticketType', auth, async (req, res) => {
    try {
        const exhibition = await Exhibition.findById(req.params.id);
        
        if (!exhibition) {
            return res.status(404).json({ message: 'Exhibition not found' });
        }

        if (exhibition.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const ticket = exhibition.tickets.find(t => t.type === req.params.ticketType);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket type not found' });
        }

        const { maxQuantity, soldCount } = req.body;
        
        if (maxQuantity !== undefined) {
            ticket.maxQuantity = maxQuantity;
        }
        if (soldCount !== undefined) {
            ticket.soldCount = soldCount;
        }

        await exhibition.save();
        res.json(exhibition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Check ticket availability
router.get('/exhibitions/:id/tickets/availability', async (req, res) => {
    try {
        const exhibition = await Exhibition.findById(req.params.id);
        
        if (!exhibition) {
            return res.status(404).json({ message: 'Exhibition not found' });
        }

        const availability = exhibition.tickets.map(ticket => ({
            type: ticket.type,
            available: ticket.maxQuantity - ticket.soldCount,
            isAvailable: (ticket.maxQuantity - ticket.soldCount) > 0
        }));

        res.json(availability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 