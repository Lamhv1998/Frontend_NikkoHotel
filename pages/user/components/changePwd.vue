<template>
  <div class="space-y-6">
    <!-- Form đổi mật khẩu -->
    <div class="space-y-4">
      <!-- Mật khẩu hiện tại -->
      <div class="space-y-2">
        <label class="text-sm text-gray-600 font-medium">Mật khẩu hiện tại</label>
        <input 
          v-model="currentPassword" 
          type="password" 
          placeholder="Nhập mật khẩu hiện tại"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
        />
      </div>

      <!-- Mật khẩu mới -->
      <div class="space-y-2">
        <label class="text-sm text-gray-600 font-medium">Mật khẩu mới</label>
        <input 
          v-model="newPassword" 
          type="password" 
          placeholder="Nhập mật khẩu mới"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
        />
      </div>

      <!-- Xác nhận mật khẩu mới -->
      <div class="space-y-2">
        <label class="text-sm text-gray-600 font-medium">Xác nhận mật khẩu mới</label>
        <input 
          v-model="confirmPassword" 
          type="password" 
          placeholder="Nhập lại mật khẩu mới"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
        />
      </div>
    </div>

    <!-- Nút đổi mật khẩu -->
    <div class="flex justify-center pt-4">
      <button 
        @click="changePassword"
        class="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        Đổi mật khẩu
      </button>
    </div>

    <!-- Thông báo -->
    <div v-if="message" class="text-center p-3 rounded-xl" :class="messageType === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface User {
  _id: string
  name: {
    fullName: string
  }
}

interface Props {
  user: User
}

const props = defineProps<Props>()

// Form data
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// Message state
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

// Change password function
const changePassword = () => {
  // Reset message
  message.value = ''
  
  // Validation
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    message.value = 'Vui lòng điền đầy đủ thông tin'
    messageType.value = 'error'
    return
  }
  
  if (newPassword.value !== confirmPassword.value) {
    message.value = 'Mật khẩu xác nhận không khớp'
    messageType.value = 'error'
    return
  }
  
  if (newPassword.value.length < 6) {
    message.value = 'Mật khẩu mới phải có ít nhất 6 ký tự'
    messageType.value = 'error'
    return
  }
  
  // Simulate API call
  setTimeout(() => {
    message.value = 'Đổi mật khẩu thành công!'
    messageType.value = 'success'
    
    // Reset form
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }, 1000)
}
</script>
