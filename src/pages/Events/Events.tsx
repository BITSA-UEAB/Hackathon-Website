import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
      <section className="min-h-screen py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="animate-pulse text-blue-600" size={24} />
            <p className="text-lg text-blue-600 font-medium">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-blue-900">Upcoming Events</h2>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">Join exciting workshops, hackathons, and networking opportunities designed to enhance your skills.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden cursor-pointer hover:shadow-lg transition-all"
              tabIndex={0}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/events/${event.id}`)}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/events/${event.id}`); }}
              aria-label={`View details for event ${event.title}`}
            >
              <CardHeader className="p-0 relative">
                {event.image && (
                  <div className="w-full h-40 overflow-hidden bg-slate-100 relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge className="px-2 py-0.5 text-xs font-medium bg-white/95 text-blue-700 border border-blue-200 backdrop-blur-sm">
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between p-4">
                <h3 className="font-semibold text-lg text-blue-900 mb-1 hover:underline">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Calendar size={14} /> {formatDate(event.date)}
                  <Clock size={14} /> {formatTime(event.time)}
                </div>
                <p className="text-sm text-slate-700 mb-2 line-clamp-3">{event.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={14} /> {event.location}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end p-4">
                <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-50">
                  View Details <ArrowRight className="ml-2 w-4 h-4" />
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