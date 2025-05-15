<template>
  <div>
    <!-- Nút: Chỉnh sửa số lượng khách -->
    <UIButton text="Chỉnh sửa" variant="text-black" @click="toggleModal('show')" />

    <!-- Modal: Chỉnh sửa số lượng khách -->
    <UIModal v-model="isModalShow">
      <!-- Modal: Tiêu đề -->
      <template #header>Chọn số lượng khách</template>

      <template #form>
        <VForm ref="formRefs">
          <div class="flex items-center justify-between p-4">
            Số lượng khách
            <ClientOnly>
              <UIGuestCount v-model="orderStore.order.peopleNum" :max="props.room.maxPeople" />
            </ClientOnly>
          </div>
        </VForm>
      </template>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
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

/* 彈窗開關 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}
</script>
