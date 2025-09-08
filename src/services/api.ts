import type { BlogPost, BlogResponse, BlogByTagResponse, Contact, ContactResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new ApiError(response.status, error.message || 'Request failed');
  }
  return response.json();
};

export const blogService = {
  // Get all blog posts with pagination
  async getPosts(page = 1, limit = 10): Promise<BlogResponse> {
    const response = await fetch(`${API_BASE_URL}/blog?page=${page}&limit=${limit}`);
    return handleResponse(response);
  },

  // Get single blog post by slug
  async getPost(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/blog/${slug}`);
    return handleResponse(response);
  },

  // Get all tags
  async getTags(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/blog/tags/all`);
    return handleResponse(response);
  },

  // Get posts by tag
  async getPostsByTag(tag: string, page = 1, limit = 10): Promise<BlogByTagResponse> {
    const response = await fetch(`${API_BASE_URL}/blog/tag/${tag}?page=${page}&limit=${limit}`);
    return handleResponse(response);
  },

  // Create new blog post (admin only)
  async createPost(post: Omit<BlogPost, '_id' | 'publishedAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return handleResponse(response);
  },
};

export const contactService = {
  // Send contact message
  async sendMessage(contact: Contact): Promise<ContactResponse> {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });
    return handleResponse(response);
  },
};

export { ApiError };
