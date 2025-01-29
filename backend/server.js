require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check
app.get('/health', (_, res) => {
    res.json({ 
        status: 'ok', 
        server: 'running',
        timestamp: new Date().toISOString()
    });
});

// Add this before your routes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        query: req.query,
        body: req.body
    });
    next();
});

// Routes
const loadRoutes = () => {
    // Essential routes that must exist
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/admin', require('./routes/adminRoutes'));

    // Optional routes with graceful fallback
    const optionalRoutes = [
        { path: '/api/events', module: './routes/eventRoutes' },
        { path: '/api/tickets', module: './routes/ticketRoutes' },
        { path: '/api/payments', module: './routes/paymentRoutes' },
        { path: '/api/profile', module: './routes/profileRoutes' }
    ];

    optionalRoutes.forEach(route => {
        try {
            const routeModule = require(route.module);
            app.use(route.path, routeModule);
        } catch (error) {
            console.warn(`Route ${route.path} is not available:`, error.message);
        }
    });
};

// Use the function in your server setup
try {
    loadRoutes();
} catch (error) {
    console.error('Error loading routes:', error);
}

// Error handling middleware (should be after routes)
app.use(errorHandler);

// 404 handler (should be after routes but before error handler)
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
});

// Start server
const startServer = async () => {
    try {
        await connectDB();
        const PORT = process.env.PORT || 5000;
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`MongoDB connected`);
            console.log(`CORS enabled for origin: ${process.env.CORS_ORIGIN}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Add this after your dotenv config to verify
console.log('Environment Check:', {
    NODE_ENV: process.env.NODE_ENV,
    CLOUDINARY_CONFIGURED: !!process.env.CLOUDINARY_CLOUD_NAME
});

startServer(); 