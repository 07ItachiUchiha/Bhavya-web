import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImageLoader } from '../hooks/useImageLoader';

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'attendee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
    });

    const [bookings, setBookings] = useState([]);
    const { loadedImage, isLoading } = useImageLoader(userProfile.avatar);

    useEffect(() => {
        // TODO: Fetch user profile and bookings
        fetchUserProfile();
        fetchUserBookings();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUserProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchUserBookings = async () => {
        try {
            const response = await fetch('/api/bookings', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

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
                            <Link to="/profile" className="text-black">Profile</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="!rounded-button p-2">
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </Link>
                    <h1 className="flex-1 text-center text-lg font-semibold">Profile</h1>
                    <button className="p-2">
                        <i className="fas fa-cog text-gray-700"></i>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 md:pt-20 pb-20 md:pb-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Profile Header */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
                            <div className="absolute -bottom-16 left-4">
                                <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                                    {isLoading ? (
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                    ) : (
                                        <img 
                                            src={loadedImage} 
                                            alt={userProfile.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="pt-16 pb-4 px-4">
                            <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                            <p className="text-gray-600">{userProfile.email}</p>
                            <p className="text-sm text-gray-500 capitalize">{userProfile.role}</p>
                        </div>
                    </div>

                    {/* Upcoming Bookings */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Your Bookings</h3>
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{booking.eventName}</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {new Date(booking.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Ticket Type: {booking.ticketType}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            booking.status === 'confirmed' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <p className="text-sm font-medium">
                                            Total: ₹{booking.amount}
                                        </p>
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t md:hidden">
                <div className="grid grid-cols-3 gap-1 px-2 py-2">
                    <Link to="/" className="flex flex-col items-center justify-center">
                        <i className="fas fa-home text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Home</span>
                    </Link>
                    <Link to="/events" className="flex flex-col items-center justify-center">
                        <i className="fas fa-calendar text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Exhibitions</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center justify-center">
                        <i className="fas fa-user text-custom text-xl"></i>
                        <span className="text-xs mt-1 text-custom">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Profile;