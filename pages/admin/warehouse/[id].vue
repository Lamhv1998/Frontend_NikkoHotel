<template>
  <CTitle class="m-5 p-3" title="Trang chỉnh sửa"></CTitle>
  <section class="p-6">
    <UIWarehouseForm :isEdit="true" :warehouseData="warehouse" @submit="handleUpdate" />
  </section>
</template>

<script setup>
import UIWarehouseForm from './component/UIWarehouseForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
// onMounted(async () => {
//   const id = route.params.id
//   // Giả sử có API lấy warehouse theo id
//   // warehouse.value = await $fetch(`/api/warehouses/${id}`)
// })

const handleUpdate = (formData) => {
  console.log('Updating warehouse:', formData)
  // Gọi API cập nhật warehouse với các trường mới
}
</script>
