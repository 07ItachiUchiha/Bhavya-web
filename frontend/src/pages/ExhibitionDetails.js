import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import PaymentForm from '../components/PaymentForm';
import BookingConfirmation from '../components/BookingConfirmation';
import { bookingService } from '../services/bookingService';
import api from '../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const ExhibitionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showNotification } = useNotification();
    
    const [exhibition, setExhibition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingStep, setBookingStep] = useState('details'); // details, payment, confirmation
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        fetchExhibitionDetails();
    }, [id]);

    const fetchExhibitionDetails = async () => {
        try {
            const response = await api.get(`/exhibitions/${id}`);
            setExhibition(response.data);
        } catch (error) {
            showNotification('Failed to load exhibition details', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleTicketSelection = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handleQuantityChange = (value) => {
        setQuantity(Math.max(1, Math.min(10, value)));
    };

    const proceedToPayment = () => {
        if (!selectedTicket) {
            showNotification('Please select a ticket type', 'error');
            return;
        }
        setBookingStep('payment');
    };

    const handlePaymentSuccess = async (paymentMethod) => {
        try {
            const bookingData = {
                exhibitionId: exhibition._id,
                ticketType: selectedTicket.type,
                quantity,
                amount: selectedTicket.price * quantity,
                paymentMethodId: paymentMethod.id
            };

            const newBooking = await bookingService.createBooking(bookingData);
            setBooking(newBooking);
            setBookingStep('confirmation');
            showNotification('Booking successful!', 'success');
        } catch (error) {
            showNotification('Payment failed: ' + error.message, 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (bookingStep === 'confirmation' && booking) {
        return <BookingConfirmation booking={booking} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">Exhibition Hub</h1>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
                            <Link to="/events" className="text-gray-600 hover:text-black">Exhibitions</Link>
                            <Link to="/profile" className="text-gray-600 hover:text-black">Profile</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 md:pt-20 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Exhibition Details */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img 
                            src={exhibition.image} 
                            alt={exhibition.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                        <div className="p-6">
                            <h1 className="text-2xl md:text-3xl font-bold">{exhibition.title}</h1>
                            <p className="text-gray-600 mt-2">{exhibition.description}</p>
                            
                            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Date</p>
                                    <p className="font-medium">{new Date(exhibition.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-medium">{exhibition.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Organizer</p>
                                    <p className="font-medium">{exhibition.organizer}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Section */}
                    {bookingStep === 'details' ? (
                        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Select Tickets</h2>
                            <div className="space-y-4">
                                {exhibition.tickets.map((ticket) => (
                                    <div 
                                        key={ticket.type}
                                        className={`p-4 border rounded-lg cursor-pointer ${
                                            selectedTicket?.type === ticket.type 
                                                ? 'border-black' 
                                                : 'border-gray-200'
                                        }`}
                                        onClick={() => handleTicketSelection(ticket)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-medium">{ticket.type}</h3>
                                                <p className="text-sm text-gray-600">{ticket.description}</p>
                                            </div>
                                            <p className="font-bold">₹{ticket.price}</p>
                                        </div>
                                    </div>
                                ))}

                                {selectedTicket && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(quantity - 1)}
                                                className="p-2 border rounded-lg"
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="font-medium">{quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(quantity + 1)}
                                                className="p-2 border rounded-lg"
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-gray-600">Total Amount</span>
                                        <span className="text-2xl font-bold">
                                            ₹{selectedTicket ? selectedTicket.price * quantity : 0}
                                        </span>
                                    </div>
                                    <button
                                        onClick={proceedToPayment}
                                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                                    >
                                        Proceed to Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">Payment</h2>
                            <Elements stripe={stripePromise}>
                                <PaymentForm
                                    amount={selectedTicket.price * quantity}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(error) => showNotification(error.message, 'error')}
                                />
                            </Elements>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExhibitionDetails; 