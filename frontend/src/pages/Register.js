import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'attendee'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registration data:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="!rounded-button p-2">
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </Link>
                    <h1 className="flex-1 text-center text-lg font-semibold">Register</h1>
                    <div className="w-10"></div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-14 px-4">
                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-black"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                            />
                        </div>
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
                                placeholder="Create a password"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Role</label>
                            <select
                                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-black"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="attendee">Attendee</option>
                                <option value="organizer">Organizer</option>
                                <option value="exhibitor">Exhibitor</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 hover:text-blue-800">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t">
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

export default Register; 