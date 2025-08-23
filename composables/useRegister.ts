import type { ApiResponse, CreateCustomerCommand, CustomerResponse, EmailVerificationResponse } from '~/types/register'

export const useRegister = () => {
  const config = useRuntimeConfig()

  const validateCustomerData = (data: CreateCustomerCommand): string[] => {
    const errors: string[] = []

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Email không hợp lệ')
    }

    if (!data.password || data.password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự')
    }

    if (!data.phone || !/^0\d{9}$/.test(data.phone)) {
      errors.push('Số điện thoại phải bắt đầu bằng 0 và có 10 số')
    }

    if (!data.firstName || data.firstName.trim().length < 2) {
      errors.push('Họ phải có ít nhất 2 ký tự')
    }

    if (!data.lastName || data.lastName.trim().length < 2) {
      errors.push('Tên phải có ít nhất 2 ký tự')
    }

    if (!data.sex || !['MALE', 'FEMALE'].includes(data.sex)) {
      errors.push('Giới tính không hợp lệ')
    }

    if (!data.dateOfBirth) {
      errors.push('Ngày sinh không được để trống')
    }

    if (!data.address.street || data.address.street.trim().length < 5) {
      errors.push('Địa chỉ phải có ít nhất 5 ký tự')
    }

    if (!data.address.ward || data.address.ward.trim().length < 2) {
      errors.push('Phường/Xã không được để trống')
    }

    if (!data.address.district || data.address.district.trim().length < 2) {
      errors.push('Quận/Huyện không được để trống')
    }

    if (!data.address.city || data.address.city.trim().length < 2) {
      errors.push('Tỉnh/Thành phố không được để trống')
    }

    return errors
  }

  const formatDateOfBirth = (dateString: string): string => {
    // Giả sử CBirthday component trả về format YYYY-MM-DD
    return dateString
  }

  const registerCustomer = async (data: CreateCustomerCommand): Promise<CustomerResponse> => {
    try {
      console.log('=== REGISTERCUSTOMER STARTED ===')
      console.log('Input data:', data)
      console.log('Config authServiceUrl:', config.public.authServiceUrl)

      const validationErrors = validateCustomerData(data)
      if (validationErrors.length > 0) {
        console.log('Validation errors:', validationErrors)
        throw new Error(validationErrors.join(', '))
      }

      const formattedData = {
        ...data,
        dateOfBirth: formatDateOfBirth(data.dateOfBirth)
      }
      console.log('Formatted data:', formattedData)

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

  const sendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
    try {
      console.log('=== SEND VERIFICATION EMAIL STARTED ===')
      console.log('Email:', email)
      console.log('Config notificationServiceUrl:', config.public.notificationServiceUrl)

      const apiUrl = `${config.public.notificationServiceUrl}/notifications/send-otp?userEmail=${email}`
      console.log('Calling API:', apiUrl)

      const { data: response, error } = await useFetch<EmailVerificationResponse>(
        apiUrl,
        {
          method: 'POST'
        }
      )

      console.log('API response:', response.value)
      console.log('API error:', error.value)

      if (error.value) {
        console.error('Network error:', error.value)
        throw new Error('Lỗi kết nối mạng')
      }

      if (!response.value) {
        console.error('No response from server')
        throw new Error('Không nhận được phản hồi từ server')
      }

      // Backend trả về message và otp, không có field success
      if (!response.value.message) {
        console.error('No message in response')
        throw new Error('Không nhận được thông báo từ server')
      }

      // Kiểm tra nếu có message lỗi
      if (response.value.message.includes('Lỗi') || response.value.message.includes('error')) {
        console.error('Backend returned error message:', response.value.message)
        throw new Error(`Gửi email xác thực thất bại: ${response.value.message}`)
      }

      console.log('Email verification sent successfully')
      return response.value
    } catch (error) {
      console.error('Send verification email error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi gửi email xác thực')
    }
  }

  const verifyEmailCode = async (email: string, otp: string): Promise<EmailVerificationResponse> => {
    try {
      console.log('=== VERIFY EMAIL CODE STARTED ===')
      console.log('Email:', email)
      console.log('OTP:', otp)
      console.log('Config notificationServiceUrl:', config.public.notificationServiceUrl)

      const apiUrl = `${config.public.notificationServiceUrl}/notifications/verify-otp?userEmail=${email}&otp=${otp}`
      console.log('Calling API:', apiUrl)

      const { data: response, error } = await useFetch<EmailVerificationResponse>(
        apiUrl,
        {
          method: 'POST'
        }
      )

      console.log('API response:', response.value)
      console.log('API error:', error.value)

      if (error.value) {
        console.error('Network error:', error.value)
        throw new Error('Lỗi kết nối mạng')
      }

      if (!response.value) {
        console.error('No response from server')
        throw new Error('Không nhận được phản hồi từ server')
      }

      // Backend trả về message, không có field success
      if (!response.value.message) {
        console.error('No message in response')
        throw new Error('Không nhận được thông báo từ server')
      }

      // Kiểm tra nếu có message lỗi
      if (response.value.message.includes('không hợp lệ') || response.value.message.includes('hết hạn')) {
        console.error('Backend returned error message:', response.value.message)
        throw new Error(`Xác thực OTP thất bại: ${response.value.message}`)
      }

      console.log('Email verification successful')
      return response.value
    } catch (error) {
      console.error('Verify email code error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi xác thực OTP')
    }
  }

  return {
    registerCustomer,
    sendVerificationEmail,
    verifyEmailCode
  }
}
