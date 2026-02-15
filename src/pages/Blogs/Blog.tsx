import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPostAPI } from "@/types";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPostAPI[]>([]);
  const [loading, setLoading] = useState(true);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {posts.map((post) => (
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
                  <CardTitle className="text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 p-3 pt-0">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <User size={12} className="mr-1" />
                    <span className="truncate">{post.author_name}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar size={12} className="mr-1" />
                    {new Date(post.published_at || post.created_at).toLocaleDateString()}
                  </div>
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