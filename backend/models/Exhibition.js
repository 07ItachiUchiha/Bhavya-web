const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: String,
    maxQuantity: {
        type: Number,
        default: 100
    },
    soldCount: {
        type: Number,
        default: 0
    }
});

const exhibitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    location: {
        venue: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['technology', 'business', 'art', 'science', 'other']
    },
    tickets: [ticketSchema],
    status: {
        type: String,
        enum: ['draft', 'published', 'cancelled', 'completed'],
        default: 'draft'
    },
    featured: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String,
        trim: true
    }],
    capacity: {
        type: Number,
        required: true
    },
    registeredCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Virtual for checking if exhibition is sold out
exhibitionSchema.virtual('isSoldOut').get(function() {
    return this.registeredCount >= this.capacity;
});

// Virtual for checking if exhibition is ongoing
exhibitionSchema.virtual('isOngoing').get(function() {
    const now = new Date();
    return now >= this.date.start && now <= this.date.end;
});

// Index for searching
exhibitionSchema.index({ title: 'text', description: 'text', 'location.city': 'text' });

module.exports = mongoose.model('Exhibition', exhibitionSchema); 