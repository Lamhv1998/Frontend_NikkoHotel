<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div class="max-w-7xl mx-auto space-y-8">
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold text-system-primary-120 mb-4">
          📋 Lịch sử đặt phòng
        </h1>
        <p class="text-gray-600 text-lg">Theo dõi và quản lý các đơn đặt phòng của bạn</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column - Recent Orders -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Icon name="ic:baseline-schedule" class="text-2xl text-system-primary-120 mr-3" />
              Chuyến đi sắp tới
            </h2>
            
            <div v-if="recentOrder" class="space-y-4">
              <CRecentOrder :order="recentOrder">
                <div class="grid grid-cols-2 gap-4 mt-4">
                  <UIButton 
                    block 
                    text="Hủy đặt phòng" 
                    variant="secondary" 
                    @click="deleteOrder" 
                  />
                  <NuxtLink :to="`/order/${recentOrder._id}`">
                    <UIButton block text="Xem chi tiết" />
                  </NuxtLink>
                </div>
              </CRecentOrder>
            </div>
            
            <div v-else class="text-center py-12">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ic:baseline-hotel" class="text-4xl text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Chưa có chuyến đi nào</h3>
              <p class="text-gray-500 mb-6">Hãy đặt phòng để có những trải nghiệm tuyệt vời</p>
              <NuxtLink to="/rooms">
                <UIButton 
                  icon="mdi:arrow-right" 
                  text="Đặt phòng ngay" 
                  variant="secondary" 
                  class="px-8 py-3"
                />
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Column - Order History -->
        <div class="lg:col-span-5">
          <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Icon name="ic:baseline-history" class="text-2xl text-system-primary-120 mr-3" />
              Lịch sử đặt phòng
            </h2>

            <div v-if="historyOrder && historyOrder.length > 0" class="space-y-6">
              <div 
                v-for="(order, index) in historyOrder" 
                :key="index"
                class="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div class="flex gap-4">
                  <NuxtImg
                    class="h-20 w-28 rounded-lg object-cover flex-shrink-0"
                    :src="order.roomId.imageUrl"
                    alt="Room image"
                  />

                  <div class="flex-1 space-y-3">
                    <div class="flex items-start justify-between">
                      <h3 class="font-semibold text-gray-800 line-clamp-2">
                        {{ order.roomId.name }}
                      </h3>
                      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {{ order.status || 'Hoàn thành' }}
                      </span>
                    </div>

                    <div class="space-y-2 text-sm text-gray-600">
                      <div class="flex items-center gap-2">
                        <Icon name="ic:baseline-calendar-today" class="text-system-primary-120" />
                        <span>
                          {{ $dayjs(order.checkInDate).format('DD/MM/YYYY') }} - 
                          {{ $dayjs(order.checkOutDate).format('DD/MM/YYYY') }}
                        </span>
                      </div>
                      
                      <div class="flex items-center gap-2">
                        <Icon name="ic:baseline-people" class="text-system-primary-120" />
                        <span>{{ order.peopleNum }} người</span>
                      </div>
                      
                      <div class="flex items-center gap-2">
                        <Icon name="ic:baseline-hotel" class="text-system-primary-120" />
                        <span>
                          {{ $dayjs(order.checkOutDate).diff($dayjs(order.checkInDate), 'day') }} đêm
                        </span>
                      </div>
                    </div>

                    <div class="flex items-center justify-between pt-2">
                      <p class="text-lg font-bold text-system-primary-120">
                        {{ useFormatCurrency(
                          order.roomId.price * $dayjs(order.checkOutDate).diff(order.checkInDate, 'day')
                        ) }}
                      </p>
                      <NuxtLink 
                        :to="`/order/${order._id}`"
                        class="text-system-primary-120 hover:text-system-primary-80 text-sm font-medium"
                      >
                        Xem chi tiết →
                      </NuxtLink>
                    </div>
                  </div>
                </div>

                <UILine v-if="index + 1 !== historyOrder.length" color="lightGrey" class="mt-4" />
              </div>

              <UIButton
                v-if="!more && orderList && orderList.length > 3"
                block
                icon="ic:baseline-keyboard-arrow-down"
                text="Xem thêm"
                variant="secondary"
                @click="more = true"
              />
            </div>

            <div v-else class="text-center py-12">
              <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ic:baseline-receipt" class="text-4xl text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-700 mb-2">Chưa có lịch sử đặt phòng</h3>
              <p class="text-gray-500">Bắt đầu đặt phòng để tạo lịch sử của bạn</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Statistics -->
      <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Icon name="ic:baseline-analytics" class="text-2xl text-system-primary-120 mr-3" />
          Thống kê đặt phòng
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center p-4 bg-blue-50 rounded-xl">
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ orderList?.length || 0 }}
            </div>
            <p class="text-blue-800 font-medium">Tổng đơn đặt phòng</p>
          </div>
          
          <div class="text-center p-4 bg-green-50 rounded-xl">
            <div class="text-3xl font-bold text-green-600 mb-2">
              {{ completedOrders || 0 }}
            </div>
            <p class="text-green-800 font-medium">Đã hoàn thành</p>
          </div>
          
          <div class="text-center p-4 bg-amber-50 rounded-xl">
            <div class="text-3xl font-bold text-amber-600 mb-2">
              {{ upcomingOrders || 0 }}
            </div>
            <p class="text-amber-800 font-medium">Sắp tới</p>
          </div>
          
          <div class="text-center p-4 bg-purple-50 rounded-xl">
            <div class="text-3xl font-bold text-purple-600 mb-2">
              {{ totalSpent || 0 }}
            </div>
            <p class="text-purple-800 font-medium">Tổng chi tiêu</p>
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
const deleteOrder = () => {
  // Logic xóa đơn đặt phòng
  console.log('Xóa đơn đặt phòng')
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
