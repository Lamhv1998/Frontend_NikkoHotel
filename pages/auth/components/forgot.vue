<template>
  <!-- Nút: Quên mật khẩu -->
  <UIButton text="Quên mật khẩu?" variant="ghost" @click="openForgot()" />

  <!-- Modal: Quên mật khẩu -->
  <UIModal v-model="forgotIsOpen">
    <!-- Modal: Tiêu đề -->
    <div class="p-4 border-b border-system-gray-40">
      <h3 class="text-lg font-semibold">Quên mật khẩu</h3>
    </div>

    <!-- Modal: Form -->
    <VForm v-slot="{ errors }" :validation-schema="schema" @submit="submit">
      <!-- Modal: Nội dung -->
      <div class="p-4">
        <UIInput
          v-model="formData.email"
          name="email"
          label="Email"
          placeholder="hello@exsample.com"
          :error="errors.email"
          blackhead
          :disabled="isLoading"
        />
      </div>

      <div
        class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
      >
        <!-- Modal: Chân trang -->
        <UIButton
          text="Hủy"
          variant="secondary"
          :disabled="isLoading"
          @click="forgotIsOpen = false"
        />
        <button 
          type="submit" 
          :disabled="isLoading"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-system-primary-100 px-4 py-2 font-medium text-white transition-all hover:bg-system-primary-120 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon v-if="isLoading" class="h-4 w-4 animate-spin" name="eos-icons:loading" />
          <span>Gửi email</span>
        </button>
      </div>
    </VForm>
  </UIModal>
</template>

<script lang="ts" setup>
/* Thuộc tính toàn cục */
const { $Swal } = useNuxtApp()
const styleStore = useStyleStore()

// Import userAPI
import userAPI from '~/api/user'

/* Trạng thái modal */
const forgotIsOpen = ref(false)
const isLoading = ref(false)

// Quên mật khẩu: mở modal
const openForgot = () => {
  formData.email = ''
  forgotIsOpen.value = true
}

/* Xác thực form */
const formData = reactive({ email: '' })

// Quy tắc form
const schema = { email: 'required|email' }

// Gửi form
const submit = async () => {
  isLoading.value = true
  
  try {
    console.log('=== FORGOT PASSWORD SUBMIT ===')
    console.log('Email:', formData.email)
    
    const { sendOtpForPasswordChangeApi } = userAPI
    console.log('Calling sendOtpForPasswordChangeApi...')
    
    const result = await sendOtpForPasswordChangeApi({ body: { userEmail: formData.email } })
    console.log('API call successful:', result)
    
    // Đóng modal
    forgotIsOpen.value = false
    
    // Hiển thị thông báo thành công và chuyển hướng
    $Swal.fire({
      title: 'Gửi email thành công!',
      text: 'Mã xác nhận đã được gửi đến email của bạn. Vui lòng kiểm tra và làm theo hướng dẫn.',
      icon: 'success',
      confirmButtonText: 'Tiếp tục',
      confirmButtonColor: styleStore.confirmButtonColor
    }).then(() => {
      // Chuyển hướng đến trang quên mật khẩu để hoàn tất quy trình
      navigateTo('/auth/forgot-password')
    })
  } catch (error: any) {
    console.error('=== FORGOT PASSWORD ERROR ===')
    console.error('Error details:', error)
    console.error('Error message:', error.message)
    console.error('Error data:', error.data)
    
    $Swal.fire({
      title: 'Lỗi!',
      text: error.data?.message || 'Không thể gửi mã xác nhận. Vui lòng thử lại.',
      icon: 'error',
      confirmButtonText: 'Xác nhận',
      confirmButtonColor: styleStore.confirmButtonColor
    })
  } finally {
    isLoading.value = false
  }
}
</script>
