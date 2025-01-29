const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Public routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.get('/featured', eventController.getFeaturedEvents);

module.exports = router; 