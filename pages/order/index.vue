<template>
  <div class="min-h-screen bg-system-gray-10">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <button
              @click="goBack"
              class="flex items-center text-system-primary-100 hover:text-system-primary-120 mb-4 transition-colors"
            >
              <Icon name="ic:baseline-arrow-back" class="w-5 h-5 mr-2" />
              Quay lại danh sách phòng
            </button>
            <h1 class="text-h2 text-system-gray-80 xl:text-h1 mb-2">
              🏨 Đặt Phòng
            </h1>
            <p class="text-body text-system-gray-60">
              Hoàn tất thông tin để đặt phòng của bạn
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Đặt Phòng -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-h4 font-bold text-system-gray-80 mb-6">Thông tin đặt phòng</h3>
            
            <!-- Thông tin phòng đã chọn -->
            <div class="bg-system-primary-10 rounded-lg p-4 mb-6">
              <h4 class="text-h5 font-semibold text-system-primary-100 mb-3">Phòng đã chọn</h4>
              <div class="grid grid-cols-2 gap-4 text-body-sm">
                <div>
                  <span class="text-system-gray-60">Số phòng:</span>
                  <span class="font-medium ml-2">{{ roomInfo.roomNumber }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Loại phòng:</span>
                  <span class="font-medium ml-2">{{ roomInfo.roomTypeName }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Tầng:</span>
                  <span class="font-medium ml-2">{{ roomInfo.floor }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Diện tích:</span>
                  <span class="font-medium ml-2">{{ roomInfo.area }}m²</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Số người tối đa:</span>
                  <span class="font-medium ml-2">{{ roomInfo.maxOccupancy }} người</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Giá/đêm:</span>
                  <span class="font-medium ml-2 text-system-primary-100">{{ formatPrice(roomInfo.basePrice) }}</span>
                </div>
              </div>
            </div>

            <!-- Form thông tin khách hàng -->
            <form @submit.prevent="submitBooking" class="space-y-6">
              <!-- Ngày nhận phòng -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                    Ngày nhận phòng *
                  </label>
                  <input
                    v-model="bookingForm.checkInDate"
                    type="date"
                    required
                    class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                  />
                </div>
                <div>
                  <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                    Ngày trả phòng *
                  </label>
                  <input
                    v-model="bookingForm.checkOutDate"
                    type="date"
                    required
                    class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                  />
                </div>
              </div>

              <!-- Số lượng khách -->
              <div>
                <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                  Số lượng khách *
                </label>
                <select
                  v-model="bookingForm.guestCount"
                  required
                  class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                >
                  <option value="">Chọn số lượng khách</option>
                  <option v-for="i in roomInfo.maxOccupancy" :key="i" :value="i">{{ i }} người</option>
                </select>
              </div>

              <!-- Họ tên -->
              <div>
                <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                  Họ tên khách hàng *
                </label>
                <input
                  v-model="bookingForm.customerName"
                  type="text"
                  required
                  placeholder="Nhập họ tên đầy đủ"
                  class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                />
              </div>

              <!-- Số điện thoại -->
              <div>
                <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                  Số điện thoại *
                </label>
                <input
                  v-model="bookingForm.phone"
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại"
                  class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                  Email
                </label>
                <input
                  v-model="bookingForm.email"
                  type="email"
                  placeholder="Nhập email (không bắt buộc)"
                  class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                />
              </div>

              <!-- Ghi chú -->
              <div>
                <label class="block text-body-sm font-medium text-system-gray-80 mb-2">
                  Ghi chú
                </label>
                <textarea
                  v-model="bookingForm.notes"
                  rows="3"
                  placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú (không bắt buộc)"
                  class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent"
                ></textarea>
              </div>

              <!-- Button đặt phòng -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-system-primary-100 text-white py-4 px-6 rounded-lg font-medium hover:bg-system-primary-120 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </span>
                <span v-else>Đặt phòng ngay</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Sidebar - Tóm tắt đơn hàng -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h3 class="text-h5 font-bold text-system-gray-80 mb-4">Tóm tắt đơn hàng</h3>
            
            <div class="space-y-4">
              <!-- Thông tin phòng -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Phòng {{ roomInfo.roomNumber }}</span>
                <span class="text-body font-medium">{{ roomInfo.roomTypeName }}</span>
              </div>
              
              <!-- Số đêm -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Số đêm</span>
                <span class="text-body font-medium">{{ numberOfNights }} đêm</span>
              </div>
              
              <!-- Giá/đêm -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Giá/đêm</span>
                <span class="text-body font-medium">{{ formatPrice(roomInfo.basePrice) }}</span>
              </div>
              
              <!-- Đường kẻ -->
              <div class="border-t border-system-gray-30 pt-4">
                <div class="flex justify-between">
                  <span class="text-h5 font-bold text-system-gray-80">Tổng cộng</span>
                  <span class="text-h5 font-bold text-system-primary-100">{{ formatPrice(totalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from '#app'
import { navigateTo } from '#app'

// Route
const route = useRoute()

// Reactive state
const loading = ref(false)

// Thông tin phòng từ query parameters
const roomInfo = ref({
  roomId: '',
  roomNumber: '',
  roomTypeId: '',
  roomTypeName: '',
  floor: '',
  area: 25,
  maxOccupancy: 2,
  basePrice: 1000000,
  status: ''
})

// Form đặt phòng
const bookingForm = ref({
  checkInDate: '',
  checkOutDate: '',
  guestCount: '',
  customerName: '',
  phone: '',
  email: '',
  notes: ''
})

// Computed properties
const numberOfNights = computed(() => {
  if (!bookingForm.value.checkInDate || !bookingForm.value.checkOutDate) return 0
  
  const checkIn = new Date(bookingForm.value.checkInDate)
  const checkOut = new Date(bookingForm.value.checkOutDate)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays > 0 ? diffDays : 0
})

const totalPrice = computed(() => {
  return roomInfo.value.basePrice * numberOfNights.value
})

// Methods
const goBack = () => {
  navigateTo('/rooms')
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const submitBooking = async () => {
  try {
    loading.value = true
    console.log('🚀 Submitting booking:', {
      roomInfo: roomInfo.value,
      bookingForm: bookingForm.value,
      totalPrice: totalPrice.value
    })
    
    // TODO: Gọi API để tạo đơn đặt phòng
    // const response = await createBooking({
    //   roomId: roomInfo.value.roomId,
    //   checkInDate: bookingForm.value.checkInDate,
    //   checkOutDate: bookingForm.value.checkOutDate,
    //   guestCount: parseInt(bookingForm.value.guestCount),
    //   customerName: bookingForm.value.customerName,
    //   phone: bookingForm.value.phone,
    //   email: bookingForm.value.email,
    //   notes: bookingForm.value.notes,
    //   totalPrice: totalPrice.value
    // })
    
    // Tạm thời hiển thị thông báo thành công
    alert('Đặt phòng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
    
    // Chuyển về trang danh sách phòng
    navigateTo('/rooms')
    
  } catch (error) {
    console.error('❌ Error submitting booking:', error)
    alert('Có lỗi xảy ra khi đặt phòng. Vui lòng thử lại.')
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  console.log('🚀 Order page mounted')
  console.log('📋 Route query:', route.query)
  
  // Lấy thông tin phòng từ query parameters
  if (route.query.roomId) roomInfo.value.roomId = route.query.roomId as string
  if (route.query.roomNumber) roomInfo.value.roomNumber = route.query.roomNumber as string
  if (route.query.roomTypeId) roomInfo.value.roomTypeId = route.query.roomTypeId as string
  if (route.query.roomTypeName) roomInfo.value.roomTypeName = route.query.roomTypeName as string
  if (route.query.floor) roomInfo.value.floor = route.query.floor as string
  if (route.query.area) roomInfo.value.area = parseInt(route.query.area as string) || 25
  if (route.query.maxOccupancy) roomInfo.value.maxOccupancy = parseInt(route.query.maxOccupancy as string) || 2
  if (route.query.basePrice) roomInfo.value.basePrice = parseInt(route.query.basePrice as string) || 1000000
  if (route.query.status) roomInfo.value.status = route.query.status as string
  
  console.log('✅ Room info loaded:', roomInfo.value)
  
  // Set ngày mặc định (ngày mai và ngày kia)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
  
  bookingForm.value.checkInDate = tomorrow.toISOString().split('T')[0]
  bookingForm.value.checkOutDate = dayAfterTomorrow.toISOString().split('T')[0]
  bookingForm.value.guestCount = '1'
})
</script>

<style scoped>
/* Custom styles */
.sticky {
  position: sticky;
  top: 1.5rem;
}
</style>
