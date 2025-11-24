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
      <section className="min-h-screen py-20 bg-slate-50">
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
    <section className="min-h-screen py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-blue-50 border border-blue-200">
            <Sparkles className="text-blue-600" size={18} />
            <span className="text-sm font-medium text-blue-600">Discover & Connect</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-blue-900">
            Upcoming Events
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Join us for exciting workshops, hackathons, and networking opportunities designed to enhance your skills and connect with fellow tech enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card 
              key={event.id}
              className="group h-full bg-white border-2 border-slate-200 transition-all duration-300 hover:border-blue-400 hover:shadow-xl"
            >
              <CardHeader>
                {event.image && (
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg bg-slate-100">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <Badge className="px-3 py-1 font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 font-medium">
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                  {event.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-slate-600">
                  {event.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm gap-2 p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="p-1.5 rounded-md bg-blue-100">
                    <Calendar size={16} className="text-blue-600" />
                  </div>
                  <span className="text-slate-700">{formatDate(event.date)}</span>
                </div>
                
                <div className="flex items-center text-sm gap-2 p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="p-1.5 rounded-md bg-blue-100">
                    <Clock size={16} className="text-blue-600" />
                  </div>
                  <span className="text-slate-700">{formatTime(event.time)}</span>
                </div>
                
                <div className="flex items-center text-sm gap-2 p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors duration-300">
                  <div className="p-1.5 rounded-md bg-blue-100">
                    <MapPin size={16} className="text-blue-600" />
                  </div>
                  <span className="text-slate-700">{event.location}</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-300"
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
                  <span className="flex items-center justify-center gap-2">
                    Confirm Attendance
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-blue-100">
              <Calendar className="text-blue-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900">No Events Available</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Check back soon for exciting upcoming events and opportunities to connect with the community.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;