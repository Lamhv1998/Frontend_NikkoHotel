# 📋 HƯỚNG DẪN CUNG CẤP DỮ LIỆU BACKEND ĐỂ TẠO API CALL HOÀN CHỈNH

## 🎯 **MỤC TIÊU**

Tài liệu này hướng dẫn bạn **những dữ liệu cần cung cấp từ backend** để tôi có thể tạo ra **API call hoàn chỉnh và không cần chỉnh sửa gì** cho frontend Nuxt.js.

---

## 🚨 **LƯU Ý QUAN TRỌNG**

**Nếu bạn muốn tôi tạo ra code hoàn chỉnh và không cần chỉnh sửa gì, bạn PHẢI cung cấp đầy đủ các thông tin dưới đây.**

**Thiếu bất kỳ phần nào sẽ dẫn đến:**
- Code không hoạt động
- Cần chỉnh sửa nhiều lần
- Mất thời gian debug
- Kết quả không như mong đợi

---

## 📋 **DỮ LIỆU BẮT BUỘC CẦN CUNG CẤP**

### **1. 🏗️ BACKEND CONTROLLER (BẮT BUỘC 100%)**

**Bạn cần cung cấp:**
- File Java Controller (.java) hoàn chỉnh
- Tất cả các endpoints với HTTP methods
- URL paths và routing
- Request parameters (@RequestParam, @PathVariable)
- Request body classes (@RequestBody)
- Response types và ResponseEntity
- Authentication requirements (@PreAuthorize, @Secured)

**Ví dụ cần cung cấp:**
```
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) { ... }
    
    @GetMapping
    public ResponseEntity<PageResponse<UserResponse>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) { ... }
}
```

### **2. 📊 DTO CLASSES (BẮT BUỘC 100%)**

**Bạn cần cung cấp:**
- Request DTOs (CreateRequest, UpdateRequest, SearchRequest)
- Response DTOs (EntityResponse, ListResponse, PageResponse)
- Tất cả field names và data types
- Validation annotations (@NotNull, @Size, @Email, etc.)
- Nested objects và relationships
- Enums và constants
- Generic types và collections

**Ví dụ cần cung cấp:**
```
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private LocalDateTime createdAt;
    private List<RoleResponse> roles;
}

public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
}
```

### **3. 🔗 API ENDPOINTS CHI TIẾT (BẮT BUỘC 100%)**

**Bạn cần cung cấp:**
- Base URL của service
- Tất cả endpoints với HTTP methods (GET, POST, PUT, DELETE)
- Query parameters và path variables
- Request/Response examples
- Error response formats
- Pagination parameters (page, size, sort)
- Filter parameters và search criteria
- Sorting options

**Ví dụ cần cung cấp:**
```
Base URL: http://localhost:8080/api/v1/users

Endpoints:
- GET /{id} - Lấy user theo ID
- GET / - Lấy danh sách users với pagination
- GET /search?keyword={keyword}&status={status} - Tìm kiếm users
- POST / - Tạo user mới
- PUT /{id} - Cập nhật user
- DELETE /{id} - Xóa user
```

### **4. 🔐 AUTHENTICATION & AUTHORIZATION (QUAN TRỌNG)**

**Bạn cần cung cấp:**
- JWT token requirements
- Role-based access control
- Required headers (Authorization, Content-Type)
- Public vs Protected endpoints
- Token validation logic
- Permission levels cho từng endpoint

**Ví dụ cần cung cấp:**
```
- Endpoint /api/v1/users/{id} yêu cầu JWT token
- Role ADMIN có thể truy cập tất cả endpoints
- Role USER chỉ có thể truy cập /api/v1/users/{id} với id của chính mình
- Header bắt buộc: Authorization: Bearer {token}
```

### **5. 🏢 BUSINESS LOGIC (QUAN TRỌNG)**

**Bạn cần cung cấp:**
- Các business rules
- Validation logic
- Error handling scenarios
- Success/Error response codes
- Data transformation rules
- Business constraints

**Ví dụ cần cung cấp:**
```
- User email phải unique trong hệ thống
- Password phải có ít nhất 8 ký tự
- User không thể xóa nếu có booking đang active
- Response code 400 khi validation fail
- Response code 404 khi không tìm thấy resource
```

---

## 📤 **FORMAT CUNG CẤP DỮ LIỆU**

### **CÁCH 1: COPY TOÀN BỘ CODE (KHUYẾN NGHỊ)**

**Copy và paste toàn bộ các file:**
```
1. Controller file (.java)
2. Tất cả DTO classes (.java)
3. Enum classes (.java)
4. Exception classes (.java)
```

### **CÁCH 2: CUNG CẤP THEO CẤU TRÚC**

**Nếu không thể copy code, cung cấp theo format:**
```
1. Controller endpoints:
   - GET /api/v1/example/{id}
   - POST /api/v1/example
   - PUT /api/v1/example/{id}
   - DELETE /api/v1/example/{id}

2. Request DTO fields:
   - name: String (required)
   - email: String (required, email format)
   - age: Integer (optional, min 18)

3. Response DTO fields:
   - id: Long
   - name: String
   - email: String
   - createdAt: LocalDateTime
```

---

## ❌ **NHỮNG GÌ KHÔNG CẦN CUNG CẤP**

**Bạn KHÔNG cần cung cấp:**
- Service layer implementation
- Repository layer code
- Database schema
- Business logic implementation details
- Unit tests
- Configuration files (application.properties, application.yml)
- Dependencies và pom.xml
- Logging configuration
- Database connection details

---

## ✅ **CHECKLIST KIỂM TRA TRƯỚC KHI GỬI**

**Trước khi gửi dữ liệu, hãy kiểm tra:**

- [ ] **Controller file** với tất cả endpoints
- [ ] **Request DTOs** với field types và validation
- [ ] **Response DTOs** với field types
- [ ] **Base URL** của service
- [ ] **Authentication requirements** (nếu có)
- [ ] **Pagination parameters** (nếu có)
- [ ] **Filter/Search parameters** (nếu có)
- [ ] **Error response format** (nếu có)
- [ ] **Business rules** và constraints
- [ ] **Enum values** và constants

---

## 🚀 **KẾT QUẢ SAU KHI CUNG CẤP ĐẦY ĐỦ**

**Với dữ liệu đầy đủ, tôi sẽ tạo ra:**

1. **✅ TypeScript interfaces** hoàn chỉnh và chính xác
2. **✅ API composable** với tất cả endpoints
3. **✅ Error handling** nhất quán và robust
4. **✅ Loading states** và user feedback
5. **✅ Type safety** 100% không có lỗi
6. **✅ Ready-to-use code** không cần chỉnh sửa
7. **✅ Documentation** chi tiết cho từng function
8. **✅ Example usage** trong components

**Bạn chỉ cần copy-paste và sử dụng ngay!** 🎯

---

## 📝 **VÍ DỤ CUNG CẤP DỮ LIỆU HOÀN CHỈNH**

### **VÍ DỤ 1: USER SERVICE**

**Controller:**
```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) { ... }
    
    @GetMapping
    public ResponseEntity<PageResponse<UserResponse>> getUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) { ... }
}
```

**DTOs:**
```java
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private LocalDateTime createdAt;
}

public class PageResponse<T> {
    private List<T> content;
    private int page;
    private int size;
    private long totalElements;
}
```

### **VÍ DỤ 2: BOOKING SERVICE**

**Controller:**
```java
@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByCustomer(
        @PathVariable Long customerId,
        @RequestParam(required = false) String status
    ) { ... }
}
```

**DTOs:**
```java
public class BookingResponse {
    private Long id;
    private Long customerId;
    private Long roomId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String status;
    private BigDecimal totalPrice;
}
```

---

## ⚠️ **CẢNH BÁO QUAN TRỌNG**

**Nếu bạn cung cấp thiếu thông tin:**

1. **Code sẽ không hoạt động** - cần debug và fix nhiều lần
2. **Mất thời gian** - phải hỏi lại và chỉnh sửa
3. **Kết quả không như mong đợi** - UI không hiển thị đúng
4. **Type safety bị mất** - có thể gây runtime errors
5. **User experience kém** - loading states, error handling không đúng

**Hãy cung cấp đầy đủ thông tin ngay từ đầu để tiết kiệm thời gian!**

---

## 🎯 **KẾT LUẬN**

**Để có được API call hoàn chỉnh và không cần chỉnh sửa:**

1. **Cung cấp đầy đủ** tất cả thông tin yêu cầu
2. **Copy toàn bộ code** Controller và DTOs
3. **Mô tả chi tiết** business logic và requirements
4. **Kiểm tra checklist** trước khi gửi

**Kết quả: Code hoàn chỉnh, type-safe, và ready-to-use ngay lập tức!** 🚀

---

*Tài liệu này đảm bảo bạn cung cấp đầy đủ thông tin để nhận được kết quả tốt nhất.*
