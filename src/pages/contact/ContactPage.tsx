
import Navbar from "@/components/Navbar";
import Contact from "@/pages/contact/Contact";
import FAQSection from "@/pages/contact/FAQSection";
import Footer from "@/pages/home/Footer";


const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Contact />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
