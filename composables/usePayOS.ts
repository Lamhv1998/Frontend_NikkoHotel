// composables/usePayOS.js
export const usePayOS = () => {
  const isPaymentOpen = ref(false)
  const paymentSuccess = ref(false)
  const paymentLoading = ref(false)
  const paymentError = ref(null)

  // Load PayOS script
  const loadPayOSScript = () => {
    return new Promise((resolve, reject) => {
      if (process.client) {
        // Check if PayOS is already loaded
        if (window.PayOSCheckout) {
          resolve(true)
          return
        }

        const script = document.createElement('script')
        script.src = 'https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js'
        script.async = true
        
        script.onload = () => resolve(true)
        script.onerror = () => reject(new Error('Failed to load PayOS script'))
        
        document.head.appendChild(script)
      } else {
        resolve(true)
      }
    })
  }

  // Create payment link
  const createPaymentLink = async (paymentData) => {
    try {
      paymentLoading.value = true
      paymentError.value = null

      const response = await $fetch('/api/create-payment-link', {
        method: 'POST',
        body: paymentData
      })

      if (response.success) {
        return response.checkoutUrl
      } else {
        throw new Error('Failed to create payment link')
      }
    } catch (error) {
      paymentError.value = error.message
      throw error
    } finally {
      paymentLoading.value = false
    }
  }

  // Open PayOS checkout
  const openPayOSCheckout = async (config) => {
    try {
      await loadPayOSScript()
      
      if (process.client && window.PayOSCheckout) {
        const { open } = window.PayOSCheckout.usePayOS(config)
        open()
        isPaymentOpen.value = true
      }
    } catch (error) {
      paymentError.value = error.message
      throw error
    }
  }

  // Close PayOS checkout
  const closePayOSCheckout = (config) => {
    if (process.client && window.PayOSCheckout) {
      const { exit } = window.PayOSCheckout.usePayOS(config)
      exit()
    }
    isPaymentOpen.value = false
  }

  // Create complete payment flow
  const processPayment = async (paymentData, elementId = 'payos-payment-container') => {
    try {
      paymentLoading.value = true
      paymentError.value = null

      // Create payment link
      const checkoutUrl = await createPaymentLink(paymentData)

      // Configure PayOS
      const config = {
        RETURN_URL: process.client ? window.location.href : '',
        ELEMENT_ID: elementId,
        CHECKOUT_URL: checkoutUrl,
        embedded: true,
        onSuccess: (event) => {
          paymentSuccess.value = true
          isPaymentOpen.value = false
        },
        onCancel: (event) => {
          isPaymentOpen.value = false
        },
        onExit: (event) => {
          isPaymentOpen.value = false
        }
      }

      // Open checkout
      await openPayOSCheckout(config)
      
      return { config, checkoutUrl }
    } catch (error) {
      paymentError.value = error.message
      throw error
    } finally {
      paymentLoading.value = false
    }
  }

  // Reset payment state
  const resetPaymentState = () => {
    isPaymentOpen.value = false
    paymentSuccess.value = false
    paymentLoading.value = false
    paymentError.value = null
  }

  // Format payment data for room booking
  const formatRoomPaymentData = (room, orderStore, userInfo) => {
    const totalAmount = room.price * orderStore.totalNights
    
    return {
      orderCode: Date.now(),
      amount: totalAmount,
      description: `Thanh toán đặt phòng ${room.name}`,
      items: [
        {
          name: room.name,
          quantity: orderStore.totalNights,
          price: room.price
        }
      ],
      buyerName: userInfo.name,
      buyerEmail: userInfo.email,
      buyerPhone: userInfo.phone,
      returnUrl: process.client ? window.location.href : '',
      cancelUrl: process.client ? window.location.href : ''
    }
  }

  return {
    // State
    isPaymentOpen: readonly(isPaymentOpen),
    paymentSuccess: readonly(paymentSuccess),
    paymentLoading: readonly(paymentLoading),
    paymentError: readonly(paymentError),
    
    // Methods
    loadPayOSScript,
    createPaymentLink,
    openPayOSCheckout,
    closePayOSCheckout,
    processPayment,
    resetPaymentState,
    formatRoomPaymentData
  }
}