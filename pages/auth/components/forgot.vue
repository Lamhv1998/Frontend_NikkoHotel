<template>
  <UIModal v-model="isOpen" title="Quên mật khẩu" size="md">
    <div class="space-y-4">
      <p class="text-gray-600">
        Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu.
      </p>

      <div>
        <label for="forgot-email" class="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <UIInput
          id="forgot-email"
          name="forgot-email"
          v-model="email"
          type="email"
          placeholder="Nhập email của bạn"
          :error="error"
          required
        />
      </div>

      <div class="flex space-x-3">
        <UIButton
          variant="ghost"
          @click="closeModal"
          class="flex-1"
        >
          Hủy
        </UIButton>
        <UIButton
          variant="primary"
          @click="handleSendEmail"
          :loading="loading"
          class="flex-1"
        >
          Gửi email
        </UIButton>
      </div>
    </div>
  </UIModal>
</template>

<script setup lang="ts">
import userAPI from '~/api/user'

// Props
interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Reactive data
const email = ref('')
const error = ref('')
const loading = ref(false)

// Computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

// Methods
const closeModal = () => {
  isOpen.value = false
  email.value = ''
  error.value = ''
}

const handleSendEmail = async () => {
  try {
    if (!email.value) {
      error.value = 'Email không được để trống'
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      error.value = 'Email không hợp lệ'
      return
    }

    loading.value = true
    error.value = ''

    const response = await userAPI.sendOtpForPasswordChangeApi({
      body: { userEmail: email.value }
    })

    // Close modal and show success message
    closeModal()
    
    // Show success message and navigate
    alert('Mã OTP đã được gửi đến email của bạn. Vui lòng kiểm tra email và nhập mã OTP.')
    navigateTo(`/auth/forgot-password?email=${encodeURIComponent(email.value)}`)

  } catch (err) {
    console.error('Send email error:', err)
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Có lỗi xảy ra khi gửi email'
    }
  } finally {
    loading.value = false
  }
}
</script>
