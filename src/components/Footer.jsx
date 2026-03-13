import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white border-t border-blue-800" style={{ backgroundColor: '#172554' }}>
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Institute Information */}
                    <div className="md:col-span-2">
                        <div className="flex items-start gap-4 mb-4">
                            <img
                                src="/logo.png"
                                alt="Center for AI-IoT Innovation"
                                className="h-14 w-15 md:h-20 md:w-20 object-cover rounded-full"
                            />
                            <div>
                                <h4 className="font-bold text-lg mb-1">Center for AI-IOT Innovation</h4>
                                <p className="text-sm opacity-80 mb-2">Supported by Ministry of Electronics and Information Technology</p>
                                <p className="text-sm opacity-80 mb-2">Adi Shankara Institute of Engineering & Technology</p>
                                <p className="text-xs opacity-70 leading-relaxed">
                                    Development of digital networking for preventive and predictive Environmental and climatic warning solutions -building an entrepreneurial ecosystem or addressing Environmental issues
                                </p>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 space-y-1 mt-4">
                            <p>📍 Kalady, Ernakulam District, Kerala - 683574, India</p>
                            <p>📞 Phone: +91-484-2463333 | Fax: +91-484-2463444</p>
                            <p>✉️ Email: info@adishankara.ac.in | research@adishankara.ac.in</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-700 pb-2">Quick Links</h5>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">About Institute</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Research & Development</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Academic Programs</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Publications</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Collaborations</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h5 className="font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-700 pb-2">Important Links</h5>
                        <ul className="space-y-2 text-sm opacity-80">

                            <li><a href="#" className="hover:text-white hover:underline transition-colors">India Meteorological Dept</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Central Water Commission</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">NDMA</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Kerala SDMA</a></li>
                            <li><a href="#" className="hover:text-white hover:underline transition-colors">Digital India</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-blue-800" style={{ backgroundColor: '#0f172a' }}>
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                        <div className="opacity-70">
                            <p>© 2025 Adi Shankara Institute of Engineering & Technology. All Rights Reserved.</p>

                        </div>
                        <div className="flex gap-6 opacity-80">
                            <a href="#" className="hover:text-white hover:underline transition-colors">Contact Us</a>
                            <span>|</span>
                            <a href="#" className="hover:text-white hover:underline transition-colors">Sitemap</a>
                            <span>|</span>
                            <a href="#" className="hover:text-white hover:underline transition-colors">Disclaimer</a>
                            <span>|</span>
                            <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
                            <span>|</span>
                            <a href="#" className="hover:text-white hover:underline transition-colors">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
