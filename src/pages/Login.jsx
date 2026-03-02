import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import Header from '../components/Header';

const Login = () => {
    const [role, setRole] = useState('authority');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Role-based authentication with proper credential validation
        if (role === 'authority' && username === 'damadmin' && password === 'admin123') {
            navigate('/bhoothankett-dashboard');
        } else if (role === 'authority' && username === 'admin' && password === 'admin123') {
            // Additional admin credential for demo purposes
            navigate('/bhoothankett-dashboard');
        } else if (role === 'research' && username === 'research' && password === 'res123') {
            alert("Redirecting to Research Portal... (Page not implemented yet, using Dam Dashboard for demo)");
            navigate('/bhoothankett-dashboard');
        } else if (role === 'ddma' && username === 'ddma' && password === 'ddma123') {
            navigate('/ddma-dashboard');
        } else {
            // Show helpful error message with correct credentials
            alert('Invalid Credentials!\n\nValid credentials:\n• Dam Authority: admin / admin123\n• DDMA: ddma / ddma123');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <div className="bg-white rounded-xl shadow-lg flex overflow-hidden max-w-4xl w-full">
                    {/* Left Side - Image/Info */}
                    <div className="hidden md:block w-1/2 bg-blue-900 text-white p-12 relative overflow-hidden">
                        <div className="relative z-10 h-full flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">Secure Access Portal</h2>
                            <p className="opacity-90 leading-relaxed mb-8">
                                Welcome to the Integrated Weather & River Monitoring System. Please log in to access secure data monitoring and forecasting tools.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 opacity-80">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span>Real-time Monitoring</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-80">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span>Secure Data Transmission</span>
                                </div>
                                <div className="flex items-center gap-3 opacity-80">
                                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                    <span>Role-based Access Control</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-800 rounded-full opacity-50"></div>
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-800 rounded-full opacity-50"></div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full md:w-1/2 p-12 py-16">
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-gray-800">Account Login</h3>
                            <p className="text-gray-500 text-sm mt-2">Enter your credentials to access the system</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select User Type</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="authority">Dam Authority / Official</option>
                                    {/* <option value="research">Research / Academic</option> */}
                                    <option value="ddma">DDMA / Disaster Mgmt</option>
                                    {/* <option value="admin">System Administrator</option> */}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Username / ID</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter your ID"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                            </div>

                            <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                                Sign In <ArrowRight size={20} />
                            </button>

                            <div className="text-center text-xs text-gray-400 mt-4">
                                Demo Credentials: admin / admin123
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
