<template>
  <div v-if="room" class="bg-system-primary-10">
    <!-- Phòng xem trước -->
    <Hero :name="room.name" :images="room.imageUrlList" />

    <div class="section-container col-md-container container">
      <!-- Thông tin phòng -->
      <div class="space-y-6 xl:col-span-7 xl:space-y-20">
        <!-- Tên phòng và mô tả -->
        <div class="space-y-4">
          <h1 class="text-h3 xl:text-h1">{{ room.name }}</h1>
          <p class="text-body-2 xl:text-body">{{ room.description }}</p>
        </div>

        <!-- Thông tin cơ bản phòng -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="Thông tin cơ bản phòng" />
          <CRoomInfo
            :area-info="room.areaInfo"
            :bed-info="room.bedInfo"
            :max-people="room.maxPeople"
          />
        </section>

        <!-- Bố trí phòng -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="Bố trí phòng" />
          <CRoomDetail :details="room.layoutInfo" />
        </section>

        <!-- Tiện nghi trong phòng -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="Tiện nghi trong phòng" />
          <CRoomDetail :details="room.facilityInfo" />
        </section>

        <!-- Đồ dùng cung cấp -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="Đồ dùng cung cấp" />
          <CRoomDetail :details="room.amenityInfo" />
        </section>

        <!-- Lưu ý khi đặt phòng -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="Lưu ý khi đặt phòng" />
          <Terms />
        </section>
      </div>

      <!-- Desktop: Tùy chọn đặt phòng -->
      <div class="hidden xl:col-span-5 xl:block">
        <Booking class="sticky top-[10rem] z-20" :room="room" />
      </div>

      <!-- Mobile: Tùy chọn đặt phòng -->
      <MBooking :room="room" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import Hero from './components/hero.vue'
import Terms from './components/terms.vue'
import Booking from './components/booking.vue'
import MBooking from './components/m-booking.vue'

/* 全局屬性 */
const route = useRoute()

/* api */
const { getRoomApi } = useApi()

// api: 取得房型
const { data: room }: { data: Ref<RoomResponse | null> } = await getRoomApi(
  route.params.id as string,
  {
    transform(res: any): RoomResponse {
      return res.result
    }
  }
)
</script>
