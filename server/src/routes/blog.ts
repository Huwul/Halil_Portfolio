import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost';

const router = Router();

// GET /api/blog/debug - Debug endpoint to view all data
router.get('/debug', async (req: Request, res: Response) => {
  try {
    const allPosts = await BlogPost.find().lean();
    const totalCount = await BlogPost.countDocuments();
    
    res.json({
      totalPosts: totalCount,
      posts: allPosts,
      collections: await BlogPost.db.db.listCollections().toArray()
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    res.status(500).json({ 
      message: 'Debug error', 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
});

// GET /api/blog - Get all published blog posts with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await BlogPost
      .find({ isPublished: true })
      .select('-content') // Exclude content for list view
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

// GET /api/blog/:slug - Get single blog post by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const post = await BlogPost
      .findOne({ slug: req.params.slug, isPublished: true })
      .lean();

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// GET /api/blog/tags/all - Get all tags
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
      .find({ tags: tag, isPublished: true })
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await BlogPost.countDocuments({ tags: tag, isPublished: true });
    const totalPages = Math.ceil(total / limit);

    res.json({
      posts,
      tag,
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

// POST /api/blog - Create new blog post (for admin use)
router.post('/', [
  body('title').isLength({ min: 1, max: 100 }).trim(),
  body('content').isLength({ min: 1 }),
  body('excerpt').isLength({ min: 1, max: 200 }).trim(),
  body('tags').optional().isArray(),
  body('featuredImage').optional().isURL()
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blogPost = new BlogPost(req.body);
    const savedPost = await blogPost.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    if ((error as any).code === 11000) {
      return res.status(400).json({ message: 'A post with this title already exists' });
    }
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

export default router;
