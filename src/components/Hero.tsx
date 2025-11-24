import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Calendar, BookOpen, Star, Zap, Shield, Globe, Award, TrendingUp, Code, Briefcase } from "lucide-react";

const Button = ({ children, className, variant, size, onClick, ...props }) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-lg font-semibold transition-all ${className}`} {...props}>
    {children}
  </button>
);

const Hero = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      image: "/background slider1.jpeg",
      alt: "BITSA Community Event",
      title: "Thriving Tech Community",
      description: "Students collaborating on innovative projects"
    },
    {
      image: "/background slider2.jpeg",
      alt: "Workshop Session",
      title: "Hands-On Learning",
      description: "Interactive workshops and coding sessions"
    },
    {
      image: "/background slider3.jpeg",
      alt: "Hackathon Event",
      title: "Innovation Challenges",
      description: "Students competing in exciting hackathons"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Counter Animation Hook
  const useCounter = (end, duration = 2000, start = 0) => {
    const [count, setCount] = useState(start);
    const countRef = useRef(start);
    const hasAnimated = useRef(false);

    useEffect(() => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        countRef.current += increment;
        if (countRef.current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(countRef.current));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [end, duration]);

    return count;
  };

  const membersCount = useCounter(500, 2000);
  const eventsCount = useCounter(50, 2000);
  const projectsCount = useCounter(100, 2000);
  const satisfactionCount = useCounter(95, 2000);

  return (
    <section className="min-h-screen pt-16 flex items-center bg-gradient-to-r from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Section - Header and Badge */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 animate-fade-in">
            BITSA
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
            Where <span className="font-semibold text-slate-700">Future Tech Leaders</span>{" "}
            Connect, Learn, and <span className="font-semibold text-slate-800">Innovate Together</span>
          </p>

          {/* Stats Bar with Animated Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors">
                {membersCount}+
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Active Members</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors">
                {eventsCount}+
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Annual Events</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors">
                {projectsCount}+
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Projects</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1 group-hover:text-blue-600 transition-colors">
                {satisfactionCount}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Middle Section - Slideshow and Content Side by Side */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          {/* Left Content - Slideshow */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">{slide.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90">{slide.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/80 w-2'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white rotate-180" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Your Gateway to{" "}
                <span className="text-blue-700">Tech Excellence</span>
              </h2>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                At BITSA, we're committed to transforming IT education into real-world success. 
                Our platform bridges the gap between academic learning and industry demands, 
                providing you with the tools, connections, and opportunities to thrive in the 
                digital landscape.
              </p>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                We empower students through hands-on experience, mentorship from industry professionals, 
                and access to cutting-edge technologies. Whether you're interested in software development, 
                cybersecurity, data science, or emerging technologies, BITSA offers a comprehensive ecosystem 
                to support your journey from student to tech professional.
              </p>
            </div>

            {/* Feature Icons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-slate-900">Fast-Track Learning</div>
                  <div className="text-xs sm:text-sm text-slate-600">Accelerated skill development</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-slate-900">Industry Ready</div>
                  <div className="text-xs sm:text-sm text-slate-600">Career-focused training</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-slate-900">Peer Network</div>
                  <div className="text-xs sm:text-sm text-slate-600">Collaborative community</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0 hover:rotate-12 transition-transform duration-300">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-slate-900">Global Impact</div>
                  <div className="text-xs sm:text-sm text-slate-600">Real-world projects</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons with Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base py-5 sm:py-6 hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/about")}
                className="w-full border-2 border-blue-600 hover:border-blue-700 text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50 transition-all duration-300 font-semibold text-sm sm:text-base py-5 sm:py-6 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        <div className={`mb-12 sm:mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <Award className="w-8 h-8 mx-auto mb-3 animate-bounce" style={{ animationDuration: '3s' }} />
                <div className="text-2xl sm:text-3xl font-bold mb-1">150+</div>
                <div className="text-sm opacity-90">Certificates Awarded</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
                <div className="text-2xl sm:text-3xl font-bold mb-1">85%</div>
                <div className="text-sm opacity-90">Job Placement Rate</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <Code className="w-8 h-8 mx-auto mb-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }} />
                <div className="text-2xl sm:text-3xl font-bold mb-1">30+</div>
                <div className="text-sm opacity-90">Tech Partnerships</div>
              </div>
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-8 h-8 mx-auto mb-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
                <div className="text-2xl sm:text-3xl font-bold mb-1">200+</div>
                <div className="text-sm opacity-90">Internship Opportunities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Feature Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Collaborative Learning Ecosystem</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
              Join a dynamic network of passionate IT students, industry experts, and alumni mentors. 
              Experience peer-to-peer learning, code reviews, and project collaborations that accelerate 
              your growth and expand your professional network. Participate in study groups, mentorship 
              programs, and knowledge-sharing sessions that foster continuous learning and innovation.
            </p>
            <div className="flex items-center text-blue-700 font-semibold text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
              <span>Explore Community</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>

          <div className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Calendar className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Innovation-Driven Events</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
              From hackathons and coding competitions to industry workshops and tech talks, our events 
              are designed to challenge your skills, spark creativity, and connect you with cutting-edge 
              technologies and industry trends. Engage with guest speakers from leading tech companies, 
              participate in hands-on workshops, and showcase your projects at demo days.
            </p>
            <div className="flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
              <span>View Events</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>

          <div className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Comprehensive Resource Hub</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
              Access our curated library of tutorials, project guides, interview prep materials, and 
              industry insights. Continuously updated content ensures you stay ahead in the rapidly 
              evolving world of information technology. Benefit from exclusive learning paths, certification 
              guides, and real-world case studies that prepare you for professional success.
            </p>
            <div className="flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300">
              <span>Browse Resources</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;