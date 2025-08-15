<template>
  <div class="bg-system-primary-10">
    <div v-if="room" class="section-container space-y-10">
      <!-- Liên kết: Chi tiết đơn hàng -->
      <div class="container">
        <NuxtLink
          class="inline-flex items-center gap-2 text-h5 transition-colors hover:text-system-primary-120 xl:text-h3"
          to="/user/orders"
        >
          <Icon class="text-icon-24 xl:text-icon-40" name="ic:baseline-keyboard-arrow-left" />
          Chi tiết đơn hàng
        </NuxtLink>
      </div>

      <!-- Khối chứa -->
      <div class="col-md-container container">
        <!-- Khối thông tin đặt phòng -->
        <div class="space-y-10 xl:col-span-7">
          <!-- Khối thông tin đặt phòng -->
          <ClientOnly>
            <section class="space-y-8 xl:space-y-10">
              <h3 class="text-h6 xl:text-h4">Thông tin đặt phòng</h3>

              <!-- Chọn loại phòng -->
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Chọn loại phòng" size="md" />
                    <p class="text-body">
                      {{ room.roomId.name }}
                    </p>
                  </div>
                </div>

                <!-- Ngày đặt phòng -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Ngày đặt phòng" size="md" />
                    <div v-if="room.checkInDate && room.checkOutDate" class="space-y-3">
                      <p class="text-body">
                        {{ `Nhận phòng: ${$dayjs(room.checkInDate).format('D/M dddd')}` }}
                      </p>
                      <p class="text-body">
                        {{ `Trả phòng: ${$dayjs(room.checkOutDate).format('D/M dddd')}` }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Số lượng khách -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Số lượng khách" size="md" />
                    <p class="text-body">
                      {{ `${room.peopleNum} người` }}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </ClientOnly>

          <!-- Đường kẻ phân cách -->
          <UILine color="darkGray" />

          <!-- Khối thông tin người đặt phòng -->
          <ClientOnly>
            <section class="space-y-8 xl:space-y-10">
              <div class="flex items-center justify-between">
                <h3 class="text-h6 xl:text-h4">Thông tin người đặt phòng</h3>
              </div>

              <div class="space-y-6">
                <!-- Họ tên -->
                <UIInput
                  v-model="room.userInfo.name"
                  name="name"
                  label="Họ tên"
                  placeholder="Vui lòng nhập họ tên"
                  blackhead
                  disabled
                />

                <!-- Số điện thoại -->
                <UIInput
                  v-model="room.userInfo.phone"
                  name="phone"
                  label="Số điện thoại"
                  placeholder="Vui lòng nhập số điện thoại"
                  blackhead
                  disabled
                />

                <!-- Email -->
                <UIInput
                  v-model="room.userInfo.email"
                  name="email"
                  label="Email"
                  placeholder="Vui lòng nhập email"
                  blackhead
                  disabled
                />

                <!-- Địa chỉ -->
                <!-- <CAddress v-model="room.userInfo.address" blackhead disabled /> -->
              </div>
            </section>
          </ClientOnly>

          <!-- Đường kẻ phân cách -->
          <UILine color="darkGray" />

          <!-- Khối thông tin phòng -->
          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h4">Thông tin phòng</h3>

            <ul class="space-y-6">
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Thông tin cơ bản phòng" />
                <CRoomInfo
                  :area-info="room.roomId.areaInfo"
                  :bed-info="room.roomId.bedInfo"
                  :max-people="room.roomId.maxPeople"
                />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Bố trí phòng" />
                <CRoomDetail :details="room.roomId.layoutInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Tiện nghi trong phòng" />
                <CRoomDetail :details="room.roomId.facilityInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Đồ dùng cung cấp" />
                <CRoomDetail :details="room.roomId.amenityInfo" />
              </li>
            </ul>
          </section>
        </div>

        <!-- Khối chi tiết giá -->
        <div class="xl:col-span-5">
          <div class="card xl:sticky xl:top-[10rem] xl:z-20">
            <div class="h-[17rem] overflow-hidden rounded-lg">
              <NuxtImg class="h-full w-full object-cover" :src="room.roomId.imageUrl" />
            </div>

            <ClientOnly>
              <div class="space-y-6">
                <div class="text-h4">Chi tiết giá</div>

                <div class="flex justify-between text-body">
                  <p>
                    {{
                      `${useFormatCurrency(room.roomId.price)} × ${$dayjs(room.checkOutDate).diff($dayjs(room.checkInDate), 'day')} đêm`
                    }}
                  </p>
                  <p>
                    {{
                      useFormatCurrency(
                        room.roomId.price *
                          $dayjs(room.checkOutDate).diff($dayjs(room.checkInDate), 'day')
                      )
                    }}
                  </p>
                </div>

                <UILine color="lightGrey" />

                <div class="flex justify-between text-title">
                  <p>Tổng cộng</p>
                  <p>
                    {{
                      useFormatCurrency(
                        room.roomId.price *
                          $dayjs(room.checkOutDate).diff($dayjs(room.checkInDate), 'day')
                      )
                    }}
                  </p>
                </div>
              </div>
            </ClientOnly>

            <NuxtLink class="block" to="/user/orders">
              <UIButton type="submit" block text="Quay lại đơn đặt phòng" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrderResponse } from '@/types'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* Toàn cục thuộc tính */
const route = useRoute()
const { $dayjs } = useNuxtApp()

/* ID loại phòng */
const {
  params: { id }
} = route

/* API */
const { getOrderApi } = useApi()

// Fetch order details
const { data: orderData } = await useFetch(`/api/orders/${id}`)
if (orderData.value) {
  order.value = orderData.value
}
</script>
