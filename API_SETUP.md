# Cấu hình API Backend Authentication Service

## Environment Variables

Tạo file `.env` trong thư mục gốc của project với các cấu hình sau:

```env
# API Configuration
NUXT_PUBLIC_API_BASE=http://localhost:3000
API_GATEWAY_URL=http://localhost:8092
AUTH_SERVICE_URL=http://localhost:8092
USER_SERVICE_URL=http://localhost:8082

# Google Maps API Key
MAP_API_KEY=your_google_maps_api_key_here
```

## Các thay đổi đã thực hiện

### 1. Cập nhật Types (`types/auth.ts`)
- Thêm `AuthenticationRequest` type cho request đăng nhập
- Thêm `AuthenticationResponse` type cho response từ backend
- Thêm `ApiResponse<T>` type cho wrapper response

### 2. Tạo Auth Service Composable (`composables/useAuthService.ts`)
- Tạo composable mới để quản lý tất cả API calls đến authentication service
- Bao gồm các methods: `login`, `introspect`, `logout`, `refreshToken`
- Sử dụng `$fetch` để gọi trực tiếp đến auth service

### 3. Tạo Auth Composable (`composables/useAuth.ts`)
- Tạo composable chính để quản lý authentication logic
- Bao gồm: `login`, `logout`, `checkToken`, `refreshToken`, `decodeJWT`
- Tự động decode JWT token và lưu thông tin user
- Xử lý remember me functionality

### 4. Cập nhật API User (`api/user.ts`)
- Thay đổi `loginApi` để sử dụng `useAuthService` composable
- Giữ nguyên các API khác cho user service

### 5. Cập nhật Login Page (`pages/auth/login.vue`)
- Sử dụng `useAuth` composable để xử lý đăng nhập
- Cải thiện error handling và user experience
- Hiển thị thông báo thành công/thất bại
- Tự động redirect sau khi đăng nhập thành công

### 6. Cập nhật Auth Middleware (`middleware/auth.js`)
- Sử dụng `useAuth.checkToken()` để kiểm tra token
- Cải thiện error handling và user experience
- Thêm route `/auth/signup` vào public routes

### 7. Tạo Auth Plugin (`plugins/auth.client.ts`)
- Tự động kiểm tra và refresh token mỗi 5 phút
- Xử lý token expiration và auto-logout
- Chỉ chạy trên client side

## API Endpoints

### Authentication Service
- **POST** `/auth/token` - Đăng nhập
  - Request: `{ email: string, password: string }`
  - Response: `{ authenticated: boolean, token: string }`
- **POST** `/auth/introspect` - Kiểm tra token
  - Request: `{ token: string }`
  - Response: Token validation result
- **POST** `/auth/logout` - Đăng xuất
  - Request: `{ token: string }`
- **POST** `/auth/refresh` - Làm mới token
  - Request: `{ token: string }`
  - Response: `{ authenticated: boolean, token: string }`

### Các service khác (giữ nguyên)
- User Service: `/api/v1/user/*`
- Room Service: `/api/v1/room/*`
- Order Service: `/api/v1/order/*`

## Cách sử dụng

### Đăng nhập
```typescript
const { login } = useAuth()
const result = await login({ email: 'user@example.com', password: 'password' }, true)
if (result.success) {
  // Đăng nhập thành công
}
```

### Kiểm tra token
```typescript
const { checkToken } = useAuth()
const isValid = await checkToken()
```

### Đăng xuất
```typescript
const { logout } = useAuth()
await logout()
```

### Làm mới token
```typescript
const { refreshToken } = useAuth()
const newToken = await refreshToken()
```

## Tính năng mới

### 1. Auto Token Management
- Tự động kiểm tra token mỗi 5 phút
- Tự động refresh token khi cần
- Tự động logout khi token không thể refresh

### 2. JWT Token Decoding
- Tự động decode JWT token để lấy thông tin user
- Lưu thông tin user vào store
- Hỗ trợ remember me functionality

### 3. Improved Error Handling
- Xử lý lỗi chi tiết cho từng field
- Hiển thị thông báo lỗi thân thiện
- Tự động clear invalid token

### 4. Better User Experience
- Loading states cho tất cả actions
- Thông báo thành công/thất bại
- Tự động redirect sau khi đăng nhập

## Lưu ý

1. Đảm bảo backend authentication service đang chạy trên port 8092
2. CORS phải được cấu hình đúng trên backend để cho phép frontend gọi API
3. Token từ authentication service sẽ được sử dụng cho các API khác
4. Plugin auth.client.ts chỉ chạy trên client side
5. Tất cả API calls đến authentication service đều thông qua `useAuthService` composable
6. Logic authentication chính được quản lý bởi `useAuth` composable
