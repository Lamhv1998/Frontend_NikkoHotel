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
        <div class="text-center mb-6">
          <p class="text-sm text-gray-600">
            Nhập email đã đăng ký để nhận mã xác nhận đặt lại mật khẩu
          </p>
        </div>
        
        <UIInput
          v-model="formData.email"
          name="email"
          label="Email"
          placeholder="hello@example.com"
          :error="errors.email"
          :disabled="apiPending"
        />
      </div>

      <!-- Bước 1: Xác nhận OTP -->
      <div v-else-if="progress === 1" class="space-y-4">
        <div class="text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Xác nhận email</h3>
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
            @click="resendVerificationCode"
            :disabled="resendDisabled"
            class="text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400"
          >
            {{ resendDisabled ? `Gửi lại sau ${resendCountdown}s` : 'Gửi lại mã' }}
          </button>
        </div>
      </div>

      <!-- Bước 2: Đặt mật khẩu mới -->
      <div v-else class="space-y-4">
        <div class="text-center mb-6">
          <p class="text-sm text-gray-600">
            Vui lòng nhập mật khẩu mới cho tài khoản của bạn
          </p>
        </div>

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
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          :error="errors.confirmPassword"
          :disabled="apiPending"
        />
      </div>
    </Transition>

    <div class="space-y-4">
      <!-- Nút: Gửi -->
      <UIButton
        type="button"
        :text="progress === 0 ? 'Gửi mã xác nhận' : progress === 1 ? 'Xác nhận OTP' : 'Đặt lại mật khẩu'"
        block
        :disabled="apiPending"
        :loading="apiPending"
        @click="handleSubmit"
      />

      <!-- Liên kết: Đăng nhập -->
      <div class="flex gap-2">
        <p class="text-body-2 text-text-inverse xl:text-body">Đã nhớ mật khẩu?</p>
        <NuxtLink class="hot-link-wrapper" to="/auth/login">
          <UIButton text="Đăng nhập ngay" variant="text" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* Thuộc tính toàn cục */
const styleStore = useStyleStore()
const { $Swal, $validator } = useNuxtApp()

/* PageMeta */
definePageMeta({
  middleware: 'record',
  layout: 'auth'
})

/* Biểu mẫu quên mật khẩu */
const formData = reactive({
  email: '',
  newPassword: '',
  confirmPassword: ''
})

const verificationCode = ref('')
const progress = ref(0)
const resendCountdown = ref(0)
const resendDisabled = computed(() => resendCountdown.value > 0)

// Quy tắc biểu mẫu
const schema = computed(() => [
  {
    email: 'required|email'
  },
  {
    verificationCode: (val: string) => {
      if (!val) return 'Mã xác nhận là bắt buộc'
      if (val.length !== 6) return 'Mã xác nhận phải có 6 số'
      if (!/^\d{6}$/.test(val)) return 'Mã xác nhận chỉ được chứa số'
      return {}
    }
  },
  {
    newPassword: (val: string) => {
      if (!val) return 'Mật khẩu mới là bắt buộc'
      if (!$validator.isLength(val, { min: 8 })) return 'Mật khẩu phải có ít nhất 8 ký tự'
      if ($validator.isAlpha(val)) return 'Mật khẩu không được chỉ có chữ cái'
      if ($validator.isNumeric(val)) return 'Mật khẩu không được chỉ có số'
      if (!$validator.isAlphanumeric(val))
        return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
      return {}
    },
    confirmPassword: 'required|confirmed:@newPassword'
  }
])

// Validation errors
const errors = computed(() => {
  const currentSchema = schema.value[progress.value]
  const currentData = progress.value === 0 ? formData : progress.value === 1 ? { verificationCode: verificationCode.value } : formData
  
  const validationErrors: Record<string, string> = {}
  
  Object.keys(currentSchema).forEach(field => {
    const validator = currentSchema[field]
    if (typeof validator === 'function') {
      const result = validator(currentData[field])
      if (result && typeof result === 'string') {
        validationErrors[field] = result
      }
    }
  })
  
  return validationErrors
})

// API pending states
const apiPending = computed(() => sendOtpPending.value || verifyOtpPending.value || resetPasswordPending.value)
const sendOtpPending = ref(false)
const verifyOtpPending = ref(false)
const resetPasswordPending = ref(false)

// Xử lý submit
const handleSubmit = async () => {
  if (apiPending.value) return
  
  if (progress.value === 0) {
    await sendOtp()
  } else if (progress.value === 1) {
    await verifyOtp()
  } else {
    await resetPassword()
  }
}

// Gửi OTP
const sendOtp = async () => {
  try {
    sendOtpPending.value = true
    
    const { sendOtpForPasswordChangeApi } = userAPI
    await sendOtpForPasswordChangeApi({ body: { userEmail: formData.email } })
    
    // Chuyển sang bước tiếp theo
    progress.value = 1
    startResendCountdown()
    
    $Swal?.fire({
      title: 'Thành công!',
      text: 'Mã xác nhận đã được gửi đến email của bạn.',
      icon: 'success',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } catch (error: any) {
    console.error('Lỗi gửi OTP:', error)
    $Swal?.fire({
      title: 'Lỗi!',
      text: error.data?.message || 'Không thể gửi mã xác nhận. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    sendOtpPending.value = false
  }
}

// Xác nhận OTP
const verifyOtp = async () => {
  try {
    verifyOtpPending.value = true
    
    const { verifyOtpApi } = userAPI
    await verifyOtpApi({ body: { userEmail: formData.email, otp: verificationCode.value } })
    
    // Chuyển sang bước cuối
    progress.value = 2
    
    $Swal?.fire({
      title: 'Thành công!',
      text: 'Email đã được xác nhận. Vui lòng đặt mật khẩu mới.',
      icon: 'success',
      confirmButtonText: 'Tiếp tục',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } catch (error: any) {
    console.error('Lỗi xác nhận OTP:', error)
    $Swal?.fire({
      title: 'Lỗi!',
      text: error.data?.message || 'Mã xác nhận không đúng. Vui lòng kiểm tra lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    verifyOtpPending.value = false
  }
}

// Đặt lại mật khẩu
const resetPassword = async () => {
  try {
    resetPasswordPending.value = true
    
    // Lấy userId từ localStorage hoặc gọi API để lấy
    const customerInfo = localStorage.getItem('customerInfo')
    let userId = ''
    
    if (customerInfo) {
      const parsed = JSON.parse(customerInfo)
      userId = parsed.id || parsed._id
    }
    
    if (!userId) {
      throw new Error('Không tìm thấy thông tin người dùng')
    }
    
    const { changePasswordAfterOtpApi } = userAPI
    await changePasswordAfterOtpApi({ 
      body: { 
        userId, 
        newPassword: formData.newPassword 
      } 
    })
    
    // Thành công - chuyển về trang đăng nhập
    $Swal?.fire({
      title: 'Thành công!',
      text: 'Mật khẩu đã được đặt lại. Vui lòng đăng nhập với mật khẩu mới.',
      icon: 'success',
      confirmButtonText: 'Đăng nhập ngay',
      confirmButtonColor: styleStore.confirmButtonColor
    }).then(() => {
      navigateTo('/auth/login')
    })
  } catch (error: any) {
    console.error('Lỗi đặt lại mật khẩu:', error)
    $Swal?.fire({
      title: 'Lỗi!',
      text: error.data?.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    resetPasswordPending.value = false
  }
}

// Gửi lại mã xác nhận
const resendVerificationCode = async () => {
  if (resendDisabled.value) return
  
  try {
    await sendOtp()
  } catch (error) {
    console.error('Lỗi gửi lại mã:', error)
  }
}

// Bắt đầu đếm ngược gửi lại
const startResendCountdown = () => {
  resendCountdown.value = 60
  const timer = setInterval(() => {
    resendCountdown.value--
    if (resendCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}
</script>
