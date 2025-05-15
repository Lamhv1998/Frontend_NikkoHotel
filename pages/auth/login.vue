<template>
  <VForm
    ref="formRefs"
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema"
    @submit="loginRefresh"
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

    <div class="flex gap-2">
      <p class="text-body-2 text-white xl:text-body">Chưa có tài khoản?</p>
      <!-- Liên kết: Đăng ký -->
      <NuxtLink class="hot-link-wrapper" to="/auth/signup">
        <UIButton text="Đăng ký ngay" variant="text" />
      </NuxtLink>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import Forgot from './components/forgot.vue'
import type { LoginPayload } from '@/types'

/* Thuộc tính toàn cục */
const authStore = useAuthStore()
const useCommon = useCommonStore()

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

// Khởi tạo client
onMounted(() => {
  formData.value.email = authStore.email
  remember.value = authStore.email !== ''
})

/* api */
const { loginApi } = useApi()

// api: Đăng nhập
const { pending, refresh: loginRefresh } = await loginApi({
  body: formData,
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response.status === 200) {
      authStore.userName = response._data.result.name
      authStore.token = response._data.token
      authStore.email = remember.value ? formData.value.email : ''
      await navigateTo(useCommon.routerGuide || '/')
    }
  },
  onResponseError({ response }) {
    switch (response._data?.message) {
      case 'Người dùng này không tồn tại':
        formRefs.value?.setFieldError('email', 'Email không tồn tại')
        break
      case 'Mật khẩu sai':
      case 'Mật khẩu phải có ít nhất 8 ký tự':
      case 'Mật khẩu không được chỉ có chữ cái':
      case 'Mật khẩu không được chỉ có số':
      case 'Mật khẩu phải có ít nhất 8 ký tự, gồm cả chữ và số':
        formRefs.value?.setFieldError('password', 'Mật khẩu không đúng')
        break
      default:
        break
    }
  }
})
pending.value = false
</script>
