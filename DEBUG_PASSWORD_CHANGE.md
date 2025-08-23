# Debug Lỗi Đổi Mật Khẩu

## 🚨 Lỗi hiện tại
```
Backend password change failed: FetchError: [POST] "http://localhost:8092/users/change-password": 400
```

## 🔍 Debug Steps

### 1. Kiểm tra Backend có đang chạy không
```bash
# Kiểm tra port 8092
netstat -an | findstr :8092

# Hoặc test với curl
curl -X GET http://localhost:8092/users/myInfo
```

### 2. Kiểm tra Console Logs
Mở DevTools > Console và tìm các log:
```
🔐 Starting password change process...
🔐 Sending password change request to backend...
📤 Request Body: {...}
🔗 Endpoint: http://localhost:8092/users/change-password
❌ Backend password change failed: {...}
🔍 Error Details: {...}
```

### 3. Kiểm tra Network Tab
Mở DevTools > Network:
- Tìm request `POST /users/change-password`
- Kiểm tra:
  - Request Headers (Authorization token)
  - Request Payload
  - Response Status
  - Response Body

### 4. Test Backend Endpoint trực tiếp
```bash
# Test với Postman hoặc curl
POST http://localhost:8092/users/change-password
Headers:
  Authorization: Bearer {your_jwt_token}
  Content-Type: application/json

Body:
{
  "oldPassword": "currentPassword123",
  "newPassword": "newPassword123",
  "confirmPassword": "newPassword123"
}
```

## 🚨 Các nguyên nhân có thể

### 1. Backend chưa chạy
- Authentication service chưa start
- Port 8092 bị block
- Database connection failed

### 2. JWT Token invalid
- Token expired
- Token format sai
- Token không được gửi

### 3. Validation Error (400)
- Mật khẩu cũ sai
- Mật khẩu mới yếu (< 8 ký tự)
- Mật khẩu xác nhận không khớp
- Mật khẩu mới giống mật khẩu cũ

### 4. CORS Error
- Backend chưa config CORS
- Origin không được allow

## 🔧 Cách khắc phục

### 1. Start Backend
```bash
cd hotel_management/api-gateway/authentication-service
mvn clean install
mvn spring-boot:run
```

### 2. Kiểm tra Logs Backend
Tìm log:
```
User {} requesting password change
```

### 3. Kiểm tra Database
- User có tồn tại không
- Mật khẩu cũ có đúng không

### 4. Test với Postman
- Import collection
- Set environment variables
- Test endpoint step by step

## 📋 Checklist Debug

- [ ] Backend đang chạy trên port 8092
- [ ] JWT token hợp lệ và được gửi
- [ ] Request body đúng format
- [ ] Database connection OK
- [ ] User tồn tại trong database
- [ ] Mật khẩu cũ đúng
- [ ] Mật khẩu mới đủ mạnh
- [ ] Mật khẩu xác nhận khớp

## 🔗 Related Files

- `Frontend_NikkoHotel/pages/user/components/changePwd.vue`
- `hotel_management/api-gateway/authentication-service/UserController.java`
- `hotel_management/api-gateway/authentication-service/UserServiceImpl.java`
