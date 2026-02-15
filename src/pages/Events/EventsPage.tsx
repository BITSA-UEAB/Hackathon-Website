import Navbar from "@/components/Navbar";
import Events from "@/pages/Events/Events";
import Footer from "@/pages/home/Footer";

const EventsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Events />
      <Footer />
    </div>
  );
};

export default EventsPage;
