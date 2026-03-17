import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Clock, MapPin, Phone, Mail, Droplets,
    ExternalLink, Activity, Anchor, Navigation, ShieldAlert, CheckCircle, Lock, Video, AlertCircle
} from 'lucide-react';

const BhoothankettDashboard = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    // --- READ-ONLY STATE (Fetched from Engineer Approvals in a real app) ---
    const waterLevel = "34.65";
    const gates = Array(15).fill(false).map((_, i) => i < 2); // First 2 open
    const openGatesCount = gates.filter(Boolean).length;
    const calculatedDischarge = "74.0";

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Top Info Bar */}
            <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
                <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
                        <span className="flex items-center gap-2 text-blue-400 font-bold tracking-wider uppercase">
                            <Droplets size={12} />
                            <span>Bhoothathankettu Barrage - Command Center</span>
                        </span>
                        <span className="opacity-50 hidden lg:inline">|</span>
                        <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <Phone size={12} />
                            <span>Control Room: 0484-2463333</span>
                        </span>
                        <span className="hidden lg:flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <Mail size={12} />
                            barrage.ops@kerala.gov.in
                        </span>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4 font-medium">
                        <Clock size={12} className="text-blue-400" />
                        <span className="font-mono text-white tracking-wider">{formatTime(currentTime)}</span>
                        <span className="opacity-50 hidden lg:inline">|</span>
                        <span className="hidden lg:inline">{formatDate(currentTime)}</span>
                    </div>
                </div>
            </div>

            {/* Main Header Section */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
                <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4 md:gap-5">
                        <div className="bg-white rounded-full p-1 md:p-2 shadow-sm flex items-center justify-center">
                            <img
                                src="/logo.png"
                                className="h-10 w-10 md:h-14 md:w-14 rounded-full object-cover"
                                alt="Kerala Gov Logo"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-2xl lg:text-3xl font-black tracking-tight drop-shadow-sm">Bhoothathankettu Barrage Operations</h1>
                            <p className="text-xs md:text-sm text-blue-200 mt-1 flex items-center gap-2 font-medium">
                                <MapPin size={12} />
                                <span className="hidden md:inline">Ernakulam District, Kerala | Periyar River Basin</span>
                                <span className="md:hidden">Kerala, India</span>
                            </p>
                            <p className="text-[10px] uppercase tracking-widest text-emerald-400 mt-1.5 font-bold hidden md:flex items-center gap-1">
                                <CheckCircle size={10} /> Active Telemetry Sync
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all relative">
                            <Bell size={18} />
                        </button>
                        <div className="hidden md:block text-right mr-2">
                            <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold">Operator ID</p>
                            <p className="text-sm font-black tracking-wide">BWD-8492</p>
                        </div>
                        <button onClick={() => navigate('/login')} className="bg-red-500/90 hover:bg-red-600 border border-red-400 text-white px-4 py-2 rounded-lg font-bold text-xs md:text-sm transition-all shadow-md uppercase tracking-wider">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <main className="flex-1 container mx-auto py-6 px-4 md:px-6 max-w-7xl">

                {/* HIGHLIGHTED CTA SECTION */}
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200 gap-4">
                    <div>
                        <h2 className="text-lg font-black text-slate-800 tracking-tight">System Overview</h2>
                        <p className="text-xs text-slate-500 font-medium">Monitor live metrics or proceed to the portal for official logging and engineer verification.</p>
                    </div>

                    <button
                        onClick={() => navigate('/bhoothankett-data-entry')}
                        className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3.5 rounded-xl font-black shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-sm relative overflow-hidden group border border-emerald-400"
                    >
                        <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                        <ExternalLink size={18} />
                        Open Data Entry Portal
                    </button>
                </div>

                {/* Top Row: Core Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Reservoir Level Card */}
                    <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-blue-100 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Activity size={14} /> Current Water Level
                        </h3>
                        <div className="flex items-baseline gap-1 text-slate-800 mt-2">
                            <span className="text-5xl font-black">{waterLevel}</span>
                            <span className="text-xl font-bold text-slate-400">m</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-500">
                            <span>MDDL: 29.26m</span>
                            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">FRL: 34.95m</span>
                        </div>
                    </div>

                    {/* Total Gates Card */}
                    <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-indigo-600 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Anchor size={14} /> Active Spillway Shutters
                        </h3>
                        <div className="flex items-baseline gap-2 text-slate-800 mt-2">
                            <span className="text-5xl font-black">{openGatesCount}</span>
                            <span className="text-lg font-bold text-slate-400">/ 15</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit">
                            <CheckCircle size={12} /> Environmental Flow Active
                        </div>
                    </div>

                    {/* Discharge Card */}
                    <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-cyan-100 overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-cyan-700 font-black text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Droplets size={14} /> Estimated Discharge
                        </h3>
                        <div className="flex items-baseline gap-1 text-slate-800 mt-2">
                            <span className="text-5xl font-black">{calculatedDischarge}</span>
                            <span className="text-xl font-bold text-slate-400">m³/s</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-500">
                            <span>Status: Regulated</span>
                            <span className="text-emerald-600 flex items-center gap-1"><ShieldAlert size={12} /> Safe</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: READ ONLY Visualizer */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col relative">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Live Barrage Status</h3>
                        </div>

                        <div className="p-6 flex flex-col">
                            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Live Shutter Configuration (1-15)</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                                {gates.map((isOpen, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all ${isOpen
                                            ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-inner'
                                            : 'bg-slate-50 border-slate-100 text-slate-400'
                                            }`}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest mb-1.5">S{index + 1}</span>
                                        {isOpen ? (
                                            <span className="bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider animate-pulse">Open</span>
                                        ) : (
                                            <span className="bg-slate-200 text-slate-500 text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Closed</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Activity, Map & CCTV */}
                    <div className="space-y-6 flex flex-col">

                        {/* --- NEW FEATURE: LIVE CCTV FEED SIMULATION --- */}
                        <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 overflow-hidden relative group">
                            <div className="p-3 bg-black/50 border-b border-slate-800 flex justify-between items-center absolute w-full z-20 top-0">
                                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                    <Video size={14} className="text-red-500" /> CAM-04: Spillway Top
                                </h3>
                                <div className="flex items-center gap-1.5 bg-red-500/20 px-2 py-0.5 rounded border border-red-500/50">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                                    <span className="text-[8px] font-black text-red-400 tracking-wider">LIVE REC</span>
                                </div>
                            </div>
                            
                            <div className="relative aspect-video bg-black w-full overflow-hidden">
                                {/* Simulated Video Feed - Auto plays, loops, and has no sound */}
                                {/* If you have a local dam video, change src to "/dam-video.mp4" */}
                                <video 
                                    src="/dam.mp4" 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                
                                {/* CCTV Overlays to make it look authentic */}
                                <div className="absolute inset-0 border-4 border-slate-800/50 pointer-events-none"></div>
                                {/* Crosshairs */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                                    <div className="w-8 h-px bg-white/70 absolute top-1/2 -translate-y-1/2 -left-4"></div>
                                    <div className="w-px h-8 bg-white/70 absolute left-1/2 -translate-x-1/2 -top-4"></div>
                                    <div className="w-8 h-8 border border-white/50 rounded-full"></div>
                                </div>
                                {/* Bottom Timestamp Overlay */}
                                <div className="absolute bottom-2 left-3 font-mono text-[10px] text-white/80 drop-shadow-md z-20">
                                    {formatDate(currentTime).toUpperCase()} {formatTime(currentTime)}
                                </div>
                            </div>
                        </div>

                        {/* Map View */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1 min-h-[200px] flex flex-col">
                            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <Navigation size={14} className="text-blue-600" /> Geospatial Location
                                </h3>
                            </div>
                            <div className="flex-1 w-full bg-slate-200 relative">
                                <iframe
                                    title="Barrage Map"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    className="absolute inset-0"
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=76.65,10.12,76.70,10.15&amp;layer=mapnik&amp;marker=10.133,76.683"
                                ></iframe>
                            </div>
                        </div>

                        {/* Recent Activity Mini-Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Recent Verified Logs</h3>
                            </div>
                            <div className="p-4 space-y-3">
                                {[
                                    { t: '10:45 am', v: '34.65', g: '2' },
                                    { t: '09:00 am', v: '34.66', g: '2' },
                                    { t: '08:00 am', v: '34.65', g: '2' },
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs font-bold text-slate-600 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                                        <span className="text-slate-400">{item.t}</span>
                                        <span className="text-slate-800 font-black">{item.v}m</span>
                                        <span className="bg-emerald-50 border border-emerald-100 px-2 py-1 rounded text-[10px] font-black text-emerald-700 uppercase">{item.g} Open</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%) skewX(12deg); }
                }
            `}</style>
        </div>
    );
};

export default BhoothankettDashboard;