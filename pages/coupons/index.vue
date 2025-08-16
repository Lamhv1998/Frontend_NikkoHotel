<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-700 py-20 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Icon name="ic:outline-local-offer" class="mr-2 h-5 w-5" />
            Ưu đãi đặc biệt
          </div>
          <h1 class="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Săn Coupon Miễn Phí
          </h1>
          <p class="mx-auto mb-6 max-w-2xl text-xl text-primary-100">
            Nhận ngay các coupon hấp dẫn chỉ với một cú click! Tiết kiệm chi phí cho chuyến du lịch của bạn.
          </p>
          <div class="inline-flex items-center rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Icon name="ic:outline-star" class="mr-2 h-5 w-5 text-yellow-300" />
            <span class="text-yellow-300 font-medium">{{ collectedCount }}/{{ totalCoupons }} coupon đã thu thập</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="relative -mt-8 pb-8">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl bg-white p-6 shadow-xl">
          <div class="flex flex-wrap justify-center gap-2">
            <button
              v-for="tab in filterTabs"
              :key="tab.key"
              @click="activeFilter = tab.key"
              :class="[
                'flex items-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300',
                activeFilter === tab.key
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
              ]"
            >
              <Icon :name="tab.icon" class="h-4 w-4" />
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Coupons Grid -->
    <section class="py-12">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <!-- Results Count -->
        <div class="mb-8 flex items-center justify-between">
          <p class="text-gray-600">
            Hiển thị {{ filteredCoupons.length }} coupon{{ filteredCoupons.length !== 1 ? 's' : '' }}
          </p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Sắp xếp:</span>
            <select
              v-model="sortBy"
              class="rounded-lg border border-gray-200 px-3 py-1 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="newest">Mới nhất</option>
              <option value="expiry">Hết hạn sớm</option>
              <option value="value">Giá trị cao</option>
            </select>
          </div>
        </div>

        <!-- Coupons Grid -->
        <div v-if="sortedCoupons.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="coupon in sortedCoupons"
            :key="coupon.id"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <!-- Discount Badge -->
            <div class="absolute top-4 right-4 z-10">
              <div :class="[
                'flex items-center gap-1 rounded-full px-4 py-2 text-white font-bold text-lg shadow-lg',
                coupon.type === 'percentage' ? 'bg-gradient-to-r from-red-500 to-pink-600' : 'bg-gradient-to-r from-green-500 to-emerald-600'
              ]">
                <Icon name="ic:outline-local-offer" class="h-4 w-4" />
                {{ coupon.type === 'percentage' ? `-${coupon.value}%` : `-${coupon.value.toLocaleString()}đ` }}
              </div>
            </div>

            <!-- Limited Badge -->
            <div v-if="coupon.isLimited" class="absolute top-4 left-4 z-10">
              <div class="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-white text-xs font-bold">
                <Icon name="ic:outline-warning" class="h-3 w-3" />
                {{ coupon.remaining }} còn lại
              </div>
            </div>

            <!-- Card Content -->
            <div class="p-6 pt-20">
              <div class="flex items-center mb-4">
                <div :class="[
                  'flex h-16 w-16 items-center justify-center rounded-2xl mr-4 shadow-lg',
                  `bg-gradient-to-br ${coupon.iconBg}`
                ]">
                  <span class="text-2xl">{{ coupon.icon }}</span>
                </div>
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900 mb-1">{{ coupon.title }}</h3>
                  <p class="text-gray-500 text-sm">{{ coupon.category }}</p>
                </div>
              </div>

              <p class="text-gray-600 mb-6 line-clamp-2">{{ coupon.description }}</p>

              <!-- Conditions -->
              <div class="space-y-3 mb-6">
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="ic:outline-schedule" class="mr-2 h-4 w-4" />
                  <span>Hết hạn: {{ formatDate(coupon.expiry) }}</span>
                </div>
                <div v-if="coupon.minOrder" class="flex items-center text-sm text-gray-500">
                  <Icon name="ic:outline-payment" class="mr-2 h-4 w-4" />
                  <span>Đơn tối thiểu: {{ coupon.minOrder.toLocaleString() }}đ</span>
                </div>
              </div>

              <!-- Action Button -->
              <button
                @click="collectCoupon(coupon)"
                :disabled="coupon.isCollected || (coupon.isLimited && coupon.remaining <= 0)"
                :class="[
                  'w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg',
                  coupon.isCollected
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : coupon.isLimited && coupon.remaining <= 0
                      ? 'bg-red-100 text-red-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 hover:shadow-primary-500/30'
                ]"
              >
                <span v-if="coupon.isCollected" class="flex items-center justify-center">
                  <Icon name="ic:outline-check-circle" class="mr-2 h-5 w-5" />
                  Đã thu thập
                </span>
                <span v-else-if="coupon.isLimited && coupon.remaining <= 0" class="flex items-center justify-center">
                  <Icon name="ic:outline-cancel" class="mr-2 h-5 w-5" />
                  Hết lượt
                </span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="ic:outline-add" class="mr-2 h-5 w-5" />
                  Thu thập ngay
                </span>
              </button>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary-500 opacity-20 transition-opacity group-hover:opacity-40"></div>
            <div class="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-primary-400 opacity-20 transition-opacity group-hover:opacity-40"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Icon name="ic:outline-search-off" class="h-12 w-12 text-gray-400" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900">Không có coupon nào</h3>
          <p class="mb-6 text-gray-600">Hãy thử lọc theo danh mục khác hoặc quay lại sau</p>
          <button
            @click="activeFilter = 'all'"
            class="rounded-lg bg-primary-600 px-6 py-2 text-white transition-colors hover:bg-primary-700"
          >
            Xem tất cả
          </button>
        </div>
      </div>
    </section>

    <!-- Success Toast -->
    <Transition name="slide-up">
      <div
        v-if="showToast"
        class="fixed bottom-8 right-8 z-50 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4 text-white shadow-2xl"
      >
        <div class="flex items-center">
          <Icon name="ic:outline-check-circle" class="mr-3 h-6 w-6" />
          <div>
            <p class="font-bold">Thu thập thành công!</p>
            <p class="text-sm text-green-100">Coupon đã được thêm vào ví của bạn</p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Filter state
const activeFilter = ref('all')
const sortBy = ref('newest')
const showToast = ref(false)

const filterTabs = [
  { key: 'all', label: 'Tất cả', icon: 'ic:outline-apps' },
  { key: 'food', label: 'Ẩm thực', icon: 'ic:outline-restaurant' },
  { key: 'room', label: 'Phòng', icon: 'ic:outline-hotel' },
  { key: 'spa', label: 'Spa & Wellness', icon: 'ic:outline-spa' },
  { key: 'special', label: 'Đặc biệt', icon: 'ic:outline-star' }
]

// Sample coupons data
const coupons = reactive([
  {
    id: 1,
    title: 'Giảm giá buffet',
    description: 'Thưởng thức buffet cao cấp với giá ưu đãi tại nhà hàng chính của khách sạn',
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
    description: 'Nâng cấp phòng Superior lên Deluxe miễn phí khi đặt phòng từ 2 đêm trở lên',
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
    description: 'Giảm giá dịch vụ spa và massage toàn thân tại trung tâm spa của khách sạn',
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
    description: 'Cocktail chào mừng miễn phí khi check-in, áp dụng cho tất cả khách hàng',
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
    description: 'Trả phòng muộn đến 15:00 không phụ phí, áp dụng cho đặt phòng từ 2 đêm',
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
    description: 'Set dinner cho 2 người tại nhà hàng sang trọng với menu đặc biệt',
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
    description: 'Quà sinh nhật đặc biệt và bánh kem miễn phí cho khách hàng trong tháng sinh nhật',
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
    description: 'Sử dụng gym và hồ bơi miễn phí cả ngày, bao gồm cả dụng cụ tập luyện',
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

const sortedCoupons = computed(() => {
  const sorted = [...filteredCoupons.value]
  
  switch (sortBy.value) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.expiry).getTime() - new Date(a.expiry).getTime())
    case 'expiry':
      return sorted.sort((a, b) => new Date(a.expiry).getTime() - new Date(b.expiry).getTime())
    case 'value':
      return sorted.sort((a, b) => b.value - a.value)
    default:
      return sorted
  }
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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