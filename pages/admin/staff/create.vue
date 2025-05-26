<template>
  <section class="p-6">
    <UIStaffForm @submit="handleCreate" />
  </section>
</template>

<script setup>
import UIStaffForm from './component/UIStaffForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Creating user:', formData)
  // Gọi API tạo user
}
</script>
