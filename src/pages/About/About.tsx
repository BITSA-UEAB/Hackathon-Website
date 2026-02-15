
import { useState, useEffect } from "react";
import { Code, Lightbulb, Users2, Trophy, Target, Heart, Sparkles, Rocket, Star, Loader2 } from "lucide-react";

interface Leadership {
  id: number;
  name: string;
  position: string;
  department: string;
  student_id: string;
  image_url: string | null;
  leadership_type: string;
  order: number;
}

const API_BASE_URL = "http://localhost:8000";

const About = () => {
  const [topLeaders, setTopLeaders] = useState<Leadership[]>([]);
  const [studentLeaders, setStudentLeaders] = useState<Leadership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch leadership data
  const fetchLeadershipData = async (type: 'top' | 'student') => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leadership/?type=${type}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} leadership`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Error fetching ${type} leadership:`, err);
      throw err;
    }
  };

  // Load leadership data on component mount
  useEffect(() => {
    const loadLeadershipData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [topData, studentData] = await Promise.all([
          fetchLeadershipData('top'),
          fetchLeadershipData('student')
        ]);

        setTopLeaders(topData);
        setStudentLeaders(studentData);
      } catch (err) {
        setError("Failed to load leadership data. Please try again later.");
        console.error("Error loading leadership data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLeadershipData();
  }, []);

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to get random color for fallback avatar
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-600', 'bg-slate-600', 'bg-emerald-600', 'bg-purple-600',
      'bg-amber-600', 'bg-rose-600', 'bg-indigo-600', 'bg-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };


  // Loading component
  const LoadingCard = ({ type }: { type: 'top' | 'student' }) => (
    <div className={`bg-white rounded-2xl p-4 border-2 border-slate-300 shadow-md animate-pulse`}>
      <div className="flex flex-col items-center text-center">
        <div className={`rounded-full bg-slate-300 flex items-center justify-center mb-3 ${
          type === 'top' ? 'w-16 h-16' : 'w-12 h-12'
        }`}>
          <Loader2 className={`${type === 'top' ? 'w-8 h-8' : 'w-6 h-6'} text-slate-500 animate-spin`} />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-300 rounded w-20"></div>
          <div className="h-3 bg-slate-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  // Leader card component for displaying real leadership data
  const LeaderCard = ({ leader, type, getInitials, getAvatarColor }: {
    leader: Leadership;
    type: 'top' | 'student';
    getInitials: (name: string) => string;
    getAvatarColor: (name: string) => string;
  }) => (
    <div className="bg-white rounded-2xl p-5 border-2 border-slate-300 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image with Fallback */}
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-md ${
          leader.image_url ? 'bg-transparent' : getAvatarColor(leader.name)
        }`}>
          {leader.image_url ? (
            <img 
              src={leader.image_url} 
              alt={leader.name}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<span class="text-white font-bold text-lg">${getInitials(leader.name)}</span>`;
                  parent.className = `w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-md ${getAvatarColor(leader.name)}`;
                }
              }}
            />
          ) : (
            <span className="text-white font-bold text-lg">
              {getInitials(leader.name)}
            </span>
          )}
        </div>
        
        {/* Name - Fixed to show only person's name */}
        <h4 className="text-lg font-bold text-slate-900 mb-1">
          {leader.name}
        </h4>
        
        {/* Position as subtitle */}
        <p className="text-sm font-semibold text-slate-700 mb-1">
          {leader.position}
        </p>
        
        {/* Department */}
        <p className="text-xs text-slate-600">
          {leader.department}
        </p>
      </div>
    </div>
  );


  // Position placeholder card component
  const LeaderPositionCard = ({ title, position, type, placeholder }: {
    title: string;
    position: string;
    type: 'top' | 'student';
    placeholder: string;
  }) => (
    <div className={`bg-white rounded-2xl border-2 border-slate-300 shadow-md ${
      type === 'top' ? 'p-5' : 'p-4'
    }`}>
      <div className="flex flex-col items-center text-center">
        {/* Placeholder Avatar with Camera Icon */}
        <div className={`rounded-full bg-slate-300 flex items-center justify-center mb-3 shadow-md ${
          type === 'top' ? 'w-16 h-16' : 'w-12 h-12'
        }`}>
          <svg 
            className={`text-slate-500 ${type === 'top' ? 'w-6 h-6' : 'w-4 h-4'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </div>
        
        {/* Position Title */}
        <h4 className={`font-bold text-slate-900 mb-1 ${
          type === 'top' ? 'text-lg' : 'text-sm'
        }`}>
          {title}
        </h4>
        
        {/* Position subtitle */}
        <p className={`font-semibold text-slate-700 mb-1 ${
          type === 'top' ? 'text-sm' : 'text-xs'
        }`}>
          {position}
        </p>
        
        {/* Placeholder text */}
        <p className={`text-slate-500 ${
          type === 'top' ? 'text-xs' : 'text-xs'
        }`}>
          {placeholder}
        </p>
      </div>
    </div>
  );

  const values = [
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Master cutting-edge technologies through hands-on projects and continuous learning in a supportive environment.",
      color: "text-slate-700",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Foster creative thinking and groundbreaking solutions that push the boundaries of technology.",
      color: "text-slate-700",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300"
    },
    {
      icon: Users2,
      title: "Collaborative Spirit",
      description: "Build lasting connections through teamwork, mentorship, and shared learning experiences.",
      color: "text-slate-700",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300"
    },
    {
      icon: Trophy,
      title: "Drive to Achieve",
      description: "Excel in competitions, hackathons, and real-world projects that showcase your talents.",
      color: "text-slate-700",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300"
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-sky-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-sky-200 rounded-full opacity-40 animate-float"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full opacity-40 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-sky-300 rounded-full opacity-30 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-300 shadow-sm mb-5 animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-slate-600 animate-spin-slow" />
            <span className="text-sm font-semibold text-slate-700">
              About Our Community
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 animate-fade-in">
            Shaping the Future of{" "}
            <span className="text-slate-700">
              Tech Talent
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
            BITSA is where passionate IT students transform into industry-ready professionals through 
            <span className="font-semibold text-slate-700"> collaborative innovation</span>, 
            <span className="font-semibold text-slate-700"> hands-on learning</span>, and 
            <span className="font-semibold text-slate-700"> meaningful connections</span>.
          </p>
        </div>



        {/* Top Leadership Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Our Top Leaders</h3>
            <p className="text-slate-700">Guiding BITSA with Vision and Excellence</p>
          </div>
          
          {error && (
            <div className="text-center mb-8">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-amber-600 text-sm">⚠️ Unable to load live data. Showing default positions.</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {loading ? (
              // Loading skeletons for top leaders
              Array.from({ length: 2 }).map((_, index) => (
                <LoadingCard key={index} type="top" />
              ))
            ) : topLeaders.length > 0 ? (
              // Show real data when available
              topLeaders.map((leader) => (
                <LeaderCard key={leader.id} leader={leader} type="top" getInitials={getInitials} getAvatarColor={getAvatarColor} />
              ))
            ) : (
              // Show position placeholders when no data
              <>
                <LeaderPositionCard 
                  title="BITSA Chair" 
                  position="BITSA Chair" 
                  type="top" 
                  placeholder="Awaiting Appointment"
                />
                <LeaderPositionCard 
                  title="BITSA Patron" 
                  position="BITSA Patron" 
                  type="top" 
                  placeholder="Awaiting Appointment"
                />
              </>
            )}
          </div>
        </div>

        {/* Student Leaders Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">BITSA Leaders 2025</h3>
            <p className="text-slate-700">Our Dedicated Student Leadership Team</p>
          </div>
          

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Loading skeletons for student leaders */}
              {Array.from({ length: 6 }).map((_, index) => (
                <LoadingCard key={index} type="student" />
              ))}
            </div>

          ) : studentLeaders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentLeaders.map((leader) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-xl p-4 border-2 border-slate-300 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Image with Fallback */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm ${
                      leader.image_url ? 'bg-transparent' : getAvatarColor(leader.name)
                    }`}>
                      {leader.image_url ? (
                        <img 
                          src={leader.image_url} 
                          alt={leader.name}
                          className="w-full h-full rounded-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `<span class="text-white font-bold text-sm">${getInitials(leader.name)}</span>`;
                              parent.className = `w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-sm ${getAvatarColor(leader.name)}`;
                            }
                          }}
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {getInitials(leader.name)}
                        </span>
                      )}
                    </div>
                    
                    {/* Name - Fixed to show only person's name */}
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {leader.name}
                    </h4>
                    
                    {/* Position as subtitle */}
                    <p className="text-xs font-semibold text-slate-700 mb-1">
                      {leader.position}
                    </p>
                    
                    {/* Department */}
                    <p className="text-xs text-slate-600">
                      {leader.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show position placeholders when no data
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
          )}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className={`group p-7 rounded-3xl ${value.bgColor} border-2 ${value.borderColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              >
                <div className={`w-14 h-14 rounded-2xl ${value.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-700 leading-relaxed text-base">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="relative">
          <div className="absolute inset-0 bg-slate-700 rounded-3xl transform rotate-1 scale-105"></div>
          <div className="relative bg-slate-800 rounded-3xl p-10 text-white shadow-2xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-5 mx-auto">
                <Target className="w-9 h-9 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-5">Our Mission & Vision</h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Rocket className="w-5 h-5 text-slate-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-base mb-2">Our Mission</h4>
                      <p className="text-slate-100 leading-relaxed text-sm">
                        To create an inclusive platform where BIT students develop practical skills, 
                        foster innovation, and build career-defining connections in the tech industry.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-slate-300 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-base mb-2">Our Vision</h4>
                      <p className="text-slate-100 leading-relaxed text-sm">
                        To be the leading student association that transforms IT education into 
                        real-world success stories and shapes the next generation of tech leaders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Metrics */} 
              <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">95%</div>
                  <div className="text-xs text-slate-200">Career Readiness</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">100+</div>
                  <div className="text-xs text-slate-200">Industry Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-1">4.9★</div>
                  <div className="text-xs text-slate-200">Student Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-14">
          <p className="text-base text-slate-700 mb-5">
            Ready to join our community of innovators?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-7 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Join BITSA Today
            </button>
            <button className="px-7 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl font-semibold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(30px, -30px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0px, 0px); }
          50% { transform: translate(-30px, 30px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
          animation-fill-mode: both;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About;