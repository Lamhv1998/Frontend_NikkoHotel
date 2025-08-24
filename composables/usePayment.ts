import { ref } from 'vue'

export const usePayment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Tạo payment link cho đặt phòng
  const createPaymentLink = async (paymentData: {
    amount: number
    description: string
    orderCode: string
    returnUrl: string
    cancelUrl: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    buyerName: string
    buyerEmail: string
    buyerPhone: string
    buyerAddress: string
    bookingId?: string
  }) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch<{ checkoutUrl: string }>(`${apiGatewayUrl}/api/payment/create-payment-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: paymentData
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể tạo link thanh toán'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tạo payment link cho dịch vụ
  const createServicePaymentLink = async (paymentData: {
    amount: number
    description: string
    orderCode: string
    returnUrl: string
    cancelUrl: string
    items: Array<{
      name: string
      quantity: number
      price: number
    }>
    buyerName: string
    buyerEmail: string
    buyerPhone: string
    buyerAddress: string
    serviceId?: string
  }) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch<{ checkoutUrl: string }>(`${apiGatewayUrl}/api/payment/create-service-payment-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: paymentData
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể tạo link thanh toán dịch vụ'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Xác nhận thanh toán đặt phòng
  const confirmBookingPayment = async (bookingId: string) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch(`${apiGatewayUrl}/api/payment/confirm-booking-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { bookingId }
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể xác nhận thanh toán đặt phòng'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Xác nhận thanh toán dịch vụ
  const confirmServicePayment = async (serviceOrderId: string) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch(`${apiGatewayUrl}/api/payment/confirm-service-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { serviceOrderId }
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể xác nhận thanh toán dịch vụ'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Kiểm tra trạng thái thanh toán
  const checkPaymentStatus = async (orderCode: string) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch(`${apiGatewayUrl}/api/payment/status/${orderCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể kiểm tra trạng thái thanh toán'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Lấy lịch sử thanh toán
  const getPaymentHistory = async (customerId: string, page: number = 0, size: number = 20) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch(`${apiGatewayUrl}/api/payment/history/${customerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        params: { page, size }
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể lấy lịch sử thanh toán'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Hủy thanh toán
  const cancelPayment = async (orderCode: string) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch(`${apiGatewayUrl}/api/payment/cancel/${orderCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể hủy thanh toán'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Hoàn tiền
  const refundPayment = async (orderCode: string, reason: string) => {
    try {
      loading.value = true
      error.value = null
      
      const config = useRuntimeConfig()
      const apiGatewayUrl = config.public.apiGatewayUrl || 'http://localhost:8092'
      
      const response = await $fetch(`${apiGatewayUrl}/api/payment/refund/${orderCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { reason }
      })
      
      return response
    } catch (err: any) {
      error.value = 'Không thể hoàn tiền'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Tạo payment link cho đặt phòng với dữ liệu đơn giản
  const createRoomBookingPayment = async (bookingData: {
    roomNumber: string
    customerName: string
    checkInDate: string
    checkOutDate: string
    guestCount: number
    basePrice: number
    serviceFee: number
    totalPrice: number
    bookingId?: string
    customerEmail?: string
    customerPhone?: string
    notes?: string
  }) => {
    const numberOfNights = Math.ceil(
      (new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24)
    )

    const paymentData = {
      amount: bookingData.totalPrice,
      description: `Đặt phòng ${bookingData.roomNumber} - ${bookingData.customerName}`,
      orderCode: bookingData.bookingId || `BOOK_${Date.now()}`,
      returnUrl: `${window.location.origin}/order/success`,
      cancelUrl: `${window.location.origin}/order/cancel`,
      signature: '', // Sẽ được tính toán ở backend
      items: [
        {
          name: `Phòng ${bookingData.roomNumber}`,
          quantity: numberOfNights,
          price: bookingData.basePrice
        },
        {
          name: 'Phí dịch vụ',
          quantity: 1,
          price: bookingData.serviceFee
        }
      ],
      buyerName: bookingData.customerName,
      buyerEmail: bookingData.customerEmail || 'guest@example.com',
      buyerPhone: bookingData.customerPhone || '',
      buyerAddress: bookingData.notes || 'Không có',
      bookingId: bookingData.bookingId
    }

    return await createPaymentLink(paymentData)
  }

  // Tạo payment link cho dịch vụ với dữ liệu đơn giản
  const createServiceOrderPayment = async (serviceData: {
    serviceName: string
    customerName: string
    quantity: number
    unitPrice: number
    totalPrice: number
    serviceOrderId?: string
    customerEmail?: string
    customerPhone?: string
    notes?: string
  }) => {
    const paymentData = {
      amount: serviceData.totalPrice,
      description: `Đặt dịch vụ ${serviceData.serviceName} - ${serviceData.customerName}`,
      orderCode: serviceData.serviceOrderId || `SERVICE_${Date.now()}`,
      returnUrl: `${window.location.origin}/services/success`,
      cancelUrl: `${window.location.origin}/services/cancel`,
      signature: '', // Sẽ được tính toán ở backend
      items: [
        {
          name: serviceData.serviceName,
          quantity: serviceData.quantity,
          price: serviceData.unitPrice
        }
      ],
      buyerName: serviceData.customerName,
      buyerEmail: serviceData.customerEmail || 'guest@example.com',
      buyerPhone: serviceData.customerPhone || '',
      buyerAddress: serviceData.notes || 'Không có',
      serviceId: serviceData.serviceOrderId
    }

    return await createServicePaymentLink(paymentData)
  }

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    
    // Methods
    createPaymentLink,
    createServicePaymentLink,
    confirmBookingPayment,
    confirmServicePayment,
    checkPaymentStatus,
    getPaymentHistory,
    cancelPayment,
    refundPayment,
    
    // Helper methods
    createRoomBookingPayment,
    createServiceOrderPayment
  }
}
