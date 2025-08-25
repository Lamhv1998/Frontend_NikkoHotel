import type { UseFetchOptions } from 'nuxt/app'
import type { CreateBookingRequest, BookingDto, ConfirmPaymentResponse } from '~/types/order'

const OrderAPI = {
  getOrdersApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/orders', options)
  },
  addOrderApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/orders', options)
  },
  getOrderApi: <T = any>(id: string, options: UseFetchOptions<T>) => {
    return useHttp.get(`/api/v1/orders/${id}`, options)
  },
  deleteOrderApi: <T = any>(id: string, options: UseFetchOptions<T>) => {
    return useHttp.delete(`/api/v1/orders/${id}`, options)
  }
}

export const createBookingApi = async (request: CreateBookingRequest): Promise<BookingDto> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<BookingDto>(`${bookingServiceUrl}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: request
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getAllBookingsApi = async (page: number = 0, size: number = 20): Promise<BookingDto[]> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<BookingDto[]>(`${bookingServiceUrl}/api/bookings?page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getBookingByIdApi = async (bookingId: string): Promise<BookingDto> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<BookingDto>(`${bookingServiceUrl}/api/bookings/${bookingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const updateBookingApi = async (bookingId: string, request: Partial<CreateBookingRequest>): Promise<BookingDto> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'

    let sanitizedRequest = {
      checkInDate: request.checkInDate,
      checkOutDate: request.checkOutDate,
      numberOfGuests: request.numberOfGuests,
      specialRequests: request.specialRequests
    }

    const response = await $fetch<BookingDto>(`${bookingServiceUrl}/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: sanitizedRequest
    })
    return response
  } catch (error) {
    throw error
  }
}

export const cancelBookingApi = async (bookingId: string): Promise<BookingDto> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<BookingDto>(`${bookingServiceUrl}/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getBookingsByCustomerApi = async (customerId: string, page: number = 0, size: number = 20): Promise<BookingDto[]> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<BookingDto[]>(`${bookingServiceUrl}/api/bookings/customer/${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        page,
        size
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const getCustomerBookingHistoryApi = async (customerId: string, page: number = 0, size: number = 20): Promise<BookingDto[]> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<BookingDto[]>(`${bookingServiceUrl}/api/bookings/customer/${customerId}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        page,
        size
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export const confirmBookingPaymentApi = async (bookingId: string): Promise<ConfirmPaymentResponse> => {
  try {
    const config = useRuntimeConfig()
    const bookingServiceUrl = config.public.bookingServiceUrl || 'https://api.nika.id.vn'
    
    const response = await $fetch<ConfirmPaymentResponse>(`${bookingServiceUrl}/api/bookings/${bookingId}/payment/confirm`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export default OrderAPI
