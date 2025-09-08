import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { blogService } from '../services/api';
import type { BlogPost as BlogPostType } from '../types';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await blogService.getPost(slug);
        setPost(fetchedPost);

        // İlgili postları getir (aynı tag'lere sahip postlar)
        if (fetchedPost.tags.length > 0) {
          const related = await blogService.getPostsByTag(fetchedPost.tags[0], 1, 3);
          // Mevcut post'u çıkar
          const filteredRelated = related.posts.filter(p => p._id !== fetchedPost._id);
          setRelatedPosts(filteredRelated.slice(0, 2));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-300 mb-8">{error || 'The blog post you\'re looking for doesn\'t exist.'}</p>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/blog"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="aspect-w-16 aspect-h-9 mb-8 rounded-xl overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Post Meta */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <Calendar size={16} className="mr-2" />
            <span className="mr-6">{formatDate(post.publishedAt)}</span>
            <Clock size={16} className="mr-2" />
            <span className="mr-6">{post.readTime} min read</span>
            <span className="text-gray-500">•</span>
            <span className="ml-2">By Halil</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="inline-flex items-center px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full hover:bg-gray-600 transition-colors border border-gray-600"
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Post Content */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert prose-primary max-w-none">
            {/* Content paragraphs */}
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={`paragraph-${index}-${paragraph.slice(0, 20)}`} className="text-gray-300 mb-6 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost._id} className="card hover:shadow-xl transition-shadow duration-300">
                  {relatedPost.featuredImage && (
                    <div className="aspect-w-16 aspect-h-9 mb-4 -mx-6 -mt-6">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">{formatDate(relatedPost.publishedAt)}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{relatedPost.readTime} min read</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    <Link 
                      to={`/blog/${relatedPost.slug}`}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>

                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>

                  {relatedPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {relatedPost.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                        >
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
