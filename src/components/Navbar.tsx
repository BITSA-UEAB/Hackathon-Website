import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
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
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/bitsa logo.png" 
              alt="BITSA Logo" 
              className="w-24 h-24 rounded-lg transition-transform duration-300 hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['/', '/about', '/events', '/blog', '/gallery', '/contact'].map((path) => {
              const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
              const isActive = location.pathname === path;
              const baseClass = "text-gray-700 hover:text-blue-600 transition-all duration-300 font-semibold text-lg hover:scale-105";
              const activeClass = "text-blue-700 underline font-bold";
              return (
                <Link
                  key={path}
                  to={path}
                  className={`${baseClass} ${isActive ? activeClass : ''}`}
                >
                  {label}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border border-blue-100 shadow-xl" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-white rounded-t-lg">
                    <Avatar className="h-10 w-10 border-2 border-blue-200">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-gray-600">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-blue-100" />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                    <Link to="/profile" className="flex items-center py-2">
                      <User className="mr-3 h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild className="cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                      <Link to="/admin" className="flex items-center py-2">
                        <User className="mr-3 h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-blue-100" />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="cursor-pointer hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="mr-3 h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 transition-all duration-300 font-semibold px-6"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6"
                  >
                    Join BITSA
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-all duration-300 p-3 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-6 space-y-3 border-t border-blue-100 bg-white/98 backdrop-blur-xl shadow-lg">
              {['/', '/about', '/events', '/blog', '/gallery', '/contact'].map((path) => {
                const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
                const isActive = location.pathname === path;
                const baseClass = "block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-4 px-6 rounded-xl font-semibold text-lg border border-transparent hover:border-blue-200";
                const activeClass = "text-blue-700 underline font-bold";
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`${baseClass} ${isActive ? activeClass : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
               );
              })}

            {isAuthenticated ? (
              <div className="space-y-4 pt-6 border-t border-blue-100">
                <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200">
                  <Avatar className="h-12 w-12 border-2 border-blue-300">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-4 px-6 rounded-xl font-semibold text-lg border border-transparent hover:border-blue-200"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-4 px-6 rounded-xl font-semibold text-lg border border-transparent hover:border-blue-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-400 transition-all duration-300 font-semibold py-4 text-lg"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pt-6 border-t border-blue-100">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-400 transition-all duration-300 font-semibold py-4 text-lg"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="default" 
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold py-4 text-lg"
                  >
                    Join BITSA
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;