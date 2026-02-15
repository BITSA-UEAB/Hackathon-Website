import Navbar from "@/components/Navbar";
import Blog from "./Blog";
import Footer from "@/pages/home/Footer";

const BlogPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Blog />
      <Footer />
    </div>
  );
};

export default BlogPage;
