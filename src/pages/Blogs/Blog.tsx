import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight, ChevronRight, Filter, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BlogPostAPI } from "@/types";

const POSTS_PER_PAGE = 8;

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // Filter state
  const [category, setCategory] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

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

  // Get unique categories, tags, authors from posts
  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
  const tags = Array.from(new Set(posts.flatMap((p) => Array.isArray(p.tags) ? p.tags : []).filter(Boolean)));
  const authors = Array.from(new Set(posts.map((p) => p.author_name).filter(Boolean)));

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchCategory = !category || post.category === category;
    const matchTag = !tag || (Array.isArray(post.tags) && post.tags.includes(tag));
    const matchAuthor = !author || post.author_name === author;
    return matchCategory && matchTag && matchAuthor;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const isVisible = (sectionId) => visibleSections[sectionId] || false;

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/blogs/posts/');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch blog posts');
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="animate-spin text-blue-600" size={24} />
            <p className="text-lg text-blue-600 font-medium">Loading blog posts...</p>
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
              Latest from <span className="text-blue-200">Our Blog</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Stay updated with tutorials, tech insights, and stories from the BITSA community.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filter Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter size={18} />
            <span>Filters</span>
            {showFilters ? <X size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Filters Section */}
        <div 
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="filters"
          className={`mb-8 transition-all duration-500 ${
            showFilters ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 h-0 overflow-hidden'
          }`}
        >
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex flex-wrap gap-6 items-end justify-center">
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={category}
                  onChange={e => { setCategory(e.target.value); setPage(1); }}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={tag}
                  onChange={e => { setTag(e.target.value); setPage(1); }}
                >
                  <option value="">All Tags</option>
                  {tags.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={author}
                  onChange={e => { setAuthor(e.target.value); setPage(1); }}
                >
                  <option value="">All Authors</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              {(category || tag || author) && (
                <Button 
                  variant="outline" 
                  onClick={() => { setCategory(""); setTag(""); setAuthor(""); setPage(1); }}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div 
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="posts"
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto transition-all duration-700 ${
            isVisible('posts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {paginatedPosts.map((post) => (
            <Card 
              key={post.id} 
              className="border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden group"
            >
              {post.image_url && (
                <div className="aspect-video relative overflow-hidden h-36 bg-gray-100">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0 text-xs px-2 py-0.5">
                    {post.category || 'Uncategorized'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {post.read_time} min read
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-xs text-gray-600 line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 p-4 pt-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={post.author_avatar || undefined} alt={post.author_name} />
                    <AvatarFallback className="bg-blue-600 text-white text-xs">
                      {post.author_name ? post.author_name[0] : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-gray-600 font-medium truncate">{post.author_name}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={12} className="mr-1" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                {/* Tags */}
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 2).map((tag: string) => (
                      <Badge key={tag} variant="outline" className="border-gray-300 text-gray-600 text-[10px] px-2 py-0">
                        #{tag.trim()}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-[10px] text-gray-500">+{post.tags.length - 2}</span>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  Read Article
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-gray-600">No blog posts match your filters.</p>
            <Button 
              variant="outline" 
              onClick={() => { setCategory(""); setTag(""); setAuthor(""); }} 
              className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            View All Articles
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>

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

export default Blog;