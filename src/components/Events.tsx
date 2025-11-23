import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: string;
  image: string;
  created_at: string;
  updated_at: string;
}

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events/');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <section className="min-h-screen py-20 relative overflow-hidden">
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="animate-pulse text-primary" size={24} />
            <p className="text-lg text-primary font-medium">Loading amazing events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated background gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        }}
      />
      
      {/* Decorative circles */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--glow-blue)) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--glow-cyan)) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          animationDelay: '2s'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="text-center mb-16 animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="text-primary animate-pulse" size={18} />
            <span className="text-sm font-medium text-primary">Discover & Connect</span>
          </div>
          
          <h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--gradient-blue-start)), hsl(var(--gradient-blue-end)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join us for exciting workshops, hackathons, and networking opportunities designed to enhance your skills and connect with fellow tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 2)}s` }}
            >
              <Card 
                className="group h-full relative overflow-hidden border-2 transition-all duration-500 hover:border-primary/40"
                style={{
                  background: 'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px hsl(var(--primary) / 0.08)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px hsl(var(--primary) / 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px hsl(var(--primary) / 0.08)';
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.05) 0%, hsl(var(--accent) / 0.05) 100%)',
                  }}
                />

                <CardHeader className="relative z-10">
                  {event.image && (
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-xl relative">
                      <div 
                        className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{
                          filter: 'brightness(0.95)',
                        }}
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      className="px-3 py-1 font-medium"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))',
                        color: 'hsl(var(--primary))',
                        border: '1px solid hsl(var(--primary) / 0.2)',
                      }}
                    >
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className="border-primary/30 text-primary font-medium"
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3 relative z-10">
                  <div 
                    className="flex items-center text-sm gap-2 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/5"
                  >
                    <div 
                      className="p-1.5 rounded-md"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))',
                      }}
                    >
                      <Calendar size={16} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{formatDate(event.date)}</span>
                  </div>
                  
                  <div 
                    className="flex items-center text-sm gap-2 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/5"
                  >
                    <div 
                      className="p-1.5 rounded-md"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))',
                      }}
                    >
                      <Clock size={16} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{formatTime(event.time)}</span>
                  </div>
                  
                  <div 
                    className="flex items-center text-sm gap-2 p-2 rounded-lg transition-all duration-300 group-hover:bg-primary/5"
                  >
                    <div 
                      className="p-1.5 rounded-md"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))',
                      }}
                    >
                      <MapPin size={16} className="text-primary" />
                    </div>
                    <span className="text-muted-foreground">{event.location}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="relative z-10">
                  <Button
                    className="w-full relative overflow-hidden group/button font-medium"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))',
                      border: 'none',
                    }}
                    onClick={async () => {
                      const user = JSON.parse(localStorage.getItem('bitsa_user') || 'null');
                      if (!user || user.role !== 'student') {
                        navigate('/register');
                        return;
                      }
                      try {
                        const token = localStorage.getItem('access_token');
                        const response = await fetch(`http://localhost:8000/api/events/${event.id}/rsvp/`, {
                          method: 'POST',
                          headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                          },
                        });
                        if (response.ok) {
                          const data = await response.json();
                          alert(`Attendance ${data.status}`);
                        } else {
                          const errorData = await response.json();
                          alert(`Error: ${errorData.error || 'Failed to confirm attendance'}`);
                        }
                      } catch (error) {
                        alert('Network error, please try again.');
                      }
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Confirm Attendance
                      <ArrowRight 
                        size={16} 
                        className="transition-transform duration-300 group-hover/button:translate-x-1" 
                      />
                    </span>
                    <div 
                      className="absolute inset-0 bg-white/20 translate-y-full group-hover/button:translate-y-0 transition-transform duration-300"
                    />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div 
            className="text-center py-20 animate-fade-in-up"
          >
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))',
              }}
            >
              <Calendar className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">No Events Available</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Check back soon for exciting upcoming events and opportunities to connect with the community.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
