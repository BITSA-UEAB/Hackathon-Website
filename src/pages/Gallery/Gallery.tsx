import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, ChevronRight, Filter, Sparkles, Calendar, User } from "lucide-react";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  uploaded_by_name: string;
  uploaded_at: string;
  category?: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [showUpload, setShowUpload] = useState(false);

  // Intersection Observer for animations
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Get unique categories from photos
  const categories = Array.from(new Set(photos.map((p) => p.category).filter(Boolean)));
  // Filter photos by category
  const filteredPhotos = category ? photos.filter((p) => p.category === category) : photos;

  const isVisible = (sectionId) => visibleSections[sectionId] || false;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/gallery/photos/');
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          setError('Failed to load photos');
        }
      } catch (err) {
        setError('Error loading photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="animate-spin text-blue-600" size={24} />
            <p className="text-lg text-blue-600 font-medium">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Event <span className="text-blue-200">Gallery</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Capturing moments from our workshops, hackathons, and community events.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Gallery Controls */}
        <div 
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="controls"
          className={`flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 transition-all duration-700 ${
            isVisible('controls') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-gray-500" />
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <button
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md"
            onClick={() => setShowUpload(true)}
          >
            <Camera size={18} />
            Upload Photo
          </button>
        </div>

        {error ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-red-600 text-lg">{error}</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-600 text-lg">No photos available yet.</p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div 
              ref={(el) => (sectionRefs.current[1] = el)}
              data-section="gallery"
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-700 ${
                isVisible('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={photo.image_url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{photo.title}</h3>
                      <p className="text-sm text-blue-100 mb-2 line-clamp-2">{photo.description}</p>
                      <div className="flex items-center gap-2 text-xs text-blue-200">
                        <User size={12} />
                        <span>{photo.uploaded_by_name}</span>
                        <Calendar size={12} className="ml-2" />
                        <span>{new Date(photo.uploaded_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/gallery')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Camera size={20} />
                View All Photos
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && filteredPhotos[selectedImage] && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={filteredPhotos[selectedImage].image_url}
              alt={filteredPhotos[selectedImage].title}
              className="w-full max-h-[70vh] object-contain bg-gray-100"
            />
            <div className="p-6 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{filteredPhotos[selectedImage].title}</h2>
              <p className="text-gray-700 mb-4">{filteredPhotos[selectedImage].description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>{filteredPhotos[selectedImage].uploaded_by_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{new Date(filteredPhotos[selectedImage].uploaded_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal (stub) */}
      {showUpload && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUpload(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Photo</h2>
            <p className="text-gray-600 mb-6">Photo upload functionality coming soon. Backend support required.</p>
            <button 
              onClick={() => setShowUpload(false)} 
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Gallery;