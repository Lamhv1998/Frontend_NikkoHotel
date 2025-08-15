<template>
  <div class="min-h-screen bg-[#140F0A] p-4">
    <div class="max-w-4xl mx-auto space-y-8">
      
      <!-- Header Section -->
      <div class="text-center py-8">
        <!-- <h1 class="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
          Hạng Thành Viên
        </h1> -->
        <p class="text-gray-300">Theo dõi tiến trình và phần thưởng của bạn</p>
      </div>

      <!-- Main Membership Card -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/20 backdrop-blur-sm">
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 p-8 text-white relative overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-3xl font-bold mb-2">{{ member.level }}</h2>
                <p class="text-amber-100">Hạng thành viên hiện tại</p>
              </div>
              <div class="text-right">
                <div class="text-4xl font-bold">{{ member.points }}</div>
                <p class="text-amber-100">điểm tích lũy</p>
              </div>
            </div>
            
            <!-- Progress Section -->
            <div class="space-y-3">
              <div class="flex justify-between text-sm text-amber-100">
                <span>Tiến độ lên hạng</span>
                <span>{{ member.nextLevelPoint - member.points }} điểm nữa</span>
              </div>
              <ProgressBar :current="member.points" :nextLevel="member.nextLevelPoint" />
            </div>
          </div>
        </div>

        <!-- Benefits Section -->
        <div class="p-8 bg-gray-900/50">
          <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
            Đặc quyền thành viên
          </h3>
          
          <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-emerald-900/80 to-green-800/80 p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-sm">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h4 class="font-semibold text-white mb-2">Giảm giá 10%</h4>
              <p class="text-gray-300 text-sm">Áp dụng cho tất cả dịch vụ</p>
            </div>
            
            <div class="bg-gradient-to-br from-blue-900/80 to-cyan-800/80 p-6 rounded-2xl border border-blue-500/30 backdrop-blur-sm">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h4 class="font-semibold text-white mb-2">Ưu tiên đặt phòng</h4>
              <p class="text-gray-300 text-sm">Đặt phòng trước 24h</p>
            </div>
            
            <div class="bg-gradient-to-br from-purple-900/80 to-pink-800/80 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h4 class="font-semibold text-white mb-2">Dịch vụ đặc biệt</h4>
              <p class="text-gray-300 text-sm">Spa & massage miễn phí</p>
            </div>
          </div>
        </div>
      </div>

            <!-- Next Level Preview -->
      <div class="bg-gradient-to-r from-amber-900/80 via-yellow-900/80 to-orange-900/80 rounded-3xl p-8 border border-amber-500/30 backdrop-blur-sm">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-amber-300 mb-4">🏆 Hạng tiếp theo: Vàng</h3>
          <p class="text-amber-200 mb-6">Chỉ cần thêm {{ member.nextLevelPoint - member.points }} điểm nữa để lên hạng!</p>
          <div class="flex justify-center space-x-6 text-sm text-amber-200">
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Giảm giá 15%
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Phòng VIP miễn phí
            </div>
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              Butler cá nhân
            </div>
          </div>
        </div>
      </div>

      <!-- Point History Section -->
      <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-xl overflow-hidden border border-amber-500/20 backdrop-blur-sm">
        <div class="p-8">
          <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Lịch sử điểm thưởng
          </h3>
          
          <div class="space-y-4">
            <div v-for="(item, index) in member.pointHistory" :key="index" 
                 class="flex items-center justify-between p-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-2xl border border-amber-500/20 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-white">{{ item.note }}</p>
                  <p class="text-gray-400 text-sm">{{ formatDate(item.date) }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-emerald-400">+{{ item.point }}</div>
                <p class="text-gray-400 text-sm">điểm</p>
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

const member = reactive({
  level: 'Bạc',
  points: 320,
  nextLevelPoint: 500,
  pointHistory: [
    { date: '2025-05-20', point: 50, note: 'Đặt phòng thành công' },
    { date: '2025-05-10', point: 30, note: 'Đánh giá khách sạn' },
    { date: '2025-05-05', point: 25, note: 'Check-in đúng giờ' },
    { date: '2025-04-28', point: 100, note: 'Đặt phòng premium' },
    { date: '2025-04-20', point: 15, note: 'Chia sẻ trên mạng xã hội' }
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