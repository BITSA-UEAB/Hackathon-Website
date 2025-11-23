import { useState, useEffect } from "react";
import { ArrowRight, Users, Calendar, BookOpen, Star, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "BITSA Community Event",
      title: "Thriving Tech Community",
      description: "Students collaborating on innovative projects"
    },
    {
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      alt: "Workshop Session",
      title: "Hands-On Learning",
      description: "Interactive workshops and coding sessions"
    },
    {
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Hackathon Event",
      title: "Innovation Challenges",
      description: "Students competing in exciting hackathons"
    },
    {
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      alt: "Networking Event",
      title: "Professional Networking",
      description: "Connecting students with industry leaders"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="min-h-screen pt-16 flex items-center bg-gradient-to-r from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Section - Header and Badge */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-300 mb-6">
            <div className="flex gap-1">
              {[1, 2, 3].map((star) => (
                <Star key={star} className="w-3 h-3 fill-slate-600 text-slate-600" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">
              #1 IT Student Association
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-slate-900">
            BITSA
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 max-w-3xl mx-auto px-4">
            Where <span className="font-semibold text-slate-700">Future Tech Leaders</span>{" "}
            Connect, Learn, and <span className="font-semibold text-slate-800">Innovate Together</span>
          </p>


          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-slate-600">Active Members</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1">50+</div>
              <div className="text-xs sm:text-sm text-slate-600">Annual Events</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1">100+</div>
              <div className="text-xs sm:text-sm text-slate-600">Projects</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white border border-slate-300">
              <div className="text-xl sm:text-2xl font-bold text-slate-700 mb-1">95%</div>
              <div className="text-xs sm:text-sm text-slate-600">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Middle Section - Slideshow and Content Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left Content - Slideshow */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-200">
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white w-6' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white rotate-180" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
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
            </div>

            {/* Feature Icons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-slate-900">Fast-Track Learning</div>
                <div className="text-xs sm:text-sm text-slate-600">Accelerated skill development</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-slate-900">Industry Ready</div>
                <div className="text-xs sm:text-sm text-slate-600">Career-focused training</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-slate-900">Peer Network</div>
                <div className="text-xs sm:text-sm text-slate-600">Collaborative community</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-600 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm sm:text-base text-slate-900">Global Impact</div>
                <div className="text-xs sm:text-sm text-slate-600">Real-world projects</div>
              </div>
            </div>
          </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link to="/register" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm sm:text-base py-5 sm:py-6"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/about" className="flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-blue-600 hover:border-blue-700 text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50 transition-all duration-300 font-semibold text-sm sm:text-base py-5 sm:py-6"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section - Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Collaborative Learning Ecosystem</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
              Join a dynamic network of passionate IT students, industry experts, and alumni mentors. 
              Experience peer-to-peer learning, code reviews, and project collaborations that accelerate 
              your growth and expand your professional network.
            </p>
            <div className="flex items-center text-blue-700 font-semibold text-sm sm:text-base">
              <span>Explore Community</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>

          <div className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
              <Calendar className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Innovation-Driven Events</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
              From hackathons and coding competitions to industry workshops and tech talks, our events 
              are designed to challenge your skills, spark creativity, and connect you with cutting-edge 
              technologies and industry trends.
            </p>
            <Link to="/events" className="flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors text-sm sm:text-base">
              <span>View Events</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-600 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="text-white" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Comprehensive Resource Hub</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
              Access our curated library of tutorials, project guides, interview prep materials, and 
              industry insights. Continuously updated content ensures you stay ahead in the rapidly 
              evolving world of information technology.
            </p>
            <Link to="/blog" className="flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors text-sm sm:text-base">
              <span>Browse Resources</span>
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
