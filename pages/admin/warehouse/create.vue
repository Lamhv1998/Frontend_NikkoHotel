<template>
  <CTitle class="m-5 p-3" title="Trang đăng kí"></CTitle>
  <section class="p-6">
    <UIWarehouseForm @submit="handleCreate" />
  </section>
</template>

<script setup>
import UIWarehouseForm from './component/UIWarehouseForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
const handleCreate = (formData) => {
  console.log('Creating warehouse:', formData)
  // Gọi API tạo warehouse với các trường mới
}
</script>
