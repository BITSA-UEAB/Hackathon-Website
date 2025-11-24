import { Mail, Phone, MapPin, User, MessageCircle, Send, Clock, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
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
      iconColor: "bg-blue-500",
    },
    {
      icon: MessageCircle,
      title: "Social Media",
      description: "Connect with us online",
      contact: "@bitsa_ueab",
      link: "#",
      bgColor: "bg-sky-50",
      iconColor: "bg-sky-500",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Find us on campus",
      contact: "BITSA Lab, UEAB",
      link: "#",
      bgColor: "bg-cyan-50",
      iconColor: "bg-cyan-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      description: "Best time to reach us",
      contact: "Mon - Fri: 8AM - 5PM",
      link: "#",
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600",
    },
  ];

  return (
    <section className="py-20 bg-sky-50">

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-blue-200 shadow-sm mb-6">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Let's <span className="text-blue-600">Connect</span>
          </h2>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Ready to join our tech community? Reach out to us through any channel below. 
            We're here to help you start your journey with BITSA.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <Card 
                key={index}
                className="border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-white"
              >
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-2xl ${method.iconColor} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
                  <CardDescription className="text-gray-600">{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={method.link}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-blue-200 shadow-sm mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">
                Meet Our Team
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership <span className="text-blue-600">Team</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get in touch with our dedicated leaders who are here to support your journey in technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, index) => {
              const Icon = leader.icon;
              return (
                <Card 
                  key={index}
                  className="border-2 border-gray-200 hover:border-blue-400 transition-all duration-500 transform hover:-translate-y-2 bg-white hover:shadow-xl"
                >
                  <CardHeader>
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <Icon className="text-white" size={32} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl font-bold text-gray-900">{leader.name}</CardTitle>
                        <CardDescription className="text-lg text-blue-600 font-semibold">
                          {leader.role}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border-2 border-blue-200">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a
                          href={`tel:${leader.phone}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300"
                        >
                          {leader.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 border-2 border-sky-200">
                      <Mail className="w-5 h-5 text-sky-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a
                          href={`mailto:${leader.email}`}
                          className="text-lg font-semibold text-gray-900 hover:text-sky-600 transition-colors duration-300"
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
        <div className="mt-20 text-center">
          <div className="bg-blue-600 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join BITSA?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't wait to start your tech journey. Connect with us today and become part of our growing community of innovators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto sm:mx-0">
                <MessageCircle className="w-5 h-5" />
                Send Message
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center gap-2 mx-auto sm:mx-0">
                <Users className="w-5 h-5" />
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;