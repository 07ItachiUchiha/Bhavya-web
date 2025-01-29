import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from '../context/AuthContext';
import LoginPrompt from '../components/LoginPrompt';
import { useNotification } from '../context/NotificationContext';
import api from '../services/api';
const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [ setFeaturedEvents] = useState({
        exhibitions: [],
        conferences: [],
        highlights: [],
        upcoming: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Show login prompt after 2 seconds if user is not logged in
        if (!user) {
            const timer = setTimeout(() => {
                setShowLoginPrompt(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
        fetchFeaturedEvents();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleAuthAction = () => {
        if (user) {
            handleLogout();
        } else {
            navigate('/login');
        }
    };

    const handleBooking = () => {
        if (!user) {
            showNotification('Please login to book tickets', 'info');
            navigate('/login');
            return;
        }
        navigate('/tickets');
    };

    const fetchFeaturedEvents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/events/featured');
            if (response.data.success) {
                setFeaturedEvents(response.data.featured);
            }
        } catch (error) {
            console.error('Error fetching featured events:', error);
            setError('Failed to load featured events');
        } finally {
            setLoading(false);
        }
    };

    const featuredExhibitions = [
        {
            id: 1,
            title: 'Digital India Expo',
            description: 'Annual technology conference',
            date: 'Dec 15-20, 2024',
            location: 'San Francisco, CA',
            image: 'https://picsum.photos/200/300'
        },
        {
            id: 2,
            title: 'Make in India Tech Summit',
            description: 'Standard entry ticket',
            date: 'Jan 5-10, 2025',
            location: 'Mumbai, India',
            image: 'https://picsum.photos/200/300'
        }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="pt-4">
                {/* Hero Slider */}
                <div className="relative">
                    <Slider {...sliderSettings}>
                        {featuredExhibitions.map((exhibition) => (
                            <div key={exhibition.id}>
                                <div className="relative">
                                    <img 
                                        src={exhibition.image} 
                                        alt={exhibition.title}
                                        className="w-full h-[200px] md:h-[400px] lg:h-[500px] object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-8">
                                        <div className="max-w-7xl mx-auto">
                                            <h2 className="text-white text-xl md:text-3xl font-bold">{exhibition.title}</h2>
                                            <p className="text-white/80 mt-2">{exhibition.date} | {exhibition.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                {/* Featured Exhibitions */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="py-8 md:py-12">
                        <h2 className="text-xl md:text-2xl font-semibold mb-6">Featured Exhibitions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {featuredExhibitions.map((exhibition) => (
                                <div key={exhibition.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                                    <img 
                                        src={exhibition.image} 
                                        alt={exhibition.title}
                                        className="w-full h-[120px] md:h-[160px] object-cover object-center rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-medium text-sm md:text-base">{exhibition.title}</h3>
                                        <p className="text-xs md:text-sm text-gray-500 mt-1">{exhibition.date}</p>
                                        <div className="mt-4 flex gap-2">
                                            <Link 
                                                to={`/events/${exhibition.id}`}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Learn More
                                            </Link>
                                            <button 
                                                onClick={handleBooking}
                                                className="text-sm bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <LoginPrompt 
                open={showLoginPrompt} 
                onClose={() => setShowLoginPrompt(false)} 
            />
        </div>
    );
};

export default Home; 