<template>
  <div class="card">
    <!-- Tiêu đề -->
    <h2 class="border-b border-system-gray-40 pb-4 text-h5">Đặt phòng</h2>

    <!-- Tên phòng và mô tả -->
    <div class="space-y-4">
      <h3 class="text-h2">{{ props.room.name }}</h3>
      <p class="text-body">{{ props.room.description }}</p>
    </div>

    <div class="space-y-4">
      <!-- Chọn ngày -->
      <ClientOnly>
        <Datepicker />
      </ClientOnly>

      <!-- Chọn số người -->
      <div class="flex items-center justify-between">
        Số người
        <ClientOnly>
          <UIGuestCount v-model="orderStore.order.peopleNum" :max="props.room.maxPeople" />
        </ClientOnly>
      </div>
    </div>

    <!-- Giá -->
    <p class="text-h5 text-system-primary-100">
      {{ useFormatCurrency(props.room.price) }}
    </p>

    <!-- Liên kết: Đặt phòng -->
    <NuxtLink
      class="block"
      :to="{
        name: 'reserve-id',
        params: { id: props.room._id }
      }"
      @click="saveRoomId"
    >
      <ClientOnly>
        <UIButton
          :text="orderStore.isConfirmedDate ? 'Đặt phòng ngay' : 'Chọn ngày'"
          block
          :disabled="!orderStore.isConfirmedDate"
        />

        <template #fallback>
          <UIButton block text="Chọn ngày" disabled />
        </template>
      </ClientOnly>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import Datepicker from './datepicker.vue'
import type { RoomResponse } from '@/types'

/* 全局屬性 */
const orderStore = useOrderStore()

/* props */
const props = defineProps({
  room: {
    type: Object as PropType<RoomResponse>,
    required: true
  }
})

/* 儲存客戶預訂房間 */
const saveRoomId = () => {
  orderStore.order.roomId = props.room._id
}
</script>
