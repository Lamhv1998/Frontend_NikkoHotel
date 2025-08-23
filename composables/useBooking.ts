import { ref, computed } from 'vue'
import { createBookingApi, getAllBookingsApi, getBookingByIdApi, updateBookingApi, cancelBookingApi, getBookingsByCustomerApi, getCustomerBookingHistoryApi } from '~/api/order'
import type { CreateBookingRequest, BookingDto } from '~/types/order'

export const useBooking = () => {
  const bookings = ref<BookingDto[]>([])
  const currentBooking = ref<BookingDto | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Lấy tất cả bookings
  const fetchAllBookings = async (page: number = 0, size: number = 20) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Fetching all bookings with page:', page, 'size:', size)
      
      const response = await getAllBookingsApi(page, size)
      bookings.value = response
      
      console.log('✅ Fetched bookings:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error fetching bookings:', err)
      error.value = 'Không thể tải danh sách đặt phòng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy bookings theo customer ID
  const fetchBookingsByCustomer = async (customerId: string, page: number = 0, size: number = 20) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Fetching bookings for customer:', customerId, 'page:', page, 'size:', size)
      
      const response = await getBookingsByCustomerApi(customerId, page, size)
      bookings.value = response
      
      console.log('✅ Fetched customer bookings:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error fetching customer bookings:', err)
      error.value = 'Không thể tải danh sách đặt phòng của khách hàng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy lịch sử booking của customer
  const fetchCustomerBookingHistory = async (customerId: string, page: number = 0, size: number = 20) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Fetching booking history for customer:', customerId, 'page:', page, 'size:', size)
      
      const response = await getCustomerBookingHistoryApi(customerId, page, size)
      bookings.value = response
      
      console.log('✅ Fetched customer booking history:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error fetching customer booking history:', err)
      error.value = 'Không thể tải lịch sử đặt phòng của khách hàng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy booking theo ID
  const fetchBookingById = async (bookingId: string) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Fetching booking by ID:', bookingId)
      
      const response = await getBookingByIdApi(bookingId)
      currentBooking.value = response
      
      console.log('✅ Fetched booking:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error fetching booking:', err)
      error.value = 'Không thể tải thông tin đặt phòng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tạo booking mới
  const createBooking = async (request: CreateBookingRequest) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Creating new booking:', request)
      
      const response = await createBookingApi(request)
      currentBooking.value = response
      
      console.log('✅ Created booking:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error creating booking:', err)
      error.value = 'Không thể tạo đơn đặt phòng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cập nhật booking
  const updateBooking = async (bookingId: string, request: Partial<CreateBookingRequest>) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Updating booking:', bookingId, request)
      
      const response = await updateBookingApi(bookingId, request)
      currentBooking.value = response
      
      // Cập nhật trong danh sách bookings
      const index = bookings.value.findIndex(b => b.bookingId === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }
      
      console.log('✅ Updated booking:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error updating booking:', err)
      error.value = 'Không thể cập nhật đơn đặt phòng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Hủy booking
  const cancelBooking = async (bookingId: string) => {
    try {
      loading.value = true
      error.value = null
      console.log('📋 Cancelling booking:', bookingId)
      
      const response = await cancelBookingApi(bookingId)
      currentBooking.value = response
      
      // Cập nhật trong danh sách bookings
      const index = bookings.value.findIndex(b => b.bookingId === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }
      
      console.log('✅ Cancelled booking:', response)
      return response
    } catch (err: any) {
      console.error('❌ Error cancelling booking:', err)
      error.value = 'Không thể hủy đơn đặt phòng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Computed properties
  const hasBookings = computed(() => bookings.value.length > 0)
  const hasCurrentBooking = computed(() => currentBooking.value !== null)

  return {
    // State
    bookings: readonly(bookings),
    currentBooking: readonly(currentBooking),
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    hasBookings,
    hasCurrentBooking,
    
    // Methods
    fetchAllBookings,
    fetchBookingsByCustomer,
    fetchCustomerBookingHistory,
    fetchBookingById,
    createBooking,
    updateBooking,
    cancelBooking
  }
}
