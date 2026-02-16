import { useRef, useEffect, useState } from "react";
import { Mail, Phone, MapPin, User, MessageCircle, Send, Clock, Users, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
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
              [entry.target.dataset.section]: true,
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

  const leadership = [
    {
      name: "Alpha Chamba",
      role: "President",
      phone: "0708898899",
      email: "alpha.chamba@ueab.ac.ke",
      icon: User,
    },
    {
      name: "Gloria Jebet",
      role: "Vice President",
      phone: "0725486687",
      email: "gloria.jebet@ueab.ac.ke",
      icon: User,
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message anytime",
      contact: "bitsaclub@ueab.ac.ke",
      link: "mailto:bitsaclub@ueab.ac.ke",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Social Media",
      description: "Connect with us online",
      contact: "@bitsa_ueab",
      link: "#",
      bgColor: "bg-gray-100",
      iconBg: "bg-gray-700",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Find us on campus",
      contact: "BITSA Lab, UEAB",
      link: "#",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "Best time to reach us",
      contact: "Mon - Fri: 8AM - 5PM",
      link: "#",
      bgColor: "bg-gray-100",
      iconBg: "bg-gray-700",
    },
  ];

  const isVisible = (sectionId) => visibleSections[sectionId] || false;

  return (
    <section className="py-20 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white"> 
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Let's <span className="text-blue-200">Connect</span>
            </h1>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Ready to join our tech community? Reach out to us through any channel below. 
              We're here to help you start your journey with BITSA.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Contact Methods Grid */}
        <div 
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="methods"
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 ${
            isVisible('methods') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card 
                key={index}
                className="border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white"
              >
                <CardHeader className="pb-3">
                  <div className={`w-14 h-14 ${method.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={method.link}
                    className="text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {method.contact}
                    <Send className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Leadership Team */}
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="leadership"
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            isVisible('leadership') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 shadow-sm mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">
                Meet Our Team
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our dedicated leaders who are here to support your journey in technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((leader, index) => {
              const Icon = leader.icon;
              return (
                <Card 
                  key={index}
                  className="border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:-translate-y-2 bg-white hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                        <Icon className="text-white" size={28} />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">{leader.name}</CardTitle>
                        <CardDescription className="text-blue-600 font-semibold">
                          {leader.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <a
                          href={`tel:${leader.phone}`}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                        >
                          {leader.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <a
                          href={`mailto:${leader.email}`}
                          className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                        >
                          {leader.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Action Section */}
        <div 
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="cta"
          className={`mt-16 text-center transition-all duration-700 ${
            isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Join BITSA?
            </h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Don't wait to start your tech journey. Connect with us today and become part of our growing community of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto sm:mx-0">
                <MessageCircle className="w-5 h-5" />
                Send Message
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0">
                <Users className="w-5 h-5" />
                Join Community
              </button>
            </div>
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
      `}</style>
    </section>
  );
};

export default Contact;