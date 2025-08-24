<template>
  <div class="min-h-screen bg-system-gray-10 pt-20">
    <!-- Header Section -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-4 lg:mb-0">
            <h1 class="text-h2 text-system-gray-80 xl:text-h1 mb-2">
              Khám Phá Các Loại Phòng
            </h1>
            <p class="text-body text-system-gray-60">
              Chọn loại phòng phù hợp với nhu cầu của bạn
            </p>
          </div>
          
          <!-- Search and Filter Controls -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Search Input -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Tìm kiếm loại phòng..."
                class="w-full sm:w-80 pl-10 pr-4 py-2.5 border border-system-gray-40 rounded-lg bg-white focus:ring-2 focus:ring-system-primary-100/20 focus:border-system-primary-100 focus:outline-none transition-colors placeholder:text-system-gray-60"
                @input="updateSuggestions"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="ic:baseline-search" class="h-5 w-5 text-system-gray-60" />
              </div>
            </div>

            <!-- Sort Dropdown -->
            <select
              v-model="sortBy"
              class="px-4 py-2.5 border border-system-gray-40 rounded-lg bg-white focus:ring-2 focus:ring-system-primary-100/20 focus:border-system-primary-100 focus:outline-none transition-colors"
            >
              <option value="name">Sắp xếp theo tên</option>
              <option value="price">Sắp xếp theo giá</option>
              <option value="rating">Sắp xếp theo đánh giá</option>
              <option value="maxOccupancy">Sắp xếp theo sức chứa</option>
            </select>
          </div>
        </div>

        <!-- Search Suggestions -->
        <div v-if="suggestions.length > 0" class="mt-2">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="searchQuery = suggestion"
              class="px-3 py-1 bg-system-primary-10 text-system-primary-100 rounded-full text-body-sm cursor-pointer hover:bg-system-primary-20 transition-colors"
            >
              {{ suggestion }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-system-primary-100 mx-auto"></div>
        <p class="mt-4 text-body text-system-gray-60">Đang tải danh sách loại phòng...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center py-12">
      <div class="text-center">
        <Icon name="ic:baseline-error" class="h-12 w-12 text-red-500 mx-auto" />
        <p class="mt-4 text-body text-red-600">{{ error }}</p>
        <button
          @click="fetchRoomTypes"
          class="mt-4 rounded-lg bg-system-primary-100 px-4 py-2 text-body-sm font-medium text-white hover:bg-system-primary-120"
        >
          Thử lại
        </button>
      </div>
    </div>

    <!-- Room Types Grid -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-body text-system-gray-80">
          Hiển thị <span class="font-medium text-system-primary-100">{{ filteredRoomTypes.length }}</span> 
          loại phòng trong tổng số <span class="font-medium text-system-primary-100">{{ roomTypes.length }}</span>
        </p>
      </div>

      <!-- Grid Layout -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div
          v-for="roomType in sortedRoomTypes"
          :key="roomType.id"
          class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
          @click="navigateToRoomTypeDetails(roomType)"
        >
          <!-- Image Section -->
          <div class="relative h-64 rounded-t-xl overflow-hidden">
            <img
              :src="roomType.image"
              :alt="roomType.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <div class="absolute top-4 right-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  roomType.isAvailable
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                ]"
              >
                {{ roomType.isAvailable ? 'Có sẵn' : 'Hết phòng' }}
              </span>
            </div>
            <div class="absolute bottom-4 left-4">
              <div class="flex items-center space-x-1">
                <div class="flex text-yellow-400">
                  <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= roomType.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-white text-xs font-semibold ml-1">{{ roomType.rating }}/5</span>
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-6">
            <!-- Title and Price -->
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-h5 font-bold text-system-gray-80 line-clamp-2">{{ roomType.name }}</h3>
              <div class="text-right">
                <div class="text-h4 font-bold text-system-primary-100">{{ formatPrice(roomType.price) }}</div>
                <div v-if="roomType.discountPrice" class="text-body-sm text-system-gray-50 line-through">
                  {{ formatPrice(roomType.discountPrice) }}
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="text-body-sm text-system-gray-60 mb-4 line-clamp-2">{{ roomType.description }}</p>

            <!-- Key Features -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center text-body-sm text-system-gray-60">
                <Icon name="ic:baseline-person" class="w-4 h-4 mr-2 text-system-primary-100" />
                <span>Tối đa {{ roomType.maxOccupancy }} người</span>
              </div>
              <div class="flex items-center text-body-sm text-system-gray-60">
                <Icon name="ic:baseline-aspect-ratio" class="w-4 h-4 mr-2 text-system-primary-100" />
                <span>{{ roomType.areaInfo }}</span>
              </div>
              <div class="flex items-center text-body-sm text-system-gray-60">
                <Icon name="ic:baseline-bed" class="w-4 h-4 mr-2 text-system-primary-100" />
                <span>{{ roomType.bedInfo }}</span>
              </div>
            </div>

            <!-- Amenities Preview -->
            <div class="mb-4">
              <h4 class="text-body-sm font-semibold text-system-gray-70 mb-2">Tiện ích chính:</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(amenity, index) in roomType.amenityInfo.split(', ').slice(0, 3)"
                  :key="index"
                  class="px-2 py-1 bg-system-gray-20 text-system-gray-70 text-xs rounded-full"
                >
                  {{ amenity }}
                </span>
                <span v-if="roomType.amenityInfo.split(', ').length > 3" class="px-2 py-1 bg-system-primary-10 text-system-primary-100 text-xs rounded-full">
                  +{{ roomType.amenityInfo.split(', ').length - 3 }} nữa
                </span>
              </div>
            </div>

            <!-- Action Button -->
            <button
              class="w-full rounded-lg bg-system-primary-100 text-white py-3 px-4 text-body-sm font-medium hover:bg-system-primary-120 transition-all duration-200 transform hover:scale-105"
            >
              Xem các phòng thuộc loại này
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && !error && filteredRoomTypes.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-h4 font-bold text-system-gray-80 mb-4">Không tìm thấy loại phòng nào</h3>
        <p class="text-body text-system-gray-60 mb-6">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        <button
          @click="clearFilters"
          class="rounded-lg bg-system-primary-100 px-6 py-3 text-body-sm font-medium text-white hover:bg-system-primary-120"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoomApi } from '~/composables/useRoomApi'
import type { RoomTypeDisplay } from '~/types/room'
import { navigateTo } from '#app'

// Reactive state
const roomTypes = ref<RoomTypeDisplay[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const suggestions = ref<string[]>([])
const sortBy = ref('name')

// API composable
const { getAllRoomTypes } = useRoomApi()

// Computed properties
const filteredRoomTypes = computed(() => {
  if (!roomTypes.value || roomTypes.value.length === 0) {
    //.log('🔍 filteredRoomTypes: No room types to filter')
    return []
  }

  //.log('🔍 Filtering room types:', roomTypes.value.length, 'items')
  
  return roomTypes.value.filter((roomType) => {
    if (!roomType || typeof roomType.name !== 'string' || typeof roomType.description !== 'string') {
      //.warn('⚠️ Invalid room type data:', roomType)
      return false
    }

    const query = searchQuery.value.toLowerCase()
    const nameMatch = roomType.name.toLowerCase().includes(query)
    const descriptionMatch = roomType.description.toLowerCase().includes(query)
    
    //.log(`🔍 Room type "${roomType.name}": nameMatch=${nameMatch}, descriptionMatch=${descriptionMatch}`)
    
    return nameMatch || descriptionMatch
  })
})

const sortedRoomTypes = computed(() => {
  if (!filteredRoomTypes.value || filteredRoomTypes.value.length === 0) {
    return []
  }

  const sorted = [...filteredRoomTypes.value].sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return a.price - b.price
      case 'rating':
        return b.rating - a.rating
      case 'maxOccupancy':
        return b.maxOccupancy - a.maxOccupancy
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  //.log('📊 Sorted room types by:', sortBy.value, 'Result:', sorted.map(rt => rt.name))
  return sorted
})

// Methods
const fetchRoomTypes = async () => {
  try {
    //.log('🚀 Starting to fetch room types...')
    loading.value = true
    error.value = null
    
    const response = await getAllRoomTypes()
    //.log('✅ Raw API response:', response)
    
    if (response && Array.isArray(response)) {
      const transformed = transformRoomTypes(response)
      //.log('🔄 Transformed room types:', transformed)
      roomTypes.value = transformed
    } else {
      //.warn('⚠️ API response is not an array, using fallback data')
      roomTypes.value = getFallbackRoomTypes()
    }
  } catch (err) {
    //.error('❌ Error fetching room types:', err)
    error.value = 'Không thể tải dữ liệu từ server. Vui lòng thử lại sau.'
    roomTypes.value = getFallbackRoomTypes()
  } finally {
    loading.value = false
  }
}

const transformRoomTypes = (apiData: any[]): RoomTypeDisplay[] => {
  //.log('🔄 Transforming API data to RoomTypeDisplay format...')
  
  return apiData.map((item, index) => {
    //.log(`🔄 Transforming item ${index}:`, item)
    
    // Ensure required fields exist with fallbacks
    const name = item.typeName || item.name || `Loại phòng ${index + 1}`
    const description = item.description || `Mô tả cho ${name}`
    
    //.log(`✅ Transformed: name="${name}", description="${description}"`)
    
    return {
      id: item.typeId || item.id || `fallback-${index}`, // Sử dụng typeId từ backend trước
      name: name,
      description: description,
      price: item.basePrice || item.price || 1000000,
      maxOccupancy: item.maxOccupancy || 2,
      area: item.area || 25,
      image: getHardcodedImage(index),
      areaInfo: `${item.area || 25}m²`,
      bedInfo: getBedInfoByType(name, item.maxOccupancy || 2),
      layoutInfo: getLayoutInfoByType(name),
      facilityInfo: getFacilityInfoByType(name),
      amenityInfo: getAmenitiesByType(name),
      typeName: name,
      basePrice: item.basePrice || item.price || 1000000,
      discountPrice: item.discountPrice,
      isAvailable: true,
      rating: Math.floor(Math.random() * 2) + 4, // Random 4-5 stars
      reviewCount: Math.floor(Math.random() * 100) + 10,
      tags: getTagsByType(name)
    }
  })
}

const getHardcodedImage = (index: number): string => {
  const images = [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-60396e136bde?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-60396e136bde?w=800&h=600&fit=crop'
  ]
  return images[index % images.length]
}

const getBedInfoByType = (typeName: string, maxOccupancy: number): string => {
  const type = typeName.toLowerCase()
  if (type.includes('single')) return '1 giường đơn'
  if (type.includes('double')) return '1 giường đôi'
  if (type.includes('twin')) return '2 giường đơn'
  if (type.includes('triple')) return '3 giường đơn'
  if (type.includes('family')) return `${maxOccupancy} giường đơn + 1 giường đôi`
  if (type.includes('suite')) return '1 giường đôi king + sofa bed'
  if (type.includes('deluxe')) return '1 giường đôi king size'
  return `${maxOccupancy} giường đơn`
}

const getLayoutInfoByType = (typeName: string): string => {
  const type = typeName.toLowerCase()
  if (type.includes('suite')) return 'Phòng khách riêng biệt + Phòng ngủ'
  if (type.includes('deluxe')) return 'Phòng ngủ rộng rãi + Ban công'
  if (type.includes('family')) return 'Phòng ngủ chính + Phòng phụ'
  return 'Phòng ngủ tiêu chuẩn'
}

const getFacilityInfoByType = (typeName: string): string => {
  const type = typeName.toLowerCase()
  if (type.includes('suite')) return 'Phòng khách, Phòng ngủ, Phòng tắm riêng'
  if (type.includes('deluxe')) return 'Phòng ngủ, Phòng tắm, Ban công'
  if (type.includes('family')) return 'Phòng ngủ chính, Phòng phụ, Phòng tắm chung'
  return 'Phòng ngủ, Phòng tắm'
}

const getAmenitiesByType = (typeName: string): string => {
  const type = typeName.toLowerCase()
  const baseAmenities = 'WiFi, TV, Điều hòa, Tủ lạnh, Ấm đun nước'
  
  if (type.includes('suite')) {
    return `${baseAmenities}, Mini bar, Bồn tắm, Dịch vụ phòng, Bữa sáng miễn phí`
  }
  if (type.includes('deluxe')) {
    return `${baseAmenities}, Mini bar, Bồn tắm, Dịch vụ phòng`
  }
  if (type.includes('family')) {
    return `${baseAmenities}, Phòng tắm chung, Khu vực sinh hoạt`
  }
  return baseAmenities
}

const getTagsByType = (typeName: string): string[] => {
  const type = typeName.toLowerCase()
  const tags = ['WiFi', 'TV', 'Điều hòa']
  
  if (type.includes('suite')) tags.push('Premium', 'Luxury', 'Suite')
  if (type.includes('deluxe')) tags.push('Deluxe', 'Comfort')
  if (type.includes('family')) tags.push('Family', 'Spacious')
  if (type.includes('single')) tags.push('Single', 'Compact')
  if (type.includes('double')) tags.push('Double', 'Couple')
  
  return tags
}

const getFallbackRoomTypes = (): RoomTypeDisplay[] => {
  //.log('🔄 Using fallback room types data')
  return [
    {
      id: 'fallback-1',
      name: 'Phòng Đơn Tiêu Chuẩn',
      description: 'Phòng đơn với đầy đủ tiện nghi cơ bản, phù hợp cho khách du lịch một mình',
      price: 800000,
      maxOccupancy: 1,
      area: 20,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop',
      areaInfo: '20m²',
      bedInfo: '1 giường đơn',
      layoutInfo: 'Phòng ngủ tiêu chuẩn',
      facilityInfo: 'Phòng ngủ, Phòng tắm',
      amenityInfo: 'WiFi, TV, Điều hòa, Tủ lạnh, Ấm đun nước',
      typeName: 'Phòng Đơn Tiêu Chuẩn',
      basePrice: 800000,
      isAvailable: true,
      rating: 4,
      reviewCount: 45,
      tags: ['Single', 'Compact', 'WiFi', 'TV', 'Điều hòa']
    },
    {
      id: 'fallback-2',
      name: 'Phòng Đôi Deluxe',
      description: 'Phòng đôi cao cấp với không gian rộng rãi và view đẹp',
      price: 1500000,
      maxOccupancy: 2,
      area: 35,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      areaInfo: '35m²',
      bedInfo: '1 giường đôi king size',
      layoutInfo: 'Phòng ngủ rộng rãi + Ban công',
      facilityInfo: 'Phòng ngủ, Phòng tắm, Ban công',
      amenityInfo: 'WiFi, TV, Điều hòa, Tủ lạnh, Ấm đun nước, Mini bar, Bồn tắm, Dịch vụ phòng',
      typeName: 'Phòng Đôi Deluxe',
      basePrice: 1500000,
      isAvailable: true,
      rating: 5,
      reviewCount: 78,
      tags: ['Deluxe', 'Comfort', 'WiFi', 'TV', 'Điều hòa']
    }
  ]
}

const updateSuggestions = () => {
  if (!roomTypes.value || roomTypes.value.length === 0) return
  
  const query = searchQuery.value.toLowerCase()
  if (query.length < 2) {
    suggestions.value = []
    return
  }

  const allNames = roomTypes.value
    .filter(rt => rt && rt.name && typeof rt.name === 'string')
    .map(rt => rt.name)
  
  const allDescriptions = roomTypes.value
    .filter(rt => rt && rt.description && typeof rt.description === 'string')
    .map(rt => rt.description)

  const matches = [...allNames, ...allDescriptions]
    .filter(text => text.toLowerCase().includes(query))
    .slice(0, 5)

  suggestions.value = [...new Set(matches)]
}

const navigateToRoomTypeDetails = (roomType: RoomTypeDisplay) => {
  //.log('🚀 Navigating to room type details:', roomType.name)
  
  // Tạo URL với query parameter để truyền thông tin room type
  const queryParams = new URLSearchParams({
    typeId: roomType.id,
    typeName: roomType.name,
    maxOccupancy: roomType.maxOccupancy.toString(),
    area: roomType.area.toString()
  })
  
  //.log('📋 Query parameters:', queryParams.toString())
  
  // Chuyển đến trang hiển thị các phòng thuộc loại này
  navigateTo(`/rooms/type-details?${queryParams.toString()}`)
}

const clearFilters = () => {
  searchQuery.value = ''
  sortBy.value = 'name'
  suggestions.value = []
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

// Lifecycle
onMounted(() => {
  //.log('🚀 Room Types page mounted, fetching data...')
  fetchRoomTypes()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
