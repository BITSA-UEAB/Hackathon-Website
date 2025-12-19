import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes}${ampm}`;
  };

  if (loading) {
    return (
      <section className="min-h-screen py-12 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="animate-pulse text-blue-600" size={24} />
            <p className="text-lg text-blue-600 font-medium">Loading amazing events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-200">
            <Sparkles className="text-blue-600" size={16} />
            <span className="text-xs font-medium text-blue-600">Discover & Connect</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-900">
            Upcoming Events
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Join exciting workshops, hackathons, and networking opportunities designed to enhance your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {events.map((event) => (
            <Card 
              key={event.id}
              className="group bg-white border-2 border-slate-200 transition-all duration-300 hover:border-blue-400 hover:shadow-2xl flex flex-col overflow-hidden relative"
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="p-0 relative">
                {event.image && (
                  <div 
                    className="w-full h-40 overflow-hidden bg-slate-100 relative"
                    onMouseEnter={() => setHoveredCard(event.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className="px-2 py-0.5 text-xs font-medium bg-white/95 text-blue-700 border border-blue-200 backdrop-blur-sm">
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                    </div>
                    
                    {/* Description overlay on hover - only on photo */}
                    <div className={`absolute inset-0 bg-blue-900/95 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-4 ${hoveredCard === event.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                      <p className="text-white text-xs text-center line-clamp-5">
                        {event.description}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Date, Time, Venue below photo */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Calendar size={12} className="text-blue-600" />
                      <span className="font-medium">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock size={12} className="text-blue-600" />
                      <span className="font-medium">{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin size={12} className="text-blue-600" />
                      <span className="font-medium truncate max-w-[80px]">{event.location}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 flex-grow">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 flex-1">
                    {event.title}
                  </CardTitle>
                  <Badge variant="outline" className="ml-2 px-1.5 py-0.5 text-xs border-blue-300 text-blue-700 font-medium shrink-0">
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-all duration-300 h-9 shadow-sm hover:shadow-md"
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
                  <span className="flex items-center justify-center gap-1.5">
                    Confirm Attendance
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-blue-100">
              <Calendar className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-900">No Events Available</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Check back soon for exciting upcoming events and opportunities to connect with the community.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;