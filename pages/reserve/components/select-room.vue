<template>
  <div>
    <!-- Nút: Chỉnh sửa phòng -->
    <UIButton text="Chỉnh sửa" variant="text-black" @click="toggleModal('show')" />

    <!-- Modal: Chỉnh sửa phòng -->
    <UIModal v-if="rooms" v-model="isModalShow">
      <!-- Modal: Tiêu đề -->
      <template #header>Chọn loại phòng</template>

      <template #form>
        <VForm ref="formRefs" @submit="submit">
          <div class="p-4">
            <UISelect v-model="room" label="name" value="_id" :options="rooms" :disabled="false" />
          </div>

          <div
            class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
          >
            <UIButton text="Hủy" variant="secondary" @click="toggleModal('close')" />
            <UIButton type="submit" text="Xác nhận" />
          </div>
        </VForm>
      </template>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'

/* props */
const props = defineProps({ roomId: { type: String, required: true } })

/* 彈窗開關 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    room.value = props.roomId
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

/* 房型 */
const room = ref(props.roomId)
// 房型: 送出
const submit = () => {
  if (room.value !== props.roomId) {
    navigateTo(`/reserve/${room.value}`)
  }
}

/* api */
const { getRoomsApi } = useApi()

// api: 取得所有房型
const { data: rooms }: { data: Ref<RoomResponse[] | null> } = await getRoomsApi({
  transform(res: any): RoomResponse[] {
    return res.result
  }
})
</script>
