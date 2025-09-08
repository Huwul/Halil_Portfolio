import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost';

const router = Router();

// POST /api/blog/seed - Seed database with sample Turkish blog posts
router.post('/seed', async (req: Request, res: Response) => {
  try {
    // Clear existing posts first
    await BlogPost.deleteMany({});
    
    const samplePosts = [
      {
        title: 'Merhaba Dünya - İlk Blog Yazım',
        content: 'Merhaba! Bu benim ilk blog yazım. Bu platformda teknoloji dünyasında yaşadığım deneyimleri, öğrendiğim yeni teknolojileri ve geliştirdiğim projeleri paylaşacağım.\n\n## Neden Blog Yazıyorum?\n\nBlog yazmak benim için hem öğrenme hem de paylaşma sürecinin bir parçası. Her yeni teknoloji öğrendiğimde, karşılaştığım problemleri çözme sürecinde elde ettiğim deneyimleri burada paylaşmak istiyorum.\n\n## Ne Tür İçerikler Bulabilirsiniz?\n\n- **Frontend Teknolojileri**: React, TypeScript, modern CSS\n- **Backend Geliştirme**: Node.js, Express, veritabanı tasarımı\n- **DevOps**: Docker, deployment stratejileri\n- **Proje Deneyimleri**: Gerçek projelerden örnekler\n\nTakipte kalın, yeni yazılar çok yakında geliyor! 🚀',
        excerpt: 'İlk blog yazımda kendimden ve bu platformda paylaşacağım içeriklerden bahsediyorum.',
        slug: 'merhaba-dunya-ilk-blog-yazim',
        author: 'Halil Yüksel',
        tags: ['blog', 'merhaba', 'teknoloji']
      },
      {
        title: 'React ve TypeScript ile Modern Web Geliştirme',
        content: 'Modern web geliştirmede React ve TypeScript kombinasyonu, güçlü tip sistemi ve esnek bileşen mimarisi sayesinde geliştiricilerin daha güvenilir ve sürdürülebilir uygulamalar oluşturmasını sağlar.\n\n## Type Safety Avantajları\n\nTypeScript, JavaScript kodunuza tip güvenliği katarak:\n- Derleme zamanında hataları yakalar\n- IDE desteği sağlar\n- Kod dokümantasyonu oluşturur\n- Refactoring işlemlerini kolaylaştırır\n\n## React Hooks ile State Yönetimi\n\nModern React uygulamalarında state yönetimi için:\n```typescript\nconst [user, setUser] = useState<User | null>(null);\nconst { data, loading, error } = useFetch<BlogPost[]>(\'/api/blog\');\n```\n\n## En İyi Pratikler\n\n1. **Component Composition**: Küçük, yeniden kullanılabilir bileşenler\n2. **Custom Hooks**: Mantığı ayırma\n3. **Type Definitions**: Interface ve type tanımları\n4. **Error Boundaries**: Hata yönetimi\n\nBu yaklaşımlar, daha temiz kod yazmanızı ve projenizi ölçeklendirmenizi kolaylaştırır.',
        excerpt: 'React ve TypeScript ile modern, tip-güvenli web uygulamaları geliştirmenin avantajları ve en iyi pratikleri.',
        slug: 'react-typescript-modern-web',
        author: 'Halil Yüksel',
        tags: ['react', 'typescript', 'frontend', 'javascript']
      },
      {
        title: 'Docker ile Full-Stack Uygulamaları Konteynerleştirme',
        content: 'Docker, uygulamalarınızı konteyner teknolojisi ile paketleyerek, farklı ortamlarda tutarlı çalışmasını sağlar. Full-stack uygulamalar için Docker Compose kullanarak tüm servisleri tek komutla yönetebilirsiniz.\n\n## Docker\'ın Avantajları\n\n### Tutarlılık\n- Development, staging ve production ortamları arasında tutarlılık\n- "Benim bilgisayarımda çalışıyor" problemini çözer\n- Tüm takım üyeleri aynı ortamda çalışır\n\n### İzolasyon\n- Her servis kendi konteynerinde çalışır\n- Bağımlılık çakışmaları önlenir\n- System kaynaklarının etkin kullanımı\n\n## Docker Compose ile Multi-Service Setup\n\n```yaml\nversion: \'3.8\'\nservices:\n  frontend:\n    build: .\n    ports:\n      - "5173:5173"\n    depends_on:\n      - backend\n      \n  backend:\n    build: ./server\n    ports:\n      - "3001:3001"\n    environment:\n      - MONGODB_URI=mongodb://mongo:27017/app\n    depends_on:\n      - mongo\n      \n  mongo:\n    image: mongo:7.0\n    ports:\n      - "27017:27017"\n```\n\n## En İyi Pratikler\n\n1. **Multi-stage builds**: Production imajları küçük tutmak\n2. **.dockerignore**: Gereksiz dosyaları exclude etmek\n3. **Health checks**: Servis durumunu kontrol etmek\n4. **Volumes**: Data persistence için\n\nDocker ile development ve deployment süreçlerinizi büyük ölçüde kolaylaştırabilirsiniz.',
        excerpt: 'Docker ve Docker Compose kullanarak full-stack uygulamalarını konteynerleştirme rehberi ve en iyi pratikler.',
        slug: 'docker-fullstack-konteyner',
        author: 'Halil Yüksel',
        tags: ['docker', 'devops', 'containerization', 'fullstack']
      },
      {
        title: 'JavaScript ES6+ ve Modern Sözdizimi',
        content: 'Modern JavaScript ES6+ özellikleri ile daha temiz ve verimli kod yazabilirsiniz. Arrow functions, destructuring, async/await gibi özellikler kodu daha okunabilir hale getirir.\n\n## Arrow Functions\n```javascript\n// ES5\nfunction add(a, b) {\n  return a + b;\n}\n\n// ES6+\nconst add = (a, b) => a + b;\n```\n\n## Destructuring\n```javascript\nconst user = { name: \'John\', age: 30 };\nconst { name, age } = user;\n\nconst numbers = [1, 2, 3];\nconst [first, second] = numbers;\n```\n\n## Template Literals\n```javascript\nconst message = `Merhaba ${name}, sen ${age} yaşındasın`;\n```\n\n## Async/Await\n```javascript\nasync function fetchUser(id) {\n  try {\n    const response = await fetch(`/api/users/${id}`);\n    const user = await response.json();\n    return user;\n  } catch (error) {\n    console.error(\'Kullanıcı getirme hatası:\', error);\n  }\n}\n```\n\nBu özellikler kodunuzu daha modern ve okunabilir hale getirir.',
        excerpt: 'ES6+ ile gelen modern JavaScript özelliklerinin kullanımı ve avantajları hakkında detaylı rehber.',
        slug: 'javascript-es6-modern-syntax',
        author: 'Halil Yüksel',
        tags: ['javascript', 'es6', 'frontend', 'syntax']
      },
      {
        title: 'MongoDB ve NoSQL Veritabanı Tasarımı',
        content: 'MongoDB, esnek şema yapısı ile modern uygulamalar için ideal bir NoSQL veritabanıdır. Geleneksel ilişkisel veritabanlarına alternatif olarak esnek ve ölçeklenebilir çözümler sunar.\n\n## MongoDB Avantajları\n\n### Esnek Şema\n- JSON benzeri BSON formatı\n- Şema değişiklikleri kolay\n- Nested objects ve arrays\n- Dinamik field ekleme\n\n### Performans\n- Horizontal scaling (sharding)\n- İndeksleme desteği\n- Aggregation pipeline\n- Memory-mapped dosyalar\n\n## Document Design Örneği\n```javascript\n// Kullanıcı dokümanı örneği\n{\n  _id: ObjectId(\'...\'),\n  kullaniciAdi: \'halil\',\n  email: \'halil@example.com\',\n  profil: {\n    ad: \'Halil\',\n    soyad: \'Yüksel\',\n    bio: \'Full-stack geliştirici\',\n    avatarUrl: \'https://example.com/avatar.jpg\'\n  },\n  yetenekler: [\'JavaScript\', \'React\', \'Node.js\', \'MongoDB\'],\n  olusturmaTarihi: ISODate(\'2025-01-01\'),\n  aktifMi: true\n}\n```\n\n## Mongoose ile Type Safety\n```javascript\nconst kullaniciSemasi = new mongoose.Schema({\n  kullaniciAdi: { type: String, required: true, unique: true },\n  email: { type: String, required: true },\n  yetenekler: [String],\n  olusturmaTarihi: { type: Date, default: Date.now }\n});\n```\n\nMongoDB ile ölçeklenebilir ve performanslı uygulamalar geliştirebilirsiniz.',
        excerpt: 'MongoDB ve NoSQL veritabanı tasarım prensipleri, Mongoose kullanımı ve en iyi pratikler rehberi.',
        slug: 'mongodb-nosql-database-design',
        author: 'Halil Yüksel',
        tags: ['mongodb', 'nosql', 'database', 'mongoose', 'backend']
      },
      {
        title: 'Tailwind CSS ile Hızlı UI Geliştirme',
        content: 'Tailwind CSS, utility-first yaklaşımı ile hızlı ve tutarlı kullanıcı arayüzleri oluşturmanızı sağlayan modern bir CSS framework\'üdür. Geleneksel CSS yazım yöntemlerine alternatif sunar.\n\n## Tailwind CSS\'in Avantajları\n\n### Utility-First Yaklaşım\n- Önceden tanımlanmış utility sınıfları\n- Hızlı prototipleme\n- Tutarlı tasarım sistemi\n- Küçük CSS dosya boyutu\n\n### Responsive Tasarım\n```html\n<div class="w-full md:w-1/2 lg:w-1/3">\n  <img class="rounded-lg shadow-md hover:shadow-xl transition-shadow" \n       src="image.jpg" alt="Örnek" />\n</div>\n```\n\n### Dark Mode Desteği\n```html\n<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">\n  <h1 class="text-2xl font-bold">Başlık</h1>\n  <p class="text-gray-600 dark:text-gray-300">İçerik</p>\n</div>\n```\n\n## Component Örnekleri\n\n### Kart Bileşeni\n```html\n<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">\n  <div class="p-6">\n    <h2 class="text-xl font-semibold text-gray-900">Kart Başlığı</h2>\n    <p class="text-gray-600 mt-2">Bu bir örnek kart bileşenidir.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">\n      Tıkla\n    </button>\n  </div>\n</div>\n```\n\n### Flexbox Layout\n```html\n<div class="flex flex-col md:flex-row gap-6">\n  <div class="flex-1 p-4 bg-gray-100 rounded-lg">\n    <h3 class="font-semibold">Sol Kolon</h3>\n  </div>\n  <div class="flex-1 p-4 bg-gray-100 rounded-lg">\n    <h3 class="font-semibold">Sağ Kolon</h3>\n  </div>\n</div>\n```\n\n## Performans ve Optimizasyon\n\n- **PurgeCSS**: Kullanılmayan CSS\'leri otomatik temizleme\n- **JIT Mode**: Just-in-Time derleme\n- **Custom Utilities**: İhtiyaca göre özel utility\'ler\n\nTailwind CSS ile modern, responsive ve performanslı arayüzler geliştirebilirsiniz.',
        excerpt: 'Tailwind CSS ile utility-first yaklaşımı kullanarak hızlı ve modern UI geliştirme rehberi.',
        slug: 'tailwind-css-hizli-ui-geliştirme',
        author: 'Halil Yüksel',
        tags: ['tailwind', 'css', 'frontend', 'ui', 'design']
      },
      {
        title: 'Git ve GitHub ile Versiyon Kontrolü',
        content: 'Git, yazılım geliştirmede versiyon kontrolü için kullanılan en popüler araçtır. GitHub ile birlikte kullanıldığında güçlü bir geliştirme ortamı sunar.\n\n## Git\'in Temel Kavramları\n\n### Repository (Depo)\n- **Local Repository**: Bilgisayarınızdaki proje kopyası\n- **Remote Repository**: GitHub, GitLab gibi uzak sunuculardaki kopya\n- **Clone**: Uzak depoyu yerel makineye kopyalama\n\n### Branch (Dal) Sistemi\n```bash\n# Yeni branch oluştur ve geç\ngit checkout -b yeni-özellik\n\n# Branch\'ler arası geçiş\ngit checkout main\ngit checkout yeni-özellik\n\n# Branch\'leri listele\ngit branch\n```\n\n## Temel Git Komutları\n\n### Değişiklikleri Takip Etme\n```bash\n# Dosya durumunu kontrol et\ngit status\n\n# Değişiklikleri stage\'e ekle\ngit add .\ngit add dosya.txt\n\n# Commit oluştur\ngit commit -m "Yeni özellik eklendi"\n\n# Uzak depoya gönder\ngit push origin main\n```\n\n### Geçmişi İnceleme\n```bash\n# Commit geçmişini görüntüle\ngit log\ngit log --oneline\n\n# Belirli dosyanın geçmişi\ngit log dosya.txt\n\n# Değişiklikleri karşılaştır\ngit diff\ngit diff HEAD~1\n```\n\n## GitHub ile İşbirliği\n\n### Pull Request (PR) Süreci\n1. Fork yapın veya branch oluşturun\n2. Değişikliklerinizi yapın\n3. Commit ve push işlemleri\n4. Pull request oluşturun\n5. Code review süreci\n6. Merge işlemi\n\n### Issues ve Project Management\n- **Issues**: Hata raporları ve özellik istekleri\n- **Labels**: Kategorilendirme\n- **Milestones**: Sürüm hedefleri\n- **Projects**: Kanban tarzı proje yönetimi\n\n## Best Practices\n\n1. **Anlamlı Commit Mesajları**: Değişikliği açıklayan net mesajlar\n2. **Küçük ve Sık Commit\'ler**: Her mantıksal değişiklik için ayrı commit\n3. **Branch Stratejisi**: Feature branch\'leri kullanma\n4. **Code Review**: Pull request\'lerde kod inceleme\n5. **.gitignore**: Gereksiz dosyaları versiyon kontrolüne dahil etmeme\n\nGit ve GitHub ile profesyonel yazılım geliştirme süreçlerini yönetebilirsiniz.',
        excerpt: 'Git versiyon kontrolü ve GitHub ile işbirliği yapma rehberi, temel komutlar ve best practices.',
        slug: 'git-github-versiyon-kontrolu',
        author: 'Halil Yüksel',
        tags: ['git', 'github', 'versiyon-kontrol', 'devops', 'collaboration']
      }
    ];

    const createdPosts = await BlogPost.insertMany(samplePosts);
    
    res.status(201).json({
      message: 'Sample blog posts created successfully',
      count: createdPosts.length,
      posts: createdPosts.map(post => ({
        id: post._id,
        title: post.title,
        slug: post.slug
      }))
    });
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    res.status(500).json({ message: 'Failed to seed blog posts' });
  }
});

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
