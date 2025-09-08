import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { blogService } from '../services/api';
import type { BlogPost, BlogResponse } from '../types';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false); // Search yapılıp yapılmadığını takip et

  // Tüm postları getir (search için)
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await blogService.getPosts(1, 100);
        setAllPosts(response.posts);
      } catch (err) {
        console.error('Failed to fetch all posts:', err);
      }
    };

    fetchAllPosts();
  }, []);

  // Search işlemi - her zaman client side
  useEffect(() => {
    if (allPosts.length === 0) return;
    
    let filteredPosts = allPosts;
    
    // Eğer search term varsa filtrele
    if (searchTerm) {
      setHasSearched(true);
      const searchLower = searchTerm.toLowerCase();
      filteredPosts = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    } else if (hasSearched && !selectedTag) {
      // Search temizlendiyse ve tag seçilmemişse, tüm postları göster
      filteredPosts = allPosts;
    } else {
      // Normal durum - API çağrısı yapılacak
      return;
    }
    
    const postsPerPage = 6;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    setPosts(paginatedPosts);
    setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
  }, [searchTerm, allPosts, currentPage, hasSearched, selectedTag]);

  // Sadece tag filtreleme ve ilk yükleme için API çağrısı
  useEffect(() => {
    if (searchTerm || (hasSearched && !selectedTag)) return; // Search aktifse veya search temizlendiyse API çağırma
    
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let response: BlogResponse;
        
        if (selectedTag) {
          response = await blogService.getPostsByTag(selectedTag, currentPage, 6);
        } else {
          response = await blogService.getPosts(currentPage, 6);
        }
        
        setPosts(response.posts);
        setTotalPages(response.pagination.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, selectedTag, searchTerm, hasSearched]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await blogService.getTags();
        setTags(fetchedTags);
      } catch (err) {
        console.error('Failed to fetch tags:', err);
      }
    };

    fetchTags();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setCurrentPage(1);
    }
    setHasSearched(false); // Tag seçildiğinde search durumunu reset et
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    if (!value) {
      setHasSearched(false); // Search temizlendiğinde reset et
    }
  };

  if (loading && !searchTerm && !hasSearched) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white dark:text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-300 dark:text-gray-300 mb-8">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-6">
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Thoughts, ideas, and insights about software development, technology, and the journey of building amazing web applications.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => handleTagClick('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${ 
                  !selectedTag 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Posts
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-gray-900 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-white dark:text-white mb-4">No posts found</h3>
              <p className="text-gray-300 dark:text-gray-300 mb-8">
                {(() => {
                  if (searchTerm) {
                    return `No posts match your search "${searchTerm}"`;
                  } else if (selectedTag) {
                    return `No posts tagged with "${selectedTag}"`;
                  } else {
                    return "No posts available yet";
                  }
                })()}
              </p>
              {searchTerm && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="btn-primary"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post._id} className="card hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    {post.featuredImage && (
                      <div className="aspect-w-16 aspect-h-9 mb-4 -mx-6 -mt-6">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                      </div>
                    )}
                    
                    <div className="flex-grow flex flex-col">
                      <div className="flex-grow">
                        <div className="flex items-center text-sm text-gray-100 dark:text-gray-100 mb-3">
                          <Calendar size={14} className="mr-1" />
                          <span className="mr-4">{formatDate(post.publishedAt)}</span>
                          <Clock size={14} className="mr-1" />
                          <span>{post.readTime} min read</span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-100 dark:text-gray-100 mb-3 leading-tight">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="hover:text-primary-300 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h2>

                        <p className="text-gray-100 dark:text-gray-100 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-auto">
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-xs rounded-full hover:bg-gray-500 transition-colors border border-gray-500"
                              >
                                <Tag size={10} className="mr-1" />
                                {tag}
                              </button>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-gray-400 py-1">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center text-primary-300 hover:text-primary-200 font-medium text-sm transition-colors"
                        >
                          Read More
                          <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-16">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} className="mr-1" />
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary-600 text-white'
                              : 'text-gray-300 hover:text-primary-400 hover:bg-gray-800'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 text-gray-300 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                    <ChevronRight size={20} className="ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};
