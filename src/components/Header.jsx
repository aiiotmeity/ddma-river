import React, { useState, useEffect } from 'react';
import { CloudSun, Bell, Search, Globe, Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <header>
            {/* Top Info Bar */}
            <div className="bg-blue-950 text-black text-xs py-2 px-4" style={{ backgroundColor: '#ffff' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <Globe size={14} />
                            <span className="font-semibold">Ministry of Earth Sciences, Government of India</span>
                        </span>
                        <span className="opacity-70">|</span>
                        <span className="flex items-center gap-2 opacity-80">
                            <Phone size={12} />
                            Helpline: 1800-XXX-XXXX
                        </span>
                        <span className="flex items-center gap-2 opacity-80">
                            <Mail size={12} />
                            support@periyarmonitoring.gov.in
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-mono font-semibold">{formatTime(currentTime)}</span>
                        <span className="opacity-70">|</span>
                        <span className="opacity-80">{formatDate(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Main Branding Bar */}
            <div className="bg-blue-900 text-white py-5 shadow-lg" style={{ backgroundColor: '#172554' }}>
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-5">
                        {/* Government Emblem */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            alt="Government of India"
                            className="h-16 w-16 brightness-0 invert"
                        />
                        <div className="border-l-2 border-blue-700 pl-5">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Integrated Weather & River Monitoring System
                            </h1>
                            <p className="text-sm opacity-90 mt-1 flex items-center gap-2">
                                <MapPin size={14} />
                                Periyar River Basin & Bhoothankett Dam
                            </p>
                            <p className="text-xs opacity-75 mt-1">
                                Real-time monitoring and decision-support system for weather, river basins, and disaster management operations
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-blue-800 rounded-full transition-colors relative" title="Notifications">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                        <button className="p-2 hover:bg-blue-800 rounded-full transition-colors" title="Search">
                            <Search size={20} />
                        </button>
                        <div className="border-l border-blue-700 pl-3 ml-2">
                            <select className="bg-blue-800 text-white text-xs px-3 py-1.5 rounded border border-blue-700 hover:bg-blue-700 transition-colors cursor-pointer">
                                <option>English</option>
                                <option>हिंदी</option>
                                <option>മലയാളം</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="container mx-auto">
                    <nav className="flex justify-between items-center">
                        <div className="flex gap-1">
                            <a href="/" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-blue-900 border-b-3 border-blue-600 transition-colors">
                                Home
                            </a>
                            <a href="#" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-gray-700 border-b-3 border-transparent hover:border-blue-400 transition-colors">
                                Live Data
                            </a>
                            <a href="#" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-gray-700 border-b-3 border-transparent hover:border-blue-400 transition-colors">
                                Analytics
                            </a>
                            <a href="#" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-gray-700 border-b-3 border-transparent hover:border-blue-400 transition-colors">
                                Maps
                            </a>
                            <div className="relative group">
                                <button className="px-5 py-3.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
                                    PORTALS <span className="text-xs">▼</span>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 w-72 bg-white shadow-2xl rounded-b-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                                    <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                                        <p className="text-xs font-semibold text-blue-900">Authorized Access Only</p>
                                    </div>
                                    <div className="p-2">
                                        <a href="/login" className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded text-gray-800 text-sm transition-colors group/item border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🏛️</span>
                                                <div>
                                                    <p className="font-semibold">Bhoothankett Dam Portal</p>
                                                    <p className="text-xs text-gray-500">Dam Authority Access</p>
                                                </div>
                                            </div>
                                            <span className="text-blue-600 group-hover/item:text-blue-800">→</span>
                                        </a>
                                        <a href="/login" className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded text-gray-800 text-sm transition-colors group/item border-b border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🚨</span>
                                                <div>
                                                    <p className="font-semibold">DDMA Portal</p>
                                                    <p className="text-xs text-gray-500">Disaster Management</p>
                                                </div>
                                            </div>
                                            <span className="text-blue-600 group-hover/item:text-blue-800">→</span>
                                        </a>
                                        <a href="/login" className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded text-gray-800 text-sm transition-colors group/item">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg">🎓</span>
                                                <div>
                                                    <p className="font-semibold">Research Portal</p>
                                                    <p className="text-xs text-gray-500">Academic & Research</p>
                                                </div>
                                            </div>
                                            <span className="text-blue-600 group-hover/item:text-blue-800">→</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-gray-700 border-b-3 border-transparent hover:border-blue-400 transition-colors">
                                Resources
                            </a>
                            <a href="#" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-gray-700 border-b-3 border-transparent hover:border-blue-400 transition-colors">
                                About
                            </a>
                            <a href="#" className="px-5 py-3.5 text-sm font-semibold hover:bg-blue-50 text-gray-700 border-b-3 border-transparent hover:border-blue-400 transition-colors">
                                Contact
                            </a>
                        </div>

                    </nav>
                </div>
            </div>

            {/* Alert Banner (Optional - can be conditionally rendered) */}
            <div className="bg-orange-50 border-b border-orange-200">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">ALERT</span>
                            <p className="text-sm text-orange-900">
                                <span className="font-semibold">Weather Advisory:</span> Heavy rainfall expected in the next 24-48 hours. Monitor updates regularly.
                            </p>
                        </div>
                        <a href="#" className="text-xs font-semibold text-orange-700 hover:text-orange-900 underline">
                            View Details →
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
