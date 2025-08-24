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
      
      const response = await getAllBookingsApi(page, size)
      bookings.value = response
      
      return response
    } catch (err: any) {
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
      
      const response = await getBookingsByCustomerApi(customerId, page, size)
      bookings.value = response
      
      return response
    } catch (err: any) {
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
      
      const response = await getCustomerBookingHistoryApi(customerId, page, size)
      bookings.value = response
      
      return response
    } catch (err: any) {
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
      
      const response = await getBookingByIdApi(bookingId)
      currentBooking.value = response
      
      return response
    } catch (err: any) {
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
      
      const response = await createBookingApi(request)
      currentBooking.value = response
      
      return response
    } catch (err: any) {
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
      
      const response = await updateBookingApi(bookingId, request)
      currentBooking.value = response
      
      // Cập nhật trong danh sách bookings
      const index = bookings.value.findIndex(b => b.bookingId === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }
      
      return response
    } catch (err: any) {
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
      
      const response = await cancelBookingApi(bookingId)
      currentBooking.value = response
      
      // Cập nhật trong danh sách bookings
      const index = bookings.value.findIndex(b => b.bookingId === bookingId)
      if (index !== -1) {
        bookings.value[index] = response
      }
      
      return response
    } catch (err: any) {
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
