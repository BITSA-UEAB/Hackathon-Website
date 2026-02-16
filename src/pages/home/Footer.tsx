import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 border-t border-white">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src="/bitsa logo.png" alt="BITSA Logo" className="w-10 h-10 rounded-lg" />
          <span className="text-xl font-bold text-white">BITSA</span>
        </div>
        <nav className="flex flex-col md:flex-row gap-4 text-sm text-white">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="mailto:bitsa@email.com" className="hover:text-primary" aria-label="Email"><Mail size={20} /></a>
          <a href="tel:+1234567890" className="hover:text-primary" aria-label="Phone"><Phone size={20} /></a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Github"><Github size={20} /></a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary" aria-label="Twitter"><Twitter size={20} /></a>
        </div>
      </div>
      <div className="text-center text-xs text-white py-4 border-t border-white/20 mt-4">
        &copy; {currentYear} BITSA. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
