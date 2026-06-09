# Authentication Demo với Next.js 16

Demo này bao gồm 2 phương thức authentication:
1. **Auth0** - OAuth2/OpenID Connect provider phổ biến
2. **AWS Cognito** - AWS managed authentication service

## 📁 Cấu trúc Project

```
src/
├── app/
│   ├── api/
│   │   ├── auth0/
│   │   │   ├── [...auth0]/route.ts      # Auth0 handler
│   │   │   └── protected/route.ts        # Protected API với Auth0
│   │   └── cognito/
│   │       └── protected/route.ts       # Protected API với Cognito
│   └── auth/
│       ├── auth0/
│       │   ├── login/page.tsx            # Auth0 login page
│       │   ├── profile/page.tsx         # Auth0 profile page
│       │   └── api-demo/page.tsx         # Auth0 API demo
│       └── cognito/
│           ├── login/page.tsx            # Cognito login page
│           ├── profile/page.tsx          # Cognito profile page
│           └── api-demo/page.tsx         # Cognito API demo
├── lib/
│   ├── auth0/
│   │   └── config.ts                     # Auth0 configuration
│   └── cognito/
│       ├── config.ts                     # Cognito configuration
│       └── client.ts                     # Cognito client functions
```

## 🚀 Setup Auth0

### 1. Tạo Auth0 Application

1. Đăng ký tài khoản tại [auth0.com](https://auth0.com)
2. Tạo một **Regular Web Application**
3. Lấy các thông tin sau:
   - **Domain**: `your-tenant.auth0.com`
   - **Client ID**
   - **Client Secret**

### 2. Cấu hình Auth0 Application

Trong Auth0 Dashboard:
- **Application Type**: Regular Web Application
- **Allowed Callback URLs**: `http://localhost:3000/api/auth0/callback`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

### 3. Tạo Secret Key

```bash
openssl rand -hex 32
```

### 4. Cấu hình Environment Variables

Thêm vào `.env.local`:

```env
# Auth0 Configuration
AUTH0_SECRET='your-secret-from-openssl-rand-hex-32'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-tenant.auth0.com'
AUTH0_CLIENT_ID='your-client-id'
AUTH0_CLIENT_SECRET='your-client-secret'
```

### 5. Test Auth0

1. Chạy dev server: `npm run dev`
2. Truy cập: `http://localhost:3000/auth/auth0/login`
3. Click "Đăng nhập với Auth0"
4. Xem profile tại: `http://localhost:3000/auth/auth0/profile`

## 🔐 Setup AWS Cognito

### 1. Tạo Cognito User Pool

1. Đăng nhập AWS Console
2. Vào **Amazon Cognito** service
3. Click **Create user pool**
4. Chọn **Email** hoặc **Username** làm sign-in option
5. Cấu hình password policy
6. Tạo User Pool

### 2. Tạo App Client

1. Trong User Pool, vào **App integration** → **App clients**
2. Click **Create app client**
3. Chọn **Public client** (hoặc Confidential nếu cần)
4. Lưu **Client ID**

### 3. Cấu hình Environment Variables

Thêm vào `.env.local`:

```env
# AWS Cognito Configuration
NEXT_PUBLIC_COGNITO_REGION='us-east-1'
NEXT_PUBLIC_COGNITO_USER_POOL_ID='us-east-1_xxxxxxxxx'
NEXT_PUBLIC_COGNITO_CLIENT_ID='your-client-id'
COGNITO_CLIENT_SECRET='your-client-secret'  # Chỉ cần nếu dùng Confidential client
```

### 4. Test Cognito

1. Chạy dev server: `npm run dev`
2. Truy cập: `http://localhost:3000/auth/cognito/login`
3. Đăng ký tài khoản mới hoặc đăng nhập
4. Xem profile tại: `http://localhost:3000/auth/cognito/profile`

## 📝 API Routes

### Auth0 Protected API

```typescript
// GET /api/auth0/protected
// Yêu cầu: Auth0 session cookie
// Response: User info từ session
```

### Cognito Protected API

```typescript
// GET /api/cognito/protected
// Yêu cầu: Authorization: Bearer <id_token>
// Response: User info từ JWT token
```

## 🔒 Security Notes

### Auth0
- ✅ Session được lưu trong httpOnly cookie
- ✅ CSRF protection tự động
- ✅ Token refresh tự động

### Cognito
- ⚠️ Trong demo này, token được lưu trong localStorage (không an toàn)
- ✅ Trong production nên lưu token trong httpOnly cookie
- ✅ Cần verify JWT signature với AWS public keys
- ✅ Nên dùng AWS SDK để verify token

## 🛠️ Production Checklist

### Auth0
- [ ] Set `AUTH0_BASE_URL` thành production URL
- [ ] Update callback URLs trong Auth0 Dashboard
- [ ] Enable HTTPS (secure cookies)
- [ ] Review Auth0 rules/policies

### Cognito
- [ ] Implement proper JWT verification với AWS public keys
- [ ] Store tokens trong httpOnly cookies thay vì localStorage
- [ ] Implement token refresh logic
- [ ] Add proper error handling
- [ ] Enable MFA nếu cần

## 📚 Tài liệu tham khảo

- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0)
- [AWS Cognito Documentation](https://docs.aws.amazon.com/cognito/)
- [Next.js Authentication](https://nextjs.org/docs/authentication)

## 🐛 Troubleshooting

### Auth0
- **"Invalid state"**: Kiểm tra `AUTH0_SECRET` và callback URLs
- **"Missing AUTH0_SECRET"**: Đảm bảo đã set trong `.env.local`
- **Cookie không được set**: Kiểm tra `AUTH0_BASE_URL` và domain

### Cognito
- **"User does not exist"**: Tạo user trong Cognito User Pool trước
- **"Invalid token"**: Kiểm tra User Pool ID và Client ID
- **CORS errors**: Cấu hình CORS trong Cognito App Client settings

## 📄 License

MIT
