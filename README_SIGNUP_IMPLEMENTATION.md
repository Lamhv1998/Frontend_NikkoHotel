# Hướng Dẫn Chức Năng Đăng Ký - Nikko Hotel Frontend

## Tổng Quan

Chức năng đăng ký đã được hoàn thiện để tích hợp với backend API. Các thay đổi chính bao gồm:

## 1. Cập Nhật Types (types/auth.ts)

### UserCreationRequest (Backend API)
```typescript
export type UserCreationRequest = {
  email: string
  password: string
  phone?: string
}
```

### ExtendedUserCreationRequest (Frontend Form)
```typescript
export type ExtendedUserCreationRequest = {
  email: string
  password: string
  name: string
  phone: string
  birthday: string
  address: Address
}
```

## 2. Cập Nhật useAuth Composable

### Endpoint API
- **Đăng ký**: `POST /users` (thay vì `/auth/register`)
- **Đăng nhập**: `POST /auth/token` (thay vì `/auth/authenticate`)

### Hàm signupUser
```typescript
const signupUser = async (userData: UserCreationRequest): Promise<{ success: boolean; message: string }> => {
  try {
    const config = useRuntimeConfig()
    const authServiceUrl = config.public.authServiceUrl

    const response = await $fetch<ApiResponse<UserResponse>>(`${authServiceUrl}/users`, {
      method: 'POST',
      body: userData
    })

    if (response?.result) {
      return { success: true, message: 'Đăng ký thành công!' }
    } else {
      return { success: false, message: response?.message || 'Đăng ký thất bại' }
    }
  } catch (error: any) {
    // Xử lý lỗi...
  }
}
```

## 3. Cập Nhật API User

### checkEmailApi
```typescript
checkEmailApi: <T = any>(options: { body: { email: string }, immediate?: boolean, watch?: boolean, onResponse?: Function } & UseFetchOptions<T>) => {
  const { pending, refresh } = useHttp.post('/users/check-email-exists', { 
    ...options, 
    body: options.body,
    immediate: options.immediate ?? true,
    watch: options.watch ?? false,
    onResponse: options.onResponse
  })
  
  return { pending, refresh }
}
```

## 4. Cập Nhật Trang Đăng Ký

### Xử Lý Dữ Liệu
```typescript
// Chuyển đổi dữ liệu để khớp với backend API
const signupData = {
  email: formData.email,
  password: formData.password,
  phone: formData.phone
}

const result = await signupUser(signupData)
```

### Validation Schema
- **Bước 1**: Email, mật khẩu, xác nhận mật khẩu
- **Bước 2**: Họ tên, số điện thoại, ngày sinh, địa chỉ, đồng ý điều khoản

## 5. Cấu Trúc Backend API

### Endpoints
- `POST /users` - Tạo user mới
- `POST /auth/token` - Đăng nhập
- `GET /users/myInfo` - Lấy thông tin user
- `POST /users/change-password` - Đổi mật khẩu

### Response Format
```typescript
export type ApiResponse<T> = {
  code: number
  message?: string
  result: T
}
```

## 6. Cách Sử Dụng

### 1. Khởi tạo form
```typescript
const formData = reactive<ExtendedUserCreationRequest>({
  email: '',
  password: '',
  name: '',
  phone: '',
  birthday: '',
  address: {
    city: '',
    district: '',
    detail: ''
  }
})
```

### 2. Kiểm tra email
```typescript
const { pending: cePending, refresh: ceRefresh } = await checkEmailApi({
  body: { email: formData.email },
  immediate: false,
  watch: false,
  onResponse({ response }: any) {
    if (response.status === 200) {
      if (response._data.result.isEmailExists) {
        formRefs.value?.setFieldError('email', 'Email đã tồn tại')
        return
      }
      progress.value = 1
    }
  }
})
```

### 3. Gửi đăng ký
```typescript
const result = await signupUser({
  email: formData.email,
  password: formData.password,
  phone: formData.phone
})
```

## 7. Xử Lý Lỗi

### Các Loại Lỗi
- **400**: Dữ liệu không hợp lệ
- **409**: Email đã được sử dụng
- **500**: Lỗi máy chủ

### Hiển Thị Thông Báo
```typescript
if (result.success) {
  $Swal?.fire({
    title: 'Đăng ký thành công!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Tiếp tục',
    confirmButtonColor: styleStore.confirmButtonColor,
    willClose: async () => {
      await navigateTo('/auth/login')
    }
  })
} else {
  $Swal?.fire({
    title: 'Đăng ký thất bại!',
    text: result.message,
    icon: 'error',
    confirmButtonText: 'Xác nhận',
    confirmButtonColor: styleStore.confirmButtonColor
  })
}
```

## 8. Lưu Ý Quan Trọng

1. **Backend chỉ nhận**: `email`, `password`, `phone`
2. **Frontend thu thập thêm**: `name`, `birthday`, `address` (có thể lưu sau khi tạo user)
3. **API endpoint**: `/users` thay vì `/auth/register`
4. **Response format**: Sử dụng `ApiResponse<T>` wrapper
5. **Error handling**: Xử lý các HTTP status code cụ thể

## 9. Testing

### Test Cases
1. Đăng ký với email hợp lệ
2. Đăng ký với email đã tồn tại
3. Đăng ký với dữ liệu không hợp lệ
4. Kiểm tra validation form
5. Kiểm tra chuyển hướng sau đăng ký thành công

### API Testing
```bash
# Test đăng ký
curl -X POST http://localhost:8092/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","phone":"0123456789"}'

# Test kiểm tra email
curl -X POST http://localhost:8092/users/check-email-exists \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 10. Kết Luận

Chức năng đăng ký đã được hoàn thiện và tích hợp đầy đủ với backend API. Các thay đổi chính:

- ✅ Cập nhật types để khớp với backend
- ✅ Sửa endpoint API đúng
- ✅ Xử lý response format chuẩn
- ✅ Validation form 2 bước
- ✅ Error handling đầy đủ
- ✅ UI/UX thân thiện người dùng

Chức năng sẵn sàng để sử dụng trong production.
