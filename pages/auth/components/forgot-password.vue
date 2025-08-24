<template>
  <div class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0">
    <!-- Tiêu đề -->
    <CAuthTitle text="Quên mật khẩu" />

    <!-- Tiến trình bước -->
    <UIStepper
      v-model="progress"
      :steps="['Nhập email', 'Xác nhận OTP', 'Đặt mật khẩu mới']"
      :disabled="apiPending"
    />

    <!-- Biểu mẫu -->
    <Transition name="modal" mode="out-in">
      <!-- Bước 0: Nhập email -->
      <div v-if="progress === 0" class="space-y-4">
        <UIInput
          v-model="formData.email"
          name="email"
          label="Email"
          placeholder="Nhập email của bạn"
          :error="errors.email"
          :disabled="apiPending"
        />
      </div>

      <!-- Bước 1: Xác nhận OTP -->
      <div v-else-if="progress === 1" class="space-y-4">
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Xác nhận OTP</h3>
          <p class="text-sm text-gray-600 mb-4">
            Mã xác nhận đã được gửi đến <strong>{{ formData.email }}</strong>
          </p>
        </div>
        
        <UIInput
          v-model="verificationCode"
          name="verificationCode"
          label="Mã xác nhận"
          placeholder="Nhập mã 6 số"
          :error="errors.verificationCode"
          :disabled="apiPending"
          maxlength="6"
        />
        
        <div class="text-center">
          <button
            type="button"
            @click="resendOtp"
            :disabled="resendDisabled"
            class="text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
          >
            {{ resendDisabled ? `Gửi lại sau ${resendCountdown}s` : 'Gửi lại mã' }}
          </button>
        </div>
      </div>

      <!-- Bước 2: Đặt mật khẩu mới -->
      <div v-else class="space-y-4">
        <UIInput
          v-model="formData.newPassword"
          name="newPassword"
          label="Mật khẩu mới"
          type="password"
          placeholder="Nhập mật khẩu mới"
          :error="errors.newPassword"
          :disabled="apiPending"
        />
        
        <UIInput
          v-model="formData.confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          :error="errors.confirmPassword"
          :disabled="apiPending"
        />
      </div>
    </Transition>

    <!-- Nút điều hướng -->
    <div class="flex justify-between">
      <UIButton
        v-if="progress > 0"
        type="button"
        variant="ghost"
        :disabled="apiPending"
        @click="progress--"
      >
        Quay lại
      </UIButton>

      <UIButton
        v-if="progress < 2"
        type="button"
        variant="primary"
        :disabled="apiPending"
        @click="handleSubmit"
      >
        Tiếp theo
      </UIButton>

      <UIButton
        v-else
        type="button"
        variant="primary"
        :disabled="apiPending"
        @click="handleSubmit"
      >
        Đặt lại mật khẩu
      </UIButton>
    </div>

    <!-- Link về đăng nhập -->
    <div class="text-center">
      <NuxtLink
        to="/auth/login"
        class="text-sm text-indigo-600 hover:text-indigo-500"
      >
        Quay về đăng nhập
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAPI from '~/api/user'
import { useRegister } from '~/composables/useRegister'

// Refs
const progress = ref(0)
const apiPending = ref(false)
const verificationCode = ref('')
const resendCountdown = ref(0)
const resendDisabled = ref(false)

// Form data
const formData = reactive({
  email: '',
  newPassword: '',
  confirmPassword: ''
})

// Validation errors
const errors = reactive({
  email: '',
  verificationCode: '',
  newPassword: '',
  confirmPassword: ''
})

// Methods
const startResendCountdown = () => {
  resendCountdown.value = 60
  resendDisabled.value = true
  
  const timer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(timer)
      resendDisabled.value = false
    }
  }, 1000)
}

const validateEmail = () => {
  if (!formData.email) {
    errors.email = 'Email không được để trống'
    return false
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Email không hợp lệ'
    return false
  }
  errors.email = ''
  return true
}

const validateOtp = () => {
  if (!verificationCode.value) {
    errors.verificationCode = 'Mã xác nhận không được để trống'
    return false
  }
  if (verificationCode.value.length !== 6) {
    errors.verificationCode = 'Mã xác nhận phải có 6 số'
    return false
  }
  if (!/^\d{6}$/.test(verificationCode.value)) {
    errors.verificationCode = 'Mã xác nhận chỉ được chứa số'
    return false
  }
  errors.verificationCode = ''
  return true
}

const validatePassword = () => {
  if (!formData.newPassword) {
    errors.newPassword = 'Mật khẩu mới không được để trống'
    return false
  }
  if (formData.newPassword.length < 8) {
    errors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự'
    return false
  }
  if (formData.newPassword !== formData.confirmPassword) {
    errors.confirmPassword = 'Mật khẩu không khớp'
    return false
  }
  errors.newPassword = ''
  errors.confirmPassword = ''
  return true
}

const sendOtp = async () => {
  try {
    apiPending.value = true
    
    const { sendVerificationEmail } = useRegister()
    await sendVerificationEmail(formData.email)
    
    // Chuyển sang bước xác nhận OTP
    progress.value = 1
    startResendCountdown()
    
    $Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Mã xác nhận đã được gửi đến email của bạn'
    })
  } catch (error) {
    //.error('Send OTP error:', error)
    $Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi mã xác nhận'
    })
  } finally {
    apiPending.value = false
  }
}

const resendOtp = async () => {
  if (resendDisabled.value) return
  
  try {
    apiPending.value = true
    const { sendVerificationEmail } = useRegister()
    await sendVerificationEmail(formData.email)
    startResendCountdown()
    
    $Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Mã xác nhận mới đã được gửi'
    })
  } catch (error) {
    //.error('Resend OTP error:', error)
    $Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi lại mã xác thực'
    })
  } finally {
    apiPending.value = false
  }
}

const verifyOtp = async () => {
  try {
    apiPending.value = true
    
    const { verifyEmailCode } = useRegister()
    await verifyEmailCode(formData.email, verificationCode.value)
    
    // Chuyển sang bước cuối
    progress.value = 2
    
    $Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'OTP đã được xác thực. Vui lòng đặt mật khẩu mới'
    })
  } catch (error) {
    //.error('Verify OTP error:', error)
    $Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: error instanceof Error ? error.message : 'Mã xác nhận không đúng'
    })
  } finally {
    apiPending.value = false
  }
}

const resetPassword = async () => {
  try {
    apiPending.value = true
    
    await userAPI.changePasswordAfterOtpApi({
      body: {
        userEmail: formData.email,
        newPassword: formData.newPassword
      }
    })
    
    $Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập với mật khẩu mới',
      confirmButtonText: 'Đăng nhập ngay'
    }).then(() => {
      // Redirect to login
      navigateTo('/auth/login')
    })
    
  } catch (error) {
    //.error('Reset password error:', error)
    $Swal.fire({
      icon: 'error',
      title: 'Lỗi đặt lại mật khẩu!',
      text: error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt lại mật khẩu'
    })
  } finally {
    apiPending.value = false
  }
}

const handleSubmit = async () => {
  try {
    if (progress.value === 0) {
      // Bước 1: Gửi OTP
      if (!validateEmail()) return
      await sendOtp()
    } else if (progress.value === 1) {
      // Bước 2: Xác nhận OTP
      if (!validateOtp()) return
      await verifyOtp()
    } else if (progress.value === 2) {
      // Bước 3: Đặt lại mật khẩu
      if (!validatePassword()) return
      await resetPassword()
    }
  } catch (error) {
    //.error('Handle submit error:', error)
  }
}
</script>
