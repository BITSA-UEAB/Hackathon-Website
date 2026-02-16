
import Navbar from "@/components/Navbar";
import Events from "@/pages/Events/Events";
import Footer from "@/pages/home/Footer";


const EventsPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Events />
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;
