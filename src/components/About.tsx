import { Code, Lightbulb, Users2, Trophy, Target, Heart, Sparkles, Rocket, Calendar, Star } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
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

  const stats = [
    { number: "500+", label: "Active Members", icon: Users2 },
    { number: "50+", label: "Events Yearly", icon: Calendar },
    { number: "100+", label: "Projects", icon: Code },
    { number: "4.9/5", label: "Member Rating", icon: Star }
  ];

  return (
<section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-slate-300 rounded-full opacity-70"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-slate-400 rounded-full opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-slate-500 rounded-full opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-300 shadow-sm mb-5">
            <Sparkles className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-semibold text-slate-700">
              About Our Community
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Shaping the Future of{" "}
            <span className="text-slate-700">
              Tech Talent
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
            BITSA is where passionate IT students transform into industry-ready professionals through 
            <span className="font-semibold text-slate-700"> collaborative innovation</span>, 
            <span className="font-semibold text-slate-700"> hands-on learning</span>, and 
            <span className="font-semibold text-slate-700"> meaningful connections</span>.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-5 rounded-2xl bg-white border border-slate-300 hover:border-slate-400 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-600 flex items-center justify-center mb-3 mx-auto">
                  <Icon className="text-white" size={22} />
                </div>
                <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
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
            <Link to="/register">
              <button className="px-7 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Join BITSA Today
              </button>
            </Link>
            <Link to="/events">
              <button className="px-7 py-3 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-2xl font-semibold transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default About;
