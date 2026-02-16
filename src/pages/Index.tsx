
import Navbar from "@/components/Navbar";
import Hero from "@/pages/home/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Blog from "@/pages/Blogs/Blog";
import Gallery from "@/pages/Gallery/Gallery";
import Contact from "@/pages/contact/Contact";
import Footer from "@/pages/home/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Blog />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
