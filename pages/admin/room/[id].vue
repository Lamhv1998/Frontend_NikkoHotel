<template>
  <CTitle class="m-5 p-3" title="Trang chỉnh sửa"></CTitle>
  <section class="p-6">
    <UIRoomForm :isEdit="true" :userData="user" @submit="handleUpdate" />
  </section>
</template>

<script setup>
import UIRoomForm from './component/UIRoomForm.vue'
definePageMeta({
  layout: 'adminlayout'
})
// onMounted(async () => {
//   const id = route.params.id
//   // Giả sử có API lấy user theo id
//   // user.value = await $fetch(`/api/users/${id}`)
// })

const handleUpdate = (formData) => {
  console.log('Updating user:', formData)
  // Gọi API cập nhật user
}
</script>
