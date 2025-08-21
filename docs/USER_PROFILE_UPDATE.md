# Cập nhật Thông tin Người dùng - User Profile Update

## Tổng quan

Component `changeInfo.vue` đã được cải tiến để cung cấp giao diện chỉnh sửa thông tin người dùng đầy đủ và thân thiện hơn, bao gồm cả chức năng cập nhật ảnh đại diện.

## Tính năng chính

### 1. Hiển thị thông tin đầy đủ
- **Thông tin cơ bản**: Họ, tên, email, số điện thoại
- **Thông tin cá nhân**: Ngày sinh, giới tính, địa chỉ
- **Thông tin thành viên**: Hạng thành viên, Customer ID, ngày tham gia
- **Ảnh đại diện**: Hiển thị ảnh hiện tại hoặc chữ cái đầu tên

### 2. Giao diện chỉnh sửa
- **Form responsive**: Tự động điều chỉnh theo kích thước màn hình
- **Validation**: Kiểm tra dữ liệu đầu vào với thông báo lỗi rõ ràng
- **Loading states**: Hiển thị trạng thái đang xử lý
- **Responsive design**: Tối ưu cho cả desktop và mobile

### 3. Cập nhật ảnh đại diện
- **Upload ảnh**: Hỗ trợ các định dạng ảnh phổ biến
- **Preview**: Xem trước ảnh trước khi upload
- **Validation**: Kiểm tra kích thước file (tối đa 5MB) và định dạng
- **Progress indicator**: Hiển thị trạng thái upload

## Cấu trúc dữ liệu

### CustomerEntity (Backend)
```java
public class CustomerEntity {
    private UUID id;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String address;
    private LocalDate dateOfBirth;
    private Level level;
    private String imageUrl;
    private String behaviorData;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private SexEnum sex;
    private boolean active;
}
```

### Form Data (Frontend)
```typescript
const formData = ref({
  firstName: '',      // Họ - bắt buộc
  lastName: '',       // Tên - bắt buộc
  phone: '',          // Số điện thoại - bắt buộc
  dateOfBirth: '',    // Ngày sinh - bắt buộc
  address: '',        // Địa chỉ - bắt buộc
  sex: ''             // Giới tính - bắt buộc
})
```

## API Endpoints

### 1. Cập nhật thông tin cá nhân
```
PUT /customers/profile
Body: UpdateCustomerCommand
```

### 2. Cập nhật ảnh đại diện
```
PUT /customers/profile/{customerId}/avatar
Content-Type: multipart/form-data
Body: MultipartFile (imageRaw)
```

## Validation Rules

### Form Validation Schema
```typescript
const schema = {
  firstName: 'required',      // Họ không được để trống
  lastName: 'required',       // Tên không được để trống
  phone: 'required|phone',    // Số điện thoại hợp lệ
  dateOfBirth: 'required',    // Ngày sinh không được để trống
  address: 'required',        // Địa chỉ không được để trống
  sex: 'required'             // Giới tính không được để trống
}
```

### Ảnh Upload Validation
- **Kích thước**: Tối đa 5MB
- **Định dạng**: Chỉ chấp nhận file ảnh (image/*)
- **Kiểm tra**: File type và size trước khi upload

## Giao diện người dùng

### 1. Chế độ xem thông tin
- Hiển thị thông tin dưới dạng card layout
- Avatar lớn (128x128px) với nút chỉnh sửa
- Thông tin được nhóm theo chủ đề với icon trực quan
- Responsive grid layout (1-2 cột tùy màn hình)

### 2. Chế độ chỉnh sửa
- Form layout 2 cột cho màn hình lớn
- Labels rõ ràng với dấu * cho trường bắt buộc
- Error messages hiển thị dưới mỗi field
- Nút hành động (Hủy/Lưu) responsive

### 3. Modal upload ảnh
- Preview ảnh lớn (160x160px)
- Thông tin file (tên, kích thước)
- Nút hành động rõ ràng
- Loading state khi upload

## Responsive Design

### Breakpoints
- **Mobile**: 1 cột, stack layout
- **Tablet**: 1-2 cột tùy thuộc
- **Desktop**: 2 cột cho form, grid layout cho thông tin

### Layout Adaptations
- Avatar section: Center trên mobile, left align trên desktop
- Form fields: Stack trên mobile, grid trên desktop
- Action buttons: Stack trên mobile, inline trên desktop

## Error Handling

### 1. Form Validation Errors
- Hiển thị lỗi dưới mỗi field
- Sử dụng SweetAlert2 cho thông báo
- Disable form khi đang xử lý

### 2. API Errors
- Hiển thị thông báo lỗi từ server
- Fallback message nếu không có response
- Log lỗi để debug

### 3. File Upload Errors
- Validation file size và type
- Error handling cho network issues
- User-friendly error messages

## Performance Optimizations

### 1. Lazy Loading
- Chỉ load form khi cần thiết
- Conditional rendering cho các section

### 2. Debounced Input
- Validation không quá thường xuyên
- Optimized re-renders

### 3. Image Optimization
- Preview ảnh với FileReader
- Compressed upload nếu cần

## Accessibility

### 1. ARIA Labels
- Proper labels cho form fields
- Alt text cho ảnh
- Screen reader support

### 2. Keyboard Navigation
- Tab order hợp lý
- Enter key support cho form
- Escape key để đóng modal

### 3. Color Contrast
- Đảm bảo contrast ratio đạt chuẩn
- Không chỉ dựa vào màu sắc để truyền tải thông tin

## Testing

### 1. Unit Tests
- Form validation
- Data transformation
- Error handling

### 2. Integration Tests
- API calls
- State management
- User interactions

### 3. E2E Tests
- Complete user flow
- Cross-browser compatibility
- Mobile responsiveness

## Troubleshooting

### 1. Common Issues
- **Form không submit**: Kiểm tra validation schema
- **Ảnh không upload**: Kiểm tra file size và format
- **Data không sync**: Kiểm tra API response và store update

### 2. Debug Tips
- Console logs cho API calls
- Network tab để kiểm tra requests
- Vue DevTools để inspect state

## Future Enhancements

### 1. Planned Features
- Drag & drop cho ảnh
- Image cropping
- Bulk data import/export
- Advanced validation rules

### 2. Technical Improvements
- TypeScript strict mode
- Unit test coverage
- Performance monitoring
- Accessibility audit

## Dependencies

### Frontend
- Vue 3 Composition API
- VeeValidate cho form validation
- Tailwind CSS cho styling
- SweetAlert2 cho notifications

### Backend
- Spring Boot
- Spring Data JPA
- Cloudinary cho image storage
- Validation annotations

## Contributing

Khi cập nhật component này, hãy đảm bảo:
1. Giữ nguyên responsive design
2. Test trên nhiều thiết bị
3. Cập nhật documentation
4. Thêm unit tests nếu cần
5. Kiểm tra accessibility