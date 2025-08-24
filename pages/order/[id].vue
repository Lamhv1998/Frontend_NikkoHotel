<template>
  <div class="bg-system-primary-10">
    <div v-if="booking" class="section-container space-y-10">
      <!-- Liên kết: Chi tiết đơn hàng -->
      <div class="container">
        <NuxtLink
          class="inline-flex items-center gap-2 text-h5 transition-colors hover:text-system-primary-120 xl:text-h3"
          to="/user/bookings"
        >
          <Icon class="text-icon-24 xl:text-icon-40" name="ic:baseline-keyboard-arrow-left" />
          Chi tiết đơn hàng
        </NuxtLink>
      </div>

      <!-- Khối chứa -->
      <div class="col-md-container container">
        <!-- Khối thông tin đặt phòng -->
        <div class="space-y-10 xl:col-span-7">
          <!-- Khối thông tin đặt phòng -->
          <ClientOnly>
            <section class="space-y-8 xl:space-y-10">
              <h3 class="text-h6 xl:text-h4">Thông tin đặt phòng</h3>

              <!-- Chọn loại phòng -->
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Mã đặt phòng" size="md" />
                    <p class="text-body font-mono">
                      {{ booking.bookingId }}
                    </p>
                  </div>
                </div>

                <!-- Ngày đặt phòng -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Ngày đặt phòng" size="md" />
                    <div v-if="booking.checkInDate && booking.checkOutDate" class="space-y-3">
                      <p class="text-body">
                        {{ `Nhận phòng: ${$dayjs(booking.checkInDate).format('D/M dddd')}` }}
                      </p>
                      <p class="text-body">
                        {{ `Trả phòng: ${$dayjs(booking.checkOutDate).format('D/M dddd')}` }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Số lượng khách -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Số lượng khách" size="md" />
                    <p class="text-body">
                      {{ `${booking.numberOfGuests} người` }}
                    </p>
                  </div>
                </div>

                <!-- Trạng thái đặt phòng -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Trạng thái" size="md" />
                    <span class="px-3 py-1 rounded-full text-sm font-medium" 
                          :class="{
                            'bg-green-100 text-green-800': booking.status === 'CONFIRMED',
                            'bg-yellow-100 text-yellow-800': booking.status === 'PENDING',
                            'bg-red-100 text-red-800': booking.status === 'CANCELLED',
                            'bg-blue-100 text-blue-800': booking.status === 'COMPLETED'
                          }">
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </ClientOnly>

          <!-- Đường kẻ phân cách -->
          <UILine color="darkGray" />

          <!-- Khối thông tin người đặt phòng -->
          <ClientOnly>
            <section class="space-y-8 xl:space-y-10">
              <div class="flex items-center justify-between">
                <h3 class="text-h6 xl:text-h4">Thông tin người đặt phòng</h3>
              </div>

              <div class="space-y-6">
                <!-- Họ tên -->
                <UIInput
                  :value="'Khách hàng ID: ' + booking.customerId"
                  name="name"
                  label="Họ tên"
                  placeholder="Vui lòng nhập họ tên"
                  blackhead
                  disabled
                />

                <!-- Số điện thoại -->
                <UIInput
                  :value="'Không có thông tin'"
                  name="phone"
                  label="Số điện thoại"
                  placeholder="Vui lòng nhập số điện thoại"
                  blackhead
                  disabled
                />

                <!-- Email -->
                <UIInput
                  :value="'Không có thông tin'"
                  name="email"
                  label="Email"
                  placeholder="Vui lòng nhập email"
                  blackhead
                  disabled
                />

                <!-- Ghi chú đặc biệt -->
                <div v-if="booking.notes" class="space-y-2">
                  <label class="block text-body-sm font-medium text-system-gray-80">
                    Yêu cầu đặc biệt
                  </label>
                  <div class="p-3 bg-gray-50 rounded-lg text-body">
                    {{ booking.notes }}
                  </div>
                </div>

                <!-- Địa chỉ -->
                <!-- <CAddress v-model="room.userInfo.address" blackhead disabled /> -->
              </div>
            </section>
          </ClientOnly>

          <!-- Đường kẻ phân cách -->
          <UILine color="darkGray" />

          <!-- Khối thông tin phòng -->
          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h4">Thông tin phòng</h3>

            <div class="bg-white rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span class="text-system-gray-60">Phòng:</span>
                  <div class="mt-2">
                    <div class="px-3 py-2 bg-gray-50 rounded-lg text-sm">
                      Phòng ID: {{ booking.roomId }}
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-system-gray-60">Tổng số phòng:</span>
                  <span class="font-medium ml-2">1 phòng</span>
                </div>
              </div>
              
              <!-- Thông tin bổ sung -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="text-h5 font-semibold mb-4">Thông tin bổ sung</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-system-gray-60">Ngày tạo:</span>
                    <span class="font-medium ml-2">{{ $dayjs(booking.createdAt).format('DD/MM/YYYY HH:mm') }}</span>
                  </div>
                  <div>
                    <span class="text-system-gray-60">Cập nhật lần cuối:</span>
                    <span class="font-medium ml-2">{{ $dayjs(booking.updatedAt).format('DD/MM/YYYY HH:mm') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Khối chi tiết giá -->
        <div class="xl:col-span-5">
          <div class="card xl:sticky xl:top-[10rem] xl:z-20">
            <div class="bg-white rounded-lg p-6">
              <ClientOnly>
                <div class="space-y-6">
                  <div class="text-h4">Chi tiết giá</div>

                  <div class="flex justify-between text-body">
                    <p>
                      {{
                        `${useFormatCurrency(booking.totalAmount)} × ${$dayjs(booking.checkOutDate).diff($dayjs(booking.checkInDate), 'day')} đêm`
                      }}
                    </p>
                    <p>
                      {{
                        useFormatCurrency(booking.totalAmount)
                      }}
                    </p>
                  </div>

                  <UILine color="lightGrey" />

                  <div class="flex justify-between text-title">
                    <p>Tổng cộng</p>
                    <p>
                      {{
                        useFormatCurrency(booking.totalAmount)
                      }}
                    </p>
                  </div>
                </div>
              </ClientOnly>

              <div class="mt-6 space-y-3">
                <!-- Nút xác nhận đặt phòng cho booking PENDING -->
                <button
                  v-if="booking && booking.status === 'PENDING'"
                  @click="confirmBookingPayment"
                  :disabled="confirmLoading"
                  class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span v-if="confirmLoading" class="flex items-center justify-center">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang xác nhận...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <Icon name="ic:baseline-check-circle" class="w-5 h-5 mr-2" />
                    Xác nhận thanh toán
                  </span>
                </button>
                
                <NuxtLink class="block" to="/user/bookings">
                  <UIButton type="submit" block text="Quay lại đơn đặt phòng" />
                </NuxtLink>
                
                <!-- Loading state -->
                <div v-if="loading" class="text-center py-4">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-system-primary-100 mx-auto"></div>
                  <p class="text-sm text-system-gray-60 mt-2">Đang tải thông tin...</p>
                </div>
                
                <!-- Error state -->
                <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p class="text-red-800 text-sm">{{ error }}</p>
                </div>
                
                <!-- Debug button (only in development) -->
                <div v-if="$nuxt.dev" class="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h4 class="font-semibold mb-2">Debug Info:</h4>
                  <p class="text-sm">Booking ID: {{ id }}</p>
                  <p class="text-sm">Loading: {{ loading }}</p>
                  <p class="text-sm">Error: {{ error }}</p>
                  <p class="text-sm">Has Booking: {{ !!booking }}</p>
                  <button 
                    @click="loadBookingData"
                    class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                  >
                    Reload Booking Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import type { BookingDto } from '~/types/order'
import { confirmBookingPaymentApi } from '~/api/order'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* Toàn cục thuộc tính */
const route = useRoute()
const { $dayjs, $Swal } = useNuxtApp()

/* ID booking */
const {
  params: { id }
} = route

/* Booking composable */
const { fetchBookingById, currentBooking, loading, error } = useBooking()

/* Reactive state */
const booking = computed(() => currentBooking.value)
const confirmLoading = ref(false)

/* Methods */
const loadBookingData = async () => {
  try {
    // Test direct API call first
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'http://localhost:8083'
    
    const testUrl = `${bookingServiceUrl}/api/bookings/${id}`
    
    // Now try the composable method
    await fetchBookingById(id as string)
  } catch (err) {
    // Handle error silently
  }
}

/* Watch for currentBooking changes */
watch(currentBooking, () => {
  // UI sẽ được cập nhật tự động
}, { immediate: true })

/* Methods */
const confirmBookingPayment = async () => {
  try {
    confirmLoading.value = true
    
    // Gọi API xác nhận thanh toán
    const response = await confirmBookingPaymentApi(id as string)
    
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
      // Nếu không có urlPayment, reload booking data để cập nhật trạng thái
      await $Swal.fire({
        icon: 'success',
        title: 'Xác nhận thành công!',
        text: 'Trạng thái đặt phòng đã được cập nhật.',
        confirmButtonText: 'Đóng',
        background: '#f8fafc',
        color: '#1e293b'
      })
      await loadBookingData()
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

/* Lifecycle */
onMounted(() => {
  loadBookingData()
})
</script>
