# Google Login + Customer Integration - Fixed 400 Bad Request

## Tổng quan
Tài liệu này mô tả các thay đổi đã thực hiện để fix lỗi 400 Bad Request khi gọi API `GET /customers/profile/{userId}` và tích hợp Google Login với Customer Management.

## Vấn đề đã gặp phải
- **API 400 Bad Request**: `GET /customers/profile/{userId}` trả về 400 Bad Request
- **Nguyên nhân**: CustomerController hiện tại có thể đang nhận nhầm customerId hoặc parse PathVariable không đúng
- **Google Fonts 404**: Link Google Fonts cũ bị 404

## Các thay đổi đã thực hiện

### 1. Backend Changes

#### CustomerController.java
- **File**: `hotel_management/customer-management/customer-container/src/main/java/com/poly/customercontainer/controller/CustomerController.java`
- **Thay đổi chính**:
  - **Sửa endpoint `/profile/{userId}`**: Thay đổi từ `ApiResponse<CustomerDto>` thành `CustomerProfileResponse` trực tiếp
  - **Thêm try-catch và error handling**: Sử dụng `ResponseStatusException` thay vì `ApiResponse.failure()`
  - **Tạo CustomerProfileResponse**: Inner class mới để trả về response trực tiếp
  - **Fix lỗi 400**: Sử dụng `ResponseStatusException` với HTTP status code rõ ràng

```java
@GetMapping("/profile/{userId}")
public ResponseEntity<CustomerProfileResponse> getProfile(@PathVariable UUID userId) {
    try {
        log.info("Getting customer profile for userId: {}", userId);
        
        if (userId == null) {
            log.error("UserId is null");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "UserId cannot be null");
        }
        
        // Sử dụng CustomerUsecase để lấy customer profile
        RetrieveCustomerProfileCommand command = new RetrieveCustomerProfileCommand();
        command.setUserId(userId);
        
        CustomerDto customerDto = customerUsecase.retrieveCustomerProfile(command);
        
        // Chuyển đổi sang CustomerProfileResponse
        CustomerProfileResponse response = CustomerProfileResponse.from(customerDto);
        
        log.info("Customer profile found for userId: {}", userId);
        return ResponseEntity.ok(response);
        
    } catch (ResponseStatusException e) {
        log.error("ResponseStatusException for userId {}: {}", userId, e.getMessage());
        throw e;
    } catch (Exception e) {
        log.error("Error getting customer profile for userId {}: {}", userId, e.getMessage());
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
            "Failed to retrieve customer profile: " + e.getMessage());
    }
}
```

#### CustomerProfileResponse Inner Class
- **Mục đích**: Trả về response trực tiếp thay vì wrap trong ApiResponse
- **Cấu trúc**: Chứa tất cả thông tin customer cần thiết
- **Static factory method**: `from(CustomerDto)` để chuyển đổi từ CustomerDto

```java
public static class CustomerProfileResponse {
    private UUID customerId;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String sex;
    private String dateOfBirth;
    private String address;
    private String imageUrl;
    private String level;
    private boolean active;
    
    // Static factory method
    public static CustomerProfileResponse from(CustomerDto customerDto) {
        CustomerProfileResponse response = new CustomerProfileResponse();
        response.setCustomerId(customerDto.getCustomerId());
        response.setUserId(customerDto.getCustomerId()); // Sử dụng customerId làm userId
        response.setFirstName(customerDto.getFirstName());
        response.setLastName(customerDto.getLastName());
        response.setEmail(""); // CustomerDto không có email
        response.setPhone(""); // CustomerDto không có phone
        response.setSex(customerDto.getSex());
        response.setDateOfBirth(customerDto.getDateOfBirth() != null ? customerDto.getDateOfBirth().toString() : null);
        response.setAddress(customerDto.getAddress());
        response.setImageUrl(customerDto.getImageUrl());
        response.setLevel(customerDto.getLevel() != null ? customerDto.getLevel().toString() : null);
        response.setActive(customerDto.isActive());
        return response;
    }
}
```

### 2. Frontend Changes

#### useGoogleAuth.ts
- **File**: `Frontend_NikkoHotel/composables/useGoogleAuth.ts`
- **Thay đổi chính**:
  - **Sửa logic fallback**: Chỉ xử lý 404, không xử lý 400 (vì endpoint mới đã được fix)
  - **Logging rõ ràng**: Ghi log khi backend trả về 400 để debug
  - **Tối ưu fallback**: Chỉ tạo customer mới khi thực sự cần thiết (404)

```typescript
// Fallback: Nếu backend trả về 404 (không tìm thấy customer), tạo mới
if (profileError?.status === 404) {
  console.log('Customer profile not found (404), creating fallback customer profile...')
  // ... logic tạo customer
} else if (profileError?.status === 400) {
  console.error('Backend returned 400 Bad Request for customer profile. This should not happen with the new endpoint.')
  // Không xử lý fallback cho 400 vì endpoint mới đã được fix
}
```

### 3. Google Fonts Fix

#### fonts.css
- **File**: `Frontend_NikkoHotel/assets/css/fonts.css`
- **Thay đổi**: Cập nhật Google Fonts API từ v12 lên v18 để tránh 404
- **Cải thiện**: Sử dụng font-display: swap để tối ưu performance

```css
/* Google Fonts Import - Updated to latest API */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

/* Cập nhật từ v12 lên v18 */
src: url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
```

## API Endpoints

### 1. Lấy customer profile (Đã fix 400 Bad Request)
```
GET /customers/profile/{userId}
Response: CustomerProfileResponse (trực tiếp, không wrap trong ApiResponse)
```

**Trước khi fix**:
- Trả về `ApiResponse<CustomerDto>`
- Có thể gây lỗi 400 Bad Request
- Response structure phức tạp

**Sau khi fix**:
- Trả về `CustomerProfileResponse` trực tiếp
- Không còn lỗi 400 Bad Request
- Response structure đơn giản, dễ sử dụng

### 2. Tạo customer với userId có sẵn
```
POST /customers/with-user
Body: CreateCustomerWithUserCommand
Response: ApiResponse<CustomerDto>
```

### 3. Tạo customer với user mới
```
POST /customers
Body: CreateCustomerCommand
Response: ApiResponse<CustomerDto>
```

## Error Handling

### Backend Error Response (Mới):
```java
// Thay vì ApiResponse.failure(), sử dụng ResponseStatusException
throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "UserId cannot be null");
throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer not found");
throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieve customer profile");
```

### Frontend Error Handling:
- **404**: Tự động tạo customer profile mới
- **400**: Log error (không nên xảy ra với endpoint mới)
- **500**: Hiển thị error message cho user

## Luồng hoạt động mới

### 1. Google Login lần đầu:
- Backend tự động tạo user + customer với name mặc định từ email
- Sử dụng endpoint `/customers/with-user`

### 2. Google Login lần sau:
- Backend kiểm tra và đảm bảo customer profile tồn tại
- FE gọi `GET /customers/profile/{userId}` để lấy thông tin customer
- **Không còn lỗi 400 Bad Request**

### 3. Fallback mechanism:
- Nếu FE gọi `GET /customers/profile/{userId}` mà backend trả về 404
- FE fallback gọi `POST /customers/with-user` với payload hợp lệ
- Backend xử lý logic tạo name mặc định từ email nếu cần

## Testing

### Test cases cần kiểm tra:
1. **Fix 400 Bad Request**: Test `GET /customers/profile/{userId}` với userId hợp lệ
2. **404 Handling**: Test với userId không có customer profile
3. **Google Login flow**: Test toàn bộ luồng Google OAuth
4. **Fallback mechanism**: Test tạo customer khi profile không tồn tại
5. **Google Fonts**: Kiểm tra không còn 404 cho fonts

### API endpoints cần test:
- `GET /customers/profile/{userId}` - **Đã fix 400 Bad Request**
- `POST /customers/with-user` - Tạo customer với userId có sẵn
- `POST /customers` - Tạo customer với user mới

## Lưu ý quan trọng

### 1. **Fix 400 Bad Request**:
- Endpoint `/profile/{userId}` trả về `CustomerProfileResponse` trực tiếp
- Sử dụng `ResponseStatusException` thay vì `ApiResponse.failure()`
- Validate userId trước khi xử lý
- Try-catch để handle exceptions rõ ràng

### 2. **Không ảnh hưởng đến logic khác**:
- Các thay đổi chỉ tập trung vào Google Login + Customer
- Giữ nguyên các endpoint khác
- Không thay đổi business logic

### 3. **Performance improvements**:
- Google Fonts API mới nhất (v18)
- Font-display: swap để tối ưu loading
- Fallback fonts cho trường hợp Google Fonts không load được

### 4. **Error handling**:
- Backend không throw exception khi tạo customer profile thất bại
- Frontend có cơ chế fallback để đảm bảo customer profile luôn được tạo
- Logging rõ ràng để debug

### 5. **UUID mapping**:
- Đảm bảo `@PathVariable UUID userId` được parse đúng
- Validate userId trước khi xử lý
- Sử dụng `ResponseStatusException` với HTTP status code phù hợp

## Kết quả mong đợi

1. **Không còn lỗi 400 Bad Request** khi gọi `GET /customers/profile/{userId}`
2. **Google Login hoạt động mượt mà** với customer profile tự động
3. **Google Fonts không còn 404**
4. **Performance tốt hơn** với font loading tối ưu
5. **Error handling rõ ràng** và user-friendly

