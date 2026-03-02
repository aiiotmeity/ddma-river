import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, History, FileText, Settings, Save, Download,
    Calculator, CheckCircle, AlertTriangle, ShieldCheck, Clock, XCircle, UserCircle, Lock
} from 'lucide-react';

const DataEntry = () => {
    const navigate = useNavigate();

    // --- ROLE & AUTH STATE ---
    const [currentRole, setCurrentRole] = useState('operator');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authPin, setAuthPin] = useState('');
    const [authError, setAuthError] = useState('');

    // --- FORM STATE ---
    const [logTime, setLogTime] = useState('2026-02-28T10:45');
    const [waterLevel, setWaterLevel] = useState('34.70');
    const [discharge, setDischarge] = useState('49.56');
    const [gateHeights, setGateHeights] = useState([
        '0.15', '0.05', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'
    ]);

    // --- SYSTEM LOGS & WORKFLOW STATE ---
    const [logs, setLogs] = useState([
        {
            id: 'LOG-892',
            time: '2026-02-28 10:00',
            wl: '34.65',
            gates: ['0.15', '0.15', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            activeGates: 2,
            discharge: '74.00',
            status: 'Published',
            author: 'BWD-8492'
        },
        {
            id: 'LOG-891',
            time: '2026-02-28 09:00',
            wl: '34.66',
            gates: ['0.15', '0.15', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'],
            activeGates: 2,
            discharge: '74.05',
            status: 'Published',
            author: 'BWD-8492'
        }
    ]);

    const handleGateChange = (index, value) => {
        const newHeights = [...gateHeights];
        newHeights[index] = value === '' ? '0' : Math.max(0, parseFloat(value)).toString();
        setGateHeights(newHeights);
    };

    const calculateDischarge = () => {
        const totalHeight = gateHeights.reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
        const currentWL = parseFloat(waterLevel) || 29.26;
        const effectiveHead = Math.max(currentWL - 29.26, 0.1);
        const headFactor = Math.sqrt(effectiveHead / (34.65 - 29.26));
        const calcDischarge = totalHeight * 246.66 * headFactor;
        setDischarge(calcDischarge.toFixed(2));
    };

    // OPERATOR ACTION: Submit for Verification
    const handleSubmitForVerification = () => {
        const activeCount = gateHeights.filter(h => parseFloat(h) > 0).length;
        const newLog = {
            id: `LOG-${Math.floor(Math.random() * 1000) + 900}`,
            time: logTime.replace('T', ' '),
            wl: waterLevel,
            gates: [...gateHeights],
            activeGates: activeCount,
            discharge: discharge,
            status: 'Pending Verification',
            author: 'BWD-8492'
        };
        setLogs([newLog, ...logs]);
        alert('Data submitted to the Executive Engineer for verification.');

        // Reset form slightly to show submission worked
        setGateHeights(Array(15).fill('0'));
        setDischarge('0.00');
    };

    // ENGINEER ACTION: Approve & Publish
    const handleApprove = (logId) => {
        setLogs(logs.map(log =>
            log.id === logId ? { ...log, status: 'Published' } : log
        ));
        alert('Data verified and published to the DDMA Control Room Network.');
    };

    // ENGINEER ACTION: Reject
    const handleReject = (logId) => {
        setLogs(logs.map(log =>
            log.id === logId ? { ...log, status: 'Rejected' } : log
        ));
    };

    // AUTHENTICATION LOGIC
    const handleEngineerLogin = (e) => {
        e.preventDefault();
        // Simple mock authentication (PIN: 7492)
        if (authPin === '7492') {
            setCurrentRole('engineer');
            setShowAuthModal(false);
            setAuthPin('');
            setAuthError('');
        } else {
            setAuthError('Invalid Authorization PIN. Access Denied.');
        }
    };

    const pendingLogs = logs.filter(log => log.status === 'Pending Verification');

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative">

            {/* --- SECURITY MODAL --- */}
            {showAuthModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 md:p-8 border border-slate-200 animate-in fade-in zoom-in duration-200">
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={24} className="text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 text-center mb-2 tracking-tight">
                            Engineer Authorization
                        </h3>
                        <p className="text-sm text-slate-500 text-center mb-6 leading-relaxed">
                            Please enter the secure PIN to access the verification dashboard. <br /> <span className="text-[10px] font-bold"></span>
                        </p>

                        <form onSubmit={handleEngineerLogin}>
                            <input
                                type="password"
                                placeholder="• • • •"
                                className={`w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 mb-2 font-mono text-center tracking-[1em] text-2xl ${authError ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500'}`}
                                value={authPin}
                                onChange={(e) => setAuthPin(e.target.value)}
                                maxLength={4}
                                autoFocus
                            />
                            {authError && <p className="text-xs text-red-500 font-bold text-center mb-4">{authError}</p>}

                            <div className="flex gap-3 mt-6">
                                <button type="button" onClick={() => { setShowAuthModal(false); setAuthError(''); setAuthPin(''); }} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-md transition-all">
                                    Authorize
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
                <div className="container mx-auto py-3 px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-100 p-2 rounded-lg border border-slate-200">
                            <img src="/logo.png" className="h-10 w-10 object-contain" alt="Kerala Gov Logo" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 tracking-tight">Bhoothathankettu Barrage</h1>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Irrigation Department | Ernakulam</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* ROLE TOGGLE */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                                onClick={() => setCurrentRole('operator')}
                                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${currentRole === 'operator' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Operator View
                            </button>
                            <button
                                onClick={() => {
                                    if (currentRole !== 'engineer') setShowAuthModal(true);
                                }}
                                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md transition-all flex items-center gap-1.5 ${currentRole === 'engineer' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {currentRole !== 'engineer' && <Lock size={10} />} Exec. Engineer View
                            </button>
                        </div>

                        <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 pl-6">
                            <UserCircle size={20} className={currentRole === 'engineer' ? 'text-emerald-600' : 'text-slate-400'} />
                            <span className="text-slate-500 text-sm">
                                {currentRole === 'engineer' ? 'EE-104 (Engineer)' : 'BWD-8492 (Operator)'}
                            </span>
                        </div>
                        <button onClick={() => navigate('/login')} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 hover:bg-red-100 transition-colors font-bold text-xs uppercase tracking-wider">
                            End Shift
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 container mx-auto max-w-7xl">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-x border-slate-200 hidden md:block my-6 rounded-l-xl shadow-sm">
                    <div className="p-6">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Control Panel</h2>
                        <nav className="space-y-2">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold transition-colors shadow-sm">
                                <LayoutDashboard size={18} />
                                Data Entry
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-bold transition-colors">
                                <History size={18} />
                                Log Book
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-bold transition-colors">
                                <FileText size={18} />
                                Export Reports
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg font-bold transition-colors">
                                <Settings size={18} />
                                Calibration
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    <div className="space-y-6">

                        {/* Page Header - Verify Button removed from here! */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-4 border-b border-slate-200 gap-4">
                            <div>
                                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Telemetry Update Form</h1>
                                <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-2">
                                    <CheckCircle size={14} /> System Online
                                </p>
                            </div>
                        </div>

                        {/* --- EXECUTIVE ENGINEER VIEW: PENDING APPROVALS --- */}
                        {currentRole === 'engineer' && pendingLogs.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm mb-6">
                                <h3 className="text-amber-800 font-black tracking-wide flex items-center gap-2 mb-4">
                                    <ShieldCheck size={20} /> Action Required: Pending Verification ({pendingLogs.length})
                                </h3>
                                <div className="space-y-4">
                                    {pendingLogs.map(log => (
                                        <div key={log.id} className="bg-white p-4 rounded-lg border border-amber-100 flex flex-col lg:flex-row justify-between lg:items-center gap-4 shadow-sm">
                                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase">Log Time</p>
                                                    <p className="font-bold text-slate-800">{log.time}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase">Water Level</p>
                                                    <p className="font-bold text-slate-800">{log.wl} m</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase">Discharge</p>
                                                    <p className="font-bold text-blue-700">{log.discharge} m³/s</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase">Submitted By</p>
                                                    <p className="font-bold text-slate-800">{log.author}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleReject(log.id)} className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-1">
                                                    <XCircle size={14} /> Reject
                                                </button>
                                                <button onClick={() => handleApprove(log.id)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-sm transition-colors flex items-center gap-1">
                                                    <CheckCircle size={14} /> Approve & Publish
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- OPERATOR VIEW: DATA ENTRY FORM --- */}
                        {currentRole === 'operator' && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="bg-gradient-to-r from-slate-50 to-white px-6 md:px-8 py-5 border-b border-slate-200 flex justify-between items-center">
                                    <h3 className="text-slate-800 font-black tracking-wide">Record Update</h3>
                                </div>
                                <div className="p-6 md:p-8">
                                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-600 uppercase tracking-wide">Log Time</label>
                                            <input
                                                type="datetime-local"
                                                value={logTime}
                                                onChange={(e) => setLogTime(e.target.value)}
                                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                                            />
                                        </div>
                                        <div className="space-y-2 relative">
                                            <label className="block text-xs font-black text-slate-600 uppercase tracking-wide">Water Level (FRL 34.95m)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={waterLevel}
                                                    onChange={(e) => setWaterLevel(e.target.value)}
                                                    className="w-full p-3 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-black text-slate-800 text-lg"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">m</span>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col justify-center relative overflow-hidden">
                                            <div className="absolute right-0 top-0 opacity-10"><Calculator size={100} className="text-blue-500" /></div>
                                            <label className="block text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1 relative z-10">Calculated Discharge</label>
                                            <div className="flex items-baseline gap-1 relative z-10">
                                                <span className="text-3xl font-black text-blue-900">{discharge}</span>
                                                <span className="text-sm font-bold text-blue-700">m³/s</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="block text-xs font-black text-slate-600 uppercase tracking-wide">Radial Gate Aperture Heights (Meters)</label>
                                            <button onClick={() => setGateHeights(Array(15).fill('0'))} className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest border border-blue-200 px-2 py-1 rounded hover:bg-blue-50 transition-colors">Close All</button>
                                        </div>
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4">
                                            {gateHeights.map((height, i) => (
                                                <div key={i} className="relative group">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase absolute -top-2 left-2 bg-white px-1 z-10">S{i + 1}</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.05"
                                                        value={height}
                                                        onChange={(e) => handleGateChange(i, e.target.value)}
                                                        className={`w-full p-3 pt-4 border rounded-lg text-center font-black focus:ring-2 outline-none transition-all ${parseFloat(height) > 0
                                                                ? 'border-blue-400 bg-blue-50 text-blue-900'
                                                                : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-white'
                                                            }`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* --- BUTTONS MOVED SIDE-BY-SIDE HERE --- */}
                                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
                                        <button
                                            onClick={calculateDischarge}
                                            className="flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3.5 rounded-lg hover:bg-slate-900 transition-colors shadow-sm font-bold"
                                        >
                                            <Calculator size={18} />
                                            Verify & Calculate
                                        </button>
                                        <button onClick={handleSubmitForVerification} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-black tracking-wide">
                                            <ShieldCheck size={20} />
                                            Submit for Verification
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- UNIVERSAL VIEW: TRANSMISSION LOG --- */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-6">
                            <div className="px-6 md:px-8 py-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h3 className="font-black text-slate-800 tracking-wide">System Transmission Log</h3>
                                <button className="text-slate-600 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors uppercase tracking-widest">
                                    <Download size={14} />
                                    Export CSV
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-widest">
                                        <tr>
                                            <th className="px-6 md:px-8 py-4">Status</th>
                                            <th className="px-6 md:px-8 py-4">Date/Time</th>
                                            <th className="px-6 md:px-8 py-4">Water Level</th>
                                            <th className="px-6 md:px-8 py-4 text-center">Active Gates</th>
                                            <th className="px-6 md:px-8 py-4 text-right">Discharge (m³/s)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium">
                                        {logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 md:px-8 py-4">
                                                    {log.status === 'Published' && <span className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase"><CheckCircle size={14} /> Published Live</span>}
                                                    {log.status === 'Pending Verification' && <span className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase"><Clock size={14} /> Pending</span>}
                                                    {log.status === 'Rejected' && <span className="flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase"><XCircle size={14} /> Rejected</span>}
                                                </td>
                                                <td className="px-6 md:px-8 py-4">{log.time}</td>
                                                <td className="px-6 md:px-8 py-4 font-black text-slate-800">{log.wl}m</td>
                                                <td className="px-6 md:px-8 py-4 text-center">
                                                    <span className="bg-slate-100 text-slate-600 border border-slate-200 py-1 px-2.5 rounded text-[10px] font-black">{log.activeGates} Open</span>
                                                </td>
                                                <td className="px-6 md:px-8 py-4 text-right font-black text-blue-700">{log.discharge}</td>
                                            </tr>
                                        ))}
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