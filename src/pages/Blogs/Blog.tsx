
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
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

  return (
    <section className="py-20" style={{backgroundColor: '#e0f2fe', minHeight: '100vh'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Latest from <span className="text-primary">Our Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with tutorials, tech insights, and stories from the BITSA community.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8 items-center justify-center">
              <div>
                <label className="block text-xs font-medium mb-1">Category</label>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={category}
                  onChange={e => { setCategory(e.target.value); setPage(1); }}
                >
                  <option value="">All</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Tag</label>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={tag}
                  onChange={e => { setTag(e.target.value); setPage(1); }}
                >
                  <option value="">All</option>
                  {tags.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Author</label>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={author}
                  onChange={e => { setAuthor(e.target.value); setPage(1); }}
                >
                  <option value="">All</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              {(category || tag || author) && (
                <Button variant="outline" size="sm" onClick={() => { setCategory(""); setTag(""); setAuthor(""); setPage(1); }}>
                  Clear Filters
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {paginatedPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-xl transition-all border-border group max-w-xs">
                  {post.image_url && (
                    <div className="aspect-video relative overflow-hidden rounded-t-lg h-32">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {post.read_time} min
                      </span>
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 p-3 pt-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={post.author_avatar || undefined} alt={post.author_name} />
                        <AvatarFallback>{post.author_name ? post.author_name[0] : "?"}</AvatarFallback>
                      </Avatar>
                      <span className="truncate text-xs text-muted-foreground font-medium">{post.author_name}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <Calendar size={12} className="mr-1" />
                      {new Date(post.published_at || post.created_at).toLocaleDateString()}
                    </div>
                    {/* Tags */}
                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {post.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5">
                            #{tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group/btn text-xs h-8"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Read
                      <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {posts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available yet.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" onClick={() => navigate('/blog')}>
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;