# Hướng dẫn sử dụng API Authentication và User Management

## Cấu hình môi trường

Tạo file `.env` trong thư mục gốc với nội dung sau:

```env
# API Gateway Service (Authentication & User)
API_GATEWAY_URL=http://localhost:8092
AUTH_SERVICE_URL=http://localhost:8092
USER_SERVICE_URL=http://localhost:8092

# Customer Management Service
CUSTOMER_SERVICE_URL=http://localhost:8099

# Other configurations
NUXT_PUBLIC_API_BASE=http://localhost:3000
MAP_API_KEY=your_map_api_key_here
```

## Luồng hoạt động

### 1. Đăng nhập (Login)
- **Endpoint**: `POST /auth/token` (localhost:8092)
- **Body**: `{ email: string, password: string }`
- **Response**: JWT token
- **Lưu trữ**: Token được lưu vào localStorage và auth store

### 2. Lấy thông tin user
- **Endpoint**: `GET /users/myInfo` (localhost:8092)
- **Headers**: `Authorization: Bearer {token}`
- **Response**: Thông tin user (id, email, phone, name, etc.)
- **Lưu trữ**: Thông tin user được lưu vào auth store

### 3. Lấy customer profile
- **Endpoint**: `GET /customers/profile/{userId}` (localhost:8099)
- **Response**: Thông tin customer profile
- **Lưu trữ**: Customer profile được lưu vào auth store

### 4. Đăng ký (Signup)
- **Endpoint**: `POST /users` (localhost:8092)
- **Body**: UserCreationRequest
- **Response**: UserResponse
- **Tự động**: Tạo customer profile trong customer service

### 5. Đăng xuất (Logout)
- **Endpoint**: `POST /auth/logout` (localhost:8092)
- **Body**: `{ token: string }`
- **Xóa**: Token và user info khỏi store và localStorage

## Sử dụng trong code

### Composable useAuth
```typescript
const { loginUser, signupUser, logoutUser, checkAuth } = useAuth()

// Đăng nhập
const result = await loginUser({ email: 'user@example.com', password: 'password' })

// Đăng ký
const result = await signupUser(userData)

// Đăng xuất
const result = await logoutUser()

// Kiểm tra auth
await checkAuth()
```

### Auth Store
```typescript
const authStore = useAuthStore()

// Truy cập thông tin
const user = authStore.user
const customerProfile = authStore.customerProfile
const token = authStore.token
const isAuthenticated = authStore.isAuthenticated
```

## Cấu trúc dữ liệu

### AuthenticationRequest
```typescript
{
  email: string
  password: string
}
```

### UserResponse
```typescript
{
  _id: string
  name: string
  email: string
  phone: string
  birthday: string
  address: Address
  createdAt: string
  updatedAt: string
}
```

### CustomerDto
```typescript
{
  customerId: string
  userId: string
  name: string
  email: string
  phone: string
  birthday: string
  address: Address
  avatar?: string
  createdAt: string
  updatedAt: string
}
```

## Lưu ý

1. Tất cả API calls đều sử dụng `$fetch` từ Nuxt 3
2. Token được tự động thêm vào headers cho các API calls cần authentication
3. Customer profile được tự động tạo khi đăng ký user mới
4. Thông tin user và customer được lưu trữ trong Pinia store với persistence
5. Middleware auth được sử dụng để bảo vệ các trang cần authentication
