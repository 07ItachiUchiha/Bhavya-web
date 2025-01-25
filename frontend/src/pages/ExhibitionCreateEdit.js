import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import ExhibitionForm from '../components/ExhibitionForm';
import api from '../services/api';

const ExhibitionCreateEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [exhibition, setExhibition] = useState(null);
    const [loading, setLoading] = useState(id ? true : false);

    useEffect(() => {
        if (id) {
            const fetchExhibition = async () => {
                try {
                    const response = await api.get(`/exhibitions/${id}`);
                    setExhibition(response.data);
                } catch (error) {
                    showNotification('Failed to load exhibition', 'error');
                    navigate('/dashboard');
                } finally {
                    setLoading(false);
                }
            };
            
            fetchExhibition();
        }
    }, [id, showNotification, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Navigation */}
            <nav className="hidden md:block fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="font-['Pacifico'] text-2xl text-custom">
                            {id ? 'Edit Exhibition' : 'Create Exhibition'}
                        </h1>
                        <Link
                            to="/dashboard"
                            className="text-gray-600 hover:text-black"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <nav className="md:hidden fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="px-4 py-3 flex justify-between items-center">
                    <Link to="/dashboard" className="!rounded-button p-2">
                        <i className="fas fa-arrow-left text-gray-700"></i>
                    </Link>
                    <h1 className="text-lg font-semibold">
                        {id ? 'Edit Exhibition' : 'Create Exhibition'}
                    </h1>
                    <div className="w-10"></div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="pt-16 md:pt-20 pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <ExhibitionForm exhibition={exhibition} />
                </div>
            </div>
        </div>
    );
};

export default ExhibitionCreateEdit; 