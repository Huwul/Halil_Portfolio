import mongoose, { Document, Schema } from "mongoose";

export interface IBlogPost extends Document {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    author: string;
    tags: string[];
    publishedAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    featuredImage?: string;
    readTime: number;
}

const BlogPostSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        excerpt: {
            type: String,
            required: [true, "Excerpt is required"],
            maxlength: [200, "Excerpt cannot exceed 200 characters"],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            default: "Halil Yüksel",
        },
        tags: [
            {
                type: String,
                trim: true,
                lowercase: true,
            },
        ],
        publishedAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        featuredImage: {
            type: String,
            default: null,
        },
        readTime: {
            type: Number,
            default: 5, // minutes
        },
    },
    {
        timestamps: true,
    }
);

// Create slug from title before saving
BlogPostSchema.pre("save", function (this: IBlogPost, next) {
    if (this.isModified("title")) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9 -]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    }
    this.updatedAt = new Date();
    next();
});

// Calculate read time based on content
BlogPostSchema.pre("save", function (this: IBlogPost, next) {
    if (this.isModified("content")) {
        const wordsPerMinute = 200;
        const wordCount = this.content.split(/\s+/).length;
        this.readTime = Math.ceil(wordCount / wordsPerMinute);
    }
    next();
});

// Add indexes for better query performance
BlogPostSchema.index({ slug: 1 }, { unique: true });
BlogPostSchema.index({ publishedAt: -1 });
BlogPostSchema.index({ isPublished: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ author: 1 });

// Compound indexes for common query patterns
BlogPostSchema.index({ isPublished: 1, publishedAt: -1 });
BlogPostSchema.index({ tags: 1, isPublished: 1, publishedAt: -1 });

export default mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
