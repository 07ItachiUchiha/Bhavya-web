import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { showNotification } = useNotification();
    const { user } = useAuth();

    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/tickets');
            console.log('Tickets response:', response.data); // Debug log
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error); // Debug log
            setError('Failed to load tickets');
            showNotification('Failed to load tickets', 'error');
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button 
                        onClick={fetchTickets}
                        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">Available Tickets</h1>
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
                            {user && (
                                <Link to="/bookings" className="text-gray-600 hover:text-black">
                                    My Bookings
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                                    <div className="bg-white p-4 rounded-b-lg">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : tickets.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No tickets available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {tickets.map(ticket => (
                                <div key={ticket._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img
                                        src={ticket.image}
                                        alt={ticket.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold">{ticket.title}</h2>
                                        <p className="text-gray-600 mt-2">{ticket.description}</p>
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm text-gray-500">
                                                <i className="fas fa-calendar-alt mr-2"></i>
                                                {new Date(ticket.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                <i className="fas fa-map-marker-alt mr-2"></i>
                                                {ticket.location}
                                            </p>
                                            <p className="text-lg font-bold">
                                                From ₹{ticket.price}
                                            </p>
                                        </div>
                                        <Link
                                            to={`/tickets/${ticket._id}/book`}
                                            className="mt-4 block w-full bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 w-full bg-white border-t">
                <div className="grid grid-cols-3 gap-1 px-2 py-2">
                    <Link to="/" className="flex flex-col items-center justify-center">
                        <i className="fas fa-home text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Home</span>
                    </Link>
                    <Link to="/tickets" className="flex flex-col items-center justify-center">
                        <i className="fas fa-ticket-alt text-custom text-xl"></i>
                        <span className="text-xs mt-1 text-custom">Tickets</span>
                    </Link>
                    {user && (
                        <Link to="/bookings" className="flex flex-col items-center justify-center">
                            <i className="fas fa-list text-gray-400 text-xl"></i>
                            <span className="text-xs mt-1 text-gray-500">My Bookings</span>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default TicketList; 