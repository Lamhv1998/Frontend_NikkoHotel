<template>
  <div class="min-h-screen bg-[#140F0A]">
    <div class="mx-auto max-w-7xl p-6 space-y-8">
      
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold text-orange-500 mb-2">
          Đơn đặt phòng của tôi
        </h1>
        <p class="text-white">Quản lý và theo dõi các đơn đặt phòng</p>
      </div>

      <!-- Orders Grid -->
      <div class="grid gap-8 lg:grid-cols-12">
        
        <!-- Recent Order Section -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
              <h2 class="text-2xl font-bold text-white flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Đơn đặt phòng gần đây
              </h2>
            </div>
            
            <div class="p-8">
              <div v-if="recentOrder" class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{ recentOrder.roomName }}</h3>
                      <p class="text-sm text-gray-600">Đơn hàng #{{ recentOrder.orderId }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-2xl font-bold text-blue-600">{{ formatPrice(recentOrder.totalPrice) }}</div>
                    <div class="text-sm text-gray-600">{{ recentOrder.status }}</div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="bg-white rounded-xl p-3">
                    <p class="text-xs text-gray-500">Ngày check-in</p>
                    <p class="font-semibold text-gray-900">{{ formatDate(recentOrder.checkIn) }}</p>
                  </div>
                  <div class="bg-white rounded-xl p-3">
                    <p class="text-xs text-gray-500">Ngày check-out</p>
                    <p class="font-semibold text-gray-900">{{ formatDate(recentOrder.checkOut) }}</p>
                  </div>
                </div>
                
                <div class="flex gap-3">
                  <UIButton
                    text="Xem chi tiết"
                    variant="primary"
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
                  />
                  <UIButton
                    text="Hủy đặt phòng"
                    variant="secondary"
                    class="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
                  />
                </div>
              </div>
              
              <div v-else class="text-center py-12">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Chưa có đơn đặt phòng</h3>
                <p class="text-gray-600 mb-6">Bạn chưa có đơn đặt phòng nào gần đây</p>
                <NuxtLink to="/rooms" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Đặt phòng ngay
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Stats -->
        <div class="lg:col-span-4 space-y-6">
          
          <!-- Order Statistics -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
              <h3 class="text-xl font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                Thống kê đơn hàng
              </h3>
            </div>
            
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span class="font-semibold text-gray-900">Đang chờ</span>
                </div>
                <span class="text-2xl font-bold text-blue-600">3</span>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span class="font-semibold text-gray-900">Đã xác nhận</span>
                </div>
                <span class="text-2xl font-bold text-green-600">8</span>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span class="font-semibold text-gray-900">Đã hoàn thành</span>
                </div>
                <span class="text-2xl font-bold text-amber-600">15</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <h3 class="text-xl font-bold text-white flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                Thao tác nhanh
              </h3>
            </div>
            
            <div class="p-6 space-y-4">
              <NuxtLink to="/rooms" class="block group">
                <div class="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-all duration-300 group-hover:shadow-md">
                  <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-amber-200 transition-colors">
                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">Đặt phòng mới</p>
                    <p class="text-sm text-gray-600">Tìm và đặt phòng</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 ml-auto group-hover:text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </NuxtLink>

              <button class="w-full group">
                <div class="flex items-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 group-hover:shadow-md">
                  <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Yêu thích</p>
                    <p class="text-sm text-gray-600">Phòng đã lưu</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 ml-auto group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order History Section -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div class="bg-gradient-to-r from-gray-600 to-gray-800 p-6">
          <h2 class="text-2xl font-bold text-white flex items-center">
            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Lịch sử đơn đặt phòng
          </h2>
        </div>
        
        <div class="p-8">
          <div v-if="orderHistory.length > 0" class="space-y-4">
            <div 
              v-for="order in orderHistory" 
              :key="order.orderId"
              class="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {{ order.orderId.slice(-2) }}
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ order.roomName }}</h3>
                    <p class="text-sm text-gray-600">Đơn hàng #{{ order.orderId }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xl font-bold text-gray-900">{{ formatPrice(order.totalPrice) }}</div>
                  <div class="text-sm text-gray-600">{{ order.status }}</div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div class="bg-white rounded-xl p-3">
                  <p class="text-xs text-gray-500">Check-in</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(order.checkIn) }}</p>
                </div>
                <div class="bg-white rounded-xl p-3">
                  <p class="text-xs text-gray-500">Check-out</p>
                  <p class="font-semibold text-gray-900">{{ formatDate(order.checkOut) }}</p>
                </div>
                <div class="bg-white rounded-xl p-3">
                  <p class="text-xs text-gray-500">Số đêm</p>
                  <p class="font-semibold text-gray-900">{{ order.nights }} đêm</p>
                </div>
                <div class="bg-white rounded-xl p-3">
                  <p class="text-xs text-gray-500">Người</p>
                  <p class="font-semibold text-gray-900">{{ order.guests }} người</p>
                </div>
              </div>
              
              <div class="flex gap-3">
                <UIButton
                  text="Xem chi tiết"
                  variant="primary"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm"
                />
                <UIButton
                  v-if="order.status === 'Đang chờ'"
                  text="Hủy đặt phòng"
                  variant="secondary"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
                />
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Chưa có lịch sử đơn hàng</h3>
            <p class="text-gray-600 mb-6">Bạn chưa có đơn đặt phòng nào</p>
            <NuxtLink to="/rooms" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:from-amber-600 hover:to-yellow-700 transition-all">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Đặt phòng ngay
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* Mock data for demonstration */
const recentOrder = ref({
  orderId: 'ORD001',
  roomName: 'Phòng Deluxe Ocean View',
  totalPrice: 2500000,
  status: 'Đã xác nhận',
  checkIn: '2024-01-15',
  checkOut: '2024-01-18',
  nights: 3,
  guests: 2
})

const orderHistory = ref([
  {
    orderId: 'ORD001',
    roomName: 'Phòng Deluxe Ocean View',
    totalPrice: 2500000,
    status: 'Đã xác nhận',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    nights: 3,
    guests: 2
  },
  {
    orderId: 'ORD002',
    roomName: 'Phòng Suite Presidential',
    totalPrice: 4500000,
    status: 'Đã hoàn thành',
    checkIn: '2023-12-20',
    checkOut: '2023-12-25',
    nights: 5,
    guests: 4
  },
  {
    orderId: 'ORD003',
    roomName: 'Phòng Standard',
    totalPrice: 1200000,
    status: 'Đang chờ',
    checkIn: '2024-02-10',
    checkOut: '2024-02-12',
    nights: 2,
    guests: 2
  }
])

/* Utility functions */
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}
</script>
