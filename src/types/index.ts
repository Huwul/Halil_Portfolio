export interface BlogPost {
    _id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    author: string;
    tags: string[];
    publishedAt: string;
    updatedAt: string;
    isPublished: boolean;
    featuredImage?: string;
    readTime: number;
}

export interface Contact {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactResponse {
    message: string;
    success: boolean;
}

export interface BlogResponse {
    posts: BlogPost[];
    pagination: {
        current: number;
        total: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

export interface BlogByTagResponse extends BlogResponse {
    tag: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface Skill {
    name: string;
    category:
        | "Frontend"
        | "Backend"
        | "Language"
        | "Database"
        | "Desktop"
        | "Styling";
    level: number; // 1-10
    icon: string;
}

export interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string;
    technologies: string[];
}

export interface Education {
    degree: string;
    school: string;
    duration: string;
    description: string;
}

export interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ size?: number }>;
}

// API Error interface
export interface ApiErrorResponse {
    message: string;
    errors?: Array<{
        field: string;
        message: string;
    }>;
}

// Pagination interface
export interface PaginationProps {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
    onPageChange: (page: number) => void;
}
