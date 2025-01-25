import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const TicketDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { user } = useAuth();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const fetchTicket = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/tickets/${id}`);
            setTicket(response.data);
        } catch (error) {
            showNotification('Failed to load ticket details', 'error');
            navigate('/tickets');
        } finally {
            setLoading(false);
        }
    }, [id, showNotification, navigate]);

    useEffect(() => {
        fetchTicket();
    }, [fetchTicket]);

    const handleBook = async () => {
        if (!user) {
            showNotification('Please login to book tickets', 'warning');
            navigate('/login');
            return;
        }

        try {
            await api.post('/bookings', {
                ticketId: id,
                quantity: quantity
            });
            showNotification('Booking successful!', 'success');
            navigate('/bookings');
        } catch (error) {
            showNotification('Failed to book ticket', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="bg-gray-200 h-64 rounded-lg"></div>
                        <div className="mt-4 space-y-3">
                            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!ticket) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">Ticket Details</h1>
                        <div className="flex items-center space-x-8">
                            <Link to="/tickets" className="text-gray-600 hover:text-black">
                                Back to Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={ticket.image}
                            alt={ticket.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="p-6">
                            <h1 className="text-3xl font-bold">{ticket.title}</h1>
                            <p className="mt-4 text-gray-600">{ticket.description}</p>
                            
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt text-gray-400 mr-2"></i>
                                        <span>{new Date(ticket.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                        <span>{ticket.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-ticket-alt text-gray-400 mr-2"></i>
                                        <span>{ticket.availableQuantity} tickets available</span>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-2xl font-bold">₹{ticket.price}</p>
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Quantity
                                        </label>
                                        <select
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-black focus:border-black rounded-md"
                                        >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleBook}
                                        className="mt-4 w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default TicketDetails; 