<template>
  <div class="h-full overflow-hidden bg-white">
    <!-- Ảnh phòng -->
    <div class="relative overflow-hidden">
      <img 
        :src="room.image || '/img/room-placeholder.jpg'" 
        :alt="room.name"
        class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
      
      <!-- Badge loại phòng -->
      <div class="absolute top-4 right-4">
        <span class="rounded-full bg-system-primary-100 px-3 py-1 text-xs font-semibold text-white">
          {{ getRoomType(room.price) }}
        </span>
      </div>
      
      <!-- Badge đánh giá -->
      <div class="absolute top-4 left-4">
        <span class="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-800 flex items-center gap-1">
          <span class="text-yellow-500">⭐</span>
          {{ room.rating }}
        </span>
      </div>
      
      <!-- Badge số người -->
      <div v-if="room.maxPeople > 2" class="absolute top-16 left-4">
        <span class="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
          👥 {{ room.maxPeople }} người
        </span>
      </div>
    </div>
    
    <!-- Thông tin phòng -->
    <div class="space-y-4 p-6">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-bold text-gray-800 line-clamp-2">{{ room.name }}</h3>
        <span class="ml-2 text-xl font-bold text-system-primary-100">
          {{ formatPrice(room.price) }}
        </span>
      </div>
      
      <p class="text-sm text-gray-600 line-clamp-2">{{ room.description }}</p>
      
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span class="flex items-center gap-1">
          <span class="text-system-primary-100">📏</span>
          {{ room.areaInfo }}
        </span>
        <span class="flex items-center gap-1">
          <span class="text-system-primary-100">🛏️</span>
          {{ room.bedInfo }}
        </span>
      </div>

      <div class="flex gap-3">
        <button 
          class="flex-1 rounded-lg bg-system-primary-100 px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-system-primary-80 hover:shadow-lg"
          @click="handleBooking"
        >
          🏨 Đặt phòng
        </button>
        <button 
          class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-system-primary-100"
          @click="toggleFavorite(room._id)"
        >
          <span :class="favorites.includes(room._id) ? 'text-red-500' : 'text-gray-400'">
            {{ favorites.includes(room._id) ? '❤️' : '🤍' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Room {
  _id: string
  name: string
  description: string
  areaInfo: string
  bedInfo: string
  maxPeople: number
  price: number
  amenities: string[]
  rating: number
  reviews: number
  image?: string
}

const props = defineProps<{
  room: Room
}>()

// State cho favorites
const favorites = ref<string[]>([])

// Xác định loại phòng dựa trên giá
const getRoomType = (price: number) => {
  if (price >= 4000000) return 'Premium'
  if (price >= 2500000) return 'Deluxe'
  if (price >= 1500000) return 'Standard'
  return 'Basic'
}

// Format giá tiền
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price)
}

// Toggle favorite
const toggleFavorite = (roomId: string) => {
  const index = favorites.value.indexOf(roomId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(roomId)
  }
}

// Đặt phòng
const handleBooking = () => {
  // Booking logic will be implemented when API is ready
  // Navigate to booking page
  navigateTo(`/reserve/${room._id}`)
}
</script>

<style lang="scss" scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.transition-opacity {
  transition: opacity 0.3s ease-in-out;
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

/* Backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>