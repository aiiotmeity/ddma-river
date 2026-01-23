import React from 'react';
import Header from '../components/Header';
import SupportedAuthorities from '../components/SupportedAuthorities';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />

            {/* Hero Section */}
            <main className="flex-1">
                <section className="relative text-white min-h-[600px] flex flex-col items-center justify-start pt-16 overflow-hidden">
                    {/* Background Image - Foggy River */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"
                            alt="Foggy River Background"
                            className="w-full h-full object-cover text-transparent"
                        />
                        {/* Gradient Overlay - Lighter to show image */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/40 to-white/10"></div>
                    </div>

                    {/* Main Hero Content */}
                    <div className="container mx-auto relative z-10 text-center mt-12 pb-32">
                        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg tracking-tight">
                            Integrated Weather & River Monitoring System
                        </h2>
                        <h3 className="text-xl md:text-2xl font-normal mb-10 text-gray-100 drop-shadow-md">
                            Decision Support for Disaster Preparedness and Emergency Response
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded shadow-lg transition-transform hover:-translate-y-0.5 uppercase text-sm tracking-wide">
                                Access Portals
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded shadow-lg transition-transform hover:-translate-y-0.5 border border-gray-200 uppercase text-sm tracking-wide">
                                Learn About the System
                            </button>
                        </div>
                    </div>
                </section>

                {/* Feature Cards - Overlapping the Hero */}
                <section className="relative -mt-32 z-20 pb-16 px-4">
                    <div className="container grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow border-b-4 border-gray-200">
                            <div className="h-20 flex items-center justify-center mb-4 text-slate-500 relative">
                                {/* Custom composite icon for Monitoring */}
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                                    <circle cx="12" cy="12" r="2" />
                                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                                </svg>
                                <svg className="absolute -right-2 top-0 text-slate-400" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                    <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5S14.463,8,17.5,8s5.5,2.463,5.5,5.5S20.537,19,17.5,19z M19,13.5h-2.5V11 h-2v2.5H12v2h2.5V18h2v-2.5H19V13.5z" opacity="0.2" /> {/* Abstract Cloud feel */}
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Monitoring Infrastructure</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Real-time data collection from weather stations, river gauges, and sensors
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow border-b-4 border-gray-200">
                            <div className="h-20 flex items-center justify-center mb-4 text-slate-500 relative">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4" />
                                    <path d="M12 2v2" />
                                    <path d="M12 20v2" />
                                    <path d="m4.93 4.93 1.41 1.41" />
                                    <path d="m17.66 17.66 1.41 1.41" />
                                    <path d="M2 12h2" />
                                    <path d="M20 12h2" />
                                    <path d="m6.34 17.66-1.41 1.41" />
                                    <path d="m19.07 4.93-1.41 1.41" />
                                </svg>
                                <svg className="absolute bottom-0 right-10 text-slate-500 fill-slate-500" width="36" height="36" viewBox="0 0 24 24">
                                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor" stroke="none" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Forecasting & Alerts</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Advanced weather modeling, rainfall forecasts, and flood alerts
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow border-b-4 border-gray-200">
                            <div className="h-20 flex items-center justify-center mb-4 text-slate-500">
                                <svg className="mr-[-10px]" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                <svg className="text-blue-600 fill-blue-100" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Decision Support</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Critical data for Bhoothankett Dam, DDMA and research organizations
                            </p>
                        </div>
                    </div>
                </section>

                {/* Supported Authorities & Services */}
                <div className="bg-slate-50">
                    <SupportedAuthorities />

                    {/* Our Services List from image */}
                    <section className="bg-gray-100 py-12">
                        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-blue-900 mb-6">Our Services</h2>
                                <ul className="space-y-4">
                                    {[
                                        'Real-time weather data collection (secured access)',
                                        'River discharge estimation & monitoring',
                                        'Flood early warning & decision-making support',
                                        'Historical weather & forecast datasets',
                                        'CSV reports & downloadable datasets'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg className="text-green-600 mt-1 flex-shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                                <h3 className="text-lg font-bold text-blue-800 mb-2">System Status</h3>
                                <div className="flex items-center gap-2 text-green-600 font-medium mb-4">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    Operational
                                </div>
                                <p className="text-sm text-gray-600">All sensors are transmitting data normally. Last update: Just now.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
