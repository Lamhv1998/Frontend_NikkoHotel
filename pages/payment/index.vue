<template>
  <div class="p-6 max-w-10xl mx-auto bg-white rounded-xl shadow space-y-6">
    <h1 class="text-2xl font-bold">Thanh toán đơn hàng</h1>

    <!-- Hiển thị loading khi đang tạo link -->
    <div v-if="loading" class="text-blue-600">Đang tạo link thanh toán...</div>

    <!-- Hiển thị thông tin đơn hàng và iframe nếu đã có dữ liệu -->
    <div v-else-if="paymentData">
      <p class="mt-4"><strong>Thông tin đơn hàng:</strong></p>
      <ul class="list-disc pl-6">
        <li><strong>Mã đơn hàng:</strong> {{ paymentData.orderCode }}</li>
        <li><strong>Người nhận:</strong> {{ paymentData.accountName }}</li>
        <li><strong>Số tiền:</strong> {{ paymentData.amount }} {{ paymentData.currency }}</li>
      </ul>

      <div class="mt-6">
        <p class="mb-2 font-semibold">Thanh toán trực tiếp:</p>
        <iframe :src="paymentData.checkoutUrl" class="w-full h-[650px] border rounded"></iframe>
      </div>
    </div>

    <!-- Hiển thị nếu có lỗi hoặc chưa có dữ liệu -->
    <div v-else class="text-red-600">Không thể tải thông tin thanh toán.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const paymentData = ref<any>(null)
const loading = ref(false)

const createPaymentLink = async () => {
  loading.value = true
  try {
    const res = await $fetch('http://localhost:8080/api/payment/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    paymentData.value = res
  } catch (err) {
    console.error('Lỗi khi tạo link thanh toán:', err)
    paymentData.value = null
  } finally {
    loading.value = false
  }
}

// ✅ Gọi hàm khi trang được render lần đầu
onMounted(() => {
  createPaymentLink()
})
</script>
