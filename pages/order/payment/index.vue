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
              Quay lại đặt phòng
            </button>
            <h1 class="text-h2 text-system-gray-80 xl:text-h1 mb-2">
              💳 Thanh toán đặt phòng
            </h1>
            <p class="text-body text-system-gray-60">
              Xác nhận thông tin và hoàn tất thanh toán
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Thông tin xác nhận -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-h4 font-bold text-system-gray-80 mb-6">Xác nhận thông tin đặt phòng</h3>
            
            <!-- Thông tin booking đã tạo -->
            <div v-if="bookingData.bookingId" class="bg-green-50 rounded-lg p-4 mb-6">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p class="text-sm font-medium text-green-800">Đơn đặt phòng đã được tạo thành công!</p>
                  <p class="text-xs text-green-600">Mã đặt phòng: <span class="font-mono">{{ bookingData.bookingId }}</span></p>
                  <p class="text-xs text-green-600">Trạng thái: <span class="font-medium">{{ bookingData.bookingStatus }}</span></p>
                </div>
              </div>
            </div>
            
            <!-- Thông tin phòng -->
            <div class="bg-system-primary-10 rounded-lg p-6 mb-6">
              <h4 class="text-h5 font-semibold text-system-primary-100 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Thông tin phòng
              </h4>
              <div class="grid grid-cols-2 gap-4 text-body-sm">
                <div>
                  <span class="text-system-gray-60">Số phòng:</span>
                  <span class="font-medium ml-2">{{ bookingData.roomInfo.roomNumber }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Loại phòng:</span>
                  <span class="font-medium ml-2">{{ bookingData.roomInfo.roomTypeName }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Tầng:</span>
                  <span class="font-medium ml-2">{{ bookingData.roomInfo.floor }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Diện tích:</span>
                  <span class="font-medium ml-2">{{ bookingData.roomInfo.area }}m²</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Số người tối đa:</span>
                  <span class="font-medium ml-2">{{ bookingData.roomInfo.maxOccupancy }} người</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Giá/đêm:</span>
                  <span class="font-medium ml-2 text-system-primary-100">{{ formatPrice(bookingData.roomInfo.basePrice) }}</span>
                </div>
              </div>
            </div>

            <!-- Thông tin đặt phòng -->
            <div class="bg-blue-50 rounded-lg p-6 mb-6">
              <h4 class="text-h5 font-semibold text-blue-700 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Thông tin đặt phòng
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm">
                <div>
                  <span class="text-system-gray-60">Ngày nhận phòng:</span>
                  <span class="font-medium ml-2">{{ formatDate(bookingData.bookingForm.checkInDate) }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Ngày trả phòng:</span>
                  <span class="font-medium ml-2">{{ formatDate(bookingData.bookingForm.checkOutDate) }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Số đêm:</span>
                  <span class="font-medium ml-2">{{ numberOfNights }} đêm</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Số lượng khách:</span>
                  <span class="font-medium ml-2">{{ bookingData.bookingForm.guestCount }} người</span>
                </div>
              </div>
            </div>

            <!-- Thông tin khách hàng -->
            <div class="bg-green-50 rounded-lg p-6 mb-6">
              <h4 class="text-h5 font-semibold text-green-700 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Thông tin khách hàng
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-body-sm">
                <div>
                  <span class="text-system-gray-60">Họ tên:</span>
                  <span class="font-medium ml-2">{{ bookingData.bookingForm.customerName }}</span>
                </div>
                <div>
                  <span class="text-system-gray-60">Số điện thoại:</span>
                  <span class="font-medium ml-2">{{ bookingData.bookingForm.phone }}</span>
                </div>
                <div v-if="bookingData.bookingForm.email" class="md:col-span-2">
                  <span class="text-system-gray-60">Email:</span>
                  <span class="font-medium ml-2">{{ bookingData.bookingForm.email }}</span>
                </div>
                <div v-if="bookingData.bookingForm.notes" class="md:col-span-2">
                  <span class="text-system-gray-60">Ghi chú:</span>
                  <span class="font-medium ml-2">{{ bookingData.bookingForm.notes }}</span>
                </div>
              </div>
            </div>

            <!-- Điều khoản và điều kiện -->
            <div class="bg-yellow-50 rounded-lg p-6 mb-6">
              <h4 class="text-h5 font-semibold text-yellow-700 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Điều khoản và điều kiện
              </h4>
              <div class="text-body-sm text-system-gray-70 space-y-2">
                <p>• Hủy phòng miễn phí trước 24h so với thời gian check-in</p>
                <p>• Check-in từ 14:00, Check-out trước 12:00</p>
                <p>• Không hút thuốc trong phòng</p>
                <p>• Không mang thú cưng vào phòng</p>
                <p>• Tuân thủ quy định của khách sạn</p>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                @click="goBack"
                class="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Quay lại chỉnh sửa
              </button>
              
              <!-- Nút xác nhận đặt phòng (cho booking đã có) -->
              <button
                v-if="bookingData.bookingId"
                @click="confirmBooking"
                :disabled="confirmLoading"
                class="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="confirmLoading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang xác nhận...
                </span>
                <span v-else class="flex items-center justify-center">
                  <Icon name="ic:baseline-check-circle" class="w-5 h-5 mr-2" />
                  Tiến thành thanh toán
                </span>
              </button>
              
              <!-- Nút thanh toán (cho booking mới) -->
              <button
                v-else
                :disabled="loading"
                class="flex-1 bg-system-primary-100 text-white py-3 px-6 rounded-lg font-medium hover:bg-system-primary-120 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </span>
                <span v-else>Tiến hành thanh toán</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Sidebar - Tóm tắt đơn hàng -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h3 class="text-h5 font-bold text-system-gray-80 mb-4">Tóm tắt đơn hàng</h3>
            
            <div class="space-y-4">
              <!-- Thông tin phòng -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Phòng {{ bookingData.roomInfo.roomNumber }}</span>
                <span class="text-body font-medium">{{ bookingData.roomInfo.roomTypeName }}</span>
              </div>
              
              <!-- Số đêm -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Số đêm</span>
                <span class="text-body font-medium">{{ numberOfNights }} đêm</span>
              </div>
              
              <!-- Giá/đêm -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Giá/đêm</span>
                <span class="text-body font-medium">{{ formatPrice(bookingData.roomInfo.basePrice) }}</span>
              </div>
              
              <!-- Phí dịch vụ -->
              <div class="flex justify-between">
                <span class="text-body text-system-gray-60">Phí dịch vụ</span>
                <span class="text-body font-medium">{{ formatPrice(serviceFee) }}</span>
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
import { useRoute, useRouter } from '#app'
import { confirmBookingPaymentApi } from '~/api/order'
import { usePayment } from '~/composables/usePayment'

// Route & Router
const route = useRoute()
const router = useRouter()
const { $Swal } = useNuxtApp()

// Payment composable
const { 
  loading: paymentLoading, 
  error: paymentError,
  createRoomBookingPayment 
} = usePayment()

// Reactive state
const loading = ref(false)
const confirmLoading = ref(false)

// Booking data từ route query
const bookingData = ref({
  bookingId: '',
  bookingStatus: '',
  roomInfo: {
    roomId: '',
    roomNumber: '',
    roomTypeId: '',
    roomTypeName: '',
    floor: '',
    area: 25,
    maxOccupancy: 2,
    basePrice: 1000000,
    status: ''
  },
  bookingForm: {
    checkInDate: '',
    checkOutDate: '',
    guestCount: '',
    customerName: '',
    phone: '',
    email: '',
    notes: ''
  }
})

// Computed properties
const numberOfNights = computed(() => {
  if (!bookingData.value.bookingForm.checkInDate || !bookingData.value.bookingForm.checkOutDate) return 0
  
  const checkIn = new Date(bookingData.value.bookingForm.checkInDate)
  const checkOut = new Date(bookingData.value.bookingForm.checkOutDate)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays > 0 ? diffDays : 0
})

const serviceFee = computed(() => {
  // Phí dịch vụ 5% của tổng tiền phòng
  return Math.round(bookingData.value.roomInfo.basePrice * numberOfNights.value * 0.05)
})

const totalPrice = computed(() => {
  return bookingData.value.roomInfo.basePrice * numberOfNights.value + serviceFee.value
})

// Methods
const goBack = () => {
  // Quay lại trang đặt phòng với dữ liệu đã có
  const query = {
    ...route.query,
    ...bookingData.value.roomInfo,
    ...bookingData.value.bookingForm
  }
  router.push({ path: '/order', query })
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
<<<<<<< HEAD

const createPaymentLink = async () => {
  try {
    loading.value = true
    
    // Tạo dữ liệu thanh toán
    const paymentData = {
      amount: totalPrice.value,
      description: `Đặt phòng ${bookingData.value.roomInfo.roomNumber} - ${bookingData.value.bookingForm.customerName}`,
      orderCode: bookingData.value.bookingId || `BOOK_${Date.now()}`,
      returnUrl: `${window.location.origin}/order/success`,
      cancelUrl: `${window.location.origin}/order/cancel`,
      signature: '', // Sẽ được tính toán ở backend
      items: [
        {
          name: `Phòng ${bookingData.value.roomInfo.roomNumber}`,
          quantity: numberOfNights.value,
          price: bookingData.value.roomInfo.basePrice
        },
        {
          name: 'Phí dịch vụ',
          quantity: 1,
          price: serviceFee.value
        }
      ],
      buyerName: bookingData.value.bookingForm.customerName,
      buyerEmail: bookingData.value.bookingForm.email || 'guest@example.com',
      buyerPhone: bookingData.value.bookingForm.phone,
      buyerAddress: bookingData.value.bookingForm.notes || 'Không có',
      bookingId: bookingData.value.bookingId // Thêm booking ID vào dữ liệu thanh toán
    }

    //.log('🚀 Creating payment link with data:', paymentData)
    
    const config = useRuntimeConfig()
    const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
    
    const res = await $fetch<{ checkoutUrl: string }>(`${apiGatewayUrl}/api/payment/create-payment-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: paymentData
    })
    
    //.log('✅ Payment link created:', res)
    
    // Chuyển hướng đến URL thanh toán của PayOS
    window.location.href = res.checkoutUrl
    
  } catch (err) {
    //.error('❌ Error creating payment link:', err)
    loading.value = false
    alert('Không thể tạo link thanh toán. Vui lòng thử lại.')
  }
}

const proceedToPayment = async () => {
  // Kiểm tra lại thông tin trước khi thanh toán
  if (!bookingData.value.roomInfo.roomNumber || !bookingData.value.bookingForm.customerName) {
    await $Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Thông tin đặt phòng không đầy đủ. Vui lòng thử lại.',
      confirmButtonText: 'Đóng',
      background: '#fef3c7',
      color: '#92400e'
    })
    return
  }
  
  // Tạo link thanh toán
  await createPaymentLink()
}

const confirmBooking = async () => {
  try {
    confirmLoading.value = true
    //.log('✅ Confirming booking payment for ID:', bookingData.value.bookingId)
    
    // Gọi API xác nhận thanh toán
    const response = await confirmBookingPaymentApi(bookingData.value.bookingId)
    
    //.log('✅ Booking payment confirmed successfully:', response)
    
    // Kiểm tra nếu có urlPayment từ API
    if (response.urlPayment) {
      //.log('🌐 Redirecting to payment URL:', response.urlPayment)
      
=======
const confirmBooking = async () => {
  try {
    confirmLoading.value = true
    
    // Gọi API xác nhận thanh toán
    const response = await confirmBookingPaymentApi(bookingData.value.bookingId)
    // Kiểm tra nếu có urlPayment từ API
    if (response.urlPayment) {
>>>>>>> 4a166e7591d44cdc837483899131ba0e82221bfd
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
      router.push(`/order/${bookingData.value.bookingId}`)
    }
    
  } catch (error) {
<<<<<<< HEAD
    //.error('❌ Error confirming booking payment:', error)
=======
>>>>>>> 4a166e7591d44cdc837483899131ba0e82221bfd
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

// Lifecycle
onMounted(async () => {
<<<<<<< HEAD
  //.log('🚀 Payment page mounted')
  //.log('📋 Route query:', route.query)
  
=======
>>>>>>> 4a166e7591d44cdc837483899131ba0e82221bfd
  // Lấy thông tin booking đã tạo từ query parameters
  if (route.query.bookingId) bookingData.value.bookingId = route.query.bookingId as string
  if (route.query.bookingStatus) bookingData.value.bookingStatus = route.query.bookingStatus as string
  
  // Lấy thông tin phòng từ query parameters
  if (route.query.roomId) bookingData.value.roomInfo.roomId = route.query.roomId as string
  if (route.query.roomNumber) bookingData.value.roomInfo.roomNumber = route.query.roomNumber as string
  if (route.query.roomTypeId) bookingData.value.roomInfo.roomTypeId = route.query.roomTypeId as string
  if (route.query.roomTypeName) bookingData.value.roomInfo.roomTypeName = route.query.roomTypeName as string
  if (route.query.floor) bookingData.value.roomInfo.floor = route.query.floor as string
  if (route.query.area) bookingData.value.roomInfo.area = parseInt(route.query.area as string) || 25
  if (route.query.maxOccupancy) bookingData.value.roomInfo.maxOccupancy = parseInt(route.query.maxOccupancy as string) || 2
  if (route.query.basePrice) bookingData.value.roomInfo.basePrice = parseInt(route.query.basePrice as string) || 1000000
  if (route.query.status) bookingData.value.roomInfo.status = route.query.status as string
  
  // Lấy thông tin đặt phòng từ query parameters
  if (route.query.checkInDate) bookingData.value.bookingForm.checkInDate = route.query.checkInDate as string
  if (route.query.checkOutDate) bookingData.value.bookingForm.checkOutDate = route.query.checkOutDate as string
  if (route.query.guestCount) bookingData.value.bookingForm.guestCount = route.query.guestCount as string
  if (route.query.customerName) bookingData.value.bookingForm.customerName = route.query.customerName as string
  if (route.query.phone) bookingData.value.bookingForm.phone = route.query.phone as string
  if (route.query.email) bookingData.value.bookingForm.email = route.query.email as string
  if (route.query.notes) bookingData.value.bookingForm.notes = route.query.notes as string
<<<<<<< HEAD
  
  //.log('✅ Booking data loaded:', bookingData.value)
  
  // Kiểm tra nếu không có dữ liệu cần thiết
  if (!bookingData.value.roomInfo.roomNumber || !bookingData.value.bookingForm.customerName) {
    //.warn('⚠️ Missing required booking data, redirecting to rooms page')
    await $Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Thông tin đặt phòng không đầy đủ. Vui lòng thử lại.',
      confirmButtonText: 'Đóng',
      background: '#fef3c7',
      color: '#92400e'
    })
    router.push('/rooms')
  }
=======
>>>>>>> 4a166e7591d44cdc837483899131ba0e82221bfd
})
</script>

<style scoped>
/* Custom styles */
.sticky {
  position: sticky;
  top: 1.5rem;
}
</style>

