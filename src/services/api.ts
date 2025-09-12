import type { 
  BlogPost, 
  BlogResponse, 
  BlogByTagResponse, 
  Contact, 
  ContactResponse,
  ApiErrorResponse 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiError extends Error {
  status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Retry logic for network failures
const withRetry = async <T>(
  fn: () => Promise<T>, 
  retries = 2, 
  delay = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error instanceof ApiError && error.status >= 500) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorData: ApiErrorResponse;
    
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: 'Network error occurred' };
    }
    
    throw new ApiError(
      response.status, 
      errorData.message || `HTTP ${response.status}: ${response.statusText}`
    );
  }
  
  return response.json();
};

// Create fetch with timeout
const fetchWithTimeout = (url: string, options: RequestInit = {}, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, { 
    ...options, 
    signal: controller.signal 
  }).finally(() => {
    clearTimeout(timeoutId);
  });
};

export const blogService = {
  // Get all blog posts with pagination
  async getPosts(page = 1, limit = 10): Promise<BlogResponse> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(`${API_BASE_URL}/blog?page=${page}&limit=${limit}`);
      return handleResponse(response);
    });
  },

  // Get single blog post by slug
  async getPost(slug: string): Promise<BlogPost> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(`${API_BASE_URL}/blog/${slug}`);
      return handleResponse(response);
    });
  },

  // Get all tags
  async getTags(): Promise<string[]> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(`${API_BASE_URL}/blog/tags/all`);
      return handleResponse(response);
    });
  },

  // Get posts by tag
  async getPostsByTag(tag: string, page = 1, limit = 10): Promise<BlogByTagResponse> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(`${API_BASE_URL}/blog/tag/${tag}?page=${page}&limit=${limit}`);
      return handleResponse(response);
    });
  },

  // Create new blog post (admin only)
  async createPost(post: Omit<BlogPost, '_id' | 'publishedAt' | 'updatedAt' | 'slug'>): Promise<BlogPost> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(`${API_BASE_URL}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      return handleResponse(response);
    });
  },
};

export const contactService = {
  // Send contact message
  async sendMessage(contact: Contact): Promise<ContactResponse> {
    return withRetry(async () => {
      const response = await fetchWithTimeout(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      return handleResponse(response);
    });
  },
};

export { ApiError };
