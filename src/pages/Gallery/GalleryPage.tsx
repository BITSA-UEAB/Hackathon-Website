import Navbar from "@/components/Navbar";
import Gallery from "@/pages/Gallery/Gallery";
import Footer from "@/pages/home/Footer";

const GalleryPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryPage;
