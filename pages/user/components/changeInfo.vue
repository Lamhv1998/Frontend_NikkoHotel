<template>
  <div class="space-y-6">
    <!-- Thông tin cơ bản -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Họ tên -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent border border-blue-100">
        <label class="text-sm text-gray-600 font-medium mb-2 block">Họ tên</label>
        <p class="text-gray-800 font-semibold">{{ user.name.fullName }}</p>
      </div>

      <!-- Email -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100">
        <label class="text-sm text-gray-600 font-medium mb-2 block">Email</label>
        <p class="text-gray-800 font-semibold">{{ user.email }}</p>
      </div>

      <!-- Số điện thoại -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-transparent border border-purple-100">
        <label class="text-sm text-gray-600 font-medium mb-2 block">Số điện thoại</label>
        <p class="text-gray-800 font-semibold">{{ user.phone }}</p>
      </div>

      <!-- Ngày sinh -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-transparent border border-amber-100">
        <label class="text-sm text-gray-600 font-medium mb-2 block">Ngày sinh</label>
        <p class="text-gray-800 font-semibold">{{ formatDate(user.dateOfBirth) }}</p>
      </div>

      <!-- Địa chỉ -->
      <div class="p-4 rounded-xl bg-gradient-to-r from-red-50 to-transparent border border-red-100 md:col-span-2">
        <label class="text-sm text-gray-600 font-medium mb-2 block">Địa chỉ</label>
        <p class="text-gray-800 font-semibold">{{ user.address.detail }}, {{ user.address.city }}</p>
      </div>
    </div>

    <!-- Nút chỉnh sửa -->
    <div class="flex justify-center pt-4">
      <button class="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
        Chỉnh sửa thông tin
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface User {
  name: {
    fullName: string
  }
  email: string
  phone: string
  dateOfBirth: string
  address: {
    detail: string
    city: string
  }
}

interface Props {
  user: User
}

const props = defineProps<Props>()

// Format date
const formatDate = (dateString: string) => {
  if (!dateString) return 'Chưa cập nhật'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

// Emit event
const emit = defineEmits<{
  'get-user-refresh': []
}>()

// Refresh user data
const refreshUser = () => {
  emit('get-user-refresh')
}
</script>