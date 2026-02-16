import { useState, useEffect, useRef } from "react";
import { Target, Heart, Rocket, Sparkles, Code, Lightbulb, Users2, Trophy, ChevronRight, Award, Calendar, Users, BookOpen, Zap, Shield, Globe, Star } from "lucide-react";

// Leadership interface matching the API response
interface Leadership {
  id: number;
  name: string;
  position: string;
  image_url: string | null;
  student_id: string;
  leadership_type: string;
  is_active: boolean;
  bio?: string;
  links?: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
}

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to resolve image URL
const resolveImageUrl = (url: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${API_BASE_URL.replace('/api', '')}${url}`;
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to get avatar color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-blue-600',
    'bg-blue-700',
    'bg-blue-800',
    'bg-indigo-600',
    'bg-indigo-700',
    'bg-sky-600',
    'bg-sky-700',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

// LeaderCard Component
const LeaderCard = ({ leader, type }: { leader: Leadership; type: 'top' | 'student' }) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image with Fallback */}
        <div className={`rounded-full flex items-center justify-center mb-3 shadow-md overflow-hidden ${
          type === 'top' ? 'w-24 h-24' : 'w-20 h-20'
        } ${
          resolveImageUrl(leader.image_url) ? 'bg-transparent ring-2 ring-blue-200' : getAvatarColor(leader.name)
        }`}>
          {resolveImageUrl(leader.image_url) ? (
            <img 
              src={resolveImageUrl(leader.image_url) || ''}
              alt={leader.name}
              loading="lazy"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-white font-bold text-lg">${getInitials(leader.name)}</span>`;
                  parent.className = `${type === 'top' ? 'w-24 h-24' : 'w-20 h-20'} rounded-full flex items-center justify-center mb-3 shadow-md ${getAvatarColor(leader.name)}`;
                }
              }}
            />
          ) : (
            <span className="text-white font-bold text-lg">
              {getInitials(leader.name)}
            </span>
          )}
        </div>

        {/* Name */}
        <h4 className="text-lg font-bold text-gray-900 mb-1">
          {leader.name}
        </h4>

        {/* Position as subtitle */}
        <p className="text-sm font-semibold text-blue-600 mb-1">
          {leader.position}
        </p>

        {leader.student_id ? (
          <p className="text-xs text-gray-500">
            ID: {leader.student_id}
          </p>
        ) : null}

        {/* Bio/Description */}
        {leader.bio && (
          <p className="text-xs text-gray-600 mt-2 mb-3 max-w-xs line-clamp-2">
            {leader.bio}
          </p>
        )}

        {/* Social/Profile Links */}
        {leader.links && (
          <div className="flex gap-3 justify-center mt-2">
            {leader.links.linkedin && (
              <a href={leader.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-blue-600 hover:text-blue-800 transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.844-1.563 3.042 0 3.604 2.003 3.604 4.605v5.591z"/></svg>
              </a>
            )}
            {leader.links.github && (
              <a href={leader.links.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-700 hover:text-black transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {leader.links.email && (
              <a href={`mailto:${leader.links.email}`} title="Email" className="text-blue-600 hover:text-blue-800 transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-8-5.065v10h16v-10l-8 5.065zm8-7.065h-16c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-14c0-1.104-.896-2-2-2zm-8 7.065l8-5.065v-2h-16v2l8 5.065z"/></svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Position placeholder card component
const LeaderPositionCard = ({ title, position, type, placeholder }: {
  title: string;
  position: string;
  type: 'top' | 'student';
  placeholder: string;
}) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-300 shadow-sm ${
    type === 'top' ? 'p-6' : 'p-5'
  } hover:border-blue-300 hover:bg-white transition-all duration-300 hover:-translate-y-1`}>
    <div className="flex flex-col items-center text-center">
      {/* Placeholder Avatar with Camera Icon */}
      <div className={`rounded-full bg-gray-200 flex items-center justify-center mb-3 shadow-md ${
        type === 'top' ? 'w-20 h-20' : 'w-16 h-16'
      }`}>
        <svg 
          className={`text-gray-500 ${type === 'top' ? 'w-8 h-8' : 'w-6 h-6'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </div>
      
      {/* Position Title */}
      <h4 className={`font-bold text-gray-800 mb-1 ${
        type === 'top' ? 'text-lg' : 'text-base'
      }`}>
        {title}
      </h4>
      
      {/* Position subtitle */}
      <p className={`font-medium text-blue-600 mb-2 ${
        type === 'top' ? 'text-sm' : 'text-xs'
      }`}>
        {position}
      </p>
      
      {/* Placeholder text */}
      <p className={`text-gray-500 italic ${
        type === 'top' ? 'text-xs' : 'text-xs'
      }`}>
        {placeholder}
      </p>
    </div>
  </div>
);

const About = () => {
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Intersection Observer for animations
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  // Always keep refs array at correct length (7 sections)
  const NUM_SECTIONS = 7;
  const sectionRefs = useRef<(HTMLElement | null)[]>(Array(NUM_SECTIONS).fill(null));

  // Stable ref callback that won't cause re-renders
  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    // Only observe after refs are set
    if (!sectionRefs.current.some(Boolean)) return;
    let observer: IntersectionObserver | null = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [(entry.target as HTMLElement).dataset.section as string]: true,
            }));
            observer && observer.unobserve(entry.target); // Unobserve after visible
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer && observer.observe(ref);
    });

    return () => {
      if (observer) observer.disconnect();
      observer = null;
    };
  }, [sectionRefs.current.map(Boolean).join("")]);


  const fetchLeadership = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`${API_BASE_URL}/leadership/`);
      if (response.ok) {
        const data = await response.json();
        setLeadership(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadership();
  }, []);

  // Filter leaders by type
  const topLeaders = leadership.filter(l => l.leadership_type === 'top' && l.is_active);
  const studentLeaders = leadership.filter(l => l.leadership_type === 'student' && l.is_active);

  // Values data
  const values = [
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Master cutting-edge technologies through hands-on projects and continuous learning in a supportive environment.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Foster creative thinking and groundbreaking solutions that push the boundaries of technology.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Users2,
      title: "Collaborative Spirit",
      description: "Build lasting connections through teamwork, mentorship, and shared learning experiences.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Trophy,
      title: "Drive to Achieve",
      description: "Excel in competitions, hackathons, and real-world projects that showcase your talents.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
  ];

  // Helper function to check if section is visible
  const isVisible = (sectionId: string) => visibleSections[sectionId] || false;

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="animate-spin text-blue-600" size={24} />
            <p className="text-lg text-blue-600 font-medium">Loading BITSA leadership...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      {/* Hero Section with Blue Gradient Background */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              Shaping the Future of{" "}
              <span className="text-blue-200">
                Tech Talent
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              BITSA is where passionate IT students transform into industry-ready professionals through 
              collaborative innovation, hands-on learning, and meaningful connections.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 animate-fade-in-up animation-delay-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-blue-200">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-blue-200">Annual Events</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-blue-200">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Core Values Section */}
        <div 
          ref={setSectionRef(0)}
          data-section="values"
          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('values') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('values') ? 1 : 0
          }}
        >

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl ${value.bgColor} border-2 ${value.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission & Vision Section - Blue Gradient Background */}
        <div 
          ref={setSectionRef(1)}
          data-section="mission"
          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('mission') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('mission') ? 1 : 0
          }}
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white shadow-2xl">

            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Our Mission & Vision</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <Rocket className="w-8 h-8 text-blue-300 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-300">Our Mission</h3>
                      <p className="text-gray-200 leading-relaxed">
                        To create an inclusive platform where BIT students develop practical skills, 
                        foster innovation, and build career-defining connections in the tech industry.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-blue-300 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-300">Our Vision</h3>
                      <p className="text-gray-200 leading-relaxed">
                        To be the leading student association that transforms IT education into 
                        real-world success stories and shapes the next generation of tech leaders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">95%</div>
                  <div className="text-sm text-blue-200">Career Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100+</div>
                  <div className="text-sm text-blue-200">Industry Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                  <div className="text-sm text-blue-200">Student Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Join Section */}
        <div 
          ref={setSectionRef(2)}
          data-section="why-join"

          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('why-join') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('why-join') ? 1 : 0
          }}
        >

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join BITSA?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Benefits that await you as a member</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Network", description: "Connect with 500+ tech enthusiasts" },
              { icon: Calendar, title: "Events", description: "50+ workshops and hackathons yearly" },
              { icon: BookOpen, title: "Resources", description: "Access to learning materials" },
              { icon: Award, title: "Certificates", description: "Earn recognized certifications" },
            ].map((item, index) => (
              <div key={index} className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div 
          ref={setSectionRef(3)}
          data-section="testimonials"

          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('testimonials') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('testimonials') ? 1 : 0
          }}
        >

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Members Say</h2>
            <p className="text-lg text-gray-600">Hear from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "CS Student",
                quote: "BITSA gave me the platform to grow my skills and network with industry professionals.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                quote: "The mentorship and workshops were invaluable in landing my first tech job.",
                rating: 5
              },
              {
                name: "Priya Patel",
                role: "Tech Lead",
                quote: "From member to mentor - BITSA's community helped me grow at every stage.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-3">"{testimonial.quote}"</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-blue-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Leadership Section */}
        <div 
          ref={setSectionRef(4)}
          data-section="top-leaders"
          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('top-leaders') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('top-leaders') ? 1 : 0
          }}
        >

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Top Leaders</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Guiding BITSA with Vision and Excellence</p>
          </div>
          
          {error && (
            <div className="text-center mb-8">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-amber-600 text-sm">⚠️ Unable to load live data. Showing default positions.</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {topLeaders.length > 0 ? (
              topLeaders.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} type="top" />
              ))
            ) : (
              <>
                <LeaderPositionCard 
                  title="BITSA Chair" 
                  position="Chair" 
                  type="top" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="BITSA Patron" 
                  position="Patron" 
                  type="top" 
                  placeholder="Awaiting Appointment"
                />
              </>
            )}
          </div>
        </div>

        {/* Student Leaders Section */}
        <div 
          ref={setSectionRef(5)}
          data-section="student-leaders"
          className="mb-20 transform transition-all duration-700"
          style={{
            transform: isVisible('student-leaders') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('student-leaders') ? 1 : 0
          }}
        >

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Leaders</h2>
            <p className="text-lg text-gray-600">Driving BITSA Activities and Initiatives</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {studentLeaders.length > 0 ? (
              studentLeaders.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} type="student" />
              ))
            ) : (
              <>
                <LeaderPositionCard 
                  title="Vice Chair" 
                  position="Vice Chair" 
                  type="student" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="Secretary" 
                  position="Secretary" 
                  type="student" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="Treasurer" 
                  position="Treasurer" 
                  type="student" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="Program Coordinator" 
                  position="Program Coordinator" 
                  type="student" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="Event Coordinator" 
                  position="Event Coordinator" 
                  type="student" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="Public Relations" 
                  position="Public Relations" 
                  type="student" 
                  placeholder="Awaiting Appointment"
                />
              </>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div 
          ref={setSectionRef(6)}
          data-section="cta"
          className="text-center bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 shadow-xl transform transition-all duration-700"
          style={{
            transform: isVisible('cta') ? 'translateY(0)' : 'translateY(40px)',
            opacity: isVisible('cta') ? 1 : 0
          }}
        >

          <h3 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Become part of a community dedicated to innovation and excellence in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-100">
              Join BITSA Today
              <ChevronRight className="inline ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Contact Us
            </button>
          </div>
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
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
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
        
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default About;
