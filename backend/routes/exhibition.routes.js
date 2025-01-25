const router = require('express').Router();
const auth = require('../middleware/auth');
const Exhibition = require('../models/Exhibition');

// Get all exhibitions with filters
router.get('/', async (req, res) => {
    try {
        const {
            category,
            city,
            date,
            featured,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        if (category) query.category = category;
        if (city) query['location.city'] = city;
        if (featured) query.featured = featured === 'true';
        if (search) {
            query.$text = { $search: search };
        }
        if (date) {
            const searchDate = new Date(date);
            query['date.start'] = { $lte: searchDate };
            query['date.end'] = { $gte: searchDate };
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { 'date.start': 1 },
            populate: {
                path: 'organizer',
                select: 'name email'
            }
        };

        const exhibitions = await Exhibition.paginate(query, options);
        res.json(exhibitions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single exhibition
router.get('/:id', async (req, res) => {
    try {
        const exhibition = await Exhibition.findById(req.params.id)
            .populate('organizer', 'name email');
        
        if (!exhibition) {
            return res.status(404).json({ message: 'Exhibition not found' });
        }
        
        res.json(exhibition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create exhibition (organizer only)
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'organizer' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only organizers can create exhibitions' });
        }

        const exhibition = new Exhibition({
            ...req.body,
            organizer: req.user._id
        });

        await exhibition.save();
        res.status(201).json(exhibition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update exhibition
router.patch('/:id', auth, async (req, res) => {
    try {
        const exhibition = await Exhibition.findById(req.params.id);
        
        if (!exhibition) {
            return res.status(404).json({ message: 'Exhibition not found' });
        }

        if (exhibition.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to update this exhibition' });
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'image', 'date', 'location', 'tickets', 'status', 'capacity'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        updates.forEach(update => exhibition[update] = req.body[update]);
        await exhibition.save();

        res.json(exhibition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete exhibition
router.delete('/:id', auth, async (req, res) => {
    try {
        const exhibition = await Exhibition.findById(req.params.id);
        
        if (!exhibition) {
            return res.status(404).json({ message: 'Exhibition not found' });
        }

        if (exhibition.organizer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this exhibition' });
        }

        await exhibition.remove();
        res.json({ message: 'Exhibition deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get exhibitions by organizer
router.get('/organizer/:organizerId', async (req, res) => {
    try {
        const exhibitions = await Exhibition.find({ organizer: req.params.organizerId })
            .sort({ 'date.start': 1 });
        res.json(exhibitions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 