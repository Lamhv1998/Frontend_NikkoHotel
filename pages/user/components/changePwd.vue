<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      class="card"
      :validation-schema="schema"
      @submit="handleSubmit"
    >
      <h2 class="text-h6 xl:text-h5">Đổi mật khẩu</h2>

      <div class="space-y-6">
        <!-- Email -->
        <CUserData title="Email" :text="props.user.email" />

        <!-- Mật khẩu -->
        <div v-if="!isFormShow" class="flex items-center justify-between">
          <div class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">Mật khẩu</label>
            <div class="space-x-2 py-2">
              <span
                v-for="(_, index) in 10"
                :key="index"
                class="inline-block h-2 w-2 rounded-full bg-black"
              />
            </div>
          </div>

          <!-- Nút: Đổi mật khẩu -->
          <UIButton text="Đổi mật khẩu" variant="secondary" @click="toggleForm('show')" />
        </div>

        <!-- Biểu mẫu: Đổi mật khẩu -->
        <template v-else>
          <!-- Step 1: Gửi OTP -->
          <div v-if="currentStep === 'sendOtp'" class="space-y-4">
            <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div class="flex items-center">
                <svg
                  class="mr-2 h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                <p class="sm text-blue-800">
                  Chúng tôi sẽ gửi mã OTP đến email <strong>{{ props.user.email }}</strong> để xác thực
                </p>
              </div>
            </div>
            
            <UIButton
              type="button"
              text="Gửi mã OTP"
              :loading="sendingOtp"
              :disabled="sendingOtp"
              @click="sendOtp"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white"
            />
          </div>

          <!-- Step 2: Nhập OTP -->
          <div v-if="currentStep === 'verifyOtp'" class="space-y-4">
            <div class="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div class="flex items-center">
                <svg
                  class="mr-2 h-5 w-5 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                <p class="sm text-amber-800">
                  Mã OTP đã được gửi đến email của bạn. Mã có hiệu lực trong <strong>5 phút</strong>
                </p>
              </div>
            </div>

            <!-- OTP Input -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Mã OTP *</label>
              <div class="flex space-x-2">
                <input
                  v-for="(digit, index) in 6"
                  :key="index"
                  v-model="otpDigits[index]"
                  :data-otp-index="index"
                  type="text"
                  maxlength="1"
                  class="h-12 w-12 rounded-lg border border-gray-300 text-center focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
                  :disabled="pending"
                  @input="handleOtpInput(index, $event)"
                  @keydown="handleOtpKeydown(index, $event)"
                />
              </div>
              <p v-if="otpError" class="text-sm text-red-600">{{ otpError }}</p>
            </div>

            <!-- Resend OTP -->
            <div class="flex items-center justify-between">
              <button
                type="button"
                @click="resendOtp"
                :disabled="resendCountdown > 0"
                class="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
              >
                {{ resendCountdown > 0 ? `Gửi lại sau ${resendCountdown}s` : 'Gửi lại mã OTP' }}
              </button>
              
              <UIButton
                type="button"
                text="Xác thực OTP"
                :loading="verifyingOtp"
                :disabled="verifyingOtp || !isOtpComplete"
                @click="verifyOtpCode"
                class="bg-amber-600 hover:bg-amber-700 text-white"
              />
            </div>
          </div>

          <!-- Step 3: Đổi mật khẩu -->
          <div v-if="currentStep === 'changePassword'" class="space-y-4">
            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <div class="flex items-center">
                <svg
                  class="mr-2 h-5 w-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                <p class="sm text-green-800">
                  OTP đã được xác thực thành công. Bây giờ bạn có thể đổi mật khẩu
                </p>
              </div>
            </div>

            <!-- Mật khẩu cũ -->
            <UIInput
              v-model="formData.oldPassword"
              name="oldPassword"
              label="Mật khẩu cũ"
              type="password"
              placeholder="Vui lòng nhập mật khẩu cũ"
              :error="errors.oldPassword"
              blackhead
              :disabled="pending"
            />

            <!-- Mật khẩu mới -->
            <UIInput
              v-model="formData.newPassword"
              name="newPassword"
              label="Mật khẩu mới"
              type="password"
              placeholder="Vui lòng nhập mật khẩu mới"
              :error="errors.newPassword"
              blackhead
              :disabled="pending"
            />

            <!-- Xác nhận mật khẩu -->
            <UIInput
              v-model="formData.confirmPassword"
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type="password"
              placeholder="Vui lòng nhập lại mật khẩu mới"
              :error="errors.confirmPassword"
              blackhead
              :disabled="pending"
            />

            <!-- Nút: Hủy chỉnh sửa / Lưu -->
            <div class="flex gap-2">
              <UIButton
                class="flex w-full xl:inline-flex xl:w-auto"
                type="button"
                text="Hủy chỉnh sửa"
                variant="secondary"
                :disabled="pending"
                @click="cancelEdit"
              />
              <UIButton
                class="flex w-full xl:inline-flex xl:w-auto"
                type="submit"
                text="Lưu thay đổi"
                :disabled="pending"
                :loading="pending"
              />
            </div>
          </div>
        </template>
      </div>
    </VForm>
  </section>
</template>

<script lang="ts" setup>
import type { UserResponse } from '@/types/auth'
import type { PropType } from 'vue'

/* props */
const props = defineProps({
  user: {
    type: Object as PropType<UserResponse>,
    required: true
  }
})

/* Toàn cục */
const { $Swal } = useNuxtApp()
const styleStore = useStyleStore()

/* Biểu mẫu */
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const formRefs = ref<HTMLFormElement | null>(null)

// Quy tắc biểu mẫu
const schema = {
  oldPassword: 'required|min:8',
  newPassword: (val: string) => {
    if (!val) return 'Mật khẩu mới là bắt buộc'
    if (val.length < 8) return 'Mật khẩu mới phải có ít nhất 8 ký tự'
    if (/^[a-zA-Z]+$/.test(val)) return 'Mật khẩu mới không được chỉ có chữ cái'
    if (/^\d+$/.test(val)) return 'Mật khẩu mới không được chỉ có số'
    if (!/^(?=.*[A-Za-z])(?=.*\d)/.test(val))
      return 'Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
    return true
  },
  confirmPassword: 'required|confirmed:@newPassword'
}

// State cho form
const isFormShow = ref(false)
const currentStep = ref<'sendOtp' | 'verifyOtp' | 'changePassword'>('sendOtp')

// State cho OTP
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpError = ref('')
const resendCountdown = ref(0)

// State cho API calls
const pending = ref(false)
const sendingOtp = ref(false)
const verifyingOtp = ref(false)

/* API */
const { updateUserApi, sendOtpForPasswordChange, verifyOtp, changePasswordApi } = useApi()

// Computed
const isOtpComplete = computed(() => {
  return otpDigits.value.every((digit: string) => digit !== '')
})

const otpCode = computed(() => {
  return otpDigits.value.join('')
})

// Methods
const toggleForm = (event: string) => {
  if (event === 'show') {
    isFormShow.value = true
    currentStep.value = 'sendOtp'
    resetOtpForm()
  } else if (event === 'close') {
    isFormShow.value = false
    currentStep.value = 'sendOtp'
    resetOtpForm()
  }
}

const resetOtpForm = () => {
  otpDigits.value = ['', '', '', '', '', '']
  otpError.value = ''
  resendCountdown.value = 0
}

const cancelEdit = () => {
  formData.oldPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''
  toggleForm('close')
}

// OTP handling
const handleOtpInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  // Chỉ cho phép số
  if (!/^\d*$/.test(value)) {
    target.value = ''
    return
  }
  
  // Cập nhật OTP digits
  otpDigits.value[index] = value
  
  // Tự động chuyển sang ô tiếp theo khi nhập xong
  if (value && index < 5) {
    // Sử dụng setTimeout để đảm bảo DOM đã được cập nhật
    setTimeout(() => {
      const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`) as HTMLInputElement
      if (nextInput) {
        nextInput.focus()
        nextInput.select() // Chọn toàn bộ text để dễ ghi đè
      }
    }, 10)
  }
  
  // Xóa lỗi khi user nhập
  if (otpError.value) {
    otpError.value = ''
  }
}

const handleOtpKeydown = (index: number, event: KeyboardEvent) => {
  // Xử lý phím Backspace
  if (event.key === 'Backspace') {
    if (!otpDigits.value[index] && index > 0) {
      // Nếu ô hiện tại trống và không phải ô đầu tiên, chuyển về ô trước
      const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`) as HTMLInputElement
      if (prevInput) {
        prevInput.focus()
        prevInput.select() // Chọn toàn bộ text
      }
    } else if (otpDigits.value[index]) {
      // Nếu ô hiện tại có dữ liệu, xóa dữ liệu trước
      otpDigits.value[index] = ''
    }
  }
  
  // Xử lý phím Enter để submit
  if (event.key === 'Enter' && isOtpComplete.value) {
    verifyOtpCode()
  }
}

// Send OTP
const sendOtp = async () => {
  try {
    sendingOtp.value = true
    otpError.value = ''
    
    // Debug: Kiểm tra config
    const config = useRuntimeConfig()
    console.log('🔍 Component Debug - Runtime Config:', config)
    console.log('🔍 Component Debug - Notification Service URL:', config.public.notificationServiceUrl)
    
    const response = await sendOtpForPasswordChange({
      body: {
        userEmail: props.user.email
      }
    })
    
    console.log('🔍 Send OTP Response:', response)
    
    // Kiểm tra response có hợp lệ không
    if (response && (response.message || response.otp)) {
      // Chuyển sang bước nhập OTP
      currentStep.value = 'verifyOtp'
      
      // Bắt đầu countdown cho resend
      startResendCountdown()
      
             // Hiển thị thông báo thành công
       const message = response.message || `Mã OTP đã được gửi đến ${props.user.email}`
      
      $Swal?.fire({
        title: 'Gửi OTP thành công',
        text: message,
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      
             // Log OTP nếu có (chỉ trong dev/test)
       if (response.otp) {
         console.log('🔢 OTP Code (Dev/Test):', response.otp)
       }
    } else {
      throw new Error('Response không hợp lệ từ server')
    }
  } catch (error: any) {
    console.error('❌ Error sending OTP:', error)
    console.error('❌ Error details:', {
      message: error.message,
      status: error.status,
      data: error.data,
      response: error.response
    })
    
    $Swal?.fire({
      title: 'Gửi OTP thất bại',
      text: error?.data?.message || error?.message || 'Có lỗi xảy ra khi gửi OTP',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    sendingOtp.value = false
  }
}

// Verify OTP
const verifyOtpCode = async () => {
  if (!isOtpComplete.value) {
    otpError.value = 'Vui lòng nhập đầy đủ 6 chữ số OTP'
    return
  }
  
  try {
    verifyingOtp.value = true
    otpError.value = ''
    
    const response = await verifyOtp({
      body: {
        userEmail: props.user.email,
        otp: otpCode.value
      }
    })
    
    if (response) {
      // Chuyển sang bước đổi mật khẩu
      currentStep.value = 'changePassword'
      
      $Swal?.fire({
        title: 'Xác thực OTP thành công',
        text: 'Bây giờ bạn có thể đổi mật khẩu',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } catch (error: any) {
    console.error('Error verifying OTP:', error)
    
    if (error?.data?.message?.includes('không hợp lệ') || error?.data?.message?.includes('hết hạn')) {
      otpError.value = 'Mã OTP không hợp lệ hoặc đã hết hạn'
    } else {
      otpError.value = error?.data?.message || 'Có lỗi xảy ra khi xác thực OTP'
    }
  } finally {
    verifyingOtp.value = false
  }
}

// Resend OTP
const resendOtp = async () => {
  if (resendCountdown.value > 0) return
  
  await sendOtp()
}

// Start resend countdown
const startResendCountdown = () => {
  resendCountdown.value = 60 // 60 giây
  
  const timer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// Handle form submit
const handleSubmit = async () => {
  if (currentStep.value !== 'changePassword') return
  
  await changePassword()
}

// Smart change password - using proper backend endpoints
const changePassword = async () => {
  if (!props.user?._id && !props.user?.id) {
    console.error('User ID not found')
    return
  }

  try {
    pending.value = true
    
    // Lấy mật khẩu từ form
    const oldPassword = formData.oldPassword
    const newPassword = formData.newPassword
    
    if (!oldPassword || !newPassword) {
      $Swal?.fire({
        title: 'Thiếu thông tin',
        text: 'Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới.',
        icon: 'warning',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      return
    }
    
    console.log('🔐 Starting password change process...')
    
    // Sử dụng API endpoint chuyên dụng cho đổi mật khẩu
    const userId = props.user.id || props.user._id
    
    try {
      // Gọi API đổi mật khẩu với cả mật khẩu cũ và mới
      const passwordRequest = {
        userId: userId,
        email: props.user.email,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: formData.confirmPassword
      }
      
      console.log('🔐 Sending password change request to backend...')
      console.log('📤 Request Body:', passwordRequest)
      console.log('🔗 Endpoint:', `${useRuntimeConfig().public.authServiceUrl}/users/change-password`)
      
      // Sử dụng changePasswordApi chuyên dụng
      const response = await changePasswordApi({
        body: passwordRequest
      })
      
      console.log('✅ Password changed successfully!', response)
      
      // Hiển thị thông báo thành công
      $Swal?.fire({
        title: 'Đổi mật khẩu thành công',
        text: 'Mật khẩu đã được thay đổi thành công!',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor,
        willClose: () => {
          cancelEdit()
        }
      })
      
    } catch (error: any) {
      console.error('❌ Backend password change failed:', error)
      
      // Log chi tiết lỗi để debug
      console.log('🔍 Error Details:', {
        message: error.message,
        status: error.status,
        statusCode: error.statusCode,
        statusText: error.statusText,
        data: error.data,
        response: error.response,
        body: error.body,
        stack: error.stack
      })
      
      // Xử lý các lỗi cụ thể từ backend
      let errorMessage = 'Có lỗi xảy ra khi đổi mật khẩu'
      let errorCode = null
      
      // Kiểm tra response data từ backend
      if (error.data) {
        console.log('📄 Backend Error Data:', error.data)
        errorMessage = error.data.message || error.data.error || errorMessage
        errorCode = error.data.code || error.data.errorCode
      }
      
      // Kiểm tra response object
      if (error.response) {
        console.log('📡 Response Object:', error.response)
        if (error.response._data) {
          console.log('📄 Response Data:', error.response._data)
          errorMessage = error.response._data.message || error.response._data.error || errorMessage
          errorCode = error.response._data.code || error.response._data.errorCode
        }
      }
      
      // Kiểm tra status code
      if (error.status === 400) {
        console.log('🚨 Bad Request (400) - Validation Error')
        if (errorCode) {
          console.log('🔢 Error Code:', errorCode)
        }
      } else if (error.status === 401) {
        console.log('🚨 Unauthorized (401) - Token expired or invalid')
        errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
      } else if (error.status === 403) {
        console.log('🚨 Forbidden (403) - Permission denied')
        errorMessage = 'Bạn không có quyền thực hiện hành động này.'
      } else if (error.status === 500) {
        console.log('🚨 Internal Server Error (500) - Backend error')
        errorMessage = 'Lỗi server. Vui lòng thử lại sau.'
      }
      
      // Xử lý lỗi mật khẩu cũ không đúng
      if (errorMessage.toLowerCase().includes('mật khẩu cũ') || 
          errorMessage.toLowerCase().includes('old password') ||
          errorMessage.toLowerCase().includes('password') ||
          errorMessage.toLowerCase().includes('incorrect') ||
          errorCode === 1013) {
        console.log('🔐 Old password validation failed')
        formRefs.value?.setFieldError('oldPassword', 'Mật khẩu cũ không đúng')
        return
      }
      
      // Xử lý lỗi mật khẩu mới không hợp lệ
      if (errorMessage.toLowerCase().includes('mật khẩu mới') || 
          errorMessage.toLowerCase().includes('new password') ||
          errorMessage.toLowerCase().includes('invalid') ||
          errorCode === 1004) {
        console.log('🔐 New password validation failed')
        formRefs.value?.setFieldError('newPassword', 'Mật khẩu mới không hợp lệ')
        return
      }
      
      // Xử lý lỗi mật khẩu xác nhận không khớp
      if (errorMessage.toLowerCase().includes('confirmation') ||
          errorMessage.toLowerCase().includes('mismatch') ||
          errorCode === 1012) {
        console.log('🔐 Password confirmation mismatch')
        formRefs.value?.setFieldError('confirmPassword', 'Mật khẩu xác nhận không khớp')
        return
      }
      
      // Xử lý lỗi mật khẩu mới giống mật khẩu cũ
      if (errorMessage.toLowerCase().includes('same as old') ||
          errorCode === 1014) {
        console.log('🔐 New password same as old password')
        formRefs.value?.setFieldError('newPassword', 'Mật khẩu mới phải khác mật khẩu cũ')
        return
      }
      
      // Hiển thị thông báo lỗi chung
      $Swal?.fire({
        title: 'Đổi mật khẩu thất bại',
        text: `${errorMessage}${errorCode ? ` (Code: ${errorCode})` : ''}`,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
    
  } catch (error: any) {
    console.error('Error in changePassword function:', error)
    
    $Swal?.fire({
      title: 'Đổi mật khẩu thất bại',
      text: 'Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    pending.value = false
  }
}
</script>
