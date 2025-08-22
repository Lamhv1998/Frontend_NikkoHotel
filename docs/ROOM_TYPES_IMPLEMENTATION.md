# Room Types Implementation

## Tổng quan

Trang `/rooms` hiện tại đã được cập nhật để:

1. **Lấy dữ liệu từ API** thay vì hardcode
2. **Sử dụng port 8087** (room-management service)
3. **Transform dữ liệu** từ backend DTO sang frontend format
4. **Hardcode images và amenities** vì database không có

## Cấu trúc API

### Backend Endpoint
```
GET http://localhost:8087/api/rooms/types
```

### Response Format (Backend DTO)
```json
[
  {
    "id": "uuid-here",
    "typeName": "Deluxe",
    "description": "Phòng Deluxe sang trọng",
    "basePrice": "1200000",
    "maxOccupancy": 4,
    "furnitureRequirements": []
  }
]
```

### Frontend Format (RoomResponse)
```typescript
{
  _id: string
  name: string
  description: string
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  status: number
  imageUrl: string
  imageUrlList: string[]
  layoutInfo: InfoDetail[]
  facilityInfo: InfoDetail[]
  amenityInfo: InfoDetail[]
  createdAt: string
  updatedAt: string
}
```

## Data Transformation

### 1. Images (Hardcoded)
```typescript
const hardcodedImages = [
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1590496793929-05c94a8e4d3b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
]
```

### 2. Amenities (Dynamic based on type)
```typescript
// Deluxe/Premium rooms
{
  layoutInfo: [
    { title: 'Giường king size', isProvide: true },
    { title: 'Phòng khách riêng', isProvide: true },
    { title: 'Ban công view đẹp', isProvide: true }
  ],
  facilityInfo: [
    { title: 'Điều hòa cao cấp', isProvide: true },
    { title: 'Tivi 4K 55 inch', isProvide: true },
    { title: 'Wifi tốc độ cao', isProvide: true },
    { title: 'Mini bar', isProvide: true }
  ]
}

// Suite rooms
{
  layoutInfo: [
    { title: 'Phòng ngủ chính', isProvide: true },
    { title: 'Phòng khách riêng', isProvide: true },
    { title: 'Phòng tắm sang trọng', isProvide: true }
  ]
}

// Standard rooms
{
  layoutInfo: [
    { title: 'Giường đôi', isProvide: true },
    { title: 'Bàn làm việc', isProvide: true },
    { title: 'Tủ quần áo', isProvide: true }
  ]
}
```

### 3. Bed Info (Dynamic based on type and occupancy)
```typescript
if (type.includes('suite')) {
  return '1 giường king size + 1 giường phụ'
} else if (type.includes('deluxe') || type.includes('premium')) {
  return maxOccupancy >= 4 ? '1 giường king size + 1 giường sofa' : '1 giường king size'
} else {
  return maxOccupancy >= 4 ? '2 giường đôi' : '1 giường đôi'
}
```

## Fallback Data

Nếu API fail, sẽ hiển thị 4 loại phòng mẫu:

1. **Phòng Deluxe** - 50 m², 4 người, 1.2M VND
2. **Phòng Suite** - 80 m², 4 người, 2.5M VND
3. **Phòng Standard** - 30 m², 2 người, 800K VND
4. **Phòng Premium** - 40 m², 2 người, 1.8M VND

## Debug Logs

### Success Case
```
🚀 useRoomApi initialized with baseURL: http://localhost:8087
📡 Fetching room types from: http://localhost:8087/api/rooms/types
✅ API room types response: [data]
🎯 Transformed room types: [transformed data]
🏁 Final room types value: [final data]
```

### Fallback Case
```
🚀 useRoomApi initialized with baseURL: http://localhost:8087
📡 Fetching room types from: http://localhost:8087/api/rooms/types
⚠️ No room types from API, using fallback data
🏁 Final room types value: [fallback data]
```

### Error Case
```
🚀 useRoomApi initialized with baseURL: http://localhost:8087
📡 Fetching room types from: http://localhost:8087/api/rooms/types
❌ Error fetching room types: [error]
🔄 Using fallback data due to API error
🏁 Final room types value: [fallback data]
```

## Configuration

### Nuxt Config
```typescript
runtimeConfig: {
  public: {
    roomServiceUrl: process.env.ROOM_SERVICE_URL || 'http://localhost:8087'
  }
}
```

### Environment Variables
```bash
ROOM_SERVICE_URL=http://localhost:8087
```

## Testing

### 1. Test API Endpoint
```bash
curl -X GET "http://localhost:8087/api/rooms/types"
```

### 2. Test Frontend
1. Mở trang `/rooms`
2. Kiểm tra console log
3. Xem dữ liệu hiển thị

### 3. Test Fallback
1. Tắt room-management service
2. Refresh trang `/rooms`
3. Kiểm tra fallback data hiển thị

## Troubleshooting

### 1. API không trả về dữ liệu
- Kiểm tra room-management service có chạy không
- Kiểm tra port 8087 có mở không
- Kiểm tra database có dữ liệu room types không

### 2. CORS Error
- Kiểm tra CORS configuration trong room-management
- Đảm bảo frontend domain được allow

### 3. Network Error
- Kiểm tra firewall
- Kiểm tra network connectivity
- Kiểm tra service health

## Next Steps

1. **Thêm real images** cho mỗi room type
2. **Sync amenities** với database
3. **Add room availability** check
4. **Implement booking** functionality
5. **Add room details** page
