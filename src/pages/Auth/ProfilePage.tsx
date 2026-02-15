import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/pages/home/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Settings } from "lucide-react";

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [error, setError] = useState(null);

  // New state for confirmed events
  const [confirmedEvents, setConfirmedEvents] = useState([]);
  const [loadingConfirmedEvents, setLoadingConfirmedEvents] = useState(false);
  const [errorConfirmedEvents, setErrorConfirmedEvents] = useState(null);

  // State to track cancelling status by event id
  const [cancellingEventIds, setCancellingEventIds] = useState<string[]>([]);

  // Fetch confirmed events on component mount
  useEffect(() => {
    const fetchConfirmedEvents = async () => {
      setLoadingConfirmedEvents(true);
      setErrorConfirmedEvents(null);
      try {
        const token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:8000/api/events/my-events/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setConfirmedEvents(data);
        } else {
          setErrorConfirmedEvents('Failed to load confirmed events');
        }
      } catch (err) {
        setErrorConfirmedEvents('Network error while loading confirmed events');
      } finally {
        setLoadingConfirmedEvents(false);
      }
    };

    fetchConfirmedEvents();
  }, []);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = async () => {
    const success = await updateProfile({ name: formData.name });
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  // Cancel attendance handler with confirmation and loading state
  const handleCancelAttendance = async (eventId: string) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel your attendance?");
    if (!confirmCancel) return;

    setCancellingEventIds((prev) => [...prev, eventId]);

    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`http://localhost:8000/api/events/${eventId}/rsvp/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'removed') {
          setConfirmedEvents((prev) => prev.filter((e) => e.id !== eventId));
          alert('Attendance cancelled successfully.');
        } else {
          alert('Unexpected response from server.');
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to cancel attendance'}`);
      }
    } catch (error) {
      alert('Network error, please try again.');
    } finally {
      setCancellingEventIds((prev) => prev.filter((id) => id !== eventId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0f9ff] via-[#e0f2fe] to-[#dbeafe]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your BITSA account</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </CardDescription>
                  <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'} className="mt-2">
                    {user?.role === 'admin' ? 'Administrator' : 'Student'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed. Contact admin if needed.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">{user?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Member Since</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Role</p>
                        <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Confirmed Events Section */}
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Events</CardTitle>
              <CardDescription>Events you have confirmed attendance for</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingConfirmedEvents ? (
                <p>Loading your confirmed events...</p>
              ) : errorConfirmedEvents ? (
                <p className="text-destructive">{errorConfirmedEvents}</p>
              ) : confirmedEvents.length === 0 ? (
                <p>You have not confirmed attendance for any events yet.</p>
              ) : (
                <ul className="space-y-4">
                  {confirmedEvents.map((event: any) => {
                    const eventStart = new Date(event.start_time || event.date || event.created_at);
                    const now = new Date();
                    const canCancel = eventStart > now;
                    const isCancelling = cancellingEventIds.includes(event.id);
                    return (
                      <li key={event.id} className="border p-4 rounded-lg bg-muted/50 flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p>{event.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Date & Time: {eventStart.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Venue: {event.location || 'N/A'}
                        </p>
                        {canCancel ? (
                          <button
                            className={`self-start px-3 py-1 rounded text-white transition-colors ${isCancelling ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                            onClick={() => handleCancelAttendance(event.id)}
                            disabled={isCancelling}
                          >
                            {isCancelling ? 'Cancelling...' : 'Cancel Attendance'}
                          </button>
                        ) : (
                          <button
                            className="self-start px-3 py-1 rounded bg-gray-400 text-gray-700 cursor-not-allowed"
                            disabled
                            title="Cannot cancel past or ongoing event"
                          >
                            Cannot Cancel
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
