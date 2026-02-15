import Navbar from "@/components/Navbar";
import Hero from "@/pages/home/Hero";
import Footer from "@/pages/home/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
