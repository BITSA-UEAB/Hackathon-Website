
import Navbar from "@/components/Navbar";
import Hero from "@/pages/home/Hero";
import Footer from "@/pages/home/Footer";


const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
