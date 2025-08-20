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
        placeholder="Vui lòng nhập email"
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
import Forgot from './components/forgot.vue'
import type { LoginPayload } from '@/types/auth'

/* Thuộc tính toàn cục */
const authStore = useAuthStore()
const commonStore = useCommonStore()
const styleStore = useStyleStore()

/* PageMeta */
definePageMeta({
  middleware: 'record',
  layout: 'auth'
})

/* Form đăng nhập */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = ref<LoginPayload>({ email: '', password: '' })

// Quy tắc form
const schema = { email: 'required|email', password: 'required' }

// Ghi nhớ tài khoản
const remember = ref(false)

// Loading state
const pending = ref(false)

// Khởi tạo client
onMounted(() => {
  formData.value.email = authStore.email
  remember.value = authStore.email !== ''
})

// Xử lý đăng nhập
const handleLogin = async () => {
  if (pending.value) return
  
  pending.value = true
  
  try {
    // Sử dụng useAuth composable
    const { login } = useAuth()
    
    console.log('Attempting login with:', formData.value)
    
    const result = await login(formData.value, remember.value)
    
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
        navigateTo(commonStore.routerGuide || '/')
      }, 1000)
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

// Watch for authentication errors from store
watch(() => authStore.authError, (error: string | null) => {
  if (error) {
    console.error('Auth store error:', error)
    // Clear the error after displaying
    authStore.clearError()
  }
})
</script>
