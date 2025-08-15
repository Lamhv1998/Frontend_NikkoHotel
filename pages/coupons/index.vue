<template>
  <div class="min-h-screen">
    <!-- Banner -->
    <CBanner />

    <div class="section-container bg-system-primary-10">
      <div class="container space-y-10 xl:space-y-20">
        <!-- Tiêu đề -->
        <div class="text-center space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">Ưu đãi đặc biệt</p>
          <h1 class="text-h3 text-system-primary-100 xl:text-h1">
            Coupon & Khuyến mãi hấp dẫn
          </h1>
          <p class="text-body text-gray-600 max-w-2xl mx-auto">
            Khám phá các ưu đãi đặc biệt từ phòng nghỉ, nhà hàng đến spa. 
            Thu thập coupon ngay hôm nay để tận hưởng những trải nghiệm tuyệt vời nhất
          </p>
          
          <!-- Progress Bar -->
          <div class="max-w-md mx-auto mt-6">
            <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ thu thập</span>
              <span class="font-semibold text-system-primary-100">{{ collectedCount }}/{{ totalCoupons }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-system-primary-100 to-system-primary-80 h-3 rounded-full transition-all duration-500"
                :style="{ width: `${(collectedCount / totalCoupons) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center">
          <div class="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <div class="flex space-x-1">
              <button 
                v-for="tab in filterTabs" 
                :key="tab.key" 
                @click="activeFilter = tab.key" 
                :class="[
                  'px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm',
                  activeFilter === tab.key
                    ? 'bg-system-primary-100 text-white shadow-md'
                    : 'text-gray-600 hover:text-system-primary-100 hover:bg-gray-50'
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Coupons Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="coupon in filteredCoupons" 
            :key="coupon.id" 
            class="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
          >
            <!-- Coupon Header -->
            <div class="relative p-6 pb-4">
              <!-- Discount Badge -->
              <div class="absolute top-4 right-4">
                <div :class="[
                  'px-4 py-2 rounded-full text-white font-bold text-lg shadow-lg',
                  coupon.type === 'percentage' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-600' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600'
                ]">
                  {{ coupon.type === 'percentage' ? `-${coupon.value}%` : `-${coupon.value.toLocaleString()}đ` }}
                </div>
              </div>

              <!-- Limited Badge -->
              <div v-if="coupon.isLimited" class="absolute top-4 left-4">
                <div class="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white text-xs font-bold">
                  {{ coupon.remaining }} còn lại
                </div>
              </div>

              <!-- Icon & Title -->
              <div class="flex items-center mb-4 pt-8">
                <div :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg',
                  `bg-gradient-to-br ${coupon.iconBg}`
                ]">
                  <div class="text-2xl">{{ coupon.icon }}</div>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800 mb-1">{{ coupon.title }}</h3>
                  <p class="text-gray-500 text-sm">{{ getCategoryLabel(coupon.category) }}</p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 mb-4">{{ coupon.description }}</p>
            </div>

            <!-- Coupon Details -->
            <div class="px-6 pb-6 space-y-4">
              <!-- Conditions -->
              <div class="space-y-2">
                <div class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-2 text-system-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Hết hạn: {{ formatDate(coupon.expiry) }}
                </div>
                <div v-if="coupon.minOrder" class="flex items-center text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-2 text-system-primary-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Đơn tối thiểu: {{ coupon.minOrder.toLocaleString() }}đ
                </div>
              </div>

              <!-- Action Button -->
              <button 
                @click="collectCoupon(coupon)"
                :disabled="coupon.isCollected || (coupon.isLimited && coupon.remaining <= 0)" 
                :class="[
                  'w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg',
                  coupon.isCollected
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : coupon.isLimited && coupon.remaining <= 0
                      ? 'bg-red-100 text-red-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-system-primary-100 to-system-primary-80 text-white hover:from-system-primary-80 hover:to-system-primary-100 hover:shadow-xl'
                ]"
              >
                <span v-if="coupon.isCollected" class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Đã thu thập
                </span>
                <span v-else-if="coupon.isLimited && coupon.remaining <= 0">
                  Hết lượt
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Thu thập ngay
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredCoupons.length === 0" class="text-center py-16">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-700 mb-2">Không có coupon nào</h3>
          <p class="text-gray-500">Hãy thử lọc theo danh mục khác</p>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <Transition name="slide-up">
      <div v-if="showToast" class="fixed bottom-8 right-8 bg-white text-gray-800 px-6 py-4 rounded-2xl shadow-2xl border border-green-200 z-50">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div>
            <p class="font-bold text-gray-800">Thu thập thành công!</p>
            <p class="text-sm text-gray-600">Coupon đã được thêm vào ví của bạn</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import CBanner from '~/components/c/CBanner.vue'

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

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'food':
      return 'Ẩm thực'
    case 'room':
      return 'Phòng'
    case 'spa':
      return 'Spa & Wellness'
    case 'special':
      return 'Đặc biệt'
    default:
      return category
  }
}
</script>

<style lang="scss" scoped>
/* Custom styles cho trang coupons */
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

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.hover\:-translate-y-2:hover {
  transform: translateY(-8px);
}

/* Progress bar animation */
.bg-gradient-to-r {
  transition: width 0.5s ease-in-out;
}

/* Card hover effects */
.group:hover {
  transform: translateY(-8px);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Toast animation */
.fixed {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>