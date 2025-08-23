<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Quên mật khẩu
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Nhập email để đặt lại mật khẩu
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Stepper -->
        <UIStepper
          :steps="['Nhập email', 'Xác nhận OTP', 'Đặt mật khẩu mới']"
          :current-step="progress"
          class="mb-6"
        />

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Step 1: Enter Email -->
          <div v-if="progress === 0">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div class="mt-1">
                <UIInput
                  id="email"
                  name="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            <UIButton
              type="submit"
              variant="primary"
              size="large"
              class="w-full mt-4"
              :loading="loading"
            >
              Gửi email
            </UIButton>
          </div>

          <!-- Step 2: Verify OTP -->
          <div v-if="progress === 1">
            <div>
              <label for="otp" class="block text-sm font-medium text-gray-700">
                Mã xác thực (OTP)
              </label>
              <div class="mt-1">
                <UIInput
                  id="otp"
                  name="otp"
                  v-model="verificationCode"
                  type="text"
                  placeholder="Nhập mã OTP từ email"
                  maxlength="6"
                  required
                />
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Mã OTP đã được gửi đến email: <strong>{{ formData.email }}</strong>
              </p>
            </div>

            <div class="flex space-x-3 mt-4">
              <UIButton
                type="button"
                variant="ghost"
                @click="resendOtp"
                :disabled="resendDisabled"
                class="flex-1"
              >
                {{ resendDisabled ? `Gửi lại (${resendCountdown}s)` : 'Gửi lại OTP' }}
              </UIButton>

              <UIButton
                type="submit"
                variant="primary"
                class="flex-1"
                :loading="loading"
              >
                Xác nhận OTP
              </UIButton>
            </div>
          </div>

          <!-- Step 3: Set New Password -->
          <div v-if="progress === 2">
            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <div class="mt-1">
                <UIInput
                  id="newPassword"
                  name="newPassword"
                  v-model="formData.newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>
            </div>

            <div class="mt-4">
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </label>
              <div class="mt-1">
                <UIInput
                  id="confirmPassword"
                  name="confirmPassword"
                  v-model="formData.confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>
            </div>

            <UIButton
              type="submit"
              variant="primary"
              size="large"
              class="w-full mt-4"
              :loading="loading"
            >
              Đặt lại mật khẩu
            </UIButton>
          </div>
        </form>

        <!-- Back to Login -->
        <div class="mt-6 text-center">
          <NuxtLink
            to="/auth/login"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            ← Quay lại đăng nhập
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAPI from '~/api/user'

// Form data
const formData = reactive({
  email: '',
  newPassword: '',
  confirmPassword: ''
})

// OTP verification
const verificationCode = ref('')
const progress = ref(0)
const loading = ref(false)

// Resend OTP functionality
const resendCountdown = ref(0)
const resendDisabled = computed(() => resendCountdown.value > 0)

// Handle form submission
const handleSubmit = async () => {
  try {
    loading.value = true
    console.log('=== FORGOT PASSWORD SUBMIT ===')
    console.log('Progress:', progress.value)
    console.log('Form data:', formData)

    if (progress.value === 0) {
      // Step 1: Send OTP
      await sendOtp()
    } else if (progress.value === 1) {
      // Step 2: Verify OTP
      await verifyOtp()
    } else if (progress.value === 2) {
      // Step 3: Reset Password
      await resetPassword()
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}

// Send OTP
const sendOtp = async () => {
  try {
    console.log('=== SEND OTP STARTED ===')
    console.log('Email:', formData.email)

    const response = await userAPI.sendOtpForPasswordChangeApi({
      body: { userEmail: formData.email }
    })
    console.log('Send OTP response:', response)

    if (response.message) {
      progress.value = 1
      startResendCountdown()
      alert('Mã OTP đã được gửi đến email của bạn')
    } else {
      throw new Error(response.message || 'Gửi OTP thất bại')
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    throw error
  }
}

// Verify OTP
const verifyOtp = async () => {
  try {
    console.log('=== VERIFY OTP STARTED ===')
    console.log('Email:', formData.email)
    console.log('OTP:', verificationCode.value)

    const response = await userAPI.verifyOtpApi({
      body: {
        userEmail: formData.email,
        otp: verificationCode.value
      }
    })
    console.log('Verify OTP response:', response)

    if (response.message) {
      progress.value = 2
      alert('Xác thực OTP thành công. Vui lòng nhập mật khẩu mới.')
    } else {
      throw new Error(response.message || 'Xác thực OTP thất bại')
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    throw error
  }
}

// Reset Password
const resetPassword = async () => {
  try {
    console.log('=== RESET PASSWORD STARTED ===')
    console.log('Email:', formData.email)
    console.log('New password:', formData.newPassword)

    if (formData.newPassword !== formData.confirmPassword) {
      throw new Error('Mật khẩu xác nhận không khớp')
    }

    if (formData.newPassword.length < 8) {
      throw new Error('Mật khẩu phải có ít nhất 8 ký tự')
    }

    const response = await userAPI.changePasswordAfterOtpApi({
      body: {
        userEmail: formData.email,
        newPassword: formData.newPassword
      }
    })
    console.log('Reset password response:', response)

    alert('Mật khẩu đã được đặt lại thành công!')
    navigateTo('/auth/login')
  } catch (error) {
    console.error('Reset password error:', error)
    throw error
  }
}

// Resend OTP functionality
const resendOtp = async () => {
  try {
    await sendOtp()
  } catch (error) {
    console.error('Resend OTP error:', error)
    // Error already handled in sendOtp
  }
}

const startResendCountdown = () => {
  resendCountdown.value = 60
  const timer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// Auto-fill email from query params if available
onMounted(() => {
  const route = useRoute()
  if (route.query.email) {
    formData.email = route.query.email as string
  }
})
</script>
