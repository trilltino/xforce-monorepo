import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavLink({ to, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`relative px-4 py-2 text-sm font-medium font-nav transition-all duration-200 rounded-lg ${isActive
                    ? 'text-primary-400 bg-primary-900/20'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-primary-900/30'
                }`}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ to, children, onClick }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium font-nav ${isActive
                    ? 'text-primary-400 bg-primary-900/20'
                    : 'text-gray-300 hover:text-primary-400 hover:bg-primary-900/30'
                }`}
        >
            {children}
        </Link>
    );
}


function Dropdown({ label, items }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const location = useLocation();

    // Check if any child route is active
    const isActive = items.some(item => location.pathname === item.to);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className={`relative px-4 py-2 text-sm font-medium font-nav transition-all duration-200 rounded-lg flex items-center ${isActive
                        ? 'text-primary-400 bg-primary-900/20'
                        : 'text-gray-300 hover:text-primary-400 hover:bg-primary-900/30'
                    }`}
            >
                {label}
                <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-black border border-primary-900 rounded-lg shadow-lg z-50 animate-fade-in">
                    <div className="py-1">
                        {items.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2 text-sm text-gray-300 hover:text-primary-400 hover:bg-primary-900/30 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileRoadmapOpen, setMobileRoadmapOpen] = useState(false);
    const [mobileXfTerminalOpen, setMobileXfTerminalOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobile5WsOpen, setMobile5WsOpen] = useState(false);
    const [mobileTractionOpen, setMobileTractionOpen] = useState(false);

    const roadmapItems = [
        { to: '/roadmap', label: 'Overview' },
        { to: '/roadmap/month1', label: 'Month 1' },
        { to: '/roadmap/month2', label: 'Month 2' },
        { to: '/roadmap/month3', label: 'Month 3' },
        { to: '/roadmap/month4', label: 'Month 4' },
    ];

    const aboutMeItems = [
        { to: '/about', label: 'About me' },
        { to: '/projects', label: 'Proof of Work' },
    ];

    const architectureItems = [
        { to: '/architecture', label: 'Overview' },
        { to: '/architecture/overview', label: 'Big Picture' },
        { to: '/architecture/backend', label: 'Backend API' },
        { to: '/architecture/contracts', label: 'Smart Contracts' },
        { to: '/architecture/crypto', label: 'News Service' },
        { to: '/architecture/system', label: 'System Overview' },
    ];

    const fiveWsItems = [
        { to: '/5ws', label: 'Overview' },
        { to: '/who', label: 'Who?' },
        { to: '/what', label: 'What?' },
        { to: '/when', label: 'When?' },
        { to: '/where', label: 'Where?' },
        { to: '/why', label: 'Why?' },
        { to: '/how', label: 'How?' },
    ];

    const tractionItems = [
        { to: '/demand', label: 'Demand' },
        { to: '/competition', label: 'Competition' },
    ];

    const appItems = [
        { to: '/guide', label: 'Guide' },
        { to: '/terminal', label: 'Terminal' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-white hover:text-primary-400 transition-all duration-200 group"
                        >
                            <span className="text-red-500">XF</span>Terminal
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Dropdown label="5Ws and H" items={fiveWsItems} />
                        <Dropdown label="Roadmap" items={roadmapItems} />
                        <Dropdown label="Architecture" items={architectureItems} />
                        <NavLink to="/integrations">Integrations</NavLink>
                        <Dropdown label="Apps" items={appItems} />
                        <Dropdown label="Traction" items={tractionItems} />
                        <Dropdown label="About me" items={aboutMeItems} />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-400 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-primary-900 mt-2 animate-fade-in">
                        <div className="flex flex-col space-y-2 pt-4">
                            {/* Mobile 5Ws and H Dropdown */}
                            <div>
                                <button
                                    onClick={() => setMobile5WsOpen(!mobile5WsOpen)}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-primary-400 hover:bg-primary-900/30 rounded-lg transition-all duration-200 font-medium font-nav flex items-center justify-between"
                                >
                                    5Ws and H
                                    <svg className={`h-4 w-4 transition-transform ${mobile5WsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {mobile5WsOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        {fiveWsItems.map((item) => (
                                            <MobileNavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => { setMobileMenuOpen(false); setMobile5WsOpen(false); }}
                                            >
                                                {item.label}
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Roadmap Dropdown */}
                            <div>
                                <button
                                    onClick={() => setMobileRoadmapOpen(!mobileRoadmapOpen)}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-primary-400 hover:bg-primary-900/30 rounded-lg transition-all duration-200 font-medium font-nav flex items-center justify-between"
                                >
                                    Roadmap
                                    <svg className={`h-4 w-4 transition-transform ${mobileRoadmapOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {mobileRoadmapOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        {roadmapItems.map((item) => (
                                            <MobileNavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => { setMobileMenuOpen(false); setMobileRoadmapOpen(false); }}
                                            >
                                                {item.label}
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <MobileNavLink to="/architecture" onClick={() => setMobileMenuOpen(false)}>Architecture</MobileNavLink>
                            <MobileNavLink to="/integrations" onClick={() => setMobileMenuOpen(false)}>Integrations</MobileNavLink>
                            
                            {/* Mobile Apps Dropdown */}
                            <div>
                                <button
                                    onClick={() => setMobileXfTerminalOpen(!mobileXfTerminalOpen)}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-primary-400 hover:bg-primary-900/30 rounded-lg transition-all duration-200 font-medium font-nav flex items-center justify-between"
                                >
                                    Apps
                                    <svg className={`h-4 w-4 transition-transform ${mobileXfTerminalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {mobileXfTerminalOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        {appItems.map((item) => (
                                            <MobileNavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => { setMobileMenuOpen(false); setMobileXfTerminalOpen(false); }}
                                            >
                                                {item.label}
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Traction Dropdown */}
                            <div>
                                <button
                                    onClick={() => setMobileTractionOpen(!mobileTractionOpen)}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-primary-400 hover:bg-primary-900/30 rounded-lg transition-all duration-200 font-medium font-nav flex items-center justify-between"
                                >
                                    Traction
                                    <svg className={`h-4 w-4 transition-transform ${mobileTractionOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {mobileTractionOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        {tractionItems.map((item) => (
                                            <MobileNavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile About Me Dropdown */}
                            <div>
                                <button
                                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                    className="w-full px-4 py-3 text-left text-gray-300 hover:text-primary-400 hover:bg-primary-900/30 rounded-lg transition-all duration-200 font-medium font-nav flex items-center justify-between"
                                >
                                    About me
                                    <svg className={`h-4 w-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {mobileAboutOpen && (
                                    <div className="pl-4 mt-1 space-y-1">
                                        {aboutMeItems.map((item) => (
                                            <MobileNavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={() => { setMobileMenuOpen(false); setMobileAboutOpen(false); }}
                                            >
                                                {item.label}
                                            </MobileNavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
