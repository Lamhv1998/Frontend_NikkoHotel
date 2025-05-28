<template>
  <CTitle class="m-5 p-3" title="Trang tạo khuyến mãi"></CTitle>
  <section class="p-6">
    <PromotionForm @submit="handleCreate" />
  </section>
</template>

<script setup>
import PromotionForm from './component/PromotionForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Create promotion:', formData)
  // Gọi API tạo promotion ở đây
}
</script>
