import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  uploaded_by_name: string;
  uploaded_at: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("");
  const [showUpload, setShowUpload] = useState(false);
  // Get unique categories from photos
  const categories = Array.from(new Set(photos.map((p) => p.category).filter(Boolean)));
  // Filter photos by category
  const filteredPhotos = category ? photos.filter((p) => p.category === category) : photos;

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

  const styles = {
    section: {
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    },
    heading: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '800',
      color: '#1e40af',
      marginBottom: '1rem',
      textAlign: 'center' as const,
    },
    accentText: {
      color: '#3b82f6',
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      fontSize: '1.125rem',
      color: '#64748b',
      maxWidth: '42rem',
      margin: '0 auto 4rem',
      textAlign: 'center' as const,
    },
    galleryContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gap: '1.5rem',
      alignItems: 'start',
    },
    featuredImage: {
      gridColumn: 'span 12',
      height: '600px',
      position: 'relative' as const,
      borderRadius: '1.5rem',
      overflow: 'hidden',
      boxShadow: '0 20px 60px -15px rgba(37, 99, 235, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    featuredImageMd: {
      gridColumn: 'span 7',
    },
    featuredImageHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 70px -15px rgba(37, 99, 235, 0.4)',
    },
    gridImages: {
      gridColumn: 'span 12',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1.5rem',
    },
    gridImagesMd: {
      gridColumn: 'span 5',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    gridImageItem: {
      position: 'relative' as const,
      height: '287px',
      borderRadius: '1rem',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.2)',
    },
    imageElement: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.4s ease',
    },
    overlay: {
      position: 'absolute' as const,
      inset: '0',
      background: 'linear-gradient(to top, rgba(30, 64, 175, 0.9) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '1.5rem',
    },
    overlayContent: {
      color: '#ffffff',
      transform: 'translateY(10px)',
      transition: 'transform 0.3s ease',
    },
    imageTitle: {
      fontWeight: '700',
      fontSize: '1.25rem',
      marginBottom: '0.25rem',
    },
    imageDescription: {
      fontSize: '0.875rem',
      opacity: 0.95,
      marginBottom: '0.5rem',
    },
    imageMeta: {
      fontSize: '0.75rem',
      opacity: 0.85,
    },
    viewAllButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '2rem',
      padding: '0.875rem 1.75rem',
      background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '0.75rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)',
    },
    loadingContainer: {
      textAlign: 'center' as const,
      padding: '3rem 0',
    },
    loadingText: {
      color: '#1e40af',
      fontSize: '1.125rem',
    },
  };

  return (
    <section style={styles.section}>
      <div className="container mx-auto px-4">
        <div>
          <h2 style={styles.heading}>
            Event <span style={styles.accentText}>Gallery</span>
          </h2>
          <p style={styles.subtitle}>
            Capturing moments from our workshops, hackathons, and community events.
          </p>
        </div>

        {/* Gallery Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <label style={{ fontSize: 14, fontWeight: 500, marginRight: 8 }}>Category:</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14 }}
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button
            style={{
              background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.15)'
            }}
            onClick={() => setShowUpload(true)}
          >
            Upload Photo
          </button>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Loading photos...</p>
          </div>
        ) : error ? (
          <div style={styles.loadingContainer}>
            <p style={{ color: '#dc2626', fontSize: '1.125rem' }}>{error}</p>
          </div>
        ) : photos.length === 0 ? (
          <div style={styles.loadingContainer}>
            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>No photos available yet.</p>
          </div>
        ) : (
          <>
            <div 
              style={{
                ...styles.galleryContainer,
                ...(window.innerWidth >= 768 && { display: 'grid' }),
              }}
              className="gallery-responsive"
            >
              {/* Featured/First Image - Left Side */}
              {filteredPhotos[0] && (
                <div
                  style={{
                    ...styles.featuredImage,
                    ...(window.innerWidth >= 768 && styles.featuredImageMd),
                  }}
                  onClick={() => setSelectedImage(0)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 25px 70px -15px rgba(37, 99, 235, 0.4)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                    const overlay = e.currentTarget.querySelector('.overlay');
                    if (overlay) (overlay as HTMLElement).style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 60px -15px rgba(37, 99, 235, 0.3)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                    const overlay = e.currentTarget.querySelector('.overlay');
                    if (overlay) (overlay as HTMLElement).style.opacity = '0';
                  }}
                >
                  <img
                    src={filteredPhotos[0].image_url}
                    alt={filteredPhotos[0].title}
                    style={styles.imageElement}
                  />
                  <div className="overlay" style={styles.overlay}>
                    <div style={styles.overlayContent}>
                      <h3 style={styles.imageTitle}>{filteredPhotos[0].title}</h3>
                      <p style={styles.imageDescription}>{filteredPhotos[0].description}</p>
                      <p style={styles.imageMeta}>
                        By {filteredPhotos[0].uploaded_by_name} • {new Date(filteredPhotos[0].uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Images - Right Side Grid */}
              {filteredPhotos.length > 1 && (
                <div
                  style={{
                    ...styles.gridImages,
                    ...(window.innerWidth >= 768 && styles.gridImagesMd),
                  }}
                >
                  {filteredPhotos.slice(1).map((photo, index) => (
                    <div
                      key={photo.id}
                      style={styles.gridImageItem}
                      onClick={() => setSelectedImage(index + 1)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(59, 130, 246, 0.3)';
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transform = 'scale(1.1)';
                        const overlay = e.currentTarget.querySelector('.overlay');
                        if (overlay) (overlay as HTMLElement).style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(59, 130, 246, 0.2)';
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transform = 'scale(1)';
                        const overlay = e.currentTarget.querySelector('.overlay');
                        if (overlay) (overlay as HTMLElement).style.opacity = '0';
                      }}
                    >
                      <img
                        src={photo.image_url}
                        alt={photo.title}
                        style={styles.imageElement}
                      />
                      <div className="overlay" style={styles.overlay}>
                        <div style={styles.overlayContent}>
                          <h3 style={styles.imageTitle}>{photo.title}</h3>
                          <p style={styles.imageDescription}>{photo.description}</p>
                          <p style={styles.imageMeta}>
                            By {photo.uploaded_by_name} • {new Date(photo.uploaded_at).toLocaleDateString()}
                          </p>
                              {/* Lightbox Modal */}
                              {selectedImage !== null && filteredPhotos[selectedImage] && (
                                <div style={{
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  width: '100vw',
                                  height: '100vh',
                                  background: 'rgba(0,0,0,0.85)',
                                  zIndex: 1000,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onClick={() => setSelectedImage(null)}
                                >
                                  <div style={{ position: 'relative', maxWidth: 900, width: '90vw', maxHeight: '90vh', background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>
                                    <img 
                                      src={filteredPhotos[selectedImage].image_url}
                                      alt={filteredPhotos[selectedImage].title}
                                      style={{ width: '100%', maxHeight: 500, objectFit: 'contain', background: '#f1f5f9' }}
                                      loading="lazy"
                                      width="800"
                                      height="500"
                                    />
                                    <div style={{ padding: 24 }}>
                                      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{filteredPhotos[selectedImage].title}</h2>
                                      <p style={{ fontSize: 15, marginBottom: 8 }}>{filteredPhotos[selectedImage].description}</p>
                                      <div style={{ fontSize: 13, color: '#64748b' }}>
                                        By {filteredPhotos[selectedImage].uploaded_by_name} • {new Date(filteredPhotos[selectedImage].uploaded_at).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <button onClick={() => setSelectedImage(null)} style={{ position: 'absolute', top: 12, right: 12, background: '#fff', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 20, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }} aria-label="Close">×</button>
                                  </div>
                                </div>
                              )}

                              {/* Upload Modal (stub) */}
                              {showUpload && (
                                <div style={{
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  width: '100vw',
                                  height: '100vh',
                                  background: 'rgba(0,0,0,0.7)',
                                  zIndex: 1000,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onClick={() => setShowUpload(false)}
                                >
                                  <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, width: '90vw', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }} onClick={e => e.stopPropagation()}>
                                    <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Upload Photo</h2>
                                    <p style={{ fontSize: 15, marginBottom: 16 }}>Photo upload coming soon. (Backend support required.)</p>
                                    <button onClick={() => setShowUpload(false)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Close</button>
                                  </div>
                                </div>
                              )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => navigate('/gallery')}
                style={styles.viewAllButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
                }}
              >
                <span>📷</span>
                View all photos from BITSA events and activities
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .gallery-responsive > div:first-child {
            grid-column: span 12 !important;
            height: 400px !important;
          }
          .gallery-responsive > div:last-child {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;