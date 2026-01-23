import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Siren, GraduationCap, ChevronRight } from 'lucide-react';

const AuthorityCard = ({ icon: Icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center justify-between group text-left"
    >
        <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Icon size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-800 transition-colors">{title}</h3>
        </div>
        <ChevronRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
    </button>
);

const SupportedAuthorities = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login');
    };

    return (
        <section className="bg-gray-50 py-12 border-t border-gray-200">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-blue-900 mb-8 px-2">Supported Authorities</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <AuthorityCard
                        icon={Building2}
                        title="Bhoothankett Dam Authority"
                        onClick={handleRedirect}
                    />
                    <AuthorityCard
                        icon={Siren}
                        title="District Disaster Management Authority"
                        onClick={handleRedirect}
                    />
                    <AuthorityCard
                        icon={GraduationCap}
                        title="Research & Academic Institutions"
                        onClick={handleRedirect}
                    />
                </div>
            </div>
        </section>
    );
};

export default SupportedAuthorities;
