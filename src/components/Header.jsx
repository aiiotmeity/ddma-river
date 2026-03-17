import React, { useState, useEffect } from 'react';
import { CloudSun, Bell, Search, Globe, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

const Header = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobilePortalsOpen, setMobilePortalsOpen] = useState(false);

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
            {/* Top Info Bar - Hidden on mobile */}
            <div className="bg-blue-950 text-black text-xs py-2 px-4 hidden md:block" style={{ backgroundColor: '#ffff' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
                        <span className="flex items-center gap-2">
                            <Globe size={14} />
                            <span className="font-semibold text-xs lg:text-sm">Ministry of Electronics and Information Technology</span>
                        </span>
                        <span className="opacity-70 hidden lg:inline">|</span>
                        <span className="flex items-center gap-2 opacity-80 text-xs">
                            <Phone size={12} />
                            <span className="hidden lg:inline">Helpline: 1800-XXX-XXXX</span>
                            <span className="lg:hidden">1800-XXX-XXXX</span>
                        </span>
                        <span className="hidden lg:flex items-center gap-2 opacity-80 text-xs">
                            <Mail size={12} />
                            support@periyarmonitoring.gov.in
                        </span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4 text-xs">
                        <span className="font-mono font-semibold">{formatTime(currentTime)}</span>
                        <span className="opacity-70 hidden lg:inline">|</span>
                        <span className="opacity-80 hidden lg:inline">{formatDate(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Main Branding Bar */}
            <div className="bg-blue-900 text-white py-3 md:py-5 shadow-lg" style={{ backgroundColor: '#172554' }}>
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-3 md:gap-5">
                            {/* Site Logo (wrap for consistent shape & padding) */}
                            <div className="bg-white rounded-full p-1 md:p-2 shadow-sm flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="Center for AI-IoT Innovation"
                                    className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover"
                                />
                            </div>
                        <div className="border-l-2 border-blue-700 pl-3 md:pl-5">
                            <h1 className="text-sm md:text-2xl lg:text-3xl font-bold tracking-tight">
                                Integrated Weather & River Monitoring System
                            </h1>
                            <p className="text-xs md:text-sm opacity-90 mt-0.5 md:mt-1 flex items-center gap-2">
                                <MapPin size={12} className="md:w-4 md:h-4" />
                                Periyar River Basin & Bhoothankett Dam
                            </p>
                            <p className="text-[10px] md:text-xs opacity-75 mt-0.5 md:mt-1 hidden md:block">
                                Real-time monitoring and decision-support system for weather, river basins, and disaster management operations
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="p-1.5 md:p-2 hover:bg-blue-800 rounded-full transition-colors relative" title="Notifications">
                            <Bell size={16} className="md:w-5 md:h-5" />
                            <span className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>
                        <button className="p-1.5 md:p-2 hover:bg-blue-800 rounded-full transition-colors hidden md:block" title="Search">
                            <Search size={20} />
                        </button>
                        <div className="border-l border-blue-700 pl-2 md:pl-3 ml-1 md:ml-2 hidden md:block">
                            <select className="bg-blue-800 text-white text-xs px-2 md:px-3 py-1 md:py-1.5 rounded border border-blue-700 hover:bg-blue-700 transition-colors cursor-pointer">
                                <option>English</option>
                                <option>हिंदी</option>
                                <option>മലയാളം</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar - Desktop */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="container mx-auto">
                    <nav className="flex justify-between items-center">
                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex gap-1">
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

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden w-full flex justify-between items-center px-4 py-3">
                            <span className="text-sm font-bold text-gray-800">Menu</span>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Navigation Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                            <div className="py-2">
                                <a href="/" className="block px-4 py-3 text-sm font-semibold text-blue-900 bg-blue-50 border-l-4 border-blue-600">
                                    Home
                                </a>
                                <a href="#" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                                    Live Data
                                </a>
                                <a href="#" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                                    Analytics
                                </a>
                                <a href="#" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                                    Maps
                                </a>

                                {/* Mobile Portals Dropdown */}
                                <div className="border-t border-gray-100">
                                    <button
                                        onClick={() => setMobilePortalsOpen(!mobilePortalsOpen)}
                                        className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                                    >
                                        <span>PORTALS</span>
                                        <span className="text-xs">{mobilePortalsOpen ? '▲' : '▼'}</span>
                                    </button>
                                    {mobilePortalsOpen && (
                                        <div className="bg-blue-50">
                                            <a href="/login" className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 border-b border-blue-100">
                                                <span className="text-lg">🏛️</span>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">Bhoothankett Dam Portal</p>
                                                    <p className="text-xs text-gray-600">Dam Authority Access</p>
                                                </div>
                                            </a>
                                            <a href="/login" className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 border-b border-blue-100">
                                                <span className="text-lg">🚨</span>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">DDMA Portal</p>
                                                    <p className="text-xs text-gray-600">Disaster Management</p>
                                                </div>
                                            </a>
                                            <a href="/login" className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100">
                                                <span className="text-lg">🎓</span>
                                                <div>
                                                    <p className="font-semibold text-sm text-gray-800">Research Portal</p>
                                                    <p className="text-xs text-gray-600">Academic & Research</p>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <a href="#" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                                    Resources
                                </a>
                                <a href="#" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                                    About
                                </a>
                                <a href="#" className="block px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 border-l-4 border-transparent">
                                    Contact
                                </a>

                                {/* Mobile Language Selector */}
                                <div className="px-4 py-3 border-t border-gray-200">
                                    <label className="text-xs font-semibold text-gray-600 mb-2 block">Language</label>
                                    <select className="w-full bg-gray-100 text-gray-800 text-sm px-3 py-2 rounded border border-gray-300">
                                        <option>English</option>
                                        <option>हिंदी</option>
                                        <option>മലയാളം</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Alert Banner */}
            <div className="bg-orange-50 border-b border-orange-200">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                        <div className="flex items-center gap-2 md:gap-3">
                            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">ALERT</span>
                            <p className="text-xs md:text-sm text-orange-900">
                                <span className="font-semibold">Weather Advisory:</span> Heavy rainfall expected in the next 24-48 hours.
                            </p>
                        </div>
                        <a href="#" className="text-xs font-semibold text-orange-700 hover:text-orange-900 underline ml-8 md:ml-0">
                            View Details →
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
