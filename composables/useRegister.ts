import type { ApiResponse, CreateCustomerCommand, CustomerResponse } from '~/types/register'

export const useRegister = () => {
  const config = useRuntimeConfig()

  const validateCustomerData = (data: CreateCustomerCommand): string[] => {
    const errors: string[] = []

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.push('Email không hợp lệ')
    }

    // Validate password
    if (data.password.length < 6) {
      errors.push('Mật khẩu phải có ít nhất 6 ký tự')
    }

    // Validate firstName
    if (!data.firstName.trim()) {
      errors.push('Tên không được để trống')
    }

    // Validate lastName
    if (!data.lastName.trim()) {
      errors.push('Họ không được để trống')
    }

    return errors
  }

  const formatDateOfBirth = (date: string): string => {
    // CBirthday component đã trả về format YYYY-MM-DD
    // Không cần format lại, chỉ cần kiểm tra
    if (!date || typeof date !== 'string') {
      throw new Error('Ngày sinh không hợp lệ')
    }
    
    // Kiểm tra format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{1,2}-\d{1,2}$/
    if (!dateRegex.test(date)) {
      throw new Error('Format ngày sinh không đúng (YYYY-MM-DD)')
    }
    
    return date
  }

  const registerCustomer = async (data: CreateCustomerCommand): Promise<CustomerResponse> => {
    try {
      console.log('=== REGISTERCUSTOMER STARTED ===')
      console.log('Input data:', data)
             console.log('Config authServiceUrl:', config.public.authServiceUrl)
      
      // Validate data
      const validationErrors = validateCustomerData(data)
      if (validationErrors.length > 0) {
        console.log('Validation errors:', validationErrors)
        throw new Error(validationErrors.join(', '))
      }

      // Format dateOfBirth
      const formattedData = {
        ...data,
        dateOfBirth: formatDateOfBirth(data.dateOfBirth)
      }
      console.log('Formatted data:', formattedData)

             // Make API call using authServiceUrl
       const apiUrl = `${config.public.authServiceUrl}/customers`
      console.log('Calling API:', apiUrl)
      
      const { data: response, error } = await useFetch<ApiResponse<CustomerResponse>>(
        apiUrl,
        {
          method: 'POST',
          body: formattedData
        }
      )

      console.log('API response:', response.value)
      console.log('API error:', error.value)
      console.log('Response type:', typeof response.value)
      console.log('Response keys:', Object.keys(response.value || {}))
      console.log('Response.data:', response.value?.data)
      console.log('Response.data type:', typeof response.value?.data)
      console.log('Response.data keys:', Object.keys(response.value?.data || {}))

      if (error.value) {
        console.error('Network error:', error.value)
        throw new Error('Lỗi kết nối mạng')
      }

      if (!response.value) {
        console.error('No response from server')
        throw new Error('Không nhận được phản hồi từ server')
      }

      if (!response.value.success) {
        console.error('API returned success: false')
        throw new Error('Đăng ký thất bại')
      }

      if (!response.value.data) {
        console.error('API response missing data field')
        throw new Error('Phản hồi từ server thiếu dữ liệu')
      }

      console.log('Registration successful, returning data:', response.value.data)
      return response.value.data
    } catch (error) {
      console.error('Registration error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi đăng ký')
    }
  }

  const sendVerificationEmail = async (email: string): Promise<string> => {
    try {
      const { data: response, error } = await useFetch<{ message: string; otp: string }>(
        `${config.public.notificationServiceUrl}/notifications/send-otp`,
        {
          method: 'POST',
          query: { userEmail: email }
        }
      )
      
      if (error.value) {
        throw new Error('Lỗi kết nối mạng')
      }
      
      if (!response.value) {
        throw new Error('Không nhận được phản hồi từ server')
      }
      
      return response.value.otp
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi gửi email xác nhận')
    }
  }

  const verifyEmailCode = async (email: string, code: string): Promise<boolean> => {
    try {
      const { data: response, error } = await useFetch<{ message: string }>(
        `${config.public.notificationServiceUrl}/notifications/verify-otp`,
        {
          method: 'POST',
          query: { userEmail: email, otp: code }
        }
      )
      
      if (error.value) {
        throw new Error('Lỗi kết nối mạng')
      }
      
      if (!response.value) {
        throw new Error('Không nhận được phản hồi từ server')
      }
      
      return response.value.message.includes('thành công')
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi xác nhận mã')
    }
  }

  return {
    registerCustomer,
    sendVerificationEmail,
    verifyEmailCode
  }
}
