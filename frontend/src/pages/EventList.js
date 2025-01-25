import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
    const [events] = useState([
        {
            id: 1,
            title: 'Digital India Expo',
            date: 'Dec 15-20, 2024',
            location: 'Mumbai, India',
            image: 'https://source.unsplash.com/800x400/?technology,exhibition',
            price: '₹299'
        },
        {
            id: 2,
            title: 'Tech Innovation Summit',
            date: 'Jan 5-10, 2025',
            location: 'Bangalore, India',
            image: 'https://source.unsplash.com/800x400/?innovation,technology',
            price: '₹399'
        },
        {
            id: 3,
            title: 'AI & ML Conference',
            date: 'Feb 15-17, 2025',
            location: 'Delhi, India',
            image: 'https://source.unsplash.com/800x400/?artificial,intelligence',
            price: '₹499'
        }
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation - Hide on desktop */}
            <nav className="fixed top-0 w-full bg-white shadow-sm z-50 md:hidden">
                <div className="px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="!rounded-button p-2">
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </Link>
                    <h1 className="flex-1 text-center text-lg font-semibold">Exhibitions</h1>
                    <button className="p-2">
                        <i className="fas fa-search text-gray-700"></i>
                    </button>
                </div>
            </nav>

            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">Exhibition Hub</h1>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
                            <Link to="/events" className="text-custom">Exhibitions</Link>
                            <Link to="/tickets" className="text-gray-600 hover:text-black">Tickets</Link>
                            <Link to="/profile" className="text-gray-600 hover:text-black">Profile</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 px-4 md:pt-20 md:px-8 lg:px-0 max-w-7xl mx-auto">
                {/* Filters */}
                <div className="py-4 flex gap-2 overflow-x-auto scrollbar-hide md:justify-center">
                    <button className="px-4 py-2 bg-black text-white rounded-full text-sm whitespace-nowrap">
                        All Events
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm whitespace-nowrap border hover:bg-gray-50">
                        Technology
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm whitespace-nowrap border hover:bg-gray-50">
                        Business
                    </button>
                    <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm whitespace-nowrap border hover:bg-gray-50">
                        Art & Design
                    </button>
                </div>

                {/* Event List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 md:pb-8">
                    {events.map((event) => (
                        <Link to={`/events/${event.id}`} key={event.id} className="transform transition-transform hover:-translate-y-1">
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <img 
                                    src={event.image} 
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{event.title}</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <i className="fas fa-calendar-alt w-5"></i>
                                            {event.date}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <i className="fas fa-map-marker-alt w-5"></i>
                                            {event.location}
                                        </p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <i className="fas fa-ticket-alt w-5"></i>
                                            From {event.price}
                                        </p>
                                    </div>
                                    <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Navigation - Mobile only */}
            <nav className="fixed bottom-0 w-full bg-white border-t md:hidden">
                <div className="grid grid-cols-4 gap-1 px-2 py-2">
                    <Link to="/" className="flex flex-col items-center justify-center">
                        <i className="fas fa-home text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Home</span>
                    </Link>
                    <Link to="/events" className="flex flex-col items-center justify-center">
                        <i className="fas fa-calendar text-custom text-xl"></i>
                        <span className="text-xs mt-1 text-custom">Exhibitions</span>
                    </Link>
                    <Link to="/tickets" className="flex flex-col items-center justify-center">
                        <i className="fas fa-ticket-alt text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Tickets</span>
                    </Link>
                    <Link to="/profile" className="flex flex-col items-center justify-center">
                        <i className="fas fa-user text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default EventList; 