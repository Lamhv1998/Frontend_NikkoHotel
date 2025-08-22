# Hướng dẫn triển khai chức năng đăng nhập Google

## Tổng quan
Chức năng đăng nhập Google đã được triển khai trong dự án Nuxt3 với đầy đủ logging và xử lý lỗi.

## Các file đã tạo/cập nhật

### 1. Composable: `composables/useGoogleAuth.ts`
- Quản lý toàn bộ logic đăng nhập Google
- Xử lý OAuth flow và callback
- Tích hợp với auth store và user management

### 2. Component UI: `components/UI/UIGoogleButton.vue`
- Nút đăng nhập Google với thiết kế đẹp
- Hỗ trợ loading state và disabled state
- Icon Google chính thức

### 3. Trang đăng nhập: `pages/auth/login.vue`
- Đã tích hợp nút đăng nhập Google
- Xử lý callback từ Google OAuth
- Kiểm tra và xử lý code từ URL

## Cách hoạt động

### 1. Khởi tạo
```typescript
const { googleSignIn, checkGoogleCallback } = useGoogleAuth()
```

### 2. Xử lý đăng nhập
```typescript
const handleGoogleLogin = async () => {
  if (googlePending.value) return
  
  googlePending.value = true
  
  try {
    console.log('Initiating Google login...')
    await googleSignIn()
  } catch (error) {
    console.error('Google login error:', error)
    // Hiển thị thông báo lỗi
  } finally {
    googlePending.value = false
  }
}
```

### 3. Kiểm tra callback
```typescript
onMounted(() => {
  // Kiểm tra Google OAuth callback
  console.log('Checking for Google OAuth callback...')
  checkGoogleCallback()
})
```

## Flow hoạt động

1. **User click nút Google**: Chuyển hướng đến `http://localhost:8092/login/oauth2/authorization/google`
2. **Google xác thực**: User đăng nhập Google và được chuyển hướng về với code
3. **Xử lý callback**: Component tự động phát hiện code và gửi đến backend
4. **Backend xác thực**: Backend xác thực code và trả về token
5. **Lưu thông tin**: Token được lưu vào store, user info được fetch
6. **Chuyển hướng**: User được chuyển đến dashboard

## Logging

Chức năng có đầy đủ logging ở mỗi bước:
- Khởi tạo OAuth
- Chuyển hướng đến Google
- Nhận callback code
- Gửi code đến backend
- Nhận response từ backend
- Lưu token và user info
- Xử lý lỗi

## Xử lý lỗi

- **Lỗi chuyển hướng**: Hiển thị thông báo và cho phép thử lại
- **Lỗi callback**: Hiển thị thông báo và chuyển hướng về trang đăng nhập
- **Lỗi backend**: Hiển thị message từ backend nếu có
- **Lỗi network**: Thông báo lỗi kết nối

## Cấu hình backend

Backend cần có các endpoint:
- `GET /login/oauth2/authorization/google` - Khởi tạo OAuth flow
- `POST /auth/callback` - Xử lý callback với code

## Lưu ý

1. **URL backend**: Hiện tại hardcode `http://localhost:8092`, cần cập nhật cho production
2. **CORS**: Backend cần cho phép CORS từ frontend
3. **Error handling**: Tất cả lỗi đều được log và hiển thị cho user
4. **State management**: Tích hợp hoàn toàn với auth store hiện tại

## Testing

1. Click nút "Đăng nhập bằng Google"
2. Kiểm tra console log để theo dõi flow
3. Kiểm tra redirect đến Google OAuth
4. Kiểm tra callback và xử lý response
5. Kiểm tra lưu token và user info
6. Kiểm tra chuyển hướng sau khi đăng nhập thành công
