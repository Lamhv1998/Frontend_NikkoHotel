<template>
  <div class="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow space-y-6 text-center">
    <h1 class="text-2xl font-bold">Đang chuyển đến trang thanh toán...</h1>
    <p v-if="loading" class="text-blue-600">Vui lòng chờ trong giây lát</p>
    <p v-else class="text-red-600">Không thể tạo link thanh toán.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(true)

const createPaymentLink = async () => {
  try {
    const res = await $fetch('http://localhost:8080/api/payment/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // ✅ Chuyển hướng toàn trang đến URL thanh toán của PayOS
    window.location.href = res.checkoutUrl
  } catch (err) {
    console.error('Lỗi khi tạo link thanh toán:', err)
    loading.value = false
  }
}

onMounted(() => {
  createPaymentLink()
})
</script>
