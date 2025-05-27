<template>
  <CTitle class="m-5 p-3" title="Trang chỉnh sửa"></CTitle>
  <section class="p-6">
    <BookingForm :bookingData="booking" :isEdit="true" @submit="handleUpdate" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BookingForm from './component/BookingForm.vue'

definePageMeta({
  layout: 'adminlayout'
})

// Dữ liệu booking mẫu (giả lập)
const booking = ref({
  firstname: 'Nguyễn',
  lastname: 'Văn A',
  birthday: '1990-01-01',
  customer_phone: '0123456789',
  email: 'vana@example.com',
  role: 'user',
  address: '123 Đường ABC',
  city: 'Hà Nội',
  state: 'Hoàn Kiếm',
  zip: '10000',
  room_number: '101',
  floor: '1',
  roomType: 'standard',
  room_note: '',
  guest_count: 2,
  service: 'pickup',
  promotion: 'discount50',
  booking_note: '',
  price: 1000000
})

const handleUpdate = (formData) => {
  console.log('Updating booking:', formData)
  // Xử lý cập nhật booking ở đây
}
</script>
