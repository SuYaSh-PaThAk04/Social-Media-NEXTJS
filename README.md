# 🌐 Social Media App

A full-stack, production-ready real-time social media web application with advanced features including Redis caching, rate limiting, load balancing, and real-time notifications.

## 🚀 Live Demo

- **Frontend (Next.js)**: [https://social-media-nextjs-xi.vercel.app](https://social-media-nextjs-xi.vercel.app)
- **Backend (NestJS + MongoDB)**: [https://cleverbook.onrender.com](https://cleverbook.onrender.com)

---

## 📦 Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React Context API](https://reactjs.org/docs/context.html) - State management
- [Socket.IO Client](https://socket.io/docs/v4/client-api/) - Real-time communication
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
- [React Query](https://tanstack.com/query/latest) - Server state management
- [Zod](https://zod.dev/) - Schema validation

### Backend
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [Redis](https://redis.io/) - In-memory data store for caching & sessions
- [Socket.IO](https://socket.io/) - WebSocket library for real-time features
- [Bull Queue](https://docs.nestjs.com/techniques/queues) - Redis-based job queue
- [Passport JWT](https://www.passportjs.org/) - Authentication middleware
- [Helmet](https://helmetjs.github.io/) - Security headers
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit) - Rate limiting

### Infrastructure & DevOps
- [Docker](https://www.docker.com/) - Containerization
- [Docker Compose](https://docs.docker.com/compose/) - Multi-container orchestration
- [Nginx](https://www.nginx.com/) - Load balancer & reverse proxy
- [PM2](https://pm2.keymetrics.io/) - Process manager
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline

---

## 🔑 Features

### Core Features
- ✅ User registration and login with email verification
- ✅ JWT-based authentication with refresh tokens
- ✅ Follow/unfollow users with mutual followers detection
- ✅ Real-time follow notifications via WebSockets
- ✅ User profile management with avatar uploads
- ✅ Post creation, editing, and deletion
- ✅ Like and comment on posts
- ✅ User feed with pagination

### Advanced Features
- 🚀 **Redis Caching**: Session management, API response caching, and frequent data caching
- ⚡ **Rate Limiting**: IP-based and user-based rate limiting to prevent abuse
- 🔄 **Load Balancing**: Nginx-based load balancing across multiple backend instances
- 📊 **Queue Management**: Background job processing for emails, notifications, and media processing
- 🔐 **Security**: Helmet headers, CORS configuration, input validation, and SQL injection prevention
- 📈 **Monitoring**: Health checks, performance metrics, and error tracking
- 🎯 **WebSocket Scaling**: Redis adapter for Socket.IO to support horizontal scaling
- 💾 **Database Optimization**: Indexed queries, connection pooling, and query optimization

---

## 🏗️ Architecture Overview

```
┌─────────────┐
│   Nginx     │ ← Load Balancer
│ (Port 80)   │
└──────┬──────┘
       │
   ┌───┴───┐
   │       │
┌──▼───┐ ┌─▼────┐
│ App  │ │ App  │ ← NestJS Instances
│ :3001│ │ :3002│
└──┬───┘ └─┬────┘
   │       │
   └───┬───┘
       │
   ┌───┴────────────┐
   │                │
┌──▼─────┐    ┌────▼───┐
│ Redis  │    │MongoDB │
│ :6379  │    │ :27017 │
└────────┘    └────────┘
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18.x
- Docker & Docker Compose
- MongoDB (local or Atlas)
- Redis (local or cloud)

### 1. Clone the Repositories

```bash
# Frontend
git clone https://github.com/yourusername/social-media-nextjs
cd social-media-nextjs

# Backend
git clone https://github.com/yourusername/social-media-nestjs
cd social-media-nestjs
```

### 2. Environment Variables

#### Backend `.env`
```env
# Application
NODE_ENV=production
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/social_media
MONGODB_TEST_URI=mongodb://localhost:27017/social_media_test

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_DB=0

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=https://social-media-nextjs-xi.vercel.app

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AWS S3 (Optional for file storage)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```

#### Frontend `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=https://cleverbook.onrender.com
NEXT_PUBLIC_WS_URL=wss://cleverbook.onrender.com
NEXT_PUBLIC_APP_NAME=Social Media App
NEXT_PUBLIC_APP_URL=https://social-media-nextjs-xi.vercel.app

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Installation

#### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Manual Installation

**Backend:**
```bash
cd social-media-nestjs
npm install
npm run build
npm run start:prod
```

**Frontend:**
```bash
cd social-media-nextjs
npm install
npm run build
npm start
```

---

## ⚙️ Advanced Configuration

### Redis Configuration

The app uses Redis for multiple purposes:

1. **Session Storage**: User sessions and JWT token blacklisting
2. **Caching**: API responses, user profiles, and feed data
3. **Rate Limiting**: Track request counts per IP/user
4. **Socket.IO Adapter**: Scale WebSockets across multiple instances
5. **Bull Queues**: Background job processing

```typescript
// Redis configuration in NestJS
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

CacheModule.register({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  ttl: 300, // 5 minutes default
});
```

### Rate Limiting

Multiple layers of rate limiting:

```typescript
// Global rate limiting
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
  ],
})

// Endpoint-specific limits
@Throttle(10, 60) // 10 requests per minute
@Post('login')
async login() { }

@Throttle(5, 60) // 5 requests per minute
@Post('register')
async register() { }
```

### Load Balancing with Nginx

```nginx
upstream backend {
    least_conn; # Load balancing method
    
    server app1:3000 max_fails=3 fail_timeout=30s;
    server app2:3000 max_fails=3 fail_timeout=30s;
    server app3:3000 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Socket.IO with Redis Adapter

```typescript
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: 'redis://localhost:6379' });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
```

---

## 📁 Project Structure

### Backend (NestJS)
```
src/
├── auth/
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── refresh-jwt.guard.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── refresh-jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── posts/
│   ├── dto/
│   ├── entities/
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── notifications/
│   ├── notifications.gateway.ts
│   ├── notifications.service.ts
│   └── notifications.module.ts
├── cache/
│   ├── cache.service.ts
│   └── cache.module.ts
├── queue/
│   ├── processors/
│   │   ├── email.processor.ts
│   │   └── notification.processor.ts
│   ├── queue.service.ts
│   └── queue.module.ts
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   │   ├── cache.interceptor.ts
│   │   └── logging.interceptor.ts
│   ├── pipes/
│   └── middlewares/
├── config/
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── app.config.ts
├── health/
│   ├── health.controller.ts
│   └── health.module.ts
├── app.module.ts
└── main.ts
```

### Frontend (Next.js)
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── feed/
│   │   ├── profile/
│   │   └── notifications/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   ├── feed/
│   ├── notifications/
│   └── profile/
├── context/
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
│   └── SocketContext.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useSocket.ts
│   └── useInfiniteScroll.ts
├── services/
│   ├── api/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── post.service.ts
│   └── socket/
│       └── socket.service.ts
├── lib/
│   ├── axios.ts
│   └── utils.ts
├── types/
│   ├── user.types.ts
│   └── post.types.ts
└── middleware.ts
```

---

## 🔔 Real-Time Features

### Follow Notifications
When User A follows User B:
1. Backend validates the follow action
2. Redis cache is updated with new follower count
3. WebSocket event is emitted to User B's connected clients
4. Queue job is created for email notification (if enabled)
5. Frontend displays real-time toast notification

### Implementation Flow
```typescript
// Backend - notifications.gateway.ts
@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer() server: Server;

  async sendFollowNotification(userId: string, follower: User) {
    this.server.to(userId).emit('follow-notification', {
      type: 'follow',
      follower: {
        id: follower.id,
        username: follower.username,
        avatar: follower.avatar,
      },
      timestamp: new Date(),
    });
  }
}

// Frontend - useSocket.ts
useEffect(() => {
  socket.on('follow-notification', (data) => {
    toast.success(`${data.follower.username} started following you!`);
    queryClient.invalidateQueries(['notifications']);
  });
}, []);
```

---

## 🧪 Testing

### Backend Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch
```

### Test Scenarios
✅ User registration and login  
✅ JWT token validation  
✅ Follow/unfollow functionality  
✅ Real-time notifications delivery  
✅ Rate limiting enforcement  
✅ Redis cache hit/miss  
✅ Load balancer health checks  
✅ WebSocket connection handling  

---

## 📊 Monitoring & Observability

### Health Checks
```bash
# Application health
GET /health

# Database health
GET /health/db

# Redis health
GET /health/redis
```

### Metrics Endpoints
```bash
# Prometheus metrics
GET /metrics

# Custom metrics
GET /api/stats
```

---

## 🚀 Deployment

### Docker Deployment
```bash
# Build images
docker-compose build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Scale backend instances
docker-compose up -d --scale backend=3
```

### Kubernetes Deployment
```bash
# Apply configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build and push Docker image
        run: |
          docker build -t app:latest .
          docker push registry/app:latest
      - name: Deploy to server
        run: |
          ssh user@server 'docker-compose pull && docker-compose up -d'
```

---

## 🔐 Security Best Practices

- ✅ HTTPS everywhere
- ✅ JWT tokens with expiration
- ✅ Password hashing with bcrypt
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Rate limiting on sensitive endpoints
- ✅ Input validation and sanitization
- ✅ Security headers via Helmet
- ✅ CORS configuration
- ✅ Environment variable protection

---

## 📈 Performance Optimizations

- ⚡ Redis caching for frequently accessed data
- ⚡ Database query optimization with indexes
- ⚡ Image optimization and CDN integration
- ⚡ Code splitting and lazy loading
- ⚡ Server-side rendering (SSR) with Next.js
- ⚡ Connection pooling for database
- ⚡ Gzip compression
- ⚡ Static asset caching

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation
- Use conventional commits

---

## 📝 API Documentation

Access the Swagger documentation at:
- Local: `http://localhost:3000/api/docs`
- Production: `https://cleverbook.onrender.com/api/docs`

---

## 🐛 Known Issues

- [ ] WebSocket reconnection on network interruption
- [ ] Rate limiting bypass with VPN rotation (monitoring)
- [ ] Image upload size optimization needed

---

## 🗺️ Roadmap

- [ ] Direct messaging feature
- [ ] Story/Status updates
- [ ] Video upload support
- [ ] Advanced search with Elasticsearch
- [ ] Mobile app (React Native)
- [ ] AI-powered content recommendations
- [ ] Multi-language support
- [ ] Dark mode

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact & Support

- **Developer**: Your Name
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- **LinkedIn**: [Your Profile](https://linkedin.com/in/yourprofile)
- **Discord**: [Join our community](https://discord.gg/yourserver)

For bugs and feature requests, please [open an issue](https://github.com/yourusername/social-media-app/issues).

---

## 🙏 Acknowledgments

- [NestJS Community](https://nestjs.com/)
- [Next.js Team](https://nextjs.org/)
- [Socket.IO Contributors](https://socket.io/)
- [Redis Labs](https://redis.io/)
- All open-source contributors

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/social-media-app&type=Date)](https://star-history.com/#yourusername/social-media-app&Date)

---

**Made with ❤️ by [Your Name](https://github.com/yourusername)**
