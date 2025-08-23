<template>
  <section>
    <div class="card">
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
          <UIButton text="Đổi mật khẩu" variant="outline" @click="toggleForm('show')" />
        </div>

        <!-- Biểu mẫu: Đổi mật khẩu -->
        <template v-else>
          <!-- Bước 1: Gửi OTP -->
          <div v-if="!otpSent" class="space-y-4">
            <div class="text-center">
              <p class="text-body-2 mb-4 text-system-gray-80">
                Chúng tôi sẽ gửi mã OTP đến email của bạn để xác minh việc đổi mật khẩu
              </p>
              <UIButton
                text="Gửi mã OTP"
                :disabled="sendingOtp"
                :loading="sendingOtp"
                @click="sendOtp"
              />
            </div>
          </div>

          <!-- Bước 2: Nhập OTP -->
          <div v-else-if="!otpVerified" class="space-y-4">
            <div class="mb-4 text-center">
              <p class="text-body-2 text-system-gray-80">
                Mã OTP đã được gửi đến {{ props.user.email }}
              </p>
              <p class="mt-2 text-caption text-system-gray-60">
                Vui lòng kiểm tra email và nhập mã OTP
              </p>
            </div>

            <UIInput
              v-model="formData.otp"
              name="otp"
              label="Mã OTP"
              type="text"
              placeholder="Nhập mã OTP 6 số"
              :error="otpError"
              blackhead
              maxlength="6"
              :disabled="verifyingOtp"
            />

            <div class="flex gap-2">
              <UIButton
                class="flex w-full xl:inline-flex xl:w-auto"
                type="button"
                text="Gửi lại OTP"
                variant="secondary"
                :disabled="sendingOtp"
                :loading="sendingOtp"
                @click="sendOtp"
              />
              <UIButton
                class="flex w-full xl:inline-flex xl:w-auto"
                type="button"
                text="Xác nhận OTP"
                :disabled="verifyingOtp || !formData.otp"
                :loading="verifyingOtp"
                @click="verifyOtp"
              />
            </div>
          </div>

          <!-- Bước 3: Đổi mật khẩu -->
          <template v-else>
            <!-- Mật khẩu mới -->
            <UIInput
              v-model="formData.newPassword"
              name="newPassword"
              label="Mật khẩu mới"
              type="password"
              placeholder="Vui lòng nhập mật khẩu mới"
              :error="newPasswordError"
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
              :error="confirmPasswordError"
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
                type="button"
                text="Lưu thay đổi"
                :disabled="pending || !canSubmit"
                :loading="pending"
                @click="changePassword"
              />
            </div>
          </template>
        </template>
      </div>
    </div>
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
  newPassword: '',
  confirmPassword: '',
  otp: ''
})

// Errors
const otpError = ref('')
const newPasswordError = ref('')
const confirmPasswordError = ref('')

// State cho form
const isFormShow = ref(false)
const otpSent = ref(false)
const otpVerified = ref(false)
const currentStep = ref('sendOtp')
const otpDigits = ref(['', '', '', '', '', ''])
const resendCountdown = ref(0)

// Computed để kiểm tra có thể submit không
const canSubmit = computed(() => {
  return (
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword &&
    validateNewPassword(formData.newPassword) === true
  )
})

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
  formData.newPassword = ''
  formData.confirmPassword = ''
  formData.otp = ''
  otpError.value = ''
  newPasswordError.value = ''
  confirmPasswordError.value = ''
  otpSent.value = false
  otpVerified.value = false

  toggleForm('close')
}

// Validation functions
const validateNewPassword = (val: string) => {
  if (!val) return 'Mật khẩu mới là bắt buộc'
  if (val.length < 8) return 'Mật khẩu mới phải có ít nhất 8 ký tự'
  if (/^[a-zA-Z]+$/.test(val)) return 'Mật khẩu mới không được chỉ có chữ cái'
  if (/^[0-9]+$/.test(val)) return 'Mật khẩu mới không được chỉ có số'
  if (!/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(val)) {
    return 'Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
  }
  return true
}

const validateConfirmPassword = (val: string) => {
  if (!val) return 'Xác nhận mật khẩu là bắt buộc'
  if (val !== formData.newPassword) return 'Xác nhận mật khẩu không khớp'
  return true
}

const validateOtp = (val: string) => {
  if (!val) return 'Mã OTP là bắt buộc'
  if (val.length !== 6) return 'Mã OTP phải có đúng 6 số'
  if (!/^[0-9]+$/.test(val)) return 'Mã OTP chỉ được chứa số'
  return true
}

/* api */
const { sendOtpForPasswordChangeApi, verifyOtpApi, changePasswordAfterOtpApi } = useApi()

// State cho API call
const pending = ref(false)
const sendingOtp = ref(false)
const verifyingOtp = ref(false)

// Function để gửi OTP
const sendOtp = async () => {
  try {
    sendingOtp.value = true
    
    const response = await sendOtpForPasswordChangeApi({
      body: {
        userEmail: props.user.email
      }
    })

    if (response) {
      otpSent.value = true
      $Swal?.fire({
        title: 'Gửi OTP thành công',
        text: response.message,
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } catch (error: any) {
    console.error('Error sending OTP:', error)
    $Swal?.fire({
      title: 'Gửi OTP thất bại',
      text: error?.data?.message || 'Có lỗi xảy ra khi gửi OTP',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    sendingOtp.value = false
  }
}

// Function để xác nhận OTP
const verifyOtp = async () => {
  // Clear previous errors
  otpError.value = ''
  
  const otpValidation = validateOtp(formData.otp)
  if (otpValidation !== true) {
    otpError.value = otpValidation
    return
  }

  try {
    verifyingOtp.value = true
    
    const response = await verifyOtpApi({
      body: {
        userEmail: props.user.email,
        otp: formData.otp
      }
    })

    if (response && response.message.includes('thành công')) {
      otpVerified.value = true
      $Swal?.fire({
        title: 'Xác nhận OTP thành công',
        text: 'Bạn có thể tiếp tục đổi mật khẩu',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    } else {
      otpError.value = 'Mã OTP không đúng'
    }
  } catch (error: any) {
    console.error('Error verifying OTP:', error)
    otpError.value = 'Mã OTP không đúng hoặc đã hết hạn'
  } finally {
    verifyingOtp.value = false
  }
}

// Function để đổi mật khẩu
const changePassword = async () => {
  console.log('changePassword called', { otpVerified: otpVerified.value, formData })
  
  if (!otpVerified.value) {
    $Swal?.fire({
      title: 'Lỗi xác thực',
      text: 'Vui lòng xác nhận OTP trước khi đổi mật khẩu',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
    return
  }

  // Clear previous errors
  newPasswordError.value = ''
  confirmPasswordError.value = ''

  // Validate
  const newPasswordValidation = validateNewPassword(formData.newPassword)
  const confirmPasswordValidation = validateConfirmPassword(formData.confirmPassword)

  if (newPasswordValidation !== true) {
    newPasswordError.value = newPasswordValidation
    return
  }

  if (confirmPasswordValidation !== true) {
    confirmPasswordError.value = confirmPasswordValidation
    return
  }

  if (!props.user?._id && !props.user?.id) {
    console.error('User ID not found')
    return
  }

  try {
    pending.value = true
    console.log('Calling changePasswordAfterOtpApi with:', {
      userId: props.user._id || props.user.id,
      newPassword: formData.newPassword
    })

    const response = await changePasswordAfterOtpApi({
      body: {
        userId: props.user._id || props.user.id,
        newPassword: formData.newPassword
      }
    })

    console.log('API response:', response)

    if (response) {
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
    }
  } catch (error: any) {
    console.error('Error changing password:', error)
    
    $Swal?.fire({
      title: 'Đổi mật khẩu thất bại',
      text: error?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    pending.value = false
  }
}
</script>
