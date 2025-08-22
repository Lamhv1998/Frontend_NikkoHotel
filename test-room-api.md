# Test Room API

## Kiểm tra API Room Types

### 1. Test API Endpoint
```bash
curl -X GET "http://localhost:8087/api/rooms/types"
```

### 2. Expected Response Format
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

### 3. Test từ Frontend
- Mở trang `/rooms`
- Kiểm tra console log để xem:
  - 🚀 useRoomApi initialized with baseURL: http://localhost:8087
  - 📡 Fetching room types from: http://localhost:8087/api/rooms/types
  - ✅ API room types response: [data]
  - 🎯 Transformed room types: [transformed data]

### 4. Nếu API fail
- Sẽ hiển thị fallback data với hardcoded images và amenities
- Console sẽ hiển thị: ⚠️ No room types from API, using fallback data

### 5. Debug Steps
1. Kiểm tra room-management service có chạy không
2. Kiểm tra port 8087 có mở không
3. Kiểm tra database có dữ liệu room types không
4. Kiểm tra CORS configuration

### 6. Fallback Data
Nếu API fail, sẽ hiển thị 4 loại phòng mẫu:
- Phòng Deluxe (50 m², 4 người, 1.2M VND)
- Phòng Suite (80 m², 4 người, 2.5M VND)  
- Phòng Standard (30 m², 2 người, 800K VND)
- Phòng Premium (40 m², 2 người, 1.8M VND)

Mỗi loại có:
- Hardcoded images từ Unsplash
- Amenities phù hợp với loại phòng
- Layout, facility, và amenity info chi tiết
