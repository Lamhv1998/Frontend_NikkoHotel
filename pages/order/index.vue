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
              Đặt Phòng
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
              <!-- Thông báo lỗi ngày quá khứ -->
              <div v-if="showDateError" class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-4 animate-bounce">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="ic:baseline-schedule" class="w-5 h-5 text-amber-600" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                      <Icon name="ic:baseline-warning" class="w-4 h-4" />
                      Lưu ý về ngày đặt phòng
                    </h4>
                    <p class="text-sm text-amber-700 mb-2">
                      {{ dateErrorMessage }}
                    </p>
                    <div class="flex items-center gap-2 text-xs text-amber-600">
                      <Icon name="ic:baseline-calendar-today" class="w-3 h-3" />
                      <span>Ngày hiện tại: {{ currentDate }}</span>
                    </div>
                  </div>
                  <button 
                    @click="showDateError = false"
                    class="text-amber-400 hover:text-amber-600 transition-colors p-1 rounded-full hover:bg-amber-100"
                  >
                    <Icon name="ic:baseline-close" class="w-4 h-4" />
                  </button>
                </div>
              </div>

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
                    :min="minDate"
                    @change="validateDates"
                    class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent transition-all duration-200"
                    :class="{
                      'border-red-300 focus:ring-red-200': showDateError && dateErrorType === 'checkin'
                    }"
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
                    :min="bookingForm.checkInDate || minDate"
                    @change="validateDates"
                    class="w-full px-4 py-3 border border-system-gray-30 rounded-lg focus:ring-2 focus:ring-system-primary-100 focus:border-transparent transition-all duration-200"
                    :class="{
                      'border-red-300 focus:ring-red-200': showDateError && dateErrorType === 'checkout'
                    }"
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
              <div v-if="!authStore.isAuthenticated" class="text-body-2 text-system-gray-80">
                <span>Đăng nhập để lưu thông tin của bạn (không bắt buộc)</span>
                <p>Bạn sẽ không thể áp dụng khuyến mãi hoặc tích điểm thành viên</p>
              </div>
              
              <div v-else class="text-body-2 text-system-primary-100 bg-system-primary-10 p-3 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Thông tin đã được tự động điền từ tài khoản của bạn</span>
                  </div>
                  <button 
                    @click="clearUserInfo"
                    class="text-sm text-system-primary-120 hover:text-system-primary-100 underline"
                    type="button"
                  >
                    Xóa thông tin
                  </button>
                </div>
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
                <span v-else>Xác nhận đặt phòng</span>
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
import { createBookingApi } from '~/api/order'
import type { CreateBookingRequest } from '~/types/order'

// Route
const route = useRoute()
const authStore = useAuthStore()
const { $Swal } = useNuxtApp()
// Reactive state
const loading = ref(false)

// State cho validation ngày
const showDateError = ref(false)
const dateErrorMessage = ref('')
const dateErrorType = ref<'checkin' | 'checkout' | 'both'>('both')

// Ngày hiện tại
const currentDate = computed(() => {
  return new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})

// Ngày tối thiểu (hôm nay)
const minDate = computed(() => {
  return new Date().toISOString().split('T')[0]
})

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

// Watch để tự động điền thông tin khi người dùng đăng nhập
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    //.log('👤 User authentication status changed to authenticated, populating form')
    populateUserInfo()
  }
}, { immediate: false })

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

// Function validation ngày
const validateDates = () => {
  showDateError.value = false
  dateErrorMessage.value = ''
  dateErrorType.value = 'both'
  
  if (!bookingForm.value.checkInDate || !bookingForm.value.checkOutDate) {
    return
  }
  
  const checkIn = new Date(bookingForm.value.checkInDate)
  const checkOut = new Date(bookingForm.value.checkOutDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Kiểm tra ngày check-in
  if (checkIn < today) {
    showDateError.value = true
    dateErrorType.value = 'checkin'
    dateErrorMessage.value = 'Ngày nhận phòng không thể là ngày trong quá khứ. Vui lòng chọn ngày từ hôm nay trở đi.'
    return
  }
  
  // Kiểm tra ngày check-out
  if (checkOut <= checkIn) {
    showDateError.value = true
    dateErrorType.value = 'checkout'
    dateErrorMessage.value = 'Ngày trả phòng phải sau ngày nhận phòng ít nhất 1 ngày.'
    return
  }
  
  // Kiểm tra khoảng cách ngày (tối đa 30 ngày)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays > 30) {
    showDateError.value = true
    dateErrorType.value = 'both'
    dateErrorMessage.value = 'Khoảng thời gian đặt phòng không được vượt quá 30 ngày. Vui lòng chọn khoảng thời gian ngắn hơn.'
    return
  }
}

// Hàm tự động điền thông tin người dùng đã đăng nhập
const populateUserInfo = () => {
  if (authStore.isAuthenticated) {
    //.log('👤 User is authenticated, populating form with user info')
    
    // Lấy thông tin từ user
    if (authStore.user) {
      // Điền tên khách hàng
      if (authStore.user.name) {
        bookingForm.value.customerName = authStore.user.name
      }
      
      // Điền số điện thoại
      if (authStore.user.phone) {
        bookingForm.value.phone = authStore.user.phone
      }
      
      // Điền email
      if (authStore.user.email) {
        bookingForm.value.email = authStore.user.email
      }
    }
    
    // Lấy thông tin từ customer profile (nếu có)
    if (authStore.customerProfile) {
      //.log('📋 Customer profile found:', authStore.customerProfile)
      
      // Điền tên khách hàng từ customer profile (ưu tiên hơn user)
      if (authStore.customerProfile.firstName && authStore.customerProfile.lastName) {
        const fullName = `${authStore.customerProfile.firstName} ${authStore.customerProfile.lastName}`.trim()
        bookingForm.value.customerName = fullName
      } else if (authStore.customerProfile.firstName) {
        bookingForm.value.customerName = authStore.customerProfile.firstName
      } else if (authStore.customerProfile.lastName) {
        bookingForm.value.customerName = authStore.customerProfile.lastName
      }
    }
    
    // //.log('✅ Form populated with user info:', {
    //   customerName: bookingForm.value.customerName,
    //   phone: bookingForm.value.phone,
    //   email: bookingForm.value.email
    // })
  } else {
    //.log('👤 User is not authenticated, form will remain empty')
  }
}

// Hàm xóa thông tin người dùng đã điền
const clearUserInfo = () => {
  bookingForm.value.customerName = ''
  bookingForm.value.phone = ''
  bookingForm.value.email = ''
  //.log('🧹 User info cleared from form')
}

const submitBooking = async () => {
  try {
    loading.value = true
    // //.log('🚀 Submitting booking form:', {
    //   roomInfo: roomInfo.value,
    //   bookingForm: bookingForm.value,
    //   totalPrice: totalPrice.value
    // })
    
    // Validation
    if (!bookingForm.value.checkInDate || !bookingForm.value.checkOutDate) {
      await $Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng chọn ngày nhận phòng và ngày trả phòng',
        confirmButtonText: 'Đóng',
        background: '#fef3c7',
        color: '#92400e'
      })
      return
    }
    
    if (!bookingForm.value.guestCount) {
      await $Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng chọn số lượng khách',
        confirmButtonText: 'Đóng',
        background: '#fef3c7',
        color: '#92400e'
      })
      return
    }
    
    if (!bookingForm.value.customerName.trim()) {
      await $Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập họ tên khách hàng',
        confirmButtonText: 'Đóng',
        background: '#fef3c7',
        color: '#92400e'
      })
      return
    }
    
    if (!bookingForm.value.phone.trim()) {
      await $Swal.fire({
        icon: 'warning',
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập số điện thoại',
        confirmButtonText: 'Đóng',
        background: '#fef3c7',
        color: '#92400e'
      })
      return
    }
    
    // Kiểm tra ngày hợp lệ
    validateDates()
    if (showDateError.value) {
      return
    }

    // Tạo booking request
    const createBookingRequest: CreateBookingRequest = {
      customerId: authStore.user?.id || '00000000-0000-0000-0000-000000000000', // Fallback UUID nếu chưa đăng nhập
      listRoomId: [roomInfo.value.roomId],
      checkInDate: bookingForm.value.checkInDate,
      checkOutDate: bookingForm.value.checkOutDate,
      numberOfGuests: parseInt(bookingForm.value.guestCount),
      specialRequests: bookingForm.value.notes || undefined,
      customerEmail: bookingForm.value.email || undefined,
      customerPhone: bookingForm.value.phone
    }

    //.log('📋 Creating booking with request:', createBookingRequest)

    // Gọi API tạo booking
    const createdBooking = await createBookingApi(createBookingRequest)
    
    //.log('✅ Booking created successfully:', createdBooking)
    
    // Chuyển đến trang payment với thông tin booking đã tạo
    const query = {
      // Thông tin booking đã tạo
      bookingId: createdBooking.bookingId,
      bookingStatus: createdBooking.status,
      
      // Thông tin phòng
      roomId: roomInfo.value.roomId,
      roomNumber: roomInfo.value.roomNumber,
      roomTypeId: roomInfo.value.roomTypeId,
      roomTypeName: roomInfo.value.roomTypeName,
      floor: roomInfo.value.floor,
      area: roomInfo.value.area.toString(),
      maxOccupancy: roomInfo.value.maxOccupancy.toString(),
      basePrice: roomInfo.value.basePrice.toString(),
      status: roomInfo.value.status,
      
      // Thông tin đặt phòng
      checkInDate: bookingForm.value.checkInDate,
      checkOutDate: bookingForm.value.checkOutDate,
      guestCount: bookingForm.value.guestCount,
      customerName: bookingForm.value.customerName,
      phone: bookingForm.value.phone,
      email: bookingForm.value.email,
      notes: bookingForm.value.notes
    }
    
    // Chuyển đến trang payment để xác nhận và thanh toán
    navigateTo({ path: '/order/payment', query })
    
  } catch (error) {
    //.error('❌ Error creating booking:', error)
    await $Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Có lỗi xảy ra khi tạo đơn đặt phòng. Vui lòng thử lại.',
      confirmButtonText: 'Đóng',
      background: '#fef2f2',
      color: '#dc2626'
    })
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  //.log('🚀 Order page mounted')
  //.log('📋 Route query:', route.query)
  
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
  
  //.log('✅ Room info loaded:', roomInfo.value)
  
  // Set ngày mặc định (ngày mai và ngày kia)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
  
  bookingForm.value.checkInDate = tomorrow.toISOString().split('T')[0]
  bookingForm.value.checkOutDate = dayAfterTomorrow.toISOString().split('T')[0]
  bookingForm.value.guestCount = '1'
  
  // Tự động điền thông tin người dùng nếu đã đăng nhập
  populateUserInfo()
  
  // Validate ngày mặc định
  setTimeout(() => {
    validateDates()
  }, 100)
})
</script>

<style scoped>
/* Custom styles */
.sticky {
  position: sticky;
  top: 1.5rem;
}
</style>
