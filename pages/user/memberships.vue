<template>
  <div class="min-h-screen bg-[rgb(225,209,194)] relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full translate-x-48 -translate-y-48"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-yellow-600/10 rounded-full -translate-x-40 translate-y-40"></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10 p-6">
      <!-- Header Section -->
      <div class="text-center py-12 mb-12">
        <div class="relative">
          <!-- Decorative line above title -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
          
          <h1 class="text-5xl xl:text-6xl font-bold text-amber-800 mb-6 mt-8 leading-tight">
            👑 Hạng thành viên
          </h1>
          
          <!-- Decorative line below title -->
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
        
        <p class="text-amber-700 text-xl xl:text-2xl max-w-3xl mx-auto leading-relaxed">
          Khám phá các đặc quyền và lợi ích dành cho thành viên tại Nikko Luxury Hotel
        </p>
      </div>

      <!-- Current Membership Status -->
      <div class="mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="ic:baseline-star" class="text-2xl text-white" />
              </div>
              Trạng thái hiện tại
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Current Level -->
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="ic:baseline-emoji-events" class="text-4xl text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ member.level }}</h3>
                <p class="text-gray-600">Hạng thành viên</p>
              </div>

              <!-- Current Points -->
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="ic:baseline-stars" class="text-4xl text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ member.points }}</h3>
                <p class="text-gray-600">Điểm tích lũy</p>
              </div>

              <!-- Next Level -->
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Icon name="ic:baseline-trending-up" class="text-4xl text-white" />
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ member.nextLevelPoint - member.points }}</h3>
                <p class="text-gray-600">Điểm cần để lên hạng</p>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mt-8">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>Tiến độ: {{ member.points }} / {{ member.nextLevelPoint }}</span>
                <span>{{ Math.round((member.points / member.nextLevelPoint) * 100) }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div 
                  class="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500"
                  :style="{ width: `${(member.points / member.nextLevelPoint) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Membership Benefits -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
          <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Icon name="ic:baseline-card-giftcard" class="text-2xl text-white" />
            </div>
            Quyền lợi thành viên
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="benefit in member.benefits" :key="benefit.title" class="group/benefit relative">
              <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent rounded-2xl opacity-0 group-hover/benefit:opacity-100 transition-all duration-300"></div>
              <div class="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-md" :class="`bg-gradient-to-br from-${benefit.color}-500 to-${benefit.color}-600`">
                    <Icon :name="benefit.icon" class="text-2xl text-white" />
                  </div>
                  <h3 class="text-lg font-bold text-gray-800">{{ benefit.title }}</h3>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">{{ benefit.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

/* PageMeta */
definePageMeta({
  layout: 'user',
  // middleware: 'auth'  // COMMENT DÒNG NÀY ĐỂ TẠM THỜI BYPASS AUTH
})

// Mock data cho demo
const member = ref({
  level: 'Silver',
  points: 1250,
  nextLevelPoint: 2000,
  benefits: [
    {
      title: 'Giảm giá 15%',
      description: 'Áp dụng cho tất cả dịch vụ',
      icon: '💰',
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: 'Ưu tiên đặt phòng',
      description: 'Đặt phòng trước 24h',
      icon: '🏨',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Dịch vụ đặc biệt',
      description: 'Spa & massage miễn phí',
      icon: '💆',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Check-in sớm',
      description: 'Check-in từ 12:00',
      icon: '⏰',
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Late checkout',
      description: 'Check-out đến 15:00',
      icon: '🕒',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Welcome drink',
      description: 'Cocktail chào mừng miễn phí',
      icon: '🍹',
      color: 'from-red-500 to-pink-600'
    }
  ]
})

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  }
  return date.toLocaleDateString('vi-VN', options)
}
</script>