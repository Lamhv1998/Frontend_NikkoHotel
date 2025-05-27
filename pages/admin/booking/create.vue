<template>
  <CTitle class="m-5 p-3" title="Trang đăng kí"></CTitle>
  <section class="p-6">
    <BookingForm @submit="handleCreate" />
  </section>
</template>

<script setup>
import BookingForm from './component/BookingForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Creabooking:', formData)
  // Gọi API tạo user
}
</script>
