import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import blogRoutes from "./routes/blog";
import contactRoutes from "./routes/contact";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(
    helmet({
        crossOriginEmbedderPolicy: false, // Allow embedding for development
    })
);

app.use(
    cors({
        origin:
            process.env.NODE_ENV === "development"
                ? [
                      "http://localhost:5173",
                      "http://localhost:5174",
                      "http://localhost:5175",
                      "http://localhost:3000",
                  ]
                : [
                      process.env.CLIENT_URL || "https://halil-portfolio-tau.vercel.app",
                      process.env.PRODUCTION_URL || "https://halil-portfolio-tau.vercel.app",
                      // Allow all Vercel preview deployments for this project
                      /^https:\/\/halil-portfolio-.+\.vercel\.app$/,
                      /^https:\/\/halil-portfolio-d5m3eomun-halils-projects-6159e267\.vercel\.app$/
                  ],
        credentials: true,
    })
);

// Enhanced rate limiting
const createRateLimiter = (windowMs: number, max: number, message: string) =>
    rateLimit({
        windowMs,
        max: process.env.NODE_ENV === "production" ? max : max * 10,
        message,
        standardHeaders: true,
        legacyHeaders: false,
    });

// Different rate limits for different endpoints
app.use(
    "/api/contact",
    createRateLimiter(15 * 60 * 1000, 5, "Too many contact requests")
);
app.use(
    "/api",
    createRateLimiter(15 * 60 * 1000, 100, "Too many requests from this IP")
);

// Body parsing middleware with size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging in development
if (process.env.NODE_ENV === "development") {
    app.use(
        (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            console.log(
                `${new Date().toISOString()} - ${req.method} ${req.path}`
            );
            next();
        }
    );
}

// Database connection
const connectDB = async () => {
    try {
        let mongoURI =
            process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

        // Add authentication if credentials are provided
        if (process.env.MONGO_USER && process.env.MONGO_PASSWORD) {
            const protocol = mongoURI.includes("://")
                ? mongoURI.split("://")[0]
                : "mongodb";
            const hostAndPath = mongoURI.includes("://")
                ? mongoURI.split("://")[1]
                : mongoURI.replace("mongodb://", "");
            mongoURI = `${protocol}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${hostAndPath}`;
        }

        await mongoose.connect(mongoURI, {
            authSource: "admin", // Important for authentication
        });
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        console.log(
            "⚠️  Server will continue running without database connection"
        );
        console.log(
            "📝 To fix this: Install and start MongoDB, or use MongoDB Atlas"
        );
        console.log(
            "   - Install MongoDB: https://www.mongodb.com/try/download/community"
        );
        console.log("   - Or use MongoDB Atlas: https://cloud.mongodb.com/");
        // Don't exit, continue without database
    }
};

// Routes
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);

// Health check endpoint
app.get("/api/health", (req: express.Request, res: express.Response) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || "development",
        mongodb:
            mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    });
});

// Error handling middleware
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(500).json({
            message: "Something went wrong!",
            error:
                process.env.NODE_ENV === "development"
                    ? err.message
                    : "Internal server error",
        });
    }
);

// 404 handler
app.use("*", (req: express.Request, res: express.Response) => {
    res.status(404).json({ message: "API endpoint not found" });
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
    });
};

startServer().catch(console.error);

export default app;
