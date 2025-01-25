const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const sampleTickets = require('../data/sampleTickets');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const seedTickets = async () => {
    try {
        // Clear existing tickets
        await Ticket.deleteMany({});
        console.log('Cleared existing tickets');

        // Insert sample tickets
        const tickets = await Ticket.insertMany(sampleTickets);
        console.log(`Inserted ${tickets.length} tickets`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding tickets:', error);
        mongoose.connection.close();
    }
};

seedTickets(); 