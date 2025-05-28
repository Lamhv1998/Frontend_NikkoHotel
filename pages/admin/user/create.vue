<template>
  <CTitle class="m-5 p-3" title="Trang tạo"></CTitle>
  <section class="p-6">
    <userform @submit="handleCreate" />
  </section>
</template>

<script setup>
import userform from './component/UIUserForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Creating user:', formData)
  // Gọi API tạo user
}
</script>
