import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const featuredExhibitions = [
        {
            id: 1,
            title: 'Digital India Expo',
            description: 'Annual technology conference',
            date: 'Dec 15-20, 2024',
            location: 'San Francisco, CA',
            image: 'https://source.unsplash.com/800x400/?technology,exhibition'
        },
        {
            id: 2,
            title: 'Make in India Tech Summit',
            description: 'Standard entry ticket',
            date: 'Jan 5-10, 2025',
            location: 'Mumbai, India',
            image: 'https://source.unsplash.com/800x400/?india,technology'
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
            {/* Mobile Navigation */}
            <nav className="fixed top-0 w-full bg-white shadow-sm z-50 md:hidden">
                <div className="px-4 py-3 flex justify-between items-center">
                    <h1 className="font-['Pacifico'] text-2xl text-custom">Exhibition Hub</h1>
                    <button className="text-gray-600 md:hidden">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </nav>

            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">Exhibition Hub</h1>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-black">Home</Link>
                            <Link to="/events" className="text-gray-600 hover:text-black">Exhibitions</Link>
                            <Link to="/tickets" className="text-gray-600 hover:text-black">Tickets</Link>
                            <Link to="/profile" className="text-gray-600 hover:text-black">Profile</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 md:pt-16">
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
                                <div key={exhibition.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
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
                                            <Link 
                                                to={`/events/${exhibition.id}/book`}
                                                className="text-sm bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t md:hidden">
                <div className="grid grid-cols-4 gap-1 px-2 py-2">
                    <Link to="/" className="flex flex-col items-center justify-center">
                        <i className="fas fa-home text-custom text-xl"></i>
                        <span className="text-xs mt-1 text-custom">Home</span>
                    </Link>
                    <Link to="/events" className="flex flex-col items-center justify-center">
                        <i className="fas fa-calendar text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Exhibitions</span>
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

export default Home; 