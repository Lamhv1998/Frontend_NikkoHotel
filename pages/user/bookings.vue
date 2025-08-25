<template>
  <div class="min-h-screen">
    <div class="mx-auto max-w-7xl p-6 space-y-8">
      
      <!-- Header Section -->
      <div class="text-center py-8">
        <h1 class="text-4xl font-bold text-orange-500 mb-2">
          Quản lý đặt phòng
        </h1>
        <p class="text-white">Theo dõi và quản lý các đơn đặt phòng của bạn</p>
      </div>

      <!-- Booking List Section -->
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div class="bg-gradient-to-r from-blue-500 to-cyan-600 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <Icon name="ic:baseline-hotel" class="w-6 h-6 mr-3" />
              Danh sách đặt phòng
            </h2>
            <button
              @click="loadBookings"
              :disabled="loading"
              class="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <Icon name="ic:baseline-refresh" class="w-4 h-4" />
              Làm mới
            </button>
          </div>
        </div>
        
        <div class="p-8">
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-8">
            <div class="inline-flex items-center gap-2">
              <div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-gray-600">Đang tải dữ liệu...</span>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center gap-2 text-red-800">
              <Icon name="ic:baseline-error" class="w-5 h-5" />
              <span>{{ error }}</span>
            </div>
            <button
              @click="loadBookings"
              class="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Thử lại
            </button>
          </div>
          <!-- Bookings List -->
          <div v-if="!loading && !error && activeBookings.length > 0" class="space-y-4">
            <!-- Debug: Hiển thị thông tin về việc render -->
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
              <p class="text-sm text-green-800">
                <strong>Thông tin đặt phòng:</strong> Có {{ bookings.length }} đặt phòng
              </p>
              <p class="text-sm text-green-800 mt-2">
                <strong>Trạng thái phòng hiện có:</strong>
                <span v-for="(count, status) in getStatusBreakdown()" :key="status" class="ml-2">
                  {{ status }}: {{ count }}
                </span>
              </p>
            </div>

            <!-- Booking Cards -->
            <div
              v-for="booking in activeBookings"
              :key="booking.bookingId"
              class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="ic:baseline-hotel" class="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">
                        Đặt phòng #{{ booking.bookingId.slice(-8) }}
                      </h3>
                      <p class="text-sm text-gray-600">{{ formatDate(booking.createdAt) }}</p>
                    </div>
                  </div>
                  
                                     <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                     <div class="bg-gray-50 rounded-lg p-3">
                       <p class="text-xs text-gray-500">Check-in</p>
                       <p class="font-semibold text-gray-900">{{ formatDate(booking.checkInDate) }}</p>
                     </div>
                     <div class="bg-gray-50 rounded-lg p-3">
                       <p class="text-xs text-gray-500">Check-out</p>
                       <p class="font-semibold text-gray-900">{{ formatDate(booking.checkOutDate) }}</p>
                     </div>
                     <div class="bg-gray-50 rounded-lg p-3">
                       <p class="text-xs text-gray-500">Số khách</p>
                       <p class="font-semibold text-gray-900">{{ booking.numberOfGuests || 'N/A' }} người</p>
                     </div>
                     <div class="bg-gray-50 rounded-lg p-3">
                       <p class="text-xs text-gray-500">Tổng tiền</p>
                       <p class="font-semibold text-gray-900">{{ formatPrice(booking.totalAmount) }}</p>
                     </div>
                   </div>

                   <!-- Room Information -->
                   <div class="bg-blue-50 rounded-lg p-4 mb-4">
                     <div class="flex items-center justify-between mb-3">
                       <h4 class="font-semibold text-blue-900 flex items-center">
                         <Icon name="ic:baseline-bed" class="w-4 h-4 mr-2" />
                         Thông tin phòng
                       </h4>
                       <div v-if="getRoomInfo(booking.roomId)?.image_url" class="w-16 h-12 rounded overflow-hidden">
                         <img 
                           :src="getRoomInfo(booking.roomId).image_url" 
                           :alt="'Phòng ' + getRoomInfo(booking.roomId).roomNumber"
                           class="w-full h-full object-cover"
                         />
                       </div>
                     </div>
                     <div v-if="isRoomLoading(booking.roomId)" class="flex items-center gap-2">
                       <div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                       <span class="text-sm text-blue-700">Đang tải thông tin phòng...</span>
                     </div>
                                           <div v-else-if="getRoomInfo(booking.roomId)" class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div>
                          <p class="text-xs text-blue-600">Số phòng</p>
                          <p class="font-semibold text-blue-900">{{ getRoomInfo(booking.roomId).roomNumber || 'N/A' }}</p>
                        </div>
                        <div>
                          <p class="text-xs text-blue-600">Loại phòng</p>
                          <p class="font-semibold text-blue-900">{{ getRoomInfo(booking.roomId).roomType?.typeName || 'N/A' }}</p>
                        </div>
                        <div>
                          <p class="text-xs text-blue-600">Tầng</p>
                          <p class="font-semibold text-blue-900">Tầng {{ getRoomInfo(booking.roomId).floor || 'N/A' }}</p>
                        </div>
                        <div>
                          <p class="text-xs text-blue-600">Giá cơ bản</p>
                          <p class="font-semibold text-blue-900">{{ formatPrice(parseFloat(getRoomInfo(booking.roomId).roomType?.basePrice || '0')) }}</p>
                        </div>
                        <div>
                          <p class="text-xs text-blue-600">Sức chứa</p>
                          <p class="font-semibold text-blue-900">{{ getRoomInfo(booking.roomId).roomType?.maxOccupancy || 'N/A' }} người</p>
                        </div>
                        <div>
                          <p class="text-xs text-blue-600">Trạng thái</p>
                          <span 
                            :class="getRoomStatusClass(getRoomInfo(booking.roomId).roomStatus)"
                            class="px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {{ getRoomStatusText(getRoomInfo(booking.roomId).roomStatus) }}
                          </span>
                        </div>
                      </div>
                     <div v-else class="text-center py-2">
                       <p class="text-sm text-blue-600">Không thể tải thông tin phòng</p>
                     </div>
                   </div>

                  <!-- Status Badge -->
                  <div class="flex items-center gap-2 mb-4">
                    <span class="text-sm font-medium text-gray-700">Trạng thái:</span>
                    <span
                      :class="getStatusClasses(booking.status)"
                      class="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {{ getStatusText(booking.status) }}
                    </span>
                  </div>

                  <!-- Special Requests -->
                  <div v-if="booking.notes" class="mb-4">
                    <p class="text-sm text-gray-600">
                      <span class="font-medium">Yêu cầu đặc biệt:</span> {{ booking.notes || 'Không có' }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <!-- <button
                  @click="viewBookingDetails(booking)"
                  class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem chi tiết
                </button> -->
                <button
                  v-if="booking.status.toUpperCase() === 'PENDING'"
                  @click="handlePayment(booking)"
                  class="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="ic:baseline-payment" class="w-4 h-4" />
                  Tiến hành thanh toán
                </button>
                <button
                  v-if="canCancelBooking(booking.status)"
                  @click="handleCancelBooking(booking.bookingId)"
                  class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Hủy đặt phòng
                </button>
                <button
                  v-if="canUpdateBooking(booking.status)"
                  @click="handleUpdateBooking(booking)"
                  class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && !error && activeBookings.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ic:baseline-hotel" class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Chưa có đặt phòng</h3>
            <p class="text-gray-600 mb-6">Bạn chưa có đặt phòng nào</p>
            <NuxtLink
              to="/rooms"
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:from-amber-600 hover:to-yellow-700 transition-all"
            >
              <Icon name="ic:baseline-add" class="w-5 h-5" />
              Đặt phòng ngay
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Quick Actions Section -->
      <div class="grid gap-6 lg:grid-cols-3">
        
        <!-- New Booking Card -->
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
            <h3 class="text-xl font-bold text-white flex items-center">
              <Icon name="ic:baseline-add" class="w-5 h-5 mr-2" />
              Đặt phòng mới
            </h3>
          </div>
          
          <div class="p-6">
            <p class="text-gray-600 mb-4">Tìm và đặt phòng mới tại khách sạn</p>
            <NuxtLink
              to="/rooms"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all flex items-center justify-center"
            >
              <Icon name="ic:baseline-search" class="w-5 h-5 mr-2" />
              Tìm phòng
            </NuxtLink>
          </div>
        </div>

        <!-- Booking History Card -->
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div class="bg-gradient-to-r from-purple-500 to-pink-600 p-6">
            <h3 class="text-xl font-bold text-white flex items-center">
              <Icon name="ic:baseline-history" class="w-5 h-5 mr-2" />
              Lịch sử đặt phòng
            </h3>
          </div>
          
          <div class="p-6">
            <p class="text-gray-600 mb-4">Xem lại các đơn đặt phòng đã hoàn thành</p>
            <button
              @click="showBookingHistory = true"
              class="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all flex items-center justify-center"
            >
              <Icon name="ic:baseline-list" class="w-5 h-5 mr-2" />
              Xem lịch sử
            </button>
          </div>
        </div>

        <!-- Support Card -->
        <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div class="bg-gradient-to-r from-amber-500 to-yellow-600 p-6">
            <h3 class="text-xl font-bold text-white flex items-center">
              <Icon name="ic:baseline-support" class="w-5 h-5 mr-2" />
              Hỗ trợ
            </h3>
          </div>
          
          <div class="p-6">
            <p class="text-gray-600 mb-4">Cần hỗ trợ với đơn đặt phòng?</p>
            <button
              @click="contactSupport"
              class="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3 px-4 rounded-xl font-medium hover:from-amber-600 hover:to-yellow-700 transition-all flex items-center justify-center"
            >
              <Icon name="ic:baseline-chat" class="w-5 h-5 mr-2" />
              Liên hệ hỗ trợ
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking History Modal -->
    <UIModal v-model="showBookingHistory" title="Lịch sử đặt phòng">
      <div class="space-y-4">
        <div v-if="bookingHistory.length > 0" class="space-y-4">
          <div
            v-for="booking in bookingHistory"
            :key="booking.bookingId"
            class="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
                         <div class="flex items-center justify-between mb-2">
               <h4 class="font-semibold text-gray-900">
                 Đặt phòng #{{ booking.bookingId.slice(-8) }}
               </h4>
              <span
                :class="getStatusClasses(booking.status)"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ getStatusText(booking.status) }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span class="text-gray-500">Check-in:</span>
                <span class="font-medium">{{ formatDate(booking.checkInDate) }}</span>
              </div>
              <div>
                <span class="text-gray-500">Check-out:</span>
                <span class="font-medium">{{ formatDate(booking.checkOutDate) }}</span>
              </div>
              <div>
                <span class="text-gray-500">Số khách:</span>
                <span class="font-medium">{{ booking.numberOfGuests }} người</span>
              </div>
              <div>
                <span class="text-gray-500">Tổng tiền:</span>
                <span class="font-medium">{{ formatPrice(booking.totalAmount) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <Icon name="ic:baseline-history" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p class="text-gray-600">Chưa có lịch sử đặt phòng</p>
        </div>
      </div>
    </UIModal>

    <!-- Booking Details Modal -->
    <UIModal v-model="showBookingModal" title="Chi tiết đặt phòng">
      <div v-if="selectedBooking" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Mã đặt phòng</p>
            <p class="font-semibold">{{ selectedBooking.bookingId }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Trạng thái</p>
            <span
              :class="getStatusClasses(selectedBooking.status)"
              class="px-2 py-1 rounded-full text-xs font-medium"
            >
              {{ getStatusText(selectedBooking.status) }}
            </span>
          </div>
          <div>
            <p class="text-sm text-gray-500">Ngày tạo</p>
            <p class="font-semibold">{{ formatDate(selectedBooking.createdAt) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Cập nhật lần cuối</p>
            <p class="font-semibold">{{ formatDate(selectedBooking.updatedAt) }}</p>
          </div>
        </div>
        
        <div class="border-t pt-4">
          <h4 class="font-semibold mb-2">Thông tin đặt phòng</h4>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Check-in</p>
              <p class="font-semibold">{{ formatDate(selectedBooking.checkInDate) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Check-out</p>
              <p class="font-semibold">{{ formatDate(selectedBooking.checkOutDate) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Số khách</p>
              <p class="font-semibold">{{ selectedBooking.numberOfGuests || 'N/A' }} người</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tổng tiền</p>
              <p class="font-semibold">{{ formatPrice(selectedBooking.totalAmount) }}</p>
            </div>
          </div>
        </div>

        <div v-if="selectedBooking.notes" class="border-t pt-4">
          <h4 class="font-semibold mb-2">Yêu cầu đặc biệt</h4>
          <p class="text-gray-700">{{ selectedBooking.notes }}</p>
        </div>

        <!-- Room Information in Modal -->
        <div v-if="selectedBooking" class="border-t pt-4">
          <h4 class="font-semibold mb-2">Thông tin phòng</h4>
          <div v-if="isRoomLoading(selectedBooking.roomId)" class="flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span class="text-sm text-gray-600">Đang tải thông tin phòng...</span>
          </div>
          <div v-else-if="getRoomInfo(selectedBooking.roomId)" class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Số phòng</p>
              <p class="font-semibold">{{ getRoomInfo(selectedBooking.roomId).roomNumber }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Loại phòng</p>
              <p class="font-semibold">{{ getRoomInfo(selectedBooking.roomId).roomType?.typeName }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Tầng</p>
              <p class="font-semibold">Tầng {{ getRoomInfo(selectedBooking.roomId).floor }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Trạng thái phòng</p>
              <span 
                :class="getRoomStatusClass(getRoomInfo(selectedBooking.roomId).roomStatus)"
                class="px-2 py-1 rounded-full text-xs font-medium"
              >
                {{ getRoomStatusText(getRoomInfo(selectedBooking.roomId).roomStatus) }}
              </span>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-500">Mô tả phòng</p>
              <p class="font-semibold">{{ getRoomInfo(selectedBooking.roomId).roomType?.description || 'Không có mô tả' }}</p>
            </div>
          </div>
          <div v-else class="text-center py-2">
            <p class="text-sm text-gray-600">Không thể tải thông tin phòng</p>
          </div>
        </div>
      </div>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type { BookingDto } from '~/types/order'
import { confirmBookingPaymentApi } from '~/api/order'
const { $Swal } = useNuxtApp()
/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

const confirmLoading = ref(false)
/* Auth store */
const authStore = useAuthStore()
const { customerProfile } = storeToRefs(authStore)

/* Booking composable */
const { bookings, loading, error, fetchAllBookings, fetchBookingsByCustomer, fetchCustomerBookingHistory, updateBooking, cancelBooking } = useBooking()

/* Room composable */
const { getRoomById } = useRoomApi()

/* Room data state */
const roomData = ref<Record<string, any>>({})
const roomLoading = ref<Record<string, boolean>>({})

/* Modal state */
const showBookingHistory = ref(false)
const showBookingModal = ref(false)
const selectedBooking = ref<BookingDto | null>(null)

/* Computed booking history (completed bookings) */
const bookingHistory = computed(() => {
  return bookings.value.filter(booking => 
    ['CHECKED_OUT', 'PAID'].includes(booking.status.toUpperCase())
  )
})

/* Computed active bookings (not cancelled or paid) */
const activeBookings = computed(() => {
  return bookings.value.filter(booking => {
    const excludedStatuses = ['CANCELLED', 'PAID']
    return !excludedStatuses.includes(booking.status.toUpperCase())
  })
})

/* Helper function to get room info for a booking */
const getRoomInfo = (roomId: string) => {
  return roomData.value[roomId] || null
}

/* Helper function to check if room is loading */
const isRoomLoading = (roomId: string) => {
  return roomLoading.value[roomId] || false
}

/* Load bookings on mount */
onMounted(async () => {
  await loadBookings()
})

/* Load room data for a booking */
const loadRoomData = async (roomId: string) => {
  if (roomData.value[roomId] || roomLoading.value[roomId]) {
    return // Already loaded or loading
  }
  
  try {
    roomLoading.value[roomId] = true
    const roomInfo = await getRoomById(roomId)
    roomData.value[roomId] = roomInfo
  } catch (err) {
    roomData.value[roomId] = null
  } finally {
    roomLoading.value[roomId] = false
  }
}

/* Load room data for all bookings */
const loadRoomDataForBookings = async () => {
  const uniqueRoomIds = [...new Set(bookings.value.map(booking => booking.roomId))]
  
  for (const roomId of uniqueRoomIds) {
    await loadRoomData(roomId)
  }
}

/* Load bookings */
const loadBookings = async () => {
  try {
    if (customerProfile.value?.customerId) {
      // Sử dụng API lấy booking theo customer ID
      await fetchBookingsByCustomer(customerProfile.value.customerId, 0, 100)
    } else {
      await fetchAllBookings(0, 100) // Load more bookings for history
    }
    
    // Load room data for all bookings
    await loadRoomDataForBookings()
  } catch (err) {
    //.error('Failed to load bookings:', err)
  }
}

// Load booking history
const loadBookingHistory = async () => {
  try {
    if (customerProfile.value?.customerId) {
      // Sử dụng API lấy lịch sử booking
      await fetchCustomerBookingHistory(customerProfile.value.customerId, 0, 100)
    }
  } catch (err) {
    //.error('Failed to load booking history:', err)
  }
}

/* Handle booking refresh */
const handleBookingRefresh = async () => {
  await loadBookings()
}

/* Contact support */
const contactSupport = () => {
  // TODO: Implement support contact
  alert('Tính năng liên hệ hỗ trợ sẽ được cập nhật sớm!')
}

/* Helper functions */
const getStatusClasses = (status: string) => {
  const statusMap: Record<string, string> = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'CONFIRMED': 'bg-green-100 text-green-800',
    'CHECKED_IN': 'bg-blue-100 text-blue-800',
    'PAID': 'bg-purple-100 text-purple-800',
    'CHECKED_OUT': 'bg-gray-100 text-gray-800',
    'CANCELLING': 'bg-orange-100 text-orange-800',
    'CANCELLED': 'bg-red-100 text-red-800',
    'DEPOSITED': 'bg-cyan-100 text-cyan-800'
  }
  return statusMap[status.toUpperCase()] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'PENDING': 'Đang chờ',
    'CONFIRMED': 'Đã xác nhận',
    'CHECKED_IN': 'Đã check-in',
    'PAID': 'Đã thanh toán',
    'CHECKED_OUT': 'Đã check-out',
    'CANCELLING': 'Đang hủy',
    'CANCELLED': 'Đã hủy',
    'DEPOSITED': 'Đã đặt cọc'
  }
  return statusMap[status.toUpperCase()] || status
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

// Get status breakdown for debugging
const getStatusBreakdown = () => {
  const breakdown: Record<string, number> = {}
  bookings.value.forEach(booking => {
    const status = booking.status.toUpperCase()
    breakdown[status] = (breakdown[status] || 0) + 1
  })
  return breakdown
}

// View booking details
const viewBookingDetails = (booking: BookingDto) => {
  selectedBooking.value = booking
  showBookingModal.value = true
}

// Cancel booking
const handleCancelBooking = async (bookingId: string) => {
  if (confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
    try {
      await cancelBooking(bookingId)
      await loadBookings()
    } catch (err) {
      //.error('Failed to cancel booking:', err)
    }
  }
}

// Update booking
const handleUpdateBooking = (booking: BookingDto) => {
  navigateTo(`/order/${booking.bookingId}`)
}

const handlePayment = async (booking: BookingDto) => {
  try {
    confirmLoading.value = true
    // Gọi API xác nhận thanh toán
    const response = await confirmBookingPaymentApi(booking.bookingId)
    // Kiểm tra nếu có urlPayment từ API
    if (response.urlPayment) {
      // Hiển thị thông báo thành công với SweetAlert2
      await $Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đang chuyển hướng đến trang thanh toán...',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: '#f8fafc',
        color: '#1e293b'
      })
      
      // Chuyển hướng đến URL thanh toán
      window.location.href = response.urlPayment
    } else {
      // Nếu không có urlPayment, chuyển đến trang chi tiết booking
      await $Swal.fire({
        icon: 'success',
        title: 'Xác nhận thành công!',
        text: 'Trạng thái đặt phòng đã được cập nhật.',
        confirmButtonText: 'Xem chi tiết',
        background: '#f8fafc',
        color: '#1e293b'
      })
      await navigateTo(`/order/${booking.bookingId}`)
    }
    
  } catch (error) {
    await $Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Có lỗi xảy ra khi xác nhận đặt phòng. Vui lòng thử lại.',
      confirmButtonText: 'Đóng',
      background: '#fef2f2',
      color: '#dc2626'
    })
  } finally {
    confirmLoading.value = false
  }
}

// Check if booking can be cancelled
const canCancelBooking = (status: string) => {
  return ['PENDING', 'CONFIRMED', 'DEPOSITED'].includes(status.toUpperCase())
}

// Check if booking can be updated
const canUpdateBooking = (status: string) => {
  return ['PENDING', 'DEPOSITED'].includes(status.toUpperCase())
}

// Get room status classes
const getRoomStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    'VACANT': 'bg-green-100 text-green-800',
    'OCCUPIED': 'bg-red-100 text-red-800',
    'MAINTENANCE': 'bg-yellow-100 text-yellow-800',
    'CLEANING': 'bg-blue-100 text-blue-800',
    'RESERVED': 'bg-purple-100 text-purple-800',
    'OUT_OF_ORDER': 'bg-red-100 text-red-800'
  }
  return statusMap[status?.toUpperCase()] || 'bg-gray-100 text-gray-800'
}

// Get room status text
const getRoomStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'VACANT': 'Trống',
    'OCCUPIED': 'Đang sử dụng',
    'MAINTENANCE': 'Bảo trì',
    'CLEANING': 'Đang dọn dẹp',
    'RESERVED': 'Đã đặt trước',
    'OUT_OF_ORDER': 'Hỏng hóc'
  }
  return statusMap[status?.toUpperCase()] || status || 'Không xác định'
}
</script>
