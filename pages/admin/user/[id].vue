<template>
  <CTitle class="m-5 p-3" title="Trang chỉnh sửa"></CTitle>
  <section class="p-6">
    <userform :is-edit="true" :user-data="user" @submit="handleUpdate" />
  </section>
</template>

<script setup>
import userform from './component/UIUserForm.vue'
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
