import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ArrowUp,
  Send,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
    alert("Thank you for subscribing to our newsletter!");
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Blog", path: "/blog" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const resourceLinks = [
    { name: "Documentation", path: "#" },
    { name: "API Reference", path: "#" },
    { name: "Community", path: "#" },
    { name: "Support", path: "/contact" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
    { name: "Cookie Policy", path: "#" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com/" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/bitsa logo.png" 
                alt="BITSA Logo" 
                className="w-12 h-12 rounded-lg bg-white/10 p-1" 
              />
              <div>
                <span className="text-2xl font-bold text-white">BITSA</span>
                <p className="text-xs text-white/70">Building Tomorrow's Tech Leaders</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Empowering students through technology, innovation, and community. 
              Join us in shaping the future of tech education and professional development.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <MapPin size={16} className="text-accent shrink-0" />
                <span>University Campus, Tech Building</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:info@bitsa.org" className="hover:text-accent transition-colors">
                  info@bitsa.org
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/80">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-white/80 hover:text-accent transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent mr-0 group-hover:mr-2 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-sm text-white/80 hover:text-accent transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent mr-0 group-hover:mr-2 transition-all duration-200" />
                    {link.name}
                    {link.path === "#" && <ExternalLink size={12} className="ml-1 opacity-50" />}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium text-white mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon size={18} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-white/80">
              Subscribe to our newsletter for the latest updates, events, and tech insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-accent text-primary rounded-md hover:bg-accent/90 transition-colors"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
            <p className="text-xs text-white/50">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-white/60">
              <span>&copy; {currentYear} BITSA. All rights reserved.</span>
              <span className="hidden md:inline">|</span>
              {legalLinks.map((link, index) => (
                <span key={link.name} className="flex items-center gap-4">
                  <Link 
                    to={link.path} 
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="hidden md:inline">|</span>
                  )}
                </span>
              ))}
            </div>
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-xs text-white/60 hover:text-accent transition-colors group"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
