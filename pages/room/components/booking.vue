<template>
  <div class="card">
    <!-- Tiêu đề -->
    <h2 class="border-b border-system-gray-40 pb-4 text-h5">Đặt phòng</h2>

    <!-- Tên phòng và mô tả -->
    <div class="space-y-4">
      <h3 class="text-h2">{{ room.name }}</h3>
      <p class="text-body">{{ room.description }}</p>
    </div>

    <div class="space-y-4">
      <!-- Chọn ngày -->
      <ClientOnly> </ClientOnly>
      <Datepicker />
      <!-- Chọn số người -->
      <div class="flex items-center justify-between">
        Số người
        <ClientOnly>
          <UIGuestCount v-model="orderStore.order.peopleNum" :max="room.maxPeople" />
        </ClientOnly>
      </div>
    </div>

    <!-- Giá -->
    <p class="text-h5 text-system-primary-100">
      {{ useFormatCurrency(room.price) }}
    </p>

    <!-- Liên kết: Đặt phòng -->
    <NuxtLink
      class="block"
      :to="{
        name: 'reserve-id',
        params: { id: room._id }
      }"
    >
      <!-- <ClientOnly>
        <UIButton
          :text="orderStore.isConfirmedDate ? 'Đặt phòng ngay' : 'Chọn ngày'"
          block
          :disabled="!orderStore.isConfirmedDate"
        />

        <template #fallback>
          <UIButton block text="Chọn ngày" disabled />
        </template>
      </ClientOnly> -->
      <ClientOnly>
        <UIButton :text="orderStore.isConfirmedDate ? 'Đặt phòng ngay' : 'Chọn ngày'" block />

        <template #fallback>
          <UIButton block text="Chọn ngày" disabled />
        </template>
      </ClientOnly>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
// import Id from '../[id].vue'

import Datepicker from './datepicker.vue'
// import type { RoomResponse } from '@/types'

const orderStore = useOrderStore()
const room = {
  _id: '1',
  name: 'Phòng Deluxe',
  description: 'Phòng Deluxe với đầy đủ tiện nghi.',
  price: 1000000,
  areaInfo: '30 m²',
  bedInfo: '1 giường đôi',
  maxPeople: 2,
  layoutInfo: [{ name: 'Giường đôi' }, { name: 'Bàn làm việc' }, { name: 'Tủ lạnh' }],
  facilityInfo: [{ name: 'Điều hòa' }, { name: 'Tivi' }, { name: 'Wifi miễn phí' }],
  amenityInfo: [{ name: 'Khăn tắm' }, { name: 'Dầu gội' }, { name: 'Xà phòng' }],
  imageUrlList: [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3'
  ]
}
/* props */
// const props = defineProps({
//   room: {
//     type: Object as PropType<RoomResponse>,
//     required: true
//   }
// })

// const saveRoomId = () => {
//   orderStore.order.roomId = props.room._id
// }
</script>
