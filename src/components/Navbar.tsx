import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/events', label: 'Events' },
    { path: '/blog', label: 'Blog' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/98 dark:bg-slate-900/95 backdrop-blur-2xl shadow-lg border-b border-blue-200/50 dark:border-slate-800'
          : 'bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border-b border-blue-100/30 dark:border-slate-800/60 shadow-sm'
      }`}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Enhanced Animation */}
          <Link to="/" className="relative group flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
              <img 
                src="/bitsa logo.png" 
                alt="BITSA Logo" 
                className="relative w-24 h-24 rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
              />
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced Layout */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={link.label}
                  className={`relative group px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded transition-shadow duration-200 ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  <span className={`text-base font-semibold tracking-wide transition-colors duration-300 ${
                    isActive
                      ? 'text-blue-800 dark:text-blue-300 drop-shadow-[0_1px_0_rgba(0,0,0,0.12)]'
                      : 'text-gray-700 group-hover:text-blue-600 dark:text-gray-200'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 transform origin-left transition-transform duration-300 ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-700 border-2 border-white dark:border-gray-900 rounded-full animate-pulse shadow-lg"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Dark Mode Toggle - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center mr-2">
              <span className="text-xs text-gray-500 mr-2">🌞</span>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} aria-label="Toggle dark mode" />
              <span className="text-xs text-gray-500 ml-2">🌙</span>
            </div>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-11 px-4 rounded-full border-2 border-blue-100 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-300 mr-1">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 border-2 border-blue-100 shadow-2xl rounded-2xl overflow-hidden" align="end" forceMount>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 via-blue-100/50 to-white">
                    <Avatar className="h-12 w-12 border-2 border-blue-300 shadow-md">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                      {user?.role && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-blue-100" />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 mx-1 my-1 rounded-lg">
                    <Link to="/profile" className="flex items-center py-2.5 px-3">
                      <User className="mr-3 h-4 w-4 text-blue-600" />
                      <span className="text-gray-700 font-medium">My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 transition-colors duration-200 mx-1 my-1 rounded-lg">
                      <Link to="/admin" className="flex items-center py-2.5 px-3">
                        <User className="mr-3 h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 font-medium">Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-blue-100" />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="cursor-pointer hover:bg-red-50 focus:bg-red-50 transition-colors duration-200 mx-1 my-1 mb-2 rounded-lg"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-red-500" />
                    <span className="text-gray-700 font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-500 transition-all duration-300 font-semibold px-6 rounded-full shadow-sm hover:shadow-md"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 rounded-full group"
                  >
                    <span className="relative z-10">Join BITSA</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative p-2.5 rounded-xl text-gray-700 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {/* Dark Mode Toggle - Mobile */}
          <div className="flex items-center justify-end mb-2">
            <span className="text-xs text-gray-500 mr-2">🌞</span>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} aria-label="Toggle dark mode" />
            <span className="text-xs text-gray-500 ml-2">🌙</span>
          </div>
          <div className="py-6 space-y-2 border-t border-blue-100">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block relative overflow-hidden py-3.5 px-5 rounded-xl font-semibold text-base transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-2 border-blue-300 shadow-md' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-700"></span>
                  )}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div className="space-y-3 pt-6 border-t-2 border-blue-100 mt-4">
                <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-50 via-blue-100/50 to-white rounded-xl border-2 border-blue-200 shadow-sm">
                  <Avatar className="h-14 w-14 border-2 border-blue-400 shadow-md">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white text-lg font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg text-gray-900 truncate">{user?.name}</p>
                    <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                    {user?.role && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block py-3.5 px-5 rounded-xl font-semibold text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block py-3.5 px-5 rounded-xl font-semibold text-base text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border-2 border-transparent hover:border-blue-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 transition-all duration-300 font-semibold py-3.5 text-base rounded-xl shadow-sm hover:shadow-md"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3 pt-6 border-t-2 border-blue-100 mt-4">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-500 transition-all duration-300 font-semibold py-3.5 text-base rounded-xl shadow-sm hover:shadow-md"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button 
                    size="lg"
                    className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-3.5 text-base rounded-xl group"
                  >
                    <span className="relative z-10">Join BITSA</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;