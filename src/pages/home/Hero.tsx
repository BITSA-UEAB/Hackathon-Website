import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Calendar, BookOpen, Award, TrendingUp, Code, Briefcase, ChevronRight, Zap, Shield, Globe, Star, Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import axios from "axios";

// Simplified Button component
const Button = ({ children, className, variant = "default", onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    active_members: 500,
    annual_events: 50,
    projects: 100
  });
  const [loading, setLoading] = useState(true);

  // Intersection Observer for animations
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [(entry.target as HTMLElement).dataset.section as string]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const slides = [
    {
      image: "/background slider1.jpeg",
      alt: "BITSA Community Event",
    },
    {
      image: "/background slider2.jpeg",
      alt: "Workshop Session",
    },
    {
      image: "/background slider3.jpeg",
      alt: "Hackathon Event",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/auth/stats/');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Helper function to check if section is visible
  const isVisible = (sectionId) => visibleSections[sectionId] || false;

  return (
    <section className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section with Working Slider - Blue Overlay */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Slider */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg animate-fade-in-up">
              BITSA
            </h1>
            <p className="text-xl sm:text-2xl mb-4 text-blue-100 drop-shadow animate-fade-in-up animation-delay-200">
              Where Future Tech Leaders Connect, Learn, and Innovate
            </p>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl drop-shadow animate-fade-in-up animation-delay-400">
              Join a thriving community of IT students committed to excellence in technology and innovation.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
              <Button
                onClick={() => navigate("/register")}
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg flex items-center justify-center group shadow-lg hover:scale-105 transition-transform"
              >
                Join Community
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate("/about")}
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar - White with Blue Accents */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div 
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="stats"
          className={`bg-white rounded-xl shadow-xl p-8 grid grid-cols-3 gap-4 max-w-3xl mx-auto border border-gray-200 transform transition-all duration-700 ${
            isVisible('stats') ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {[
            { label: 'Active Members', value: stats.active_members, icon: Users },
            { label: 'Annual Events', value: stats.annual_events, icon: Calendar },
            { label: 'Projects Completed', value: stats.projects, icon: Code },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {loading ? '-' : `${item.value}+`}
              </div>
              <div className="text-sm text-gray-600">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Extended Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* About Section - Light Blue Background */}
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="about"
          className="max-w-3xl mx-auto text-center mb-20 p-12 rounded-3xl bg-blue-50 transform transition-all duration-700"
          style={{
            transform: isVisible('about') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('about') ? 1 : 0
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Your Gateway to Tech Excellence
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At BITSA, we bridge the gap between academic learning and industry demands, 
            providing students with the tools, connections, and opportunities to thrive 
            in the digital landscape. Our community is built on collaboration, innovation, 
            and a shared passion for technology.
          </p>
        </div>

        {/* Features Grid - White Cards on Light Gray Background */}
        <div 
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="features"
          className="mb-20 p-8 bg-gray-50 rounded-3xl transform transition-all duration-700"
          style={{
            transform: isVisible('features') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('features') ? 1 : 0
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Community", description: "Connect with 500+ passionate IT students", color: "blue" },
              { icon: Calendar, title: "Events", description: "50+ annual workshops and hackathons", color: "blue" },
              { icon: BookOpen, title: "Resources", description: "Curated learning materials and guides", color: "blue" },
              { icon: Zap, title: "Fast-Track", description: "Accelerated skill development programs", color: "blue" },
              { icon: Shield, title: "Industry Ready", description: "Career-focused training", color: "blue" },
              { icon: Globe, title: "Global Network", description: "Connect with professionals", color: "blue" },
              { icon: Award, title: "Recognition", description: "Certificates awarded annually", color: "blue" },
              { icon: Briefcase, title: "Placements", description: "85% job placement rate", color: "blue" },
            ].map((feature, index) => (
              <div key={index} className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Section - Blue Gradient Background */}
        <div 
          ref={(el) => (sectionRefs.current[3] = el)}
          data-section="achievements"
          className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('achievements') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('achievements') ? 1 : 0
          }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-10">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, value: '150+', label: 'Certificates Awarded' },
              { icon: TrendingUp, value: '85%', label: 'Placement Rate' },
              { icon: Briefcase, value: '30+', label: 'Tech Partners' },
              { icon: Code, value: '200+', label: 'Internships' },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors backdrop-blur-sm">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-sm text-blue-200">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section - White Cards on Gray Background */}
        <div 
          ref={(el) => (sectionRefs.current[4] = el)}
          data-section="testimonials"
          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('testimonials') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('testimonials') ? 1 : 0
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">What Our Members Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "CS Student",
                quote: "BITSA transformed my college experience. The workshops and mentorship helped me land my dream internship.",
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                quote: "The community here is incredible. I've made lifelong friends and learned so much from peer collaborations.",
              },
              {
                name: "Priya Patel",
                role: "Tech Lead",
                quote: "From hackathon participant to mentor - BITSA's supportive environment helped me grow at every stage.",
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-blue-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events - Light Gray Background */}
        <div 
          ref={(el) => (sectionRefs.current[5] = el)}
          data-section="events"
          className="mb-20 p-8 bg-gray-100 rounded-3xl transform transition-all duration-700"
          style={{
            transform: isVisible('events') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('events') ? 1 : 0
          }}
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Web Development Workshop", date: "March 15, 2024", time: "2:00 PM", spots: 25 },
              { title: "AI/ML Hackathon", date: "March 20, 2024", time: "9:00 AM", spots: 50 },
              { title: "Tech Career Fair", date: "March 25, 2024", time: "10:00 AM", spots: 100 },
              { title: "Cloud Computing Seminar", date: "March 30, 2024", time: "3:00 PM", spots: 30 },
            ].map((event, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blue-600">{event.date.split(' ')[1]}</span>
                  <span className="text-xs text-blue-600">{event.date.split(' ')[0]}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.time} • {event.spots} spots left</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section - White Background with Gray Borders */}
        <div 
          ref={(el) => (sectionRefs.current[6] = el)}
          data-section="partners"
          className="mb-20 p-8 bg-white rounded-3xl border border-gray-200 transform transition-all duration-700"
          style={{
            transform: isVisible('partners') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('partners') ? 1 : 0
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-16 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 font-medium border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all hover:-translate-y-1">
                Partner {i}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section - Light Blue Background */}
        <div 
          ref={(el) => (sectionRefs.current[7] = el)}
          data-section="faq"
          className="mb-20 p-8 bg-blue-50 rounded-3xl transform transition-all duration-700"
          style={{
            transform: isVisible('faq') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('faq') ? 1 : 0
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "How do I join BITSA?", a: "Simply click the 'Join Community' button and fill out the registration form. It's free for all IT students!" },
              { q: "What events do you organize?", a: "We organize hackathons, workshops, tech talks, networking sessions, and career fairs throughout the year." },
              { q: "Can non-IT students join?", a: "Yes! While we focus on IT, we welcome all students interested in technology." },
              { q: "Is there a membership fee?", a: "No, BITSA membership is completely free for students." },
            ].map((faq, index) => (
              <div key={index} className="bg-white border border-blue-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all hover:-translate-y-1">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section - Blue Gradient Background */}
        <div 
          ref={(el) => (sectionRefs.current[8] = el)}
          data-section="newsletter"
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('newsletter') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('newsletter') ? 1 : 0
          }}
        >
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest events, resources, and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        {/* Contact Section - Light Gray Background */}
        <div 
          ref={(el) => (sectionRefs.current[9] = el)}
          data-section="contact"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 p-8 bg-gray-100 rounded-3xl transform transition-all duration-700"
          style={{
            transform: isVisible('contact') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('contact') ? 1 : 0
          }}
        >
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <Mail className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-600">contact@bitsa.org</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <Phone className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-all">
                <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-gray-600">123 Tech Street, Silicon Valley, CA</span>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 group transition-all hover:scale-110 shadow-md">
                <Github className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 group transition-all hover:scale-110 shadow-md">
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 group transition-all hover:scale-110 shadow-md">
                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              {['About Us', 'Events', 'Resources', 'Gallery', 'Blog', 'Contact', 'FAQs', 'Support'].map((link, index) => (
                <a key={index} href="#" className="p-2 bg-white rounded-lg text-gray-600 hover:text-blue-600 hover:shadow-md transition-all hover:-translate-y-1 text-center">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA - White Background with Blue Border */}
        <div 
          ref={(el) => (sectionRefs.current[10] = el)}
          data-section="final-cta"
          className="text-center border-t border-gray-200 pt-16 transform transition-all duration-700"
          style={{
            transform: isVisible('final-cta') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('final-cta') ? 1 : 0
          }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join BITSA today and become part of a community dedicated to innovation and excellence in technology.
          </p>
          <Button
            onClick={() => navigate("/register")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 text-lg inline-flex items-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  );
};

export default Hero;