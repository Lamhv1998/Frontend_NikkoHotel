# 🏨 Room Navigation Flow - Luồng Điều Hướng Phòng

## 📋 Tổng Quan

Hệ thống quản lý phòng khách sạn được thiết kế với 2 cấp độ:

1. **Room Types** (Loại phòng) - Hiển thị các loại phòng có sẵn
2. **Individual Rooms** (Phòng cụ thể) - Hiển thị các phòng thuộc loại đó

## 🔄 Luồng Điều Hướng

### 1. Trang Danh Sách Loại Phòng (`/rooms`)
- **Mục đích**: Hiển thị tất cả các loại phòng có sẵn
- **Dữ liệu**: Lấy từ API `/api/rooms/types` (room-management service port 8087)
- **Hiển thị**: 
  - Tên loại phòng
  - Mô tả
  - Giá cơ bản
  - Sức chứa tối đa
  - Diện tích
  - Hình ảnh (hardcoded)
  - Tiện ích (được tạo động dựa trên loại phòng)

### 2. Trang Chi Tiết Loại Phòng (`/rooms/type-details`)
- **Mục đích**: Hiển thị các phòng cụ thể thuộc loại đã chọn
- **Dữ liệu**: Mock data (sẽ được thay thế bằng API call thực tế)
- **Hiển thị**:
  - Số phòng
  - Tầng
  - Trạng thái (Có sẵn/Đã có người/Bảo trì)
  - Giá
  - Nút đặt phòng (nếu có sẵn)

## 🚀 Cách Hoạt Động

### Khi Click Vào Loại Phòng:
1. **Trang `/rooms`**: Gọi `navigateToRoomTypeDetails(roomType)`
2. **Tạo Query Parameters**:
   ```typescript
   const queryParams = new URLSearchParams({
     typeId: roomType.id,
     typeName: roomType.name,
     maxOccupancy: roomType.maxOccupancy.toString(),
     area: roomType.area.toString()
   })
   ```
3. **Chuyển hướng**: `navigateTo('/rooms/type-details?${queryParams}')`

### Trang Chi Tiết Nhận Dữ Liệu:
```typescript
const roomTypeInfo = computed(() => ({
  typeId: route.query.typeId as string,
  typeName: route.query.typeName as string,
  maxOccupancy: parseInt(route.query.maxOccupancy as string) || 2,
  area: parseInt(route.query.area as string) || 25
}))
```

## 🎨 Giao Diện

### CSS Styling:
- **Gradient Background**: `from-blue-50 to-indigo-100`
- **Card Design**: White cards với shadow và hover effects
- **Responsive Grid**: 1-3 cột tùy theo màn hình
- **Hover Effects**: Transform, shadow, scale animations

### Components:
- **Header Section**: Tiêu đề và thông tin loại phòng
- **Search & Filter**: Tìm kiếm và sắp xếp
- **Room Grid**: Hiển thị các phòng dạng card
- **Status Badges**: Màu sắc khác nhau cho từng trạng thái

## 🔧 API Integration

### Room Types API:
```typescript
// GET /api/rooms/types
const getAllRoomTypes = async () => {
  const response = await $fetch(`${baseURL}/api/rooms/types`)
  return response
}
```

### Future Implementation:
```typescript
// TODO: Implement API call to get rooms of specific type
const getRoomsByType = async (typeId: string) => {
  const response = await $fetch(`${baseURL}/api/rooms/type/${typeId}`)
  return response
}
```

## 📱 Responsive Design

- **Mobile**: 1 cột, full-width cards
- **Tablet**: 2 cột, medium spacing
- **Desktop**: 3 cột, large spacing
- **Large Desktop**: 4 cột (nếu cần)

## 🎯 Tính Năng Chính

1. **Tìm Kiếm**: Theo tên hoặc mô tả loại phòng
2. **Sắp Xếp**: Theo tên, giá, đánh giá, sức chứa
3. **Lọc**: Theo diện tích, số người (có thể mở rộng)
4. **Navigation**: Quay lại danh sách loại phòng
5. **Booking**: Nút đặt phòng cho phòng có sẵn

## 🚧 TODO Items

- [ ] Implement real API call cho `getRoomsByType`
- [ ] Add pagination cho danh sách phòng
- [ ] Implement real booking flow
- [ ] Add room details page
- [ ] Add image upload cho room types
- [ ] Implement real-time room status updates

## 🔍 Debug Logs

Hệ thống có đầy đủ console.log để debug:
- 🚀 API calls
- ✅ API responses
- 🔄 Data transformation
- 📊 Sorting/filtering results
- 🎯 Navigation events

## 📁 File Structure

```
pages/rooms/
├── index.vue          # Danh sách loại phòng
└── type-details.vue   # Chi tiết phòng thuộc loại

composables/
└── useRoomApi.ts      # API calls

types/
└── room.ts            # TypeScript interfaces
```

## 🌟 Features

- **Elegant Design**: Giao diện sang trọng, chuyên nghiệp
- **Smooth Animations**: Hover effects, transitions
- **Responsive**: Hoạt động tốt trên mọi thiết bị
- **Type Safe**: TypeScript interfaces cho tất cả dữ liệu
- **Error Handling**: Graceful error states và fallback data
- **Performance**: Lazy loading, efficient filtering
