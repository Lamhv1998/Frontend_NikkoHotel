<template>
  <VForm
    ref="formRefs"
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema"
    @submit="handleLogin"
  >
    <!-- Tiêu đề -->
    <CAuthTitle text="Bắt đầu hành trình ngay" />

    <div class="space-y-4">
      <!-- Form: Email & Mật khẩu -->
      <UIInput
        v-model="formData.email"
        name="email"
        label="Email"
        placeholder="hello@exsample.com"
        :error="errors.email"
        :disabled="pending"
      />
      <UIInput
        v-model="formData.password"
        name="password"
        label="Mật khẩu"
        type="password"
        placeholder="Vui lòng nhập mật khẩu"
        :error="errors.password"
        :disabled="pending"
      />

      <div class="flex justify-between">
        <UICheckbox
          v-model="remember"
          name="remember"
          text="Ghi nhớ tài khoản"
          :disabled="pending"
        />

        <Forgot />
      </div>
    </div>

    <!-- Nút: Đăng nhập -->
    <UIButton
      type="submit"
      block
      text="Đăng nhập thành viên"
      :disabled="pending"
      :loading="pending"
    />

    <!-- Phân cách -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t border-gray-300" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-white px-2 text-gray-500">Hoặc</span>
      </div>
    </div>

    <!-- Nút đăng nhập Google -->
    <UIGoogleButton :disabled="googlePending" :loading="googlePending" @click="handleGoogleLogin" />

    <div class="flex gap-2">
      <p class="text-body-2 text-text-inverse xl:text-body">Chưa có tài khoản?</p>
      <!-- Liên kết: Đăng ký -->
      <NuxtLink class="hot-link-wrapper" to="/auth/signup">
        <UIButton text="Đăng ký ngay" variant="ghost" />
      </NuxtLink>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import type { AuthenticationRequest } from '@/types/auth'
import Forgot from './components/forgot.vue'

/* Thuộc tính toàn cục */
const authStore = useAuthStore()
const commonStore = useCommonStore()
const styleStore = useStyleStore()

/* Google Auth */
const { googleSignIn, checkGoogleCallback } = useGoogleAuth()

/* PageMeta */
definePageMeta({
  middleware: 'record',
  layout: 'auth'
})

/* Form đăng nhập */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = ref<AuthenticationRequest>({ email: '', password: '' })

// Quy tắc form
const schema = { email: 'required|email', password: 'required' }

// Ghi nhớ tài khoản
const remember = ref(false)

// Loading state
const pending = ref(false)
const googlePending = ref(false)

// Khởi tạo client
onMounted(() => {
  formData.value.email = authStore.email
  remember.value = authStore.email !== ''
  
  // Kiểm tra Google OAuth callback
  console.log('Checking for Google OAuth callback...')
  checkGoogleCallback()
})

// Xử lý đăng nhập
const handleLogin = async () => {
  if (pending.value) return
  
  pending.value = true
  
  try {
    // Sử dụng useAuth composable
    const { loginUser } = useAuth()
    
    console.log('Attempting login with:', formData.value)
    
    const result = await loginUser(formData.value)
    console.log('Login result:', result)
    
    if (result.success) {
      console.log('Login successful')
      
      // Hiển thị thông báo thành công
      commonStore.sweetalertList.push({
        title: 'Đăng nhập thành công',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
      
      // Redirect sau khi đăng nhập thành công
      setTimeout(() => {
        navigateTo(commonStore.routerGuide || '/user')
      }, 1000)
    } else {
      console.log('Login failed:', result.message)
      // Hiển thị thông báo lỗi
      commonStore.sweetalertList.push({
        title: 'Lỗi đăng nhập',
        text: result.message,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
    
  } catch (error: any) {
    console.error('Login error:', error)
    
    let errorMessage = 'Đăng nhập thất bại'
    
    // Xử lý các loại lỗi khác nhau
    if (error?.data?.message) {
      errorMessage = error.data.message
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    // Xử lý lỗi cụ thể cho từng field
    if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('user')) {
      formRefs.value?.setFieldError('email', 'Email không tồn tại hoặc không đúng')
    } else if (errorMessage.toLowerCase().includes('password') || errorMessage.toLowerCase().includes('mật khẩu')) {
      formRefs.value?.setFieldError('password', 'Mật khẩu không đúng')
    } else {
      // Hiển thị thông báo lỗi chung
      commonStore.sweetalertList.push({
        title: 'Lỗi đăng nhập',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  } finally {
    pending.value = false
  }
}

// Xử lý đăng nhập Google
const handleGoogleLogin = async () => {
  if (googlePending.value) return
  
  googlePending.value = true
  
  try {
    console.log('Initiating Google login...')
    await googleSignIn()
  } catch (error) {
    console.error('Google login error:', error)
    
    // Hiển thị thông báo lỗi
    commonStore.sweetalertList.push({
      title: 'Lỗi đăng nhập Google',
      text: 'Không thể khởi tạo đăng nhập Google. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
      })
  } finally {
    googlePending.value = false
  }
}
</script>
