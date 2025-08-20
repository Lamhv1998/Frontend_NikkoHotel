# Cập nhật Địa chỉ Việt Nam

## Tổng quan
Đã cập nhật form đăng ký để sử dụng dữ liệu địa chỉ Việt Nam thay vì dữ liệu từ Đài Loan (Trung Quốc).

## Những thay đổi đã thực hiện

### 1. Tạo dữ liệu địa chỉ Việt Nam
- **File**: `server/data/vietnam-cities.json`
  - Chứa danh sách 63 tỉnh/thành phố của Việt Nam
  - Mỗi tỉnh/thành phố có mã zip code tương ứng

- **File**: `server/data/vietnam-districts.json`
  - Chứa danh sách quận/huyện cho các tỉnh/thành phố chính
  - Bao gồm: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Hải Phòng, Cần Thơ, An Giang, Bà Rịa - Vũng Tàu

### 2. Cập nhật Server Routes
- **File**: `server/routes/citys.get.js`
  - Thay đổi từ API Đài Loan sang đọc dữ liệu local Việt Nam
  - Sửa lỗi async/await và import modules

- **File**: `server/routes/district.get.js`
  - Cập nhật logic để xử lý dữ liệu quận/huyện Việt Nam
  - Hỗ trợ tìm kiếm theo city hoặc zip_code
  - Sửa lỗi async/await và import modules

### 3. Sửa lỗi Font Google
- **File**: `assets/css/fonts.css`
  - Đơn giản hóa file fonts, chỉ sử dụng Google Fonts import
  - Loại bỏ các URL font bị lỗi 404

### 4. Cập nhật Component CAddress
- **File**: `components/c/CAddress.vue`
  - Cải thiện logic khi chọn tỉnh/thành phố
  - Tự động load quận/huyện khi chọn tỉnh/thành phố
  - Reset zipcode khi chọn tỉnh/thành phố mới

### 5. Sửa lỗi linter
- **File**: `pages/auth/signup.vue`
  - Thay đổi variant từ "text" sang "ghost" cho UIButton

## Cách sử dụng

1. **Chọn tỉnh/thành phố**: Người dùng chọn tỉnh/thành phố từ dropdown
2. **Tự động load quận/huyện**: Hệ thống tự động load danh sách quận/huyện tương ứng
3. **Chọn quận/huyện**: Người dùng chọn quận/huyện cụ thể
4. **Nhập địa chỉ chi tiết**: Người dùng nhập địa chỉ chi tiết

## Dữ liệu bao gồm

### Tỉnh/Thành phố (63 tỉnh/thành)
- 5 thành phố trực thuộc Trung ương: Hà Nội, TP. Hồ Chí Minh, Hải Phòng, Đà Nẵng, Cần Thơ
- 58 tỉnh khác

### Quận/Huyện (cho các tỉnh/thành chính)
- **Hà Nội**: 25 quận/huyện
- **TP. Hồ Chí Minh**: 24 quận/huyện  
- **Đà Nẵng**: 8 quận/huyện
- **Hải Phòng**: 15 quận/huyện
- **Cần Thơ**: 9 quận/huyện
- **An Giang**: 10 quận/huyện
- **Bà Rịa - Vũng Tàu**: 8 quận/huyện

## Lưu ý
- Dữ liệu quận/huyện hiện tại chỉ bao gồm các tỉnh/thành phố chính
- Có thể mở rộng thêm dữ liệu cho các tỉnh/thành phố khác khi cần thiết
- Mã zip code được sử dụng theo chuẩn bưu chính Việt Nam
