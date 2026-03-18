import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Clock, MapPin, Phone, Mail,
  CloudRain, Droplets, Thermometer, Activity,
  BarChart2, Calendar, RefreshCw, Wifi,
  AlertTriangle, CheckCircle, Maximize, Minimize, Layers, Anchor,
  MessageSquare, Radio, Send, X
} from 'lucide-react';

const DDMADashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- RAIN GAUGE STATE (LIVE) ---
  const [viewMode, setViewMode] = useState('live');

  // --- BROADCAST STATE (NEW FEATURE) ---
  const [broadcastState, setBroadcastState] = useState('idle'); // idle | composing | sending | success
  const [broadcastMessage, setBroadcastMessage] = useState('⚠️ KSDMA ALERT: River levels in Periyar basin are rising. Expected to cross warning levels in 6 hours. Please avoid river banks and low-lying areas.');

  // --- REAL-TIME DRY SEASON DATA (FEB 2026) ---
  const [activeStation, setActiveStation] = useState('Kalady');
  const [stations, setStations] = useState({
    Ayyampuzha: { intensity: 2.4, accumulated: 15.2, temp: 30.5, humidity: 72, soilMoisture: 35, liveData: Array(20).fill(2.4) },
    Malayattoor: { intensity: 1.8, accumulated: 12.4, temp: 31.0, humidity: 70, soilMoisture: 33, liveData: Array(20).fill(1.8) },
    Kalady: { intensity: 3.0, accumulated: 18.6, temp: 29.2, humidity: 68, soilMoisture: 34, liveData: Array(20).fill(3.0) }
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [historyData, setHistoryData] = useState([]);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [mapLayers, setMapLayers] = useState({ arg: true, river: true, dam: true });

  // Timers
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const simulation = setInterval(() => {
      setStations(prev => {
        const current = prev[activeStation];
        const newIntensity = parseFloat((Math.random() * 12).toFixed(1));
        return {
          ...prev,
          [activeStation]: {
            ...current,
            intensity: newIntensity,
            accumulated: parseFloat((current.accumulated + newIntensity * 0.2).toFixed(1)),
            temp: parseFloat((23 + Math.random() * 10).toFixed(1)),
            humidity: Math.min(100, Math.max(40, current.humidity + (Math.random() * 3 - 1.5))),
            soilMoisture: Math.min(60, Math.max(20, current.soilMoisture + (Math.random() * 2 - 1))),
            liveData: [...current.liveData.slice(1), newIntensity]
          }
        };
      });
    }, 15 * 60 * 1000); // update every 15 minutes
    return () => clearInterval(simulation);
  }, [activeStation]);

  useEffect(() => {
    const generatedHistory = Array.from({ length: 24 }, (_, i) => ({ hour: i, rain: '0.0', status: 'Normal' }));
    setHistoryData(generatedHistory);
  }, [selectedDate]);

  const toggleLayer = (layer) => setMapLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  const formatTime = (date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const formatDate = (date) => date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Broadcast Handler
  const handleSendBroadcast = () => {
    setBroadcastState('sending');
    setTimeout(() => {
      setBroadcastState('success');
    }, 2000); // Simulate API call
  };

  const renderLiveGraph = (data) => {
    const height = 60; const width = 100; const maxVal = Math.max(...data, 1);
    const points = data.map((val, i) => `${(i / (data.length - 1)) * width},${height - ((val / maxVal) * height)}`).join(' ');
    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible preserve-3d">
        <defs>
          <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polyline fill="none" stroke="#2563eb" strokeWidth="2" points={points} vectorEffect="non-scaling-stroke" />
        <polygon fill="url(#rainGradient)" points={areaPoints} />
        <circle cx="100" cy={height - ((data[data.length - 1] / maxVal) * height)} r="3" fill="#1d4ed8" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col relative">
      
      {/* --- NEW FEATURE: EMERGENCY BROADCAST MODAL --- */}
      {broadcastState !== 'idle' && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="bg-red-600 px-6 py-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <Radio className="animate-pulse" />
                    <h2 className="font-black text-lg tracking-tight">Public Emergency Broadcast</h2>
                </div>
                {broadcastState === 'composing' && (
                    <button onClick={() => setBroadcastState('idle')} className="hover:bg-red-700 p-1 rounded-full transition"><X size={20}/></button>
                )}
            </div>

            {/* Content Area */}
            <div className="p-6">
                {broadcastState === 'composing' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Target Audience Area</label>
                            <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-700 focus:outline-none focus:border-red-500">
                                <option>Ernakulam District (All)</option>
                                <option>Periyar River Banks (Geofenced)</option>
                                <option>Kalady & Malayattoor Panchayats</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Warning Message (SMS & WhatsApp)</label>
                            <textarea 
                                rows="4" 
                                value={broadcastMessage}
                                onChange={(e) => setBroadcastMessage(e.target.value)}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-none focus:border-red-500 resize-none"
                            ></textarea>
                            <p className="text-right text-[10px] text-slate-400 mt-1 font-bold">{broadcastMessage.length}/160 chars</p>
                        </div>
                        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                            <button onClick={() => setBroadcastState('idle')} className="px-5 py-2.5 text-slate-500 font-bold hover:bg-slate-100 rounded-lg transition">Cancel</button>
                            <button onClick={handleSendBroadcast} className="px-6 py-2.5 bg-red-600 text-white font-black rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition flex items-center gap-2">
                                <Send size={16} /> Transmit Alert
                            </button>
                        </div>
                    </div>
                )}

                {broadcastState === 'sending' && (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                        <h3 className="font-black text-slate-800 text-lg">Broadcasting Warning...</h3>
                        <p className="text-slate-500 text-sm font-medium mt-2">Pinging telecom providers in Ernakulam limits</p>
                    </div>
                )}

                {broadcastState === 'success' && (
                    <div className="py-8 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="font-black text-slate-800 text-xl mb-1">Alert Sent Successfully</h3>
                        {/* <p className="text-slate-500 text-sm font-medium mb-8">Dispatched to 142,593 devices in target zone.</p> */}
                        
                        {/* Fake Mobile Phone Mockup */}
                        <div className="w-64 bg-gray-900 p-2 rounded-[2rem] shadow-xl border-4 border-gray-800 relative">
                            {/* Phone Notch */}
                            <div className="absolute top-0 inset-x-0 h-4 bg-gray-900 rounded-b-xl w-1/2 mx-auto z-10"></div>
                            <div className="bg-gray-100 h-80 rounded-[1.5rem] overflow-hidden flex flex-col">
                                <div className="bg-gray-200/50 py-3 text-center border-b border-gray-300 relative">
                                    <span className="text-[10px] font-bold text-gray-800">Messages</span>
                                </div>
                                <div className="flex-1 p-3 flex flex-col justify-end bg-white">
                                    <div className="bg-green-500 text-white p-3 rounded-2xl rounded-br-sm text-[11px] shadow-sm ml-4 mb-2">
                                        {broadcastMessage}
                                    </div>
                                    <span className="text-[8px] text-gray-400 text-right mr-1">Delivered Just Now</span>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setBroadcastState('idle')} className="mt-8 px-6 py-2.5 bg-slate-800 text-white font-black rounded-lg hover:bg-slate-900 transition">
                            Close & Return to Dashboard
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Top Info Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
        <div className="container mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 lg:gap-6 flex-wrap">
            <span className="flex items-center gap-2 text-blue-400">
              <MapPin size={12} />
              <span className="font-semibold text-xs lg:text-sm tracking-wide">DDMA Kerala - Control Room</span>
            </span>
            <span className="opacity-50 hidden lg:inline">|</span>
            <span className="flex items-center gap-2 text-xs hover:text-white transition-colors">
              <Phone size={12} />
              <span className="hidden lg:inline">Emergency: 1077 | Direct: 0484-2423513</span>
            </span>
            <span className="hidden lg:flex items-center gap-2 text-xs hover:text-white transition-colors">
              <Mail size={12} />
              ddma@kerala.gov.in
            </span>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            <Clock size={12} className="text-blue-400" />
            <span className="font-mono font-semibold tracking-wider text-white">{formatTime(currentTime)}</span>
            <span className="opacity-50 hidden lg:inline">|</span>
            <span className="hidden lg:inline font-medium">{formatDate(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white shadow-xl overflow-hidden relative">
        <div className="container mx-auto py-4 md:py-6 px-4 md:px-6 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-4 md:gap-5">
            <div className="bg-white rounded-full p-1 md:p-2 shadow-sm flex items-center justify-center">
              <img src="/logo.png" alt="Gov Logo" className="h-8 w-8 md:h-12 md:w-12 rounded-full object-cover" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl lg:text-3xl font-black tracking-tight drop-shadow-sm">District Disaster Management Authority</h1>
              <p className="text-xs md:text-sm text-blue-200 mt-1 flex items-center gap-2 font-medium">
                <MapPin size={12} className="md:w-4 md:h-4" />
                <span className="hidden md:inline">Ernakulam District | Real-time Telemetry Dashboard</span>
                <span className="md:hidden">Ernakulam, Kerala</span>
              </p>
            </div>
          </div>
            <div className="flex items-center gap-2">
            <button className="p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all relative">
              <Bell size={18} />
            </button>
            <button onClick={() => navigate('/login')} className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-2 rounded-lg font-bold text-xs md:text-sm transition-all shadow-md border border-sky-500">
              Back to Login
            </button>
            <button onClick={() => navigate('/login')} className="bg-red-500/90 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-bold text-xs md:text-sm transition-all shadow-md border border-red-400">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-6 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto flex justify-between items-center h-12">
          <div className="flex gap-6 text-sm font-bold text-gray-500 h-full">
            <span className="text-blue-700 border-b-2 border-blue-700 flex items-center h-full px-1">Dashboard</span>
            <span className="hover:text-blue-700 flex items-center h-full px-1 cursor-pointer transition-colors">Alerts</span>
            <span className="hover:text-blue-700 flex items-center h-full px-1 cursor-pointer transition-colors hidden md:flex">Rainfall Network</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/login')} className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold">Back to Login</button>
            <div className="text-xs text-gray-400 font-medium hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              System Online
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6 max-w-7xl">

        {/* --- MODIFIED: Alert Banner with Broadcast Button --- */}
        <div className="bg-white border border-green-200 rounded-xl shadow-sm mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-700 mt-1 md:mt-0">
                <CheckCircle size={24} />
              </div>
              <div>
                <h3 className="font-black text-green-800 text-sm md:text-base uppercase tracking-wide">System Status: Normal (Dry Season)</h3>
                <p className="text-xs md:text-sm text-green-700 mt-1 font-medium">No active rainfall or flood alerts. River levels are stable and reservoir inflows are minimal. Continuous monitoring active.</p>
              </div>
            </div>
            {/* The WOW Factor Broadcast Button */}
            <button 
                onClick={() => setBroadcastState('composing')}
                className="w-full md:w-auto text-xs font-black bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 shadow-[0_0_10px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center gap-2 uppercase tracking-widest border border-red-500 animate-pulse hover:animate-none"
            >
              <Radio size={16} /> Broadcast Early Warning
            </button>
          </div>
        </div>

        {/* EXACT Bhoothankett Dam Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-800" />
              <span className="font-black text-sm md:text-base uppercase tracking-wider text-slate-800">Bhoothathankettu Barrage</span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase">Operational</span>
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden md:block">FRL: 34.95m | Max Capacity: 8 MCM</span>
          </div>

          <div className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

              <div className="bg-white rounded-xl p-5 border border-blue-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2">Reservoir Level</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-800">34.65</span>
                  <span className="text-sm font-bold text-slate-400">/ 34.95m</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                    <span>MDDL (29.26m)</span>
                    <span className="text-blue-600">99.1% FRL</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full" style={{ width: '99.1%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-green-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-green-600 mb-2">Spillway Shutters</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-800">2</span>
                  <span className="text-sm font-bold text-slate-400">/ 15</span>
                </div>
                <div className="mt-4 flex gap-0.5">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className={`flex-1 h-4 rounded-sm border ${i < 2 ? 'bg-green-500 border-green-600' : 'bg-slate-100 border-slate-200'}`}></div>
                  ))}
                </div>
                <span className="text-[9px] text-green-700 font-bold uppercase tracking-wider mt-2 block">Opened @ 15cm each</span>
              </div>

              <div className="bg-white rounded-xl p-5 border border-teal-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-teal-600 mb-2">Current Discharge</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-800">74.0</span>
                  <span className="text-sm font-bold text-slate-400">m³/s</span>
                </div>
                <div className="mt-4 flex items-center gap-2 bg-teal-50 px-2 py-1.5 rounded border border-teal-100">
                  <Activity size={12} className="text-teal-600" />
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Regulated Environmental Flow</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Telemetry Status</h4>
                  <div className="text-sm font-bold mt-1 text-slate-800">{formatTime(currentTime)}</div>
                </div>
                <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm mt-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Connection</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-[10px] font-black text-emerald-600 tracking-wider">LIVE</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Map & River Level Monitoring Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

          {/* INTERACTIVE MAP INLINED DIRECTLY HERE */}
          <div className={isMapFullscreen ? "fixed inset-0 z-50 bg-white flex flex-col" : "lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col"}>
            {/* Map Controls */}
            <div className="bg-slate-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <Layers size={16} className="text-blue-600" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-widest hidden sm:inline">Map Layers:</span>
                <div className="flex gap-1.5">
                  <button onClick={() => toggleLayer('arg')} className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${mapLayers.arg ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'}`}>
                    ARG Network
                  </button>
                  <button onClick={() => toggleLayer('river')} className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${mapLayers.river ? 'bg-cyan-600 text-white border-cyan-600' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'}`}>
                    River Level
                  </button>
                  <button onClick={() => toggleLayer('dam')} className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded border transition-colors ${mapLayers.dam ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-300 hover:bg-slate-100'}`}>
                    Dam
                  </button>
                </div>
              </div>
              <button
                onClick={() => setIsMapFullscreen(!isMapFullscreen)}
                className="p-1.5 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 transition-colors flex items-center gap-1"
              >
                {isMapFullscreen ? <><Minimize size={14} /><span className="text-[10px] font-bold uppercase pr-1">Exit</span></> : <Maximize size={14} />}
              </button>
            </div>

            <div className="flex-1 relative bg-slate-100 min-h-[350px]">
              {/* Base Map */}
              <iframe
                title="Periyar River Basin Map"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.40,10.12,76.70,10.22&amp;layer=mapnik"
                allowFullScreen
                loading="lazy">
              </iframe>

              {/* --- MAP MARKERS OVERLAY --- */}

              {/* 1. Bhoothathankettu Dam Marker */}
              {mapLayers.dam && (
                <div className="absolute group" style={{ top: '35%', left: '85%', transform: 'translate(-50%, -50%)' }}>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-8 h-8 bg-indigo-500 rounded-full opacity-30"></div>
                    <div className="w-6 h-6 bg-indigo-600 border-2 border-white rounded-md shadow-lg flex items-center justify-center z-10 cursor-pointer">
                      <Anchor size={12} className="text-white" />
                    </div>
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white p-2 rounded-lg shadow-xl border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="text-[10px] font-black text-indigo-700 uppercase">Bhoothathankettu Barrage</p>
                    <div className="mt-1 text-[10px] text-slate-600">Level: <span className="font-bold">34.65m</span> / 34.95m</div>
                    <div className="text-[10px] text-slate-600">Discharge: <span className="font-bold">74.0 m³/s</span></div>
                  </div>
                </div>
              )}

              {/* 2. ARG Station: Ayyampuzha */}
              {mapLayers.arg && (
                <div className="absolute group" style={{ top: '15%', left: '22%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center z-10 cursor-pointer">
                    <CloudRain size={10} className="text-white" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-white p-2 rounded-lg shadow-xl border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="text-[10px] font-black text-blue-700 uppercase">ARG: Ayyampuzha</p>
                    <div className="mt-1 text-[10px] text-slate-600">Rain (24h): <span className="font-bold">{stations.Ayyampuzha.accumulated} mm</span></div>
                  </div>
                </div>
              )}

              {/* 3. ARG Station: Malayattoor */}
              {mapLayers.arg && (
                <div className="absolute group" style={{ top: '30%', left: '45%', transform: 'translate(-50%, -50%)' }}>
                  <div className="w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center z-10 cursor-pointer">
                    <CloudRain size={10} className="text-white" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-white p-2 rounded-lg shadow-xl border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="text-[10px] font-black text-blue-700 uppercase">ARG: Malayattoor</p>
                    <div className="mt-1 text-[10px] text-slate-600">Rain (24h): <span className="font-bold">{stations.Malayattoor.accumulated} mm</span></div>
                  </div>
                </div>
              )}

              {/* 4. ARG Station & River Level: Kalady */}
              {(mapLayers.arg || mapLayers.river) && (
                <div className="absolute group" style={{ top: '65%', left: '18%', transform: 'translate(-50%, -50%)' }}>
                  <div className={`w-6 h-6 border-2 border-white rounded-full shadow-lg flex items-center justify-center z-10 cursor-pointer ${mapLayers.river ? 'bg-cyan-500' : 'bg-blue-600'}`}>
                    {mapLayers.river ? <Activity size={12} className="text-white" /> : <CloudRain size={10} className="text-white" />}
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-40 bg-white p-2 rounded-lg shadow-xl border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <p className="text-[10px] font-black text-cyan-700 uppercase">Kalady Station</p>
                    {mapLayers.river && <div className="mt-1 text-[10px] text-slate-600">River Level: <span className="font-bold text-cyan-600">2.14m</span></div>}
                    {mapLayers.arg && <div className="text-[10px] text-slate-600">Rain (24h): <span className="font-bold">{stations.Kalady.accumulated} mm</span></div>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* River Level Monitoring (Kalady) */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-cyan-50 to-white px-6 py-4 flex justify-between items-center border-b border-cyan-100">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-600 p-2 rounded-lg text-white shadow-sm">
                  <Activity size={18} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 text-base uppercase tracking-wide">River Level Monitoring</h2>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold tracking-wider mt-0.5">
                    <span>STATION: PERIYAR BRIDGE (KALADY)</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Warning Level</span>
                <span className="text-sm font-black text-orange-500">8.00 m</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div className="bg-white p-5 rounded-xl border-2 border-cyan-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 opacity-5 text-cyan-600 group-hover:scale-110 transition-transform">
                    <Droplets size={100} />
                  </div>
                  <p className="text-[10px] font-black text-cyan-700 uppercase tracking-widest mb-2">Current Water Level</p>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-5xl font-black text-slate-800">2.14</span>
                    <span className="text-lg font-bold text-slate-400">m</span>
                  </div>
                  <div className="space-y-1.5 relative z-10">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-wider">
                      <span className="text-slate-400">Bed Level (0m)</span>
                      <span className="text-slate-400">Danger (12m)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 border border-slate-200 p-0.5">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: '17.8%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Estimated Discharge Rate</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-800">95</span>
                      <span className="text-sm font-bold text-slate-400">m³/s</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100 mt-4">
                    <RefreshCw size={12} className="text-blue-500" />
                    <span>Flow is highly stable (Dry Season)</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-start gap-3">
                <AlertTriangle size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Station Advisory</h4>
                  <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                    Water level is currently <span className="font-bold">5.86m below</span> the warning mark. No flood risk at present. River flow is strictly regulated by Bhoothathankettu barrage discharges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rain Gauge Network Section (ARG) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
                <CloudRain size={18} />
              </div>
              <div>
                <h2 className="font-black text-slate-800 text-base uppercase tracking-wide">Automatic Rain Gauge (ARG) Network</h2>
                <div className="flex gap-2 mt-2">
                  {['Ayyampuzha', 'Malayattoor', 'Kalady'].map((name) => (
                    <button
                      key={name}
                      onClick={() => setActiveStation(name)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${activeStation === name
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-blue-300'
                        }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex bg-slate-200/70 rounded-lg p-1">
              <button
                onClick={() => setViewMode('live')}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all flex items-center gap-2 ${viewMode === 'live' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Activity size={12} /> Live Monitor
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-md transition-all flex items-center gap-2 ${viewMode === 'history' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Calendar size={12} /> Daily Log
              </button>
            </div>
          </div>

          <div className="p-6">
            {viewMode === 'live' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative overflow-hidden">
                    <div className="flex justify-between items-start z-10 relative">
                      <div>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Live Rain Intensity</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-800">
                            {stations[activeStation].intensity.toFixed(1)}
                          </span>
                          <span className="text-sm font-bold text-slate-400">mm/hr</span>
                        </div>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600 border border-blue-200"><CloudRain size={18} /></div>
                    </div>
                    <div className="h-16 mt-6 -mx-2 opacity-60">{renderLiveGraph(stations[activeStation].liveData)}</div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Accumulated (24h)</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-slate-800">{stations[activeStation].accumulated.toFixed(1)}</span>
                          <span className="text-sm font-bold text-slate-400">mm</span>
                        </div>
                      </div>
                      <div className="bg-slate-200 p-2 rounded-lg text-slate-600"><BarChart2 size={18} /></div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-6 overflow-hidden">
                      <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, (stations[activeStation].accumulated / 100) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="bg-orange-50 rounded-xl border border-orange-100 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Temperature</p>
                      <p className="text-2xl font-black text-slate-800">{stations[activeStation].temp.toFixed(1)}°C</p>
                    </div>
                    <Thermometer size={24} className="text-orange-400 opacity-50" />
                  </div>
                  <div className="bg-cyan-50 rounded-xl border border-cyan-100 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest mb-1">Humidity</p>
                      <p className="text-2xl font-black text-slate-800">{stations[activeStation].humidity.toFixed(0)}%</p>
                    </div>
                    <Droplets size={24} className="text-cyan-400 opacity-50" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center flex flex-col items-center justify-center min-h-[250px]">
                <Calendar size={40} className="text-slate-300 mb-3" />
                <h3 className="font-black text-slate-600 uppercase tracking-widest text-sm mb-1">Dry Season Logging</h3>
                <p className="text-xs text-slate-500 max-w-sm">No significant rainfall recorded on {selectedDate} at {activeStation}. Total accumulation is 0.0 mm.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-200 text-center py-3 mt-2">
        <p className="text-xs font-semibold">© 2026 Center for AI-IoT Innovations. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DDMADashboard;