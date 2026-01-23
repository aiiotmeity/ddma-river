import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock, MapPin, Phone, Mail, Droplets } from 'lucide-react';

const BhoothankettDashboard = () => {
    const navigate = useNavigate();
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
    const [gates, setGates] = useState({
        gate1: false, gate2: false, gate3: true, gate4: false,
        gate5: false, gate6: false, gate7: false, gate8: false,
        gate9: false, gate10: false
    });
    const [waterLevel, setWaterLevel] = useState("215.47");

    const toggleGate = (id) => {
        setGates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            {/* Top Info Bar */}
            <div className="bg-blue-950 text-white text-xs py-2 px-4" style={{ backgroundColor: '#0a1628' }}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <Droplets size={12} />
                            <span className="font-semibold">Bhoothankett Dam Authority - Kerala Irrigation Department</span>
                        </span>
                        <span className="opacity-70">|</span>
                        <span className="flex items-center gap-2 opacity-80">
                            <Phone size={12} />
                            Control Room: 0484-2463333
                        </span>
                        <span className="flex items-center gap-2 opacity-80">
                            <Mail size={12} />
                            dam.control@kerala.gov.in
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Clock size={12} className="opacity-70" />
                        <span className="font-mono font-semibold">{formatTime(currentTime)}</span>
                        <span className="opacity-70">|</span>
                        <span className="opacity-80">{formatDate(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Main Header Section */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg" style={{ backgroundColor: '#172554' }}>
                <div className="container mx-auto py-5 px-6 flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                            className="h-16 w-16 brightness-0 invert"
                            alt="Government of India Emblem"
                        />
                        <div className="border-l-2 border-blue-600 pl-5">
                            <h1 className="text-2xl font-bold tracking-tight">Bhoothankett Dam Authority</h1>
                            <p className="text-sm opacity-90 mt-1 flex items-center gap-2">
                                <MapPin size={14} />
                                Ernakulam District, Kerala, India | Periyar River Basin
                            </p>
                            <p className="text-xs opacity-75 mt-1">
                                Real-time dam operations, water level monitoring, and discharge management system
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-blue-700 rounded-full transition-colors relative" title="Notifications">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                        </button>
                        <div className="border-l border-blue-600 pl-4 ml-2">
                            <div className="text-right mb-1">
                                <p className="text-xs opacity-75">Logged in as</p>
                                <p className="text-sm font-semibold">BWD Operator</p>
                            </div>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded font-semibold transition-colors text-sm">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-1 container mx-auto py-6 px-6">
                <h2 className="text-lg font-bold text-[#1a2b5a] mb-6">Current Status</h2>

                {/* Top Row: Status Cards with Mountain Backgrounds */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Reservoir Level Card */}
                    <div className="relative bg-white p-6 rounded-lg shadow-sm border border-blue-100 overflow-hidden h-40">
                        {/* Mountain/Cloud Background Image */}
                        <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                backgroundImage: `url('https://www.transparenttextures.com/patterns/foggy-birds.png'), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=60')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'bottom'
                            }}
                        ></div>
                        <h3 className="relative z-10 text-gray-500 font-bold text-sm uppercase tracking-wider">Reservoir Level</h3>
                        <div className="relative z-10 flex items-baseline gap-2 text-[#1a2b5a] mt-2">
                            <span className="text-5xl font-black">{waterLevel}</span>
                            <span className="text-xl font-bold">m</span>
                        </div>
                        <p className="relative z-10 text-[10px] text-gray-400 mt-2 font-bold">Min 200 m - Max 220 m</p>
                    </div>

                    {/* Total Gates Card */}
                    <div className="relative bg-white p-6 rounded-lg shadow-sm border border-blue-100 overflow-hidden h-40">
                        <div
                            className="absolute inset-0 opacity-15 pointer-events-none"
                            style={{
                                backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=60')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        <h3 className="relative z-10 text-gray-500 font-bold text-sm uppercase tracking-wider">Total Gates Open</h3>
                        <div className="relative z-10 flex items-baseline gap-2 text-[#1a2b5a] mt-2">
                            <span className="text-5xl font-black">{Object.values(gates).filter(Boolean).length}</span>
                            <span className="text-lg font-semibold text-gray-500">Currently Open</span>
                        </div>
                        <p className="relative z-10 text-[10px] text-gray-400 mt-2 font-bold">Gates - Sh 1 / 15</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Left: Controls */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-blue-100 p-6">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h3 className="text-md font-bold text-[#1a2b5a]">Water Level Entry & Gates Control</h3>
                            <button onClick={() => navigate('/bhoothankett-data-entry')} className="text-xs text-blue-600 font-bold hover:underline">Open Data Entry Portal</button>
                        </div>

                        <div className="mb-8">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Current Water Level</label>
                            <input
                                type="text"
                                value={waterLevel}
                                onChange={(e) => setWaterLevel(e.target.value)}
                                className="w-full text-2xl font-black p-4 bg-blue-50/50 border border-blue-100 rounded focus:ring-2 focus:ring-blue-200 outline-none text-[#1a2b5a]"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                            {Object.keys(gates).map((key, index) => (
                                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50">
                                    <span className="text-sm font-bold text-gray-600">Gate Sh{index + 1}</span>
                                    <button
                                        onClick={() => toggleGate(key)}
                                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${gates[key] ? 'bg-blue-600' : 'bg-gray-300'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${gates[key] ? 'translate-x-6' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="mt-8 w-full bg-[#448887] hover:bg-[#366e6d] text-white font-bold py-3 rounded shadow-lg transition-all">Save Changes</button>
                    </div>

                    {/* Right: Discharge, Activity, and Map */}
                    <div className="space-y-6">
                        {/* Discharge Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 text-center">
                            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Calculated Discharge</h3>
                            <div className="text-4xl font-black text-[#1a2b5a]">
                                352 <span className="text-lg font-normal text-gray-500">m³/s</span>
                            </div>
                        </div>

                        {/* Recent Activity Mini-Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                            <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
                                <h3 className="text-sm font-bold text-[#1a2b5a]">Recent Activity</h3>
                                <button className="text-[10px] text-blue-600 font-bold">View All</button>
                            </div>
                            <div className="p-4 space-y-3">
                                {[
                                    { t: '11:50 am', v: '215.47', g: '3' },
                                    { t: '11:30 am', v: '215.45', g: '3' },
                                    { t: '11:00 am', v: '215.42', g: '2' },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between text-xs font-medium text-gray-600 border-b border-gray-50 pb-2 last:border-0">
                                        <span>{item.t}</span>
                                        <span className="text-[#1a2b5a] font-bold">{item.v} m</span>
                                        <span className="bg-blue-50 px-2 rounded text-blue-700">{item.g} Open</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Updated Map View */}
                        <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                            <div className="p-3 bg-gray-50/50 border-b flex justify-between items-center">
                                <h3 className="text-xs font-bold text-[#1a2b5a]">Live Location</h3>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-bold text-gray-400">GPS ACTIVE</span>
                                </div>
                            </div>
                            <div className="h-48 w-full bg-gray-200">
                                <iframe
                                    title="Dam Map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src="https://maps.google.com/maps?q=Bhoothathankettu%20Dam,%20Kerala&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BhoothankettDashboard;