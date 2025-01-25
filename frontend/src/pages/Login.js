import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login data:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Navigation */}
            <nav className="fixed top-0 w-full bg-white shadow-sm z-50 md:hidden">
                <div className="px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="!rounded-button p-2">
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </Link>
                    <h1 className="flex-1 text-center text-lg font-semibold">Login</h1>
                    <div className="w-10"></div>
                </div>
            </nav>

            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">Exhibition Hub</h1>
                        <div className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
                            <Link to="/events" className="text-gray-600 hover:text-black">Exhibitions</Link>
                            <Link to="/products" className="text-gray-600 hover:text-black">Products</Link>
                            <Link to="/profile" className="text-gray-600 hover:text-black">Profile</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 md:pt-24">
                <div className="max-w-md mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-center mb-6 md:mb-8">Welcome Back</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-black"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-black"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                                    Forgot Password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Login
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-600 hover:text-blue-800">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t md:hidden">
                <div className="grid grid-cols-4 gap-1 px-2 py-2">
                    <Link to="/" className="flex flex-col items-center justify-center">
                        <i className="fas fa-home text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Home</span>
                    </Link>
                    <Link to="/events" className="flex flex-col items-center justify-center">
                        <i className="fas fa-calendar text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Exhibitions</span>
                    </Link>
                    <Link to="/products" className="flex flex-col items-center justify-center">
                        <i className="fas fa-box text-gray-400 text-xl"></i>
                        <span className="text-xs mt-1 text-gray-500">Products</span>
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

export default Login; 