<template>
  <CTitle class="m-5 p-3" title="Trang đăng kí"></CTitle>
  <section class="p-6">
    <UIRoomForm @submit="handleCreate" />
  </section>
</template>

<script setup>
import UIRoomForm from './component/UIRoomForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Creating user:', formData)
  // Gọi API tạo user
}
</script>
