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
            📋 Lịch sử đặt phòng
          </h1>
          
          <!-- Decorative line below title -->
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
        
        <p class="text-amber-700 text-xl xl:text-2xl max-w-3xl mx-auto leading-relaxed">
          Theo dõi và quản lý tất cả đơn đặt phòng của bạn tại Nikko Luxury Hotel
        </p>
      </div>

      <!-- Order Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-receipt" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ orderList.length }}</p>
              <p class="text-sm text-gray-600 font-medium">Tổng đơn hàng</p>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-check-circle" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ completedOrders }}</p>
              <p class="text-sm text-gray-600 font-medium">Đã hoàn thành</p>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-schedule" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ upcomingOrders }}</p>
              <p class="text-sm text-gray-600 font-medium">Sắp tới</p>
            </div>
          </div>
        </div>

        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
          <div class="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Icon name="ic:baseline-account-balance-wallet" class="text-3xl text-white" />
              </div>
              <p class="text-2xl font-bold text-gray-800">{{ formatCurrency(totalSpent) }}</p>
              <p class="text-sm text-gray-600 font-medium">Tổng chi tiêu</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Order -->
      <div v-if="recentOrder" class="mb-12">
        <div class="group relative">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
            <h2 class="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <Icon name="ic:baseline-star" class="text-2xl text-white" />
              </div>
              Đơn đặt phòng sắp tới
            </h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Room Image -->
              <div class="relative overflow-hidden rounded-2xl">
                <img :src="recentOrder.roomId.imageUrl" :alt="recentOrder.roomId.name" class="w-full h-48 object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {{ recentOrder.status }}
                  </span>
                </div>
              </div>

              <!-- Room Details -->
              <div class="lg:col-span-2 space-y-4">
                <h3 class="text-2xl font-bold text-gray-800">{{ recentOrder.roomId.name }}</h3>
                
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100">
                    <Icon name="ic:baseline-calendar-today" class="text-blue-600 mr-3" />
                    <div>
                      <p class="text-sm text-gray-600">Check-in</p>
                      <p class="font-semibold text-gray-800">{{ formatDate(recentOrder.checkInDate) }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100">
                    <Icon name="ic:baseline-calendar-today" class="text-emerald-600 mr-3" />
                    <div>
                      <p class="text-sm text-gray-600">Check-out</p>
                      <p class="font-semibold text-gray-800">{{ formatDate(recentOrder.checkOutDate) }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-purple-50 to-transparent border border-purple-100">
                    <Icon name="ic:baseline-people" class="text-purple-600 mr-3" />
                    <div>
                      <p class="text-sm text-gray-600">Số người</p>
                      <p class="font-semibold text-gray-800">{{ recentOrder.peopleNum }} người</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-transparent border border-yellow-100">
                    <Icon name="ic:baseline-account-balance-wallet" class="text-yellow-600 mr-3" />
                    <div>
                      <p class="text-sm text-gray-600">Giá phòng</p>
                      <p class="font-semibold text-gray-800">{{ formatCurrency(recentOrder.roomId.price) }}/đêm</p>
                    </div>
                  </div>
                </div>

                <div class="flex gap-4 pt-4">
                  <button class="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Xem chi tiết
                  </button>
                  <button @click="deleteOrder(recentOrder._id)" class="border-2 border-red-500 text-red-500 px-6 py-3 rounded-2xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300">
                    Hủy đặt phòng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order History -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div class="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/40 hover:shadow-3xl transition-all duration-500">
          <h2 class="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <Icon name="ic:baseline-history" class="text-2xl text-white" />
            </div>
            Lịch sử đặt phòng
          </h2>

          <div v-if="historyOrder.length === 0" class="text-center py-16">
            <div class="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="ic:baseline-hotel" class="text-4xl text-gray-400" />
            </div>
            <h3 class="text-2xl font-bold text-gray-600 mb-2">Chưa có đơn đặt phòng</h3>
            <p class="text-gray-500">Hãy đặt phòng đầu tiên để bắt đầu trải nghiệm tại Nikko Luxury Hotel</p>
          </div>

          <div v-else class="space-y-6">
            <div v-for="order in historyOrder" :key="order._id" class="group/order relative">
              <div class="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent rounded-2xl opacity-0 group-hover/order:opacity-100 transition-all duration-300"></div>
              <div class="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  <!-- Room Image -->
                  <div class="relative overflow-hidden rounded-xl">
                    <img :src="order.roomId.imageUrl" :alt="order.roomId.name" class="w-full h-32 object-cover" />
                    <div class="absolute top-2 right-2">
                      <span :class="[
                        'px-3 py-1 rounded-full text-xs font-medium',
                        order.status === 'Đã xác nhận' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                      ]">
                        {{ order.status }}
                      </span>
                    </div>
                  </div>

                  <!-- Room Info -->
                  <div class="lg:col-span-2">
                    <h4 class="text-xl font-bold text-gray-800 mb-2">{{ order.roomId.name }}</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div class="flex items-center text-gray-600">
                        <Icon name="ic:baseline-calendar-today" class="mr-2" />
                        <span>{{ formatDate(order.checkInDate) }} - {{ formatDate(order.checkOutDate) }}</span>
                      </div>
                      <div class="flex items-center text-gray-600">
                        <Icon name="ic:baseline-people" class="mr-2" />
                        <span>{{ order.peopleNum }} người</span>
                      </div>
                    </div>
              </div>

                  <!-- Price & Actions -->
                  <div class="text-right space-y-3">
                    <p class="text-2xl font-bold text-amber-600">{{ formatCurrency(order.roomId.price) }}</p>
                    <div class="flex gap-2 justify-end">
                      <button class="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300">
                        Chi tiết
                      </button>
                      <button v-if="order.status === 'Đã xác nhận'" @click="deleteOrder(order._id)" class="border border-red-500 text-red-500 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500 hover:text-white transition-all duration-300">
                        Hủy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <div v-if="historyOrder.length > 3" class="text-center pt-8">
            <button @click="more = !more" class="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              {{ more ? 'Thu gọn' : 'Xem thêm' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrderResponse } from '@/types'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* Thuộc tính toàn cục */
const { $dayjs, $Swal } = useNuxtApp()
const styleStore = useStyleStore()

// Mock data cho demo
const recentOrder = ref({
  _id: '1',
  roomId: {
    name: 'Phòng Deluxe Premium',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    price: 2500000
  },
  checkInDate: '2024-12-20',
  checkOutDate: '2024-12-22',
  peopleNum: 2,
  status: 'Đã xác nhận'
})

const historyOrder = ref([
  {
    _id: '1',
    roomId: {
      name: 'Phòng Deluxe Premium',
      imageUrl: 'https://picsum.photos/400/300?random=1',
      price: 2500000
    },
    checkInDate: '2024-12-20',
    checkOutDate: '2024-12-22',
    peopleNum: 2,
    status: 'Đã xác nhận'
  },
  {
    _id: '2',
    roomId: {
      name: 'Phòng Suite Executive',
      imageUrl: 'https://picsum.photos/400/300?random=2',
      price: 3500000
    },
    checkInDate: '2024-11-15',
    checkOutDate: '2024-11-17',
    peopleNum: 3,
    status: 'Hoàn thành'
  },
  {
    _id: '3',
    roomId: {
      name: 'Phòng Family Deluxe',
      imageUrl: 'https://picsum.photos/400/300?random=3',
      price: 4000000
    },
    checkInDate: '2024-10-10',
    checkOutDate: '2024-10-12',
    peopleNum: 4,
    status: 'Hoàn thành'
  },
  {
    _id: '4',
    roomId: {
      name: 'Phòng Standard',
      imageUrl: 'https://picsum.photos/400/300?random=4',
      price: 1500000
    },
    checkInDate: '2024-09-05',
    checkOutDate: '2024-09-07',
    peopleNum: 2,
    status: 'Hoàn thành'
  }
])

const orderList = ref(historyOrder.value)
const more = ref(false)

// Computed properties
const completedOrders = computed(() => 
  historyOrder.value.filter(order => order.status === 'Hoàn thành').length
)

const upcomingOrders = computed(() => 
  historyOrder.value.filter(order => order.status === 'Đã xác nhận').length
)

const totalSpent = computed(() => {
  return historyOrder.value.reduce((total, order) => {
    const nights = $dayjs(order.checkOutDate).diff($dayjs(order.checkInDate), 'day')
    return total + (order.roomId.price * nights)
  }, 0)
})

// Methods
const deleteOrder = (orderId: string) => {
  // Delete order logic will be implemented when API is ready
  // For now, just remove from local state
  const index = historyOrder.value.findIndex(order => order._id === orderId)
  if (index > -1) {
    historyOrder.value.splice(index, 1)
  }
}

// Format functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Chưa cập nhật'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
