
import Navbar from "@/components/Navbar";
import About from "@/pages/About/About";
import Footer from "@/pages/home/Footer";


const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
