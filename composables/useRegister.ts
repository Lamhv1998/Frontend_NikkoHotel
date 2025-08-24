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
      //.log('=== REGISTERCUSTOMER STARTED ===')
      //.log('Input data:', data)
      //.log('Config authServiceUrl:', config.public.authServiceUrl)

      const validationErrors = validateCustomerData(data)
      if (validationErrors.length > 0) {
        //.log('Validation errors:', validationErrors)
        throw new Error(validationErrors.join(', '))
      }

      const formattedData = {
        ...data,
        dateOfBirth: formatDateOfBirth(data.dateOfBirth)
      }
      //.log('Formatted data:', formattedData)

      const apiUrl = `${config.public.customerServiceUrl}/customers`
      //.log('Calling API:', apiUrl)

      const { data: response, error } = await useFetch<ApiResponse<CustomerResponse>>(
        apiUrl,
        {
          method: 'POST',
          body: formattedData
        }
      )

      //.log('API response:', response.value)
      //.log('API error:', error.value)
      //.log('Response type:', typeof response.value)
      //.log('Response keys:', Object.keys(response.value || {}))
      //.log('Response.data:', response.value?.data)
      //.log('Response.data type:', typeof response.value?.data)
      //.log('Response.data keys:', Object.keys(response.value?.data || {}))

      if (error.value) {
        //.error('Network error:', error.value)
        throw new Error('Lỗi kết nối mạng')
      }

      if (!response.value) {
        //.error('No response from server')
        throw new Error('Không nhận được phản hồi từ server')
      }

      if (!response.value.success) {
        //.error('API returned success: false')
        throw new Error('Đăng ký thất bại')
      }

      if (!response.value.data) {
        //.error('API response missing data field')
        throw new Error('Phản hồi từ server thiếu dữ liệu')
      }

      //.log('Registration successful, returning data:', response.value.data)
      return response.value.data
    } catch (error) {
      //.error('Registration error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi đăng ký')
    }
  }

  const sendVerificationEmail = async (email: string): Promise<EmailVerificationResponse> => {
    try {
      const apiUrl = `${config.public.notificationServiceUrl}/notifications/send-otp?userEmail=${email}`
      //.log('Calling API:', apiUrl)

      const { data: response, error } = await useFetch<EmailVerificationResponse>(
        apiUrl,
        {
          method: 'POST'
        }
      )

      //.log('API response:', response.value)
      //.log('API error:', error.value)

      if (error.value) {
        //.error('Network error:', error.value)
        throw new Error('Lỗi kết nối mạng')
      }

      if (!response.value) {
        //.error('No response from server')
        throw new Error('Không nhận được phản hồi từ server')
      }

      // Backend trả về message và otp, không có field success
      if (!response.value.message) {
        //.error('No message in response')
        throw new Error('Không nhận được thông báo từ server')
      }

      // Kiểm tra nếu có message lỗi
      if (response.value.message.includes('Lỗi') || response.value.message.includes('error')) {
        //.error('Backend returned error message:', response.value.message)
        throw new Error(`Gửi email xác thực thất bại: ${response.value.message}`)
      }

      //.log('Email verification sent successfully')
      return response.value
    } catch (error) {
      //.error('Send verification email error:', error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Có lỗi xảy ra khi gửi email xác thực')
    }
  }

  const verifyEmailCode = async (email: string, otp: string): Promise<EmailVerificationResponse> => {
    try {
      const emailValue = typeof email === 'string' ? email : email?.email || email?.value?.email
      const otpValue = otp || 'undefined'
      const apiUrl = `${config.public.notificationServiceUrl}/notifications/verify-otp?userEmail=${emailValue}&otp=${otpValue}`
      //.log('Calling API:', apiUrl)

      const { data: response, error } = await useFetch<EmailVerificationResponse>(
        apiUrl,
        {
          method: 'POST'
        }
      )

      //.log('API response:', response.value)
      //.log('API error:', error.value)

      if (error.value) {
        //.error('Network error:', error.value)
        throw new Error('Lỗi kết nối mạng')
      }

      if (!response.value) {
        //.error('No response from server')
        throw new Error('Không nhận được phản hồi từ server')
      }

      // Backend trả về message, không có field success
      if (!response.value.message) {
        //.error('No message in response')
        throw new Error('Không nhận được thông báo từ server')
      }

      // Kiểm tra nếu có message lỗi
      if (response.value.message.includes('không hợp lệ') || response.value.message.includes('hết hạn')) {
        //.error('Backend returned error message:', response.value.message)
        throw new Error(`Xác thực OTP thất bại: ${response.value.message}`)
      }

      //.log('Email verification successful')
      return response.value
    } catch (error) {
      //.error('Verify email code error:', error)
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