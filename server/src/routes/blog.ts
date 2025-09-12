import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost';

const router = Router();

// Authentication middleware
const authenticateAdmin = (req: Request, res: Response, next: any) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Admin authentication required' });
  }
  next();
};

// GET /api/blog - Get all published blog posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost
      .find({ isPublished: true })
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await BlogPost.countDocuments({ isPublished: true });
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts,
      pagination: {
        current: page,
        total: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

// DELETE /api/blog/clear/all - Clear all posts (admin only)
router.delete('/clear/all', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const result = await BlogPost.deleteMany({});
    res.json({ message: 'All blog posts cleared successfully', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error clearing blog posts:', error);
    res.status(500).json({ message: 'Failed to clear blog posts' });
  }
});

// GET /api/blog/tags/all - Get all unique tags
router.get('/tags/all', async (req: Request, res: Response) => {
  try {
    const tags = await BlogPost.distinct('tags', { isPublished: true });
    res.json(tags.sort());
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Failed to fetch tags' });
  }
});

// GET /api/blog/tag/:tag - Get posts by tag
router.get('/tag/:tag', async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost
      .find({ 
        tags: { $in: [tag] }, 
        isPublished: true 
      })
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await BlogPost.countDocuments({ 
      tags: { $in: [tag] }, 
      isPublished: true 
    });
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts,
      pagination: {
        current: page,
        total: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching posts by tag:', error);
    res.status(500).json({ message: 'Failed to fetch posts by tag' });
  }
});

// GET /api/blog/:slug - Get single blog post
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ 
      slug, 
      isPublished: true 
    }).lean();

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// POST /api/blog - Create new blog post
router.post('/', 
  authenticateAdmin,
  [
    body('title').trim().isLength({ min: 1, max: 200 }),
    body('content').trim().isLength({ min: 1 }),
    body('excerpt').optional().trim().isLength({ max: 500 }),
    body('slug').trim().isLength({ min: 1, max: 100 }),
    body('author').trim().isLength({ min: 1, max: 100 }),
    body('tags').isArray()
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: errors.array() 
        });
      }

      const { title, content, excerpt, slug, author, tags, isPublished } = req.body;

      const existingPost = await BlogPost.findOne({ slug });
      if (existingPost) {
        return res.status(409).json({ message: 'Slug already exists' });
      }

      const newPost = new BlogPost({
        title,
        content,
        excerpt: excerpt || content.substring(0, 200) + '...',
        slug,
        author,
        tags,
        isPublished: isPublished ?? true,
        readTime: Math.ceil(content.split(' ').length / 200),
        publishedAt: isPublished ? new Date() : undefined
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  }
);

// DELETE /api/blog/:id - Delete blog post (admin only)
router.delete('/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully', title: deletedPost.title });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
});

export default router;