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
    if (progress.value === 0) {
      // Gửi OTP
      await sendOtp()
    } else if (progress.value === 1) {
      // Xác thực OTP
      await verifyOtp()
    } else if (progress.value === 2) {
      // Đặt lại mật khẩu
      await resetPassword()
    }
  } catch (error) {
    //.error('Forgot password error:', error)
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
    const { sendOtp } = useAuth()
    
    const response = await sendOtp({ email: formData.email })
    
    if (response.success) {
      progress.value = 1
      commonStore.sweetalertList.push({
        title: 'Gửi OTP thành công',
        text: 'Mã OTP đã được gửi đến email của bạn',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    } else {
      commonStore.sweetalertList.push({
        title: 'Gửi OTP thất bại',
        text: response.message,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } catch (error: any) {
    let message = 'Có lỗi xảy ra khi gửi OTP'
    
    if (error?.data?.message) {
      message = error.data.message
    } else if (error?.message) {
      message = error.message
    }
    
    commonStore.sweetalertList.push({
      title: 'Lỗi',
      text: message,
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  }
}

// Verify OTP
const verifyOtp = async () => {
  try {
    const { verifyOtp } = useAuth()
    
    const response = await verifyOtp({
      email: formData.email,
      otp: verificationCode.value
    })
    
    if (response.success) {
      progress.value = 2
      commonStore.sweetalertList.push({
        title: 'Xác thực OTP thành công',
        text: 'Bạn có thể đặt lại mật khẩu',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    } else {
      commonStore.sweetalertList.push({
        title: 'Xác thực OTP thất bại',
        text: response.message,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } catch (error: any) {
    let message = 'Có lỗi xảy ra khi xác thực OTP'
    
    if (error?.data?.message) {
      message = error.data.message
    } else if (error?.message) {
      message = error.message
    }
    
    commonStore.sweetalertList.push({
      title: 'Lỗi',
      text: message,
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  }
}

// Reset Password
const resetPassword = async () => {
  try {
    const { changePassword } = useAuth()
    
    const response = await changePassword({
      email: formData.email,
      oldPassword: '', // Không cần mật khẩu cũ khi reset
      newPassword: formData.newPassword
    })
    
    if (response.success) {
      commonStore.sweetalertList.push({
        title: 'Đặt lại mật khẩu thành công',
        text: 'Mật khẩu mới đã được cập nhật',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      
      // Reset form và quay về bước đầu
      progress.value = 0
      formData.email = ''
      formData.newPassword = ''
      verificationCode.value = ''
    } else {
      commonStore.sweetalertList.push({
        title: 'Đặt lại mật khẩu thất bại',
        text: response.message,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } catch (error: any) {
    let message = 'Có lỗi xảy ra khi đặt lại mật khẩu'
    
    if (error?.data?.message) {
      message = error.data.message
    } else if (error?.message) {
      message = error.message
    }
    
    commonStore.sweetalertList.push({
      title: 'Lỗi',
      text: message,
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  }
}

// Resend OTP functionality
const resendOtp = async () => {
  try {
    await sendOtp()
  } catch (error) {
    //.error('Resend OTP error:', error)
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
