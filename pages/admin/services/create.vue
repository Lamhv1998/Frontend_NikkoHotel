<template>
  <CTitle class="m-5 p-3" title="Trang tạo dịch vụ"></CTitle>
  <section class="p-6">
    <ServiceForm @submit="handleCreate" />
  </section>
</template>

<script setup>
import ServiceForm from './component/ServiceForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Create service:', formData)
  // Gọi API tạo service ở đây
}
</script>
