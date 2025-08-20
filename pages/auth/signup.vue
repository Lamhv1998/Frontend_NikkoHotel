<template>
  <VForm
    ref="formRefs"
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema[progress]"
    @submit="submit"
  >
    <!-- Tiêu đề -->
    <CAuthTitle text="Đăng ký ngay" />

    <!-- Tiến trình bước -->
    <UIStepper
      v-model="progress"
      :steps="['Nhập email và mật khẩu', 'Điền thông tin cơ bản']"
      :disabled="apiPending"
    />

    <!-- Biểu mẫu -->
    <Transition name="modal" mode="out-in">
      <!-- Bước 0: Email & Mật khẩu -->
      <div v-if="progress === 0" class="space-y-4">
        <UIInput
          v-model="formData.email"
          name="email"
          label="Email"
          placeholder="hello@exsample.com"
          :error="errors.email"
          :disabled="apiPending"
        />
        <UIInput
          v-model="formData.password"
          name="password"
          label="Mật khẩu"
          type="password"
          placeholder="Vui lòng nhập mật khẩu"
          :error="errors.password"
          :disabled="apiPending"
        />
        <UIInput
          v-model="formCtrl.confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Vui lòng nhập lại mật khẩu"
          :error="errors.confirmPassword"
          :disabled="apiPending"
        />
      </div>

      <!-- Bước 1: Họ tên, SĐT, Ngày sinh, Địa chỉ -->
      <div v-else class="space-y-4">
        <UIInput
          v-model="formData.name"
          name="name"
          label="Họ và tên"
          placeholder="Vui lòng nhập họ tên"
          :error="errors.name"
          :disabled="apiPending"
        />

        <UIInput
          v-model="formData.phone"
          name="phone"
          label="Số điện thoại"
          type="tel"
          placeholder="Vui lòng nhập số điện thoại"
          :error="errors.phone"
          :disabled="apiPending"
        />

        <CBirthday v-model="formData.birthday" :error="errors.birthday" :disabled="apiPending" />

        <CAddress
          v-model="formData.address"
          :detail-error="errors.detail"
          :zipcode-error="errors.zipcode"
          :disabled="apiPending"
        />

        <UICheckbox
          v-model="formCtrl.isAgree"
          name="agree"
          label="Quy định sử dụng thông tin cá nhân"
          :error="errors.agree"
          text="Tôi đã đọc và đồng ý với quy định sử dụng thông tin cá nhân của website"
          :disabled="apiPending"
        />
      </div>
    </Transition>

    <div class="space-y-4">
      <!-- Nút: Gửi -->
      <UIButton
        type="submit"
        :text="progress == 0 ? 'Tiếp theo' : 'Hoàn tất đăng ký'"
        block
        :disabled="apiPending"
        :loading="apiPending"
      />

      <!-- Liên kết: Đăng nhập -->
      <div class="flex gap-2">
        <p class="text-body-2 text-text-inverse xl:text-body">Đã có tài khoản?</p>
        <NuxtLink class="hot-link-wrapper" to="/auth/login">
          <UIButton text="Đăng nhập ngay" variant="text" />
        </NuxtLink>
      </div>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import type { SignupPayload } from '@/types/auth'

/* Thuộc tính toàn cục */
definePageMeta({})
const authStore = useAuthStore()
const styleStore = useStyleStore()
const commonStore = useCommonStore()
const { $Swal, $dayjs, $validator } = useNuxtApp()

/* PageMeta */
definePageMeta({
  middleware: 'record',
  layout: 'auth'
})

/* Biểu mẫu đăng ký */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = reactive<SignupPayload>({
  email: '',
  password: '',
  name: '',
  phone: '',
  birthday: '',
  address: {
    zipcode: 0,
    detail: ''
  }
})
const formCtrl = ref({ confirmPassword: '', isAgree: false })

// Quy tắc biểu mẫu
const schema = [
  {
    email: 'required|email',
    password: (val: string) => {
      if (!val) return 'Mật khẩu là bắt buộc'
      if (val.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự'
      if (/^[a-zA-Z]+$/.test(val)) return 'Mật khẩu không được chỉ có chữ cái'
      if (/^\d+$/.test(val)) return 'Mật khẩu không được chỉ có số'
      if (!/^[a-zA-Z0-9]+$/.test(val))
        return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ và số'
      return {}
    },
    confirmPassword: 'required|confirmed:@password'
  },
  {
    name: 'required|min:2',
    phone: (val: string) => {
      if (!val) return 'Số điện thoại là bắt buộc'
      if (!/^09\d{8}$/.test(val)) return 'Vui lòng nhập số điện thoại hợp lệ gồm 10 số'
      return {}
    },
    birthday: (val: string) => {
      // Simple date validation
      if (!val) return 'Ngày sinh là bắt buộc'
      const date = new Date(val)
      return !isNaN(date.getTime()) ? {} : 'Ngày sinh không hợp lệ'
    },
    zipcode: (val: number) => {
      if (val === 0) return 'Tỉnh/Thành phố là bắt buộc'
      return {}
    },
    detail: 'required',
    agree: (val: Boolean) => {
      return !val ? 'Vui lòng đọc và đồng ý với quy định sử dụng thông tin cá nhân của website' : {}
    }
  }
]

// Tiến trình biểu mẫu
const progress = ref(0)

// Gửi biểu mẫu
const submit = async () => {
  if (progress.value === 0) {
    progress.value = 1
    return
  }
  await submitRegistration()
}

/* api */
const { register } = useAuth()
const apiPending = ref(false)

// Watch for authentication errors from store
watch(() => authStore.authError, (error: string | null) => {
  if (error) {
    console.error('Auth store error:', error)
    // Clear the error after displaying
    authStore.clearError()
  }
})

// Đăng ký
const submitRegistration = async () => {
  try {
    apiPending.value = true
    
    console.log('Submitting registration with:', formData)
    
    const result = await register(formData)
    
    if (result.success) {
      console.log('Registration successful:', result)
      
      if (result.autoLogin) {
        // Auto-login successful
        commonStore.sweetalertList.push({
          title: 'Đăng ký thành công!',
          text: 'Bạn đã được đăng nhập tự động',
          icon: 'success',
          confirmButtonText: 'Tiếp tục',
          confirmButtonColor: styleStore.confirmButtonColor
        })
        
        // Redirect after success
        setTimeout(() => {
          navigateTo(commonStore.routerGuide || '/')
        }, 1000)
      } else {
        // Registration successful but no auto-login
        commonStore.sweetalertList.push({
          title: 'Đăng ký thành công!',
          text: 'Vui lòng đăng nhập để tiếp tục',
          icon: 'success',
          confirmButtonText: 'Đăng nhập ngay',
          confirmButtonColor: styleStore.confirmButtonColor
        })
        
        // Redirect to login
        setTimeout(() => {
          navigateTo('/auth/login')
        }, 1000)
      }
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    
    let errorMessage = 'Đăng ký thất bại'
    
    // Xử lý các loại lỗi khác nhau
    if (error?.data?.message) {
      errorMessage = error.data.message
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    // Hiển thị thông báo lỗi
    commonStore.sweetalertList.push({
      title: 'Lỗi đăng ký',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    apiPending.value = false
  }
}
</script>
