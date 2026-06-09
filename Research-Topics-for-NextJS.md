# Research Topics for Next.js 16 Frontend Project

**Created:** Dec 22, 2025
**Author:** Trương Anh Khoa

---

# 1. Server-Side Rendering (SSR) & Static Site Generation (SSG) ⭐ Quan trọng nhất

## Lý do

SEO tốt cho các trang bài viết, taxonomy, search results.

## Nội dung cần Research

### SSR

* SSR động cho bài viết
* SSR cho search results
* Dynamic metadata

### SSG

* SSG cho các trang tĩnh:

  * Homepage
  * Categories
  * Landing Pages

### Dynamic Routes

* Pre-render dynamic routes theo slug
* `generateStaticParams()`

### ISR (Incremental Static Regeneration)

* `revalidate`
* Rebuild nội dung theo thời gian

### Cache Components (Next.js 16)

* `use cache`
* Partial Pre-Rendering (PPR)

### PPR (Partial Pre-Rendering)

* Kết hợp SSG và SSR
* Navigation tức thì
* Streaming UI

## Use Cases

### Trang bài viết

* SSR với metadata động
* Hoặc Cache Components + PPR

### Trang Category/Taxonomy

* SSG + Revalidate

### Search Results

* SSR với query params

### Navigation

* Cache Components để đạt tốc độ chuyển trang gần như tức thì

---

# 2. App Router vs Pages Router

## Lý do

Quyết định kiến trúc dự án.

## Nội dung cần Research

### App Router (Khuyến nghị)

* React Server Components
* React 19 Integration
* Built-in Streaming
* Nested Layouts

### Pages Router

* pages/
* Legacy approach
* Backward compatibility

### Routing Features

* Route Groups
* Dynamic Routes
* Catch-all Routes
* Parallel Routes
* Intercepting Routes

### UI Handling

* Layouts
* Templates
* Loading UI
* Error Boundaries

### Next.js 16 Features

* Cache Components
* Partial Pre-Rendering (PPR)

## Khuyến nghị

Sử dụng **App Router** cho toàn bộ dự án mới vì:

* SEO tốt hơn
* Hiệu năng tốt hơn
* Dễ maintain
* Hỗ trợ React 19
* Hỗ trợ PPR

---

# 3. API Routes & Client-Side Data Fetching

## Lý do

Kết nối Laravel API Backend.

## Nội dung cần Research

### Fetch API

* fetch()
* Data Cache
* Request Memoization

### Client-side Fetching

* SWR
* React Query (TanStack Query)

### API Routes

* `/api/*`
* Proxy API
* Transform dữ liệu

### React 19

* `use()` Hook

### Server Actions

* Form submit
* Mutations

### Cache Components

* `use cache`

## Use Cases

### Laravel APIs

* `/api/posts`
* `/api/categories`
* `/api/ai/chat`

### Authentication

* Login
* Logout
* Refresh token

### Chatbot

* Streaming response

---

# 4. Authentication & Authorization

## Lý do

Membership system và kiểm soát truy cập.

## Nội dung cần Research

### Authentication

* NextAuth.js / Auth.js
* JWT
* Laravel Sanctum

### Authorization

* Role-based Access
* Membership Level

### Route Protection

* proxy.ts (Next.js 16)
* middleware.ts

### Session Management

* Server-side session checks
* Client-side auth state

## Use Cases

### Protected Pages

* Dashboard
* My Page
* Profile

### Membership

* Premium content
* Subscription validation

### AI Features

* Token quota
* Permission checks

---

# 5. Real-Time Features (AI Chatbot)

## Lý do

Chatbot ở góc trái dưới màn hình.

## Nội dung cần Research

### Server-Sent Events (SSE)

* Streaming response
* Laravel → Next.js

### WebSocket

* Socket.io
* Native WebSocket

### React Integration

* Streaming fetch
* Real-time state updates

### UX

* Optimistic UI
* Typing indicators

## Use Cases

### AI Chatbot

* Streaming responses từ AWS Bedrock API thông qua Laravel

### Notifications

* Realtime updates
* System messages

---

# 6. SEO Optimization

## Lý do

Yêu cầu SEO tốt.

## Nội dung cần Research

### Metadata API

* Metadata object
* Dynamic Metadata

### generateMetadata()

### Structured Data

* JSON-LD
* Schema.org

### Social Sharing

* Open Graph
* Twitter Cards

### SEO Files

* sitemap.ts
* robots.ts

### URLs

* Canonical URLs

## Use Cases

### Article Pages

* Dynamic title
* Dynamic description

### Structured Data

* Article
* Organization
* BreadcrumbList

---

# 7. Internationalization (i18n)

## Lý do

Hỗ trợ nhiều ngôn ngữ.

## Ngôn ngữ dự kiến

* Japanese (JP)
* English (EN)
* Vietnamese (VN)

## Nội dung cần Research

### Libraries

* next-intl
* next-i18next

### Routing

* `[locale]`

### Language Detection

* Server-side detection
* Browser detection

### Translation Management

* JSON files
* CMS-based translations

## Use Cases

```text
/jp/articles/...
/en/articles/...
/vn/articles/...
```

* Language Switcher
* SEO theo từng locale
* Nội dung giữa các ngôn ngữ có thể khác nhau

---

# 8. State Management

## Lý do

Quản lý state toàn ứng dụng.

## Nội dung cần Research

### Context API

### Zustand

* Lightweight
* Persistence

### Jotai

### Redux Toolkit

* Khi state phức tạp

### State Types

* Server State
* Client State

## Use Cases

### User State

* Login
* Membership

### Bookmarks

### Followed Keywords

### UI State

* Sidebar
* Modal
* Theme

### AI Token Quota

---

# 9. Form Handling & Validation

## Lý do

Quản lý form hiệu quả.

## Nội dung cần Research

### React Hook Form

### Zod

* Type-safe validation

### Server Actions

### Error Handling

## Use Cases

### Authentication

* Login
* Register

### User Settings

### Search

### Contact Form

---

# 10. Image Optimization & Media Handling

## Lý do

Tối ưu media từ S3/CDN.

## Nội dung cần Research

### next/image

### next/font

### External Images

* AWS S3
* CloudFront

### Optimization

* Lazy Loading
* Responsive Images
* Blur Placeholder

## Use Cases

### Article Images

### Media Gallery

### User Avatar

---

# 11. Caching Strategies

## Lý do

Giảm tải Laravel API và tăng hiệu năng.

## Nội dung cần Research

### Next.js Data Cache

### Full Route Cache

### Request Memoization

### Cache Components

* use cache

### Manual Cache

* unstable_cache()

### Tag-based Cache

* cacheTag()
* revalidateTag()

### Time-based Cache

* cacheLife()

### CDN Cache

* CloudFront

## Use Cases

### Articles

* Revalidate mỗi giờ

### API Responses

### Search Results

* Cache ngắn hạn

---

# 12. Error Handling & Loading States

## Lý do

Cải thiện UX.

## Nội dung cần Research

### Error Handling

* error.tsx
* Global Error Handling

### Loading UI

* loading.tsx

### Not Found

* not-found.tsx

### Monitoring

* Sentry

## Use Cases

### Laravel API Errors

### Network Errors

### 404 Articles

---

# 13. Performance Optimization

## Lý do

Tăng tốc độ tải trang và SEO.

## Nội dung cần Research

### Turbopack

* Default Bundler
* Build nhanh hơn

### Code Splitting

### Dynamic Import

### Bundle Analysis

### Web Vitals

### Tree Shaking

### Font Optimization

### PPR

## Use Cases

### Lazy Load Chatbot

### Lazy Load Charts

### Bundle Size Optimization

---

# 14. TypeScript Integration

## Lý do

Type Safety với Laravel API.

## Nội dung cần Research

### API Types

### Shared Types

### Zod Runtime Validation

### Type-safe Components

## Use Cases

### Laravel API Integration

### Forms

### Components

---

# 15. Testing

## Lý do

Đảm bảo chất lượng phần mềm.

## Nội dung cần Research

### Unit Testing

* Jest
* React Testing Library

### E2E Testing

* Playwright
* Cypress

### API Testing

### SSR Testing

## Use Cases

### Component Tests

### Integration Tests

### Critical User Flows

---

# 16. Deployment & Build Optimization

## Lý do

Deploy Production trên AWS EC2.

## Nội dung cần Research

### Build Optimization

* Turbopack
* Build Cache

### Environment Variables

* .env.local
* .env.production

### Standalone Output

### Docker

### CI/CD

### Production Debugging

## Use Cases

### EC2 Deployment

### Docker Deployment

### GitHub Actions

### Build Cache Optimization

---

# 17. Tích Hợp Tailwind CSS vào Next.js 16

## Lý do

Xây dựng UI nhanh và hiệu quả.

## Nội dung cần Research

### Tailwind CSS v4.1

### Setup với App Router

### CSS Variables

### @theme Directive

### P3 Colors

### Container Queries

### CSS Grid Utilities

### Dark Mode

### Transitions & Animations

### Cascade Layers

### Logical Properties (RTL/LTR)

### Production Optimization

### Turbopack Integration

## Use Cases

### Responsive Design

### Dark Mode

### Design System

### Custom Theme

### Component-level Responsive Design

### Visual Effects

* Gradient
* 3D Transform

---

# Tài Liệu Tham Khảo Chính

## Next.js

* https://nextjs.org/docs
* https://nextjs.org/blog/next-16
* https://nextjs.org/docs/app
* https://nextjs.org/docs/app/building-your-application/data-fetching
* https://nextjs.org/docs/app/building-your-application/caching/cache-components
* https://nextjs.org/docs/app/api-reference/next-config-js/turbopack
* https://nextjs.org/docs/app/api-reference/file-conventions/proxy
* https://nextjs.org/docs/app/building-your-application/authentication

## SEO

* https://nextjs.org/learn/seo/introduction-to-seo

## Tailwind CSS

* https://tailwindcss.com/
* https://tailwindcss.com/docs

---

# Lưu Ý Đặc Biệt Cho Dự Án

## Công Nghệ

| Thành phần | Công nghệ        |
| ---------- | ---------------- |
| Frontend   | Next.js 16       |
| Router     | App Router       |
| React      | React 19         |
| CSS        | Tailwind CSS v4  |
| Backend    | Laravel API      |
| Build Tool | Turbopack        |
| Deployment | AWS EC2 + Docker |
| CDN        | CloudFront       |
| Storage    | AWS S3           |

## Kiến Trúc

### Frontend

* Chỉ xử lý UI/UX
* Không chứa business logic

### Backend

* Laravel xử lý toàn bộ business logic
* Cung cấp API cho Frontend

## SEO Strategy

### Dynamic Content

* SSR hoặc Cache Components + PPR

### Static Content

* SSG + Revalidate

## Chatbot

* Streaming từ Laravel
* Realtime UI

## Membership

* Kiểm tra quyền ở server-side

## Multi-language

* Nội dung từng locale có thể khác nhau

## Network Boundaries

* Ưu tiên `proxy.ts` (Next.js 16)
* Chỉ dùng `middleware.ts` khi cần

---

# Đề Xuất Bổ Sung (Ngoài Danh Sách Hiện Tại)

## AWS Integration

* CloudFront
* S3
* Secrets Manager
* Parameter Store

## Observability

* Sentry
* OpenTelemetry
* Logging Strategy

## Security

* CSP
* XSS Protection
* CSRF
* Rate Limiting

## Accessibility (A11y)

* WCAG 2.2
* Keyboard Navigation
* Screen Reader Support

## CMS Integration

* Preview Mode
* Draft Content
* Content Versioning

## AI Features

* Streaming UI
* Prompt Management
* Token Tracking
* Conversation History
