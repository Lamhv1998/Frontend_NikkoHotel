<template>
  <CTitle class="m-5 p-3" title="Trang chỉnh sửa khuyến mãi"></CTitle>
  <section class="p-6">
    <PromotionForm :is-edit="true" :promotion-data="promotion" @submit="handleUpdate" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PromotionForm from './component/PromotionForm.vue'

definePageMeta({
  layout: 'adminlayout'
})

// Dữ liệu khuyến mãi mẫu (giả lập)
const promotion = ref({
  name: 'Giảm giá mùa hè',
  code: 'SUMMER2025',
  type: 'percent',
  membership: 'VIP1',
  value: 20,
  startDate: '2025-06-01',
  endDate: '2025-06-30',
  description: 'Khuyến mãi giảm 20% cho tất cả các phòng trong tháng 6.',
  status: 'active'
})

const handleUpdate = (formData) => {
  console.log('Updating promotion:', formData)
  // Xử lý cập nhật promotion ở đây
}
</script>
