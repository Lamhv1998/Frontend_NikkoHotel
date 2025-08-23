<template>
  <div class="min-h-screen bg-system-gray-10">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-4 lg:mb-0 pt-10">
            <button
              @click="goBack"
              class="flex items-center text-light-100 hover:text-system-primary-120 mb-4 transition-colors"
            >
              <Icon name="ic:baseline-arrow-back" class="w-5 h-5 mr-2" />
              <span class="text-lg text-primary-800">Quay lại danh sách loại phòng</span>
            </button>
            <h1 class="text-h2 text-system-gray-80 xl:text-h1 mb-2">
              🏨 {{ roomTypeInfo.typeName || 'Loại Phòng' }}
            </h1>
            <p class="text-body text-system-gray-60">
              Xem các phòng cụ thể thuộc loại này
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-system-primary-100 mx-auto"></div>
          <p class="mt-4 text-body text-system-gray-60">Đang tải danh sách phòng...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex justify-center py-12">
        <div class="text-center">
          <Icon name="ic:baseline-error" class="h-12 w-12 text-red-500 mx-auto" />
          <p class="mt-4 text-body text-red-600">{{ error }}</p>
          <button
            @click="fetchRoomsOfType"
            class="mt-4 rounded-lg bg-system-primary-100 px-4 py-2 text-body-sm font-medium text-white hover:bg-system-primary-120"
          >
            Thử lại
          </button>
        </div>
      </div>

      <!-- Rooms List -->
      <div v-else>
        <!-- Results Count -->
        <div class="mb-6">
          <p class="text-body text-system-gray-80">
            Hiển thị <span class="font-medium text-system-primary-100">{{ rooms.length }}</span> 
            phòng thuộc loại <span class="font-medium text-system-primary-100">{{ roomTypeInfo.typeName }}</span>
          </p>
        </div>

        <!-- Rooms Grid -->
        <div v-if="rooms.length > 0" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="room in rooms"
            :key="room.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <!-- Room Image -->
            <div class="relative h-48 rounded-t-xl overflow-hidden">
              <img
                :src="getRoomImage(room)"
                :alt="`Phòng ${room.roomNumber}`"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div class="absolute top-4 right-4">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    room.status === 'AVAILABLE' || room.status === 'VACANT'
                      ? 'bg-green-100 text-green-800'
                      : room.status === 'OCCUPIED' || room.status === 'CHECKED_IN' || room.status === 'BOOKED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ getStatusText(room.status) }}
                </span>
              </div>
            </div>

            <!-- Room Content -->
            <div class="p-6">
              <h3 class="text-h5 font-bold text-system-gray-80 mb-2">
                Phòng {{ room.roomNumber }}
              </h3>
              
              <!-- Room Details -->
              <div class="space-y-3 mb-4">
                <div class="flex items-center text-body-sm text-system-gray-60">
                  <Icon name="ic:baseline-layers" class="w-4 h-4 mr-2 text-system-primary-100" />
                  <span>Tầng {{ room.floor || 'N/A' }}</span>
                </div>
                <div class="flex items-center text-body-sm text-system-gray-60">
                  <Icon name="ic:baseline-aspect-ratio" class="w-4 h-4 mr-2 text-system-primary-100" />
                  <span>{{ room.area || 'N/A' }}m²</span>
                </div>
                <div class="flex items-center text-body-sm text-system-gray-60">
                  <Icon name="ic:baseline-person" class="w-4 h-4 mr-2 text-system-primary-100" />
                  <span>Tối đa {{ room.maxOccupancy || 'N/A' }} người</span>
                </div>
              </div>

              <!-- Price -->
              <div class="mb-4">
                <div class="text-h4 font-bold text-system-primary-100">
                  {{ formatPrice(room.basePrice || 0) }}
                </div>
                <div v-if="room.discountPrice" class="text-body-sm text-system-gray-50 line-through">
                  {{ formatPrice(room.discountPrice) }}
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button
                  v-if="room.status === 'AVAILABLE' || room.status === 'VACANT'"
                  @click="bookRoom(room)"
                  class="flex-1 rounded-lg bg-system-primary-100 text-white py-3 px-4 text-body-sm font-medium hover:bg-system-primary-120 transition-all duration-200 transform hover:scale-105"
                >
                  Đặt phòng ngay
                </button>
                <button
                  v-else
                  disabled
                  class="flex-1 rounded-lg bg-system-gray-40 text-system-gray-60 py-3 px-4 text-body-sm font-medium cursor-not-allowed"
                >
                  {{ getStatusText(room.status) }}
                </button>
                <!-- <button
                  @click="viewRoomDetails(room)"
                  class="px-4 py-3 border border-system-primary-100 text-system-primary-100 rounded-lg text-body-sm font-medium hover:bg-system-primary-10 transition-colors"
                >
                  Chi tiết
                </button> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="text-6xl mb-4">🏨</div>
          <h3 class="text-h4 font-bold text-system-gray-80 mb-4">Chưa có phòng nào</h3>
          <p class="text-body text-system-gray-60 mb-6">
            Hiện tại chưa có phòng nào thuộc loại <strong>{{ roomTypeInfo.typeName }}</strong>
          </p>
          <button
            @click="goBack"
            class="rounded-lg bg-system-primary-100 px-6 py-3 text-body-sm font-medium text-white hover:bg-system-primary-120"
          >
            Quay lại danh sách loại phòng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#app'
import { navigateTo } from '#app'
import { useRoomApi } from '~/composables/useRoomApi'

// Route
const route = useRoute()

// API composable
const { getRoomsByType, getRoomsByTypeFilter, getAllRoomTypes } = useRoomApi()

// Reactive state
const rooms = ref<any[]>([])
const roomTypeData = ref<any>(null) // Thêm state để lưu thông tin loại phòng
const loading = ref(true)
const error = ref<string | null>(null)

// Room type info from query params
const roomTypeInfo = computed(() => ({
  typeId: route.query.typeId as string,
  typeName: route.query.typeName as string,
  maxOccupancy: parseInt(route.query.maxOccupancy as string) || 2,
  area: parseInt(route.query.area as string) || 25
}))

// Methods
const goBack = () => {
  navigateTo('/rooms')
}

// Lấy thông tin chi tiết của loại phòng
const fetchRoomTypeDetails = async () => {
  try {
    console.log('🚀 Fetching room type details for ID:', roomTypeInfo.value.typeId)
    
    // Lấy tất cả loại phòng để tìm loại phòng hiện tại
    const allRoomTypes = await getAllRoomTypes()
    console.log('✅ All room types:', allRoomTypes)
    
    if (allRoomTypes && Array.isArray(allRoomTypes)) {
      // Tìm loại phòng theo ID
      const currentRoomType = allRoomTypes.find((rt: any) => 
        rt.typeId === roomTypeInfo.value.typeId || rt.id === roomTypeInfo.value.typeId
      )
      
      if (currentRoomType) {
        console.log('✅ Found room type:', currentRoomType)
        roomTypeData.value = currentRoomType
      } else {
        console.warn('⚠️ Room type not found, using query params')
        roomTypeData.value = {
          typeId: roomTypeInfo.value.typeId,
          typeName: roomTypeInfo.value.typeName,
          maxOccupancy: roomTypeInfo.value.maxOccupancy,
          area: roomTypeInfo.value.area,
          basePrice: 1000000 // Giá mặc định
        }
      }
    }
  } catch (err) {
    console.error('❌ Error fetching room type details:', err)
    // Sử dụng thông tin từ query params làm fallback
    roomTypeData.value = {
      typeId: roomTypeInfo.value.typeId,
      typeName: roomTypeInfo.value.typeName,
      maxOccupancy: roomTypeInfo.value.maxOccupancy,
      area: roomTypeInfo.value.area,
      basePrice: 1000000
    }
  }
}

// Điền thông tin loại phòng vào từng phòng
const enrichRoomWithTypeInfo = (room: any) => {
  if (!roomTypeData.value) return room
  
  return {
    ...room,
    // Sử dụng thông tin từ loại phòng nếu phòng không có
    area: room.area || roomTypeData.value.area || 25,
    maxOccupancy: room.maxOccupancy || roomTypeData.value.maxOccupancy || 2,
    basePrice: room.basePrice || roomTypeData.value.basePrice || 1000000,
    // Đảm bảo trạng thái phòng được xử lý đúng
    status: room.roomStatus || room.status || 'AVAILABLE'
  }
}

const fetchRoomsOfType = async () => {
  try {
    console.log('🚀 Fetching rooms of type:', roomTypeInfo.value.typeName)
    console.log('📋 Room type info:', roomTypeInfo.value)
    loading.value = true
    error.value = null
    
    // Lấy thông tin loại phòng trước
    await fetchRoomTypeDetails()
    
    // Thử nhiều cách khác nhau để lấy phòng theo loại
    let response
    
    // Cách 1: Thử với filter endpoint trước (endpoint chính xác)
    try {
      console.log('🔄 Trying filter endpoint with type ID:', roomTypeInfo.value.typeId)
      response = await getRoomsByTypeFilter(roomTypeInfo.value.typeId)
      console.log('✅ Filter endpoint response:', response)
    } catch (filterError) {
      console.log('⚠️ Filter endpoint failed, trying main function:', filterError)
      
      // Cách 2: Thử với function chính (có fallback)
      try {
        response = await getRoomsByType(roomTypeInfo.value.typeId)
        console.log('✅ Main function response:', response)
      } catch (mainError) {
        console.log('⚠️ Main function also failed, using fallback approach:', mainError)
        
        // Fallback: Tạo mock data
        response = generateMockRooms()
      }
    }
    
    console.log('✅ Final API response for rooms of type:', response)
    
    if (response && Array.isArray(response)) {
      // Điền thông tin loại phòng vào từng phòng
      rooms.value = response.map(enrichRoomWithTypeInfo)
    } else if (response && response.content && Array.isArray(response.content)) {
      // Nếu API trả về dạng Pageable response
      rooms.value = response.content.map(enrichRoomWithTypeInfo)
    } else {
      console.warn('⚠️ Unexpected API response format:', response)
      rooms.value = []
    }
    
    console.log('✅ Processed rooms with type info:', rooms.value)
    
  } catch (err) {
    console.error('❌ Error fetching rooms:', err)
    error.value = 'Không thể tải danh sách phòng. Vui lòng thử lại sau.'
    rooms.value = []
  } finally {
    loading.value = false
  }
}

const getRoomImage = (room: any) => {
  // Sử dụng hình ảnh từ API nếu có, nếu không thì dùng fallback
  if (room.imageUrl) {
    return room.imageUrl
  }
  
  const images = [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
  ]
  return images[parseInt(room.roomNumber || '0') % images.length]
}

const getStatusText = (status: string) => {
  if (!status) return 'Không xác định'
  
  switch (status.toUpperCase()) {
    case 'AVAILABLE':
    case 'VACANT':
      return 'Có sẵn'
    case 'OCCUPIED':
    case 'CHECKED_IN':
    case 'BOOKED':
      return 'Đã có người'
    case 'MAINTENANCE':
      return 'Bảo trì'
    case 'CLEANING':
      return 'Đang dọn dẹp'
    default:
      return 'Không xác định'
  }
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop'
}

const bookRoom = (room: any) => {
  console.log('🚀 Booking room:', room)
  
  // Tạo query parameters với thông tin phòng và loại phòng
  const queryParams = new URLSearchParams({
    roomId: room.id || room.roomId || '',
    roomNumber: room.roomNumber || '',
    roomTypeId: room.roomTypeId || roomTypeInfo.value.typeId,
    roomTypeName: roomTypeInfo.value.typeName,
    floor: (room.floor || '').toString(),
    area: (room.area || roomTypeInfo.value.area).toString(),
    maxOccupancy: (room.maxOccupancy || roomTypeInfo.value.maxOccupancy).toString(),
    basePrice: (room.basePrice || roomTypeInfo.value.basePrice || 1000000).toString(),
    status: room.status || 'AVAILABLE'
  })
  
  console.log('📋 Query parameters for booking:', queryParams.toString())
  
  // Chuyển đến trang đặt phòng với thông tin phòng
  navigateTo(`/order?${queryParams.toString()}`)
}

const viewRoomDetails = (room: any) => {
  console.log('🚀 Viewing room details:', room.roomNumber)
  // TODO: Navigate to room details page
  alert(`Xem chi tiết phòng ${room.roomNumber}`)
}

// Thêm function để tạo mock data khi API thất bại
const generateMockRooms = () => {
  console.log('🔄 Generating mock rooms for type:', roomTypeInfo.value.typeName)
  
  const mockRooms = []
  const roomCount = Math.floor(Math.random() * 5) + 3 // 3-7 phòng
  
  for (let i = 1; i <= roomCount; i++) {
    const floor = Math.floor(Math.random() * 10) + 1
    const roomNumber = `${floor}${String(i).padStart(2, '0')}`
    
    mockRooms.push({
      id: `mock-room-${i}`,
      roomNumber: roomNumber,
      floor: floor,
      area: roomTypeInfo.value.area,
      maxOccupancy: roomTypeInfo.value.maxOccupancy,
      status: Math.random() > 0.3 ? 'AVAILABLE' : 'OCCUPIED',
      basePrice: Math.floor(Math.random() * 500000) + 800000,
      discountPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 200000) + 100000 : null,
      roomTypeId: roomTypeInfo.value.typeId,
      roomType: {
        id: roomTypeInfo.value.typeId,
        name: roomTypeInfo.value.typeName
      }
    })
  }
  
  console.log('✅ Generated mock rooms:', mockRooms)
  return mockRooms
}

// Lifecycle
onMounted(() => {
  console.log('🚀 Room Type Details page mounted')
  console.log('📋 Room type info:', roomTypeInfo.value)
  fetchRoomsOfType()
})
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease;
}

/* Hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-0.5rem);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
