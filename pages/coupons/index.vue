<template>
  <div class="min-h-screen bg-[#140F0A] p-4">
    <div class="max-w-7xl mx-auto space-y-8">

      <!-- Header Section -->
      <div class="text-center py-8">
        <h1
          class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
          Săn Coupon Miễn Phí
        </h1>
        <p class="text-gray-300 text-lg">Nhận ngay các coupon hấp dẫn chỉ với một cú click!</p>
        <div
          class="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-full border border-amber-500/30">
          <svg class="w-5 h-5 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
            </path>
          </svg>
          <span class="text-amber-300 text-sm font-medium">{{ collectedCount }}/{{ totalCoupons }} coupon đã thu
            thập</span>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex justify-center mb-8">
        <div class="bg-gray-800/50 rounded-2xl p-2 backdrop-blur-sm border border-gray-600/30">
          <div class="flex space-x-2">
            <button v-for="tab in filterTabs" :key="tab.key" @click="activeFilter = tab.key" :class="[
              'px-6 py-3 rounded-xl font-medium transition-all duration-300',
              activeFilter === tab.key
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            ]">
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Coupons Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="coupon in filteredCoupons" :key="coupon.id" class="group relative">
          <!-- Coupon Card -->
          <div
            class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-amber-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-amber-500/20">

            <!-- Discount Badge -->
            <div class="absolute top-4 right-4 z-10">
              <div :class="[
                'px-4 py-2 rounded-full text-white font-bold text-lg shadow-lg',
                coupon.type === 'percentage' ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-green-500 to-emerald-600'
              ]">
                {{ coupon.type === 'percentage' ? `-${coupon.value}%` : `-${coupon.value.toLocaleString()}đ` }}
              </div>
            </div>

            <!-- Limited Badge -->
            <div v-if="coupon.isLimited" class="absolute top-4 left-4 z-10">
              <div
                class="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white text-xs font-bold animate-pulse">
                {{ coupon.remaining }} còn lại
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6 pt-16">
              <div class="flex items-center mb-4">
                <div :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg',
                  `bg-gradient-to-br ${coupon.iconBg}`
                ]">
                  <div class="text-2xl">{{ coupon.icon }}</div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white mb-1">{{ coupon.title }}</h3>
                  <p class="text-gray-400 text-sm">{{ coupon.category }}</p>
                </div>
              </div>

              <p class="text-gray-300 mb-4">{{ coupon.description }}</p>

              <!-- Conditions -->
              <div class="space-y-2 mb-6">
                <div class="flex items-center text-sm text-gray-400">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Hết hạn: {{ formatDate(coupon.expiry) }}
                </div>
                <div v-if="coupon.minOrder" class="flex items-center text-sm text-gray-400">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z">
                    </path>
                  </svg>
                  Đơn tối thiểu: {{ coupon.minOrder.toLocaleString() }}đ
                </div>
              </div>

              <!-- Action Button -->
              <button @click="collectCoupon(coupon)"
                :disabled="coupon.isCollected || (coupon.isLimited && coupon.remaining <= 0)" :class="[
                  'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg',
                  coupon.isCollected
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : coupon.isLimited && coupon.remaining <= 0
                      ? 'bg-red-800 text-red-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 hover:scale-105 hover:shadow-amber-500/30'
                ]">
                <span v-if="coupon.isCollected" class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
                  </svg>
                  Đã thu thập
                </span>
                <span v-else-if="coupon.isLimited && coupon.remaining <= 0">
                  Hết lượt
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Thu thập ngay
                </span>
              </button>
            </div>

            <!-- Decorative Elements -->
            <div
              class="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity">
            </div>
            <div
              class="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity">
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCoupons.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-400 mb-2">Không có coupon nào</h3>
        <p class="text-gray-500">Hãy thử lọc theo danh mục khác</p>
      </div>

      <!-- Success Toast -->
      <Transition name="slide-up">
        <div v-if="showToast"
          class="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-4 rounded-2xl shadow-2xl border border-green-500/30 backdrop-blur-sm z-50">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-bold">Thu thập thành công!</p>
              <p class="text-sm text-green-100">Coupon đã được thêm vào ví của bạn</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// /* PageMeta */
// definePageMeta({
//   layout: 'user',
//   // middleware: 'auth'  // Comment để test
// })

// Filter state
const activeFilter = ref('all')
const showToast = ref(false)

const filterTabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'food', label: 'Ẩm thực' },
  { key: 'room', label: 'Phòng' },
  { key: 'spa', label: 'Spa & Wellness' },
  { key: 'special', label: 'Đặc biệt' }
]

// Sample coupons data
const coupons = reactive([
  {
    id: 1,
    title: 'Giảm giá buffet',
    description: 'Thưởng thức buffet cao cấp với giá ưu đãi',
    category: 'food',
    type: 'percentage',
    value: 25,
    icon: '🍽️',
    iconBg: 'from-red-500 to-pink-600',
    expiry: '2025-06-30',
    minOrder: 500000,
    isLimited: true,
    remaining: 15,
    isCollected: false
  },
  {
    id: 2,
    title: 'Miễn phí upgrade phòng',
    description: 'Nâng cấp phòng Superior lên Deluxe miễn phí',
    category: 'room',
    type: 'fixed',
    value: 800000,
    icon: '🏨',
    iconBg: 'from-blue-500 to-cyan-600',
    expiry: '2025-07-15',
    minOrder: 1500000,
    isLimited: false,
    remaining: null,
    isCollected: false
  },
  {
    id: 3,
    title: 'Spa thư giãn',
    description: 'Giảm giá dịch vụ spa và massage toàn thân',
    category: 'spa',
    type: 'percentage',
    value: 30,
    icon: '💆',
    iconBg: 'from-purple-500 to-pink-600',
    expiry: '2025-06-20',
    minOrder: 300000,
    isLimited: true,
    remaining: 8,
    isCollected: false
  },
  {
    id: 4,
    title: 'Welcome Drink',
    description: 'Cocktail chào mừng miễn phí khi check-in',
    category: 'special',
    type: 'fixed',
    value: 150000,
    icon: '🍹',
    iconBg: 'from-orange-500 to-red-600',
    expiry: '2025-08-01',
    minOrder: null,
    isLimited: true,
    remaining: 25,
    isCollected: true
  },
  {
    id: 5,
    title: 'Late Checkout',
    description: 'Trả phòng muộn đến 15:00 không phụ phí',
    category: 'room',
    type: 'fixed',
    value: 200000,
    icon: '🕒',
    iconBg: 'from-green-500 to-emerald-600',
    expiry: '2025-07-30',
    minOrder: 1000000,
    isLimited: false,
    remaining: null,
    isCollected: false
  },
  {
    id: 6,
    title: 'Combo dinner',
    description: 'Set dinner cho 2 người tại nhà hàng sang trọng',
    category: 'food',
    type: 'percentage',
    value: 40,
    icon: '🥂',
    iconBg: 'from-amber-500 to-yellow-600',
    expiry: '2025-06-25',
    minOrder: 800000,
    isLimited: true,
    remaining: 3,
    isCollected: false
  },
  {
    id: 7,
    title: 'Birthday Special',
    description: 'Quà sinh nhật đặc biệt và bánh kem miễn phí',
    category: 'special',
    type: 'fixed',
    value: 500000,
    icon: '🎂',
    iconBg: 'from-pink-500 to-rose-600',
    expiry: '2025-12-31',
    minOrder: null,
    isLimited: true,
    remaining: 0,
    isCollected: false
  },
  {
    id: 8,
    title: 'Gym & Pool',
    description: 'Sử dụng gym và hồ bơi miễn phí cả ngày',
    category: 'spa',
    type: 'fixed',
    value: 300000,
    icon: '🏊',
    iconBg: 'from-teal-500 to-blue-600',
    expiry: '2025-07-10',
    minOrder: null,
    isLimited: false,
    remaining: null,
    isCollected: false
  }
])

// Computed properties
const filteredCoupons = computed(() => {
  if (activeFilter.value === 'all') return coupons
  return coupons.filter(coupon => coupon.category === activeFilter.value)
})

const collectedCount = computed(() => {
  return coupons.filter(coupon => coupon.isCollected).length
})

const totalCoupons = computed(() => coupons.length)

// Methods
const collectCoupon = (coupon: any) => {
  if (coupon.isCollected || (coupon.isLimited && coupon.remaining <= 0)) return

  coupon.isCollected = true
  if (coupon.isLimited && coupon.remaining > 0) {
    coupon.remaining--
  }

  // Show success toast
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>