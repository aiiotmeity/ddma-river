import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { Bell, Clock, MapPin, Phone, Mail } from 'lucide-react';

const DDMADashboard = () => {
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

  // Sample data for rainfall forecast
  const rainfallData = [
    { day: 'Mon M1', value: 15 },
    { day: 'Tue', value: 28 },
    { day: 'Wed', value: 42 },
    { day: 'Thu', value: 35 },
    { day: 'Fri', value: 58 },
    { day: 'Sat', value: 48 },
    { day: 'Sun', value: 32 },
  ];

  const maxRainfall = Math.max(...rainfallData.map(d => d.value));

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Top Info Bar */}
      <div className="bg-blue-950 text-white text-xs py-2 px-4" style={{ backgroundColor: '#0a1628' }}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={12} />
              <span className="font-semibold">District Disaster Management Authority - Kerala</span>
            </span>
            <span className="opacity-70">|</span>
            <span className="flex items-center gap-2 opacity-80">
              <Phone size={12} />
              Emergency: 1077 | Control Room: 0484-XXXXXXX
            </span>
            <span className="flex items-center gap-2 opacity-80">
              <Mail size={12} />
              ddma@kerala.gov.in
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

      {/* Main Header Section with Background */}
      <div
        className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white overflow-hidden shadow-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(29, 42, 90, 0.90), rgba(29, 42, 90, 0.90)), url('C:/Users/Meity-4/.gemini/antigravity/brain/43ceaba6-9c48-4cab-bd09-28faba88a595/ddma_header_background_1769142807578.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto py-5 px-6 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              className="h-16 w-16 brightness-0 invert"
              alt="Government of India Emblem"
            />
            <div className="border-l-2 border-blue-600 pl-5">
              <h1 className="text-2xl font-bold tracking-tight">District Disaster Management Authority (DDMA)</h1>
              <p className="text-sm opacity-90 mt-1 flex items-center gap-2">
                <MapPin size={14} />
                Kerala, India | District-Level Disaster Monitoring & Emergency Response
              </p>
              <p className="text-xs opacity-75 mt-1">
                Real-time disaster monitoring, early warning systems, and coordinated emergency response operations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-blue-700 rounded-full transition-colors relative" title="Notifications">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="border-l border-blue-600 pl-4 ml-2">
              <div className="text-right mb-1">
                <p className="text-xs opacity-75">Logged in as</p>
                <p className="text-sm font-semibold">DWO Officer</p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded font-semibold transition-colors text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <nav className="bg-white border-b px-6 py-3 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6 text-sm font-semibold">
            <span className="text-blue-700 border-b-2 border-blue-700 pb-3 -mb-3">Dashboard</span>
            <span className="text-gray-500 hover:text-blue-700 cursor-pointer">Alerts</span>
            <span className="text-gray-500 hover:text-blue-700 cursor-pointer">Rainfall</span>
            <span className="text-gray-500 hover:text-blue-700 cursor-pointer">River Forecast</span>
            <span className="text-gray-500 hover:text-blue-700 cursor-pointer">Affected Areas</span>
          </div>
          <div className="text-xs text-gray-500 italic">Welcome, DWO Officer</div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="flex-1 container mx-auto py-6 px-6">
        {/* Dashboard Overview Info */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 text-white rounded-full p-2 mt-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-800 mb-1">Dashboard Overview</h3>
              <p className="text-sm text-gray-700">
                The DDMA Dashboard provides a centralized view of disaster-related alerts, rainfall conditions,
                river forecasts, and affected regions, supporting district authorities in timely decision-making,
                emergency preparedness, and response operations.
              </p>
            </div>
          </div>
        </div>

        {/* Bhoothankett Dam Status - Critical Infrastructure Monitoring */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 flex justify-between items-center border-b border-blue-100">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-sm uppercase tracking-wide text-gray-800">Bhoothankett Dam - Live Status</span>
              <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">OPERATIONAL</span>
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline">View Full Dashboard →</button>
          </div>

          <div className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Reservoir Level */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">Reservoir Level</h4>
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-blue-900">215.47</span>
                  <span className="text-lg font-semibold text-gray-600">m</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-blue-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '77%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-blue-900">77%</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Min: 200m | Max: 220m</p>
              </div>

              {/* Gates Open */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">Gates Open</h4>
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-green-900">3</span>
                  <span className="text-lg font-semibold text-gray-600">/ 10</span>
                </div>
                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((gate, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-6 rounded ${i < 3 ? 'bg-green-500' : 'bg-gray-200'}`}
                      title={`Gate ${gate}: ${i < 3 ? 'Open' : 'Closed'}`}
                    ></div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Gates 1, 2, 3 Currently Open</p>
              </div>

              {/* Discharge Rate */}
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">Discharge</h4>
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-teal-900">352</span>
                  <span className="text-sm font-semibold text-gray-600">m³/s</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-teal-700">Stable Flow</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Calculated discharge rate</p>
              </div>

              {/* Last Updated */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600">Last Updated</h4>
                  <svg className="w-4 h-4 text-gray-600 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm font-semibold mt-3 text-gray-800">
                  <p>{formatTime(currentTime)}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(currentTime).split(',')[0]}</p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-green-700">Live Data</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Auto-refresh: 30 sec</p>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 text-gray-700">
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Recent Dam Activity
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-3 bg-white rounded p-3 border border-gray-200">
                  <div className="bg-blue-500 rounded-full p-1.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">11:50 AM</p>
                    <p className="text-gray-600">Level: 215.47m | 3 Gates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded p-3 border border-gray-200">
                  <div className="bg-green-500 rounded-full p-1.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">11:30 AM</p>
                    <p className="text-gray-600">Level: 215.45m | 3 Gates</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded p-3 border border-gray-200">
                  <div className="bg-yellow-500 rounded-full p-1.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">11:00 AM</p>
                    <p className="text-gray-600">Gate 3 Opened | 2→3 Gates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RED WARNING Alert Banner */}
        <div className="bg-red-600 text-white rounded-lg shadow-lg mb-6 overflow-hidden">
          <div className="bg-red-700 px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-sm uppercase tracking-wide">RED WARNING - Flood Alert</span>
            </div>
            <button className="text-xs font-semibold underline hover:no-underline">View Details →</button>
          </div>
          <div className="px-6 py-3 text-sm">
            Heavy rainfall & flooding expected in 2-3 hours. Residents in low-lying areas should evacuate immediately.
          </div>
          <div className="px-6 pb-3">
            <button className="text-xs font-semibold underline hover:no-underline">View All Warnings →</button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT COLUMN - Current Warnings & Affected Regions */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            {/* Current Warnings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Current Warnings</h3>

              {/* Red Warning */}
              <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-3 rounded">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-red-600">RED WARNING</span>
                  </div>
                  <span className="text-xs text-red-500">Issued 21 Jan, 8:00 am</span>
                </div>
                <h4 className="font-bold text-sm text-red-900 mb-1">Flood Alert</h4>
                <p className="text-xs text-red-800">Very heavy rainfall & flooding expected. Evacuate low-lying areas.</p>
              </div>

              {/* Orange Warning */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded opacity-80">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-bold text-orange-600">ORANGE ALERT</span>
                  </div>
                  <span className="text-xs text-orange-500">Issued 21 Jan, 8:00 am</span>
                </div>
                <h4 className="font-bold text-sm text-orange-900 mb-1">Heavy Rain</h4>
                <p className="text-xs text-orange-800">Very heavy rainfall forecasted.</p>
              </div>
            </div>

            {/* Affected Regions with Map */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Affected Regions</h3>

              {/* Google Map showing Affected Regions */}
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                <div className="relative h-64 w-full">
                  <iframe
                    title="Affected Regions Map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125676.89356419455!2d76.30!3d10.10!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKalady%2C%20Kerala!5e0!3m2!1sen!2sin!4v1642000000000"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>

                  {/* Overlay markers for affected regions */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      📍 Kalady
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/3 pointer-events-none">
                    <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      📍 Aluva
                    </div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/3 pointer-events-none">
                    <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      📍 Perumbavoor
                    </div>
                  </div>
                </div>
              </div>

              {/* Region Status List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-sm font-bold">Kalady</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">High Risk</span>
                    <span className="ml-3 text-gray-400">15,000</span>
                    <span className="text-gray-400 text-xs ml-1">11:00 am ST</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-bold">Aluva</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">Moderate</span>
                    <span className="ml-3 text-gray-400">7,100</span>
                    <span className="text-gray-400 text-xs ml-1">7:00 am ST</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-sm font-bold">Perumbavoor</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-500">2,500</span>
                    <span className="ml-3 text-gray-400">2,500</span>
                    <span className="text-gray-400 text-xs ml-1">2:50 am ST</span>
                  </div>
                </div>
              </div>

              {/* Status Summary Badges */}
              <div className="flex gap-3 mt-4 pt-4 border-t">
                <div className="bg-teal-600 text-white px-3 py-1 rounded text-xs font-bold">6 Active</div>
                <div className="bg-gray-400 text-white px-3 py-1 rounded text-xs font-bold">2 Offline</div>
                <div className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">1 Risky</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Rainfall Forecast & River Forecast */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            {/* Rainfall & River Forecast Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rainfall & River Forecast</h3>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-600 hover:text-blue-600 font-semibold">← 24 hrs Rainfall</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-gray-600 hover:text-blue-600 font-semibold">Next 24 hrs Forecast →</button>
                  </div>
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="h-64">
                <div className="flex items-end justify-between h-full gap-2 pb-8">
                  {rainfallData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                      <div className="text-xs font-bold text-blue-700 mb-1">{item.value}</div>
                      <div
                        className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                        style={{ height: `${(item.value / maxRainfall) * 100}%` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2 font-medium">{item.day}</div>
                    </div>
                  ))}
                </div>
                {/* Forecast Line */}
                <div className="relative -mt-6">
                  <svg className="w-full h-16" viewBox="0 0 700 60">
                    <path
                      d="M 0 40 Q 100 30, 200 35 T 400 25 T 600 30 L 700 28"
                      stroke="#fb923c"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Periyar River Level Forecast Map */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Periyar River Level Forecast</h3>

              {/* River Map with Gradient */}
              <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100">
                <img
                  src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=800&q=60"
                  alt="River Forecast Map"
                  className="w-full h-full object-cover opacity-40"
                />
                {/* River Path Overlay */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 250">
                  <path
                    d="M 350 50 Q 300 80, 250 100 T 150 150 T 50 200"
                    stroke="url(#riverGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  {/* Location Markers */}
                  <circle cx="350" cy="50" r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
                  <circle cx="250" cy="100" r="6" fill="#f97316" stroke="white" strokeWidth="2" />
                  <circle cx="150" cy="150" r="6" fill="#ef4444" stroke="white" strokeWidth="2" />
                  <circle cx="50" cy="200" r="6" fill="#22c55e" stroke="white" strokeWidth="2" />
                </svg>

                {/* Location Labels */}
                <div className="absolute top-8 right-8 bg-white px-2 py-1 rounded shadow text-xs font-bold">Edamalayar</div>
                <div className="absolute top-1/3 left-1/2 bg-white px-2 py-1 rounded shadow text-xs font-bold">Angamaly</div>
                <div className="absolute top-1/2 left-1/3 bg-white px-2 py-1 rounded shadow text-xs font-bold">Perumbavoor</div>
                <div className="absolute bottom-8 left-8 bg-white px-2 py-1 rounded shadow text-xs font-bold">Kalady</div>
                <div className="absolute bottom-12 right-1/4 text-xs font-bold text-gray-600">Periyar River</div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Danger</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Red</span>
                </div>
                <div className="text-gray-400 text-xs ml-4">
                  As of 21 Jan 11:00 am ST
                </div>
              </div>
            </div>

            {/* Station Status Summary Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Station Status Summary</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">Station</th>
                    <th className="px-6 py-3 text-left font-bold">River</th>
                    <th className="px-6 py-3 text-left font-bold">Rain</th>
                    <th className="px-6 py-3 text-left font-bold">Rvr Level</th>
                    <th className="px-6 py-3 text-center font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">Kalady</td>
                    <td className="px-6 py-4">Periyar</td>
                    <td className="px-6 py-4">76.5 mm</td>
                    <td className="px-6 py-4">6.8 m</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">Alert</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">Aluva</td>
                    <td className="px-6 py-4">Periyar</td>
                    <td className="px-6 py-4">51.2 mm</td>
                    <td className="px-6 py-4">5.3 m</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded text-xs font-bold">Warning</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">Perumbavoor</td>
                    <td className="px-6 py-4">Muvattupuzha</td>
                    <td className="px-6 py-4">23.4 mm</td>
                    <td className="px-6 py-4">3.5 m</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">Active</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold">Angamaly</td>
                    <td className="px-6 py-4">Periyar</td>
                    <td className="px-6 py-4">12.7 mm</td>
                    <td className="px-6 py-4">2.8 m</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-bold">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DDMADashboard;