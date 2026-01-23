import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, History, FileText, Settings, Save, Download, Calculator, ChevronRight } from 'lucide-react';
const DataEntry = () => {
    const [waterLevel, setWaterLevel] = useState('29.5');
    const [discharge, setDischarge] = useState('0.00');

    // Initialize 15 gates with 0 height
    const [gateHeights, setGateHeights] = useState(Array(15).fill('0'));
    const handleGateChange = (index, value) => {
        const newHeights = [...gateHeights];
        newHeights[index] = value;
        setGateHeights(newHeights);
    };
    const calculateDischarge = () => {
        // Mock calculation logic
        const totalHeight = gateHeights.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
        const calc = (totalHeight * 150) + (parseFloat(waterLevel) * 10);
        setDischarge(calc.toFixed(2));
    };
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto py-4 px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="h-12 w-12" alt="Emblem" />
                        <div>
                            <h1 className="text-xl font-bold text-[#1a2b5a]">Bhoothankett Dam Authority</h1>
                            <p className="text-sm text-gray-500">Ernakulam, Kerala, India</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-gray-400 italic">Welcome, BWD Operator</span>
                        <button className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded border border-orange-100 hover:bg-orange-100 transition-colors">Logout</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                    <div className="p-6">
                        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</h2>
                        <nav className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium transition-colors">
                                <LayoutDashboard size={20} />
                                Data Entry
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                                <History size={20} />
                                Historical Records
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                                <FileText size={20} />
                                Reports
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                                <Settings size={20} />
                                Settings
                            </button>
                        </nav>
                    </div>
                </aside>
                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-6xl mx-auto space-y-6">

                        {/* Page Header */}
                        <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Barrage Status</h1>
                                <p className="text-gray-500 mt-1">Last Updated: Today 08:00 AM</p>
                            </div>
                            <button
                                onClick={calculateDischarge}
                                className="flex items-center gap-2 bg-blue-800 text-white px-6 py-2.5 rounded-lg hover:bg-blue-900 transition-colors shadow-sm font-medium"
                            >
                                <Calculator size={18} />
                                Auto-Calculate Discharge
                            </button>
                        </div>
                        {/* Gate Status Indicators */}
                        <div className="grid grid-cols-15 gap-1 overflow-x-auto pb-2">
                            {gateHeights.map((h, i) => (
                                <div key={i} className={`h-12 flex items-center justify-center rounded text-xs font-semibold ${parseFloat(h) > 0 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'} min-w-[40px]`}>
                                    S{i + 1}
                                </div>
                            ))}
                        </div>
                        {/* Entry Form */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-blue-50/50 px-8 py-4 border-b border-blue-100">
                                <h3 className="text-blue-900 font-semibold">New Reading Entry</h3>
                            </div>
                            <div className="p-8">
                                <div className="grid md:grid-cols-3 gap-8 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                                        <input type="datetime-local" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Water Level (m)</label>
                                        <input
                                            type="number"
                                            value={waterLevel}
                                            onChange={(e) => setWaterLevel(e.target.value)}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                        <label className="block text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">Total Discharge (Cumecs)</label>
                                        <div className="text-3xl font-bold text-blue-900">{discharge}</div>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-4">Gate Opening Heights (In Meters) - Set 0 for Closed</label>
                                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                                        {gateHeights.map((height, i) => (
                                            <div key={i}>
                                                <label className="text-xs text-gray-500 mb-1 block">Gate S{i + 1}</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.1"
                                                    value={height}
                                                    onChange={(e) => handleGateChange(i, e.target.value)}
                                                    className={`w-full p-2 border rounded-md text-center font-medium focus:ring-2 outline-none ${parseFloat(height) > 0 ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-300 bg-white'}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-gray-100">
                                    <button className="flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-shadow shadow-md hover:shadow-lg font-semibold">
                                        <Save size={18} />
                                        Save Record
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Recent Records Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
                                <h3 className="font-bold text-gray-800">Recent Records</h3>
                                <button className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded text-sm font-medium flex items-center gap-2 transition-colors">
                                    <Download size={16} />
                                    Download CSV
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-xs">
                                        <tr>
                                            <th className="px-8 py-4">Date/Time</th>
                                            <th className="px-8 py-4">Water Level (m)</th>
                                            <th className="px-8 py-4 text-center">Open Gates</th>
                                            <th className="px-8 py-4 text-center">Avg Height (m)</th>
                                            <th className="px-8 py-4 text-right">Discharge (Cumecs)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-4">2026-01-22 08:00</td>
                                            <td className="px-8 py-4 font-medium text-gray-900">29.4</td>
                                            <td className="px-8 py-4 text-center"><span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-bold">3</span></td>
                                            <td className="px-8 py-4 text-center">0.5</td>
                                            <td className="px-8 py-4 text-right font-mono">450.2</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-4">2026-01-22 07:00</td>
                                            <td className="px-8 py-4 font-medium text-gray-900">29.3</td>
                                            <td className="px-8 py-4 text-center"><span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs font-bold">3</span></td>
                                            <td className="px-8 py-4 text-center">0.5</td>
                                            <td className="px-8 py-4 text-right font-mono">440.1</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
export default DataEntry;