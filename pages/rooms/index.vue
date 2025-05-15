<template>
  <div>
    <!-- Toàn màn hình -->
    <CBanner rooms />

    <div v-if="rooms" class="section-container bg-system-primary-10">
      <!-- Khối chứa -->
      <div class="container space-y-10 xl:space-y-20">
        <!-- Tiêu đề lớn -->
        <div class="space-x-2 xl:space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">Chọn loại phòng</p>
          <p class="text-h3 text-system-primary-100 xl:text-h1">
            Nhiều loại phòng, thoải mái lựa chọn
          </p>
        </div>

        <!-- Danh sách phòng -->
        <ol class="space-y-6 xl:space-y-12">
          <li v-for="(room, index) in rooms" :key="index">
            <!-- Thẻ phòng -->
            <Card :room="room" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import Card from './components/card.vue'

/* layout */
definePageMeta({
  layout: 'landing'
})

/* api */
const { getRoomsApi } = useApi()

// api: Lấy tất cả các phòng
const { data: rooms }: { data: Ref<RoomResponse[] | null> } = await getRoomsApi({
  transform(res: any): RoomResponse[] {
    return res.result
  }
})
</script>
