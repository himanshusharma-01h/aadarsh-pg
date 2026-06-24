import { useState, useEffect } from 'react';
import { Sun, Moon, Menu as MenuIcon, X, ShieldAlert, LogOut } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  adminUser: User | null;
  onLogout: () => void;
  showAdminDashboard: boolean;
  setShowAdminDashboard: (show: boolean) => void;
  onOpenLogin: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  adminUser,
  onLogout,
  showAdminDashboard,
  setShowAdminDashboard,
  onOpenLogin
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Mess Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setShowAdminDashboard(false);
    
    // Smooth scroll to element
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => {
              setShowAdminDashboard(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1.5 rounded-lg mr-2.5 shadow-md">
              A
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-blue-900 dark:text-blue-100">
                Aadarsh
              </span>
              <span className="text-sm block font-medium text-slate-500 dark:text-slate-400 leading-none">
                PG & Hostel
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {!showAdminDashboard ? (
              <div className="flex space-x-5">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setShowAdminDashboard(false)}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                ← Back to Main Website
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Admin Controls */}
            {adminUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAdminDashboard(!showAdminDashboard)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 ${
                    showAdminDashboard
                      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {showAdminDashboard ? 'Website View' : 'Admin Dashboard'}
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-lg transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                Admin Access
              </button>
            )}
          </div>

          {/* Mobile menu and controls */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Admin User Button (Mobile) */}
            {adminUser && (
              <button
                onClick={() => setShowAdminDashboard(!showAdminDashboard)}
                className="text-xs bg-blue-600 text-white px-2.5 py-1.5 rounded-lg font-medium"
              >
                {showAdminDashboard ? 'Home' : 'Admin'}
              </button>
            )}

            {/* Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {!showAdminDashboard ? (
              navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="block w-full text-left py-2.5 px-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-900 font-medium text-base transition-colors"
                >
                  {link.name}
                </button>
              ))
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowAdminDashboard(false);
                }}
                className="block w-full text-left py-2.5 px-3 rounded-lg text-blue-600 font-medium text-base"
              >
                ← Back to Website
              </button>
            )}

            {/* Mobile Admin controls */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-2">
              {adminUser ? (
                <div className="flex items-center justify-between px-3">
                  <span className="text-xs text-slate-500 font-medium">Logged in as Admin</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                    className="text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Admin Access Portal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
