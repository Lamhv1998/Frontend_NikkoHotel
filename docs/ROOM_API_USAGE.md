# Hướng dẫn sử dụng Room API Composables

## Tổng quan

Dự án này cung cấp hai composables chính để tương tác với backend API:

1. **`useRoomApi`** - Quản lý các API liên quan đến phòng
2. **`useReceptionApi`** - Quản lý các API liên quan đến reception

## Cài đặt và cấu hình

### 1. Cấu hình API Base URL

Trong `nuxt.config.ts`, đảm bảo đã cấu hình:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiGatewayUrl: process.env.API_GATEWAY_URL || 'http://localhost:8092'
    }
  }
})
```

### 2. Environment Variables

Tạo file `.env`:

```env
API_GATEWAY_URL=http://localhost:8092
```

## Sử dụng useRoomApi

### Import và khởi tạo

```typescript
import { useRoomApi } from '~/composables/useRoomApi'

// Trong component
const { getAllRooms, getRoomById, searchRooms } = useRoomApi()
```

### Các function chính

#### Dashboard & Statistics

```typescript
// Lấy thống kê phòng
const roomStats = await getRoomStatistics()

// Lấy số lượng phòng
const totalRooms = await getRoomCount()
const availableRooms = await getAvailableRoomCount()
const occupiedRooms = await getOccupiedRoomCount()
const maintenanceRooms = await getMaintenanceRoomCount()

// Lấy tỷ lệ lấp đầy
const occupancyRatio = await getOccupancyRatio()
```

#### CRUD Operations

```typescript
// Lấy danh sách tất cả phòng
const rooms = await getAllRooms(0, 20) // page 0, size 20

// Lấy phòng theo ID
const room = await getRoomById('room-id-here')

// Lấy phòng theo số phòng
const room = await getRoomByNumber('101')
```

#### Search & Filter

```typescript
// Tìm kiếm phòng với nhiều tiêu chí
const searchResults = await searchRooms({
  roomNumber: '101',
  roomType: 'DELUXE',
  status: 'AVAILABLE',
  floor: 1,
  minPrice: 1000000,
  maxPrice: 2000000,
  page: 0,
  size: 20
})

// Lọc theo trạng thái
const availableRooms = await filterRoomsByStatus('AVAILABLE')

// Lọc theo loại phòng
const deluxeRooms = await filterRoomsByType('DELUXE')

// Lọc theo tầng
const firstFloorRooms = await filterRoomsByFloor(1)

// Lọc theo khoảng giá
const roomsInPriceRange = await filterRoomsByPriceRange(1000000, 2000000)
```

#### Room Type Management

```typescript
// Lấy danh sách loại phòng
const roomTypes = await getAllRoomTypes()

// Lấy thông tin loại phòng theo ID
const roomType = await getRoomTypeById('type-id-here')
```

#### Availability & Status

```typescript
// Lấy danh sách phòng khả dụng
const availableRooms = await getAvailableRooms({
  roomType: 'DELUXE',
  floor: 1,
  minPrice: 1000000,
  maxPrice: 2000000
})

// Kiểm tra khả dụng của phòng
const isAvailable = await checkRoomAvailability('room-id-here')
```

#### Maintenance & Cleaning

```typescript
// Lấy danh sách phòng đang bảo trì
const maintenanceRooms = await getMaintenanceRooms()

// Lấy danh sách phòng cần dọn dẹp
const cleaningRooms = await getCleaningRooms()
```

#### Floor Management

```typescript
// Lấy danh sách tất cả tầng
const floors = await getAllFloors()

// Lấy danh sách phòng theo tầng
const firstFloorRooms = await getRoomsByFloor(1)
```

#### Pricing

```typescript
// Lấy khoảng giá phòng
const priceRange = await getRoomPriceRange()
```

## Sử dụng useReceptionApi

### Import và khởi tạo

```typescript
import { useReceptionApi } from '~/composables/useReceptionApi'

// Trong component
const { getReceptionDashboard, getPendingCheckIns, getCurrentGuests } = useReceptionApi()
```

### Các function chính

#### Dashboard & Overview

```typescript
// Lấy thông tin dashboard reception
const dashboard = await getReceptionDashboard()

// Lấy báo cáo hàng ngày
const dailyReport = await getDailyReport('2024-01-15')

// Lấy thống kê khách hàng
const guestStats = await getGuestStatistics('2024-01-01', '2024-01-31')
```

#### Check-in Management

```typescript
// Lấy danh sách check-in đang chờ
const pendingCheckIns = await getPendingCheckIns()

// Lấy danh sách check-in hôm nay
const todayCheckIns = await getTodayCheckIns()

// Lấy thông tin check-in theo ID
const checkIn = await getCheckInById('checkin-id-here')
```

#### Check-out Management

```typescript
// Lấy danh sách check-out đang chờ
const pendingCheckOuts = await getPendingCheckOuts()

// Lấy danh sách check-out hôm nay
const todayCheckOuts = await getTodayCheckOuts()

// Lấy thông tin check-out theo ID
const checkOut = await getCheckOutById('checkout-id-here')
```

#### Guest Management

```typescript
// Lấy danh sách khách hiện tại
const currentGuests = await getCurrentGuests()

// Lấy thông tin khách theo ID
const guest = await getGuestById('guest-id-here')

// Tìm kiếm khách
const searchResults = await searchGuests('Nguyễn Văn A')
```

#### Housekeeping Management

```typescript
// Lấy danh sách yêu cầu dọn dẹp
const housekeepingRequests = await getHousekeepingRequests('PENDING')

// Lấy lịch dọn dẹp
const schedule = await getHousekeepingSchedule('2024-01-15')
```

#### Maintenance Management

```typescript
// Lấy danh sách yêu cầu bảo trì
const maintenanceRequests = await getMaintenanceRequests('REQUESTED')

// Lấy lịch bảo trì
const schedule = await getMaintenanceSchedule('2024-01-15')
```

#### Room Service Management

```typescript
// Lấy danh sách dịch vụ phòng
const roomServices = await getRoomServices('101')

// Lấy danh sách đơn hàng dịch vụ
const serviceOrders = await getServiceOrders('PENDING')

// Lấy thông tin đơn hàng dịch vụ theo ID
const order = await getServiceOrderById('order-id-here')
```

#### Occupancy & Analytics

```typescript
// Lấy thống kê lấp đầy theo ngày
const dailyOccupancy = await getDailyOccupancy('2024-01-15')

// Lấy báo cáo lấp đầy theo khoảng thời gian
const occupancyReport = await getOccupancyReport('2024-01-01', '2024-01-31')

// Lấy thống kê lấp đầy theo tầng
const floorOccupancy = await getFloorOccupancy()
```

## Ví dụ sử dụng trong Component

### Trang danh sách phòng

```vue
<template>
  <div>
    <div v-if="loading">Đang tải...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="room in rooms" :key="room._id">
        <h3>{{ room.name }}</h3>
        <p>{{ room.description }}</p>
        <p>Giá: {{ room.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoomApi } from '~/composables/useRoomApi'

const { getAllRooms } = useRoomApi()
const rooms = ref([])
const loading = ref(false)
const error = ref(null)

const loadRooms = async () => {
  try {
    loading.value = true
    rooms.value = await getAllRooms(0, 20)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadRooms)
</script>
```

### Trang Dashboard

```vue
<template>
  <div>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Tổng số phòng</h3>
        <p>{{ roomStats.totalRooms }}</p>
      </div>
      <div class="stat-card">
        <h3>Phòng khả dụng</h3>
        <p>{{ roomStats.availableRooms }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoomApi } from '~/composables/useRoomApi'
import { useReceptionApi } from '~/composables/useReceptionApi'

const { getRoomStatistics } = useRoomApi()
const { getReceptionDashboard } = useReceptionApi()

const roomStats = ref({})
const receptionData = ref({})

const loadDashboard = async () => {
  try {
    const [stats, reception] = await Promise.all([
      getRoomStatistics(),
      getReceptionDashboard()
    ])
    
    roomStats.value = stats
    receptionData.value = reception
  } catch (err) {
    console.error('Error loading dashboard:', err)
  }
}

onMounted(loadDashboard)
</script>
```

## Xử lý lỗi

Tất cả các function đều có xử lý lỗi tích hợp:

```typescript
try {
  const rooms = await getAllRooms()
  // Xử lý dữ liệu thành công
} catch (error) {
  // error.message chứa thông báo lỗi từ backend
  console.error('Error:', error.message)
  
  // Hiển thị lỗi cho người dùng
  showError(error.message)
}
```

## Best Practices

1. **Sử dụng try-catch**: Luôn wrap các API calls trong try-catch
2. **Loading states**: Hiển thị trạng thái loading khi gọi API
3. **Error handling**: Xử lý và hiển thị lỗi một cách thân thiện
4. **Parallel requests**: Sử dụng `Promise.all()` cho các API calls độc lập
5. **Type safety**: Sử dụng TypeScript types từ `~/types/room`

## Troubleshooting

### Lỗi kết nối

- Kiểm tra `API_GATEWAY_URL` trong environment variables
- Đảm bảo backend service đang chạy
- Kiểm tra CORS configuration

### Lỗi authentication

- Kiểm tra middleware auth
- Đảm bảo token được gửi đúng cách

### Lỗi validation

- Kiểm tra dữ liệu đầu vào
- Đảm bảo format đúng theo DTO requirements

## Liên hệ hỗ trợ

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra console logs
2. Kiểm tra Network tab trong DevTools
3. Xem backend logs
4. Tạo issue với thông tin chi tiết về lỗi
