# Halil Yüksel - Portfolio Website

A modern, full-stack portfolio website built with React, TypeScript, and Node.js, showcasing my work, thoughts, and ways to connect.

![Portfolio Preview](https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=600&fit=crop)

## 🚀 Features

- **🏠 Personal Introduction**: About me, skills, experience, and philosophy
- **📝 Blog System**: Dynamic blog with MongoDB, pagination, tags, and search
- **📬 Contact Form**: Email functionality with automatic responses
- **📱 Responsive Design**: Mobile-first, beautiful UI with Tailwind CSS
- **⚡ Performance**: Fast loading with Vite and optimized assets
- **🔍 SEO Ready**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Nodemailer** - Email functionality
- **Express Validator** - Input validation

### DevOps & Deployment
- **Docker** - Containerization
- **GitHub Actions** - CI/CD (planned)
- **Vercel/Netlify** - Frontend deployment (planned)
- **Railway/DigitalOcean** - Backend deployment (planned)

## 📂 Project Structure

```
Halil_s_Page/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   └── assets/            # Static assets
├── server/                # Backend source code
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   └── dist/              # Compiled JavaScript
├── public/                # Static public assets
├── .vscode/               # VS Code configuration
└── docker/                # Docker configuration (planned)
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or cloud instance)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/halilyuksel/Halil_Portfolio.git
   cd Halil_Portfolio
   ```

   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create `.env` in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   
   Create `server/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   MONGODB_URI=mongodb://localhost:27017/portfolio
   
   # Email configuration (optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

5. **MongoDB Setup**
   
   **Option A: Using Docker (Recommended)**
   ```bash
   # Start MongoDB with Docker
   docker run -d \
     --name portfolio-mongodb \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password123 \
     mongo:7.0
   
   # Optional: Start Mongo Express for web UI
   docker run -d \
     --name portfolio-mongo-express \
     -p 8081:8081 \
     --link portfolio-mongodb:mongo \
     -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
     -e ME_CONFIG_MONGODB_ADMINPASSWORD=password123 \
     -e ME_CONFIG_MONGODB_SERVER=mongo \
     mongo-express
   ```
   
   **Option B: Local MongoDB Installation**
   - Download and install MongoDB from [official website](https://www.mongodb.com/try/download/community)
   - Start the MongoDB service on your system

6. **Initialize Sample Data**
   ```bash
   # Add sample blog post to MongoDB
   docker exec portfolio-mongodb mongosh portfolio --eval "
   db.blogposts.insertOne({
     title: 'Merhaba Dünya', 
     content: 'Bu benim ilk blog yazım. Web geliştirme hakkında konuşacağım ve deneyimlerimi paylaşacağım.',
     excerpt: 'İlk blog yazımda web geliştirme deneyimlerimi paylaşıyorum.',
     slug: 'merhaba-dunya',
     author: 'Halil Yüksel',
     tags: ['teknoloji', 'web', 'javascript'],
     publishedAt: new Date(),
     updatedAt: new Date(),
     isPublished: true,
     readTime: 3
   })
   "
   ```

### Development

**Option 1: Start both servers manually**
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server
npm run dev
```

**Option 2: Use VS Code tasks (Recommended)**

The project includes pre-configured VS Code tasks for easy development:

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Tasks: Run Task" and press Enter
4. Choose from available tasks:
   - **"Start Frontend Dev Server"** - Runs frontend on port 5173
   - **"Start Backend Dev Server"** - Runs backend on port 5000
   - Or run both simultaneously using the background tasks
- `Start Backend Dev Server` - Backend development server

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📝 API Endpoints

### Blog Routes
- `GET /api/blog` - Get all blog posts (paginated)
- `GET /api/blog/:slug` - Get single blog post
- `GET /api/blog/tags/all` - Get all tags
- `GET /api/blog/tag/:tag` - Get posts by tag
- `POST /api/blog` - Create new blog post

### Contact Routes
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)

### Health Check
- `GET /api/health` - Server health status

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `src/pages/Home.tsx` - Personal details, skills, experience
- `src/components/Footer.tsx` - Social media links
- `src/pages/Contact.tsx` - Contact information

### Styling
The project uses Tailwind CSS with custom utilities defined in `src/index.css`. Key classes:
- `.btn-primary`, `.btn-secondary`, `.btn-outline` - Button styles
- `.card` - Card component styling
- `.gradient-text` - Gradient text effect
- `.section-padding` - Consistent section spacing

### Colors
Primary color scheme is defined in Tailwind config. Update `tailwind.config.js` to change the color palette.

## ✅ Current Project Status

This portfolio website is **fully functional** and includes:

### ✅ Completed Features
- ✅ **Responsive Design** - Mobile-first design with Tailwind CSS
- ✅ **Home Page** - Personal introduction, skills, experience, education
- ✅ **Blog System** - Dynamic blog with MongoDB integration
- ✅ **Contact Form** - Working contact form with email notifications
- ✅ **API Backend** - RESTful API with Express.js and MongoDB
- ✅ **MongoDB Integration** - Database setup with Docker support
- ✅ **TypeScript** - Full type safety across frontend and backend
- ✅ **Modern UI** - Clean, professional design with smooth animations

### 🔄 In Progress
- 🔄 **Docker Compose** - Full containerization setup
- 🔄 **Testing Suite** - Unit and integration tests
- 🔄 **CI/CD Pipeline** - GitHub Actions workflow

### 📋 Planned Features
- 📋 **Admin Panel** - Blog management interface
- 📋 **Analytics** - Visitor tracking and statistics
- 📋 **SEO Optimization** - Enhanced meta tags and sitemap
- 📋 **Performance Monitoring** - Real-time performance metrics

## 📦 Building for Production

```bash
# Build frontend
npm run build

# Build backend
cd server
npm run build
```

## 🐳 Docker Setup & Usage

### MongoDB with Docker

The project uses MongoDB as the database. The easiest way to set it up is using Docker:

```bash
# Start MongoDB container
docker run -d \
  --name portfolio-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  mongo:7.0

# Optional: Start Mongo Express for database management
docker run -d \
  --name portfolio-mongo-express \
  -p 8081:8081 \
  --link portfolio-mongodb:mongo \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=password123 \
  -e ME_CONFIG_MONGODB_SERVER=mongo \
  mongo-express
```

**Access Points:**
- **MongoDB**: `mongodb://localhost:27017/portfolio`
- **Mongo Express Web UI**: http://localhost:8081

### Docker Management Commands

```bash
# Check running containers
docker ps

# Stop containers
docker stop portfolio-mongodb portfolio-mongo-express

# Start containers
docker start portfolio-mongodb portfolio-mongo-express

# Remove containers (data will be lost)
docker rm portfolio-mongodb portfolio-mongo-express

# View logs
docker logs portfolio-mongodb
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set build directory: `dist`
4. Add environment variables

### Backend (Railway/DigitalOcean)
1. Deploy from GitHub
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add environment variables including MongoDB connection string

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Halil Yüksel**
- Website: [portfolio.halilyuksel.dev](https://portfolio.halilyuksel.dev)
- Email: [contact@halilyuksel.dev](mailto:contact@halilyuksel.dev)
- GitHub: [@halilyuksel](https://github.com/halilyuksel)
- LinkedIn: [Halil Yüksel](https://linkedin.com/in/halilyuksel)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Amazing UI framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [Express.js](https://expressjs.com/) - Web framework for Node.js

---

**Built with ❤️ by Halil Yüksel**
