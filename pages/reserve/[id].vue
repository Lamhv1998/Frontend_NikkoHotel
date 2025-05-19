<template>
  <div v-if="room" class="bg-system-primary-10">
    <VForm
      v-slot="{ errors }"
      class="section-container space-y-10"
      :validation-schema="schema"
      @invalid-submit="invalidSubmit"
      @submit="addOrderRefresh"
    >
      <!-- Liên kết: Chi tiết phòng -->
      <div class="container">
        <NuxtLink
          class="inline-flex items-center gap-2 text-h5 transition-colors hover:text-system-primary-120 xl:text-h3"
          :to="{
            name: 'room-id',
            params: { id: room._id }
          }"
        >
          <Icon class="text-icon-24 xl:text-icon-40" name="ic:baseline-keyboard-arrow-left" />
          Xác nhận thông tin đặt phòng
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
                      {{ room.name }}
                    </p>
                  </div>
                  <SelectRoom :room-id="id ? (id as string) : ''" />
                </div>

                <!-- Ngày đặt phòng -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Ngày đặt phòng" size="md" />
                    <div
                      v-if="orderStore.order.checkInDate && orderStore.order.checkOutDate"
                      class="space-y-3"
                    >
                      <p class="text-body">
                        {{
                          `Nhận phòng: ${$dayjs(orderStore.order.checkInDate).format('D/M dddd')}`
                        }}
                      </p>
                      <p class="text-body">
                        {{
                          `Trả phòng: ${$dayjs(orderStore.order.checkOutDate).format('D/M dddd')}`
                        }}
                      </p>
                    </div>
                  </div>
                  <Datepicker />
                </div>

                <!-- Số lượng khách -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="Số lượng khách" size="md" />
                    <p class="text-body">
                      {{ `${orderStore.order.peopleNum} người` }}
                    </p>
                  </div>
                  <SelectPeople :room="room" />
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
                <UIButton
                  text="Áp dụng thông tin thành viên"
                  variant="text"
                  @click="getUserRefresh"
                />
              </div>

              <div class="space-y-6">
                <!-- Họ tên -->
                <UIInput
                  v-model="orderStore.order.userInfo.name"
                  name="name"
                  label="Họ tên"
                  placeholder="Vui lòng nhập họ tên"
                  :error="errors.name"
                  blackhead
                  :disabled="apiPending"
                />

                <!-- Số điện thoại -->
                <UIInput
                  v-model="orderStore.order.userInfo.phone"
                  name="phone"
                  label="Số điện thoại"
                  placeholder="Vui lòng nhập số điện thoại"
                  :error="errors.phone"
                  blackhead
                  :disabled="apiPending"
                />

                <!-- Email -->
                <UIInput
                  v-model="orderStore.order.userInfo.email"
                  name="email"
                  label="Email"
                  placeholder="Vui lòng nhập email"
                  :error="errors.email"
                  blackhead
                  :disabled="apiPending"
                />

                <!-- Địa chỉ -->
                <!-- <CAddress
                  v-model="orderStore.order.userInfo.address"
                  :detail-error="errors.detail"
                  :zipcode-error="errors.zipcode"
                  blackhead
                  :disabled="apiPending"
                /> -->
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
                  :area-info="room.areaInfo"
                  :bed-info="room.bedInfo"
                  :max-people="room.maxPeople"
                />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Bố trí phòng" />
                <CRoomDetail :details="room.layoutInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Tiện nghi trong phòng" />
                <CRoomDetail :details="room.facilityInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="Đồ dùng cung cấp" />
                <CRoomDetail :details="room.amenityInfo" />
              </li>
            </ul>
          </section>
        </div>

        <!-- Khối chi tiết giá -->
        <div class="xl:col-span-5">
          <div class="card xl:sticky xl:top-[10rem] xl:z-20">
            <div class="h-[17rem] overflow-hidden rounded-lg">
              <NuxtImg class="h-full w-full object-cover" :src="room.imageUrl" />
            </div>

            <ClientOnly>
              <div class="space-y-6">
                <div class="text-h4">Chi tiết giá</div>

                <div class="flex justify-between text-body">
                  <p>
                    {{ `${useFormatCurrency(room.price)} × ${orderStore.totalNights} đêm` }}
                  </p>
                  <p>
                    {{ useFormatCurrency(room.price * orderStore.totalNights) }}
                  </p>
                </div>

                <UILine color="lightGrey" />

                <div class="flex justify-between text-title">
                  <p>Tổng cộng</p>
                  <p>{{ useFormatCurrency(room.price * orderStore.totalNights) }}</p>
                </div>
              </div>
            </ClientOnly>

            <UIButton
              type="submit"
              block
              text="Xác nhận đặt phòng"
              :disabled="apiPending"
              :loading="apiPending"
            />
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
// import type { RoomResponse } from '@/types'
import SelectRoom from './components/select-room.vue'
import Datepicker from './components/datepicker.vue'
import SelectPeople from './components/select-people.vue'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* Thuộc tính toàn cục */
const route = useRoute()
const { $dayjs } = useNuxtApp()
const orderStore = useOrderStore()

/* ID phòng */
const {
  params: { id }
} = route

/* Đơn đặt phòng */
// Quy tắc thông tin người đặt phòng
const schema = {
  name: 'required|min:2',
  phone: (val: string) => {
    if (!val) return 'Số điện thoại là bắt buộc'
    if (!/^09\d{8}$/.test(val)) return 'Vui lòng nhập số điện thoại hợp lệ gồm 10 số'
    return {}
  },
  email: 'required|email'
  // ,
  // zipcode: (val: number) => {
  //   if (val === 0) return 'Tỉnh/Thành phố là bắt buộc'
  //   return {}
  // },
  // detail: 'required'
}

// Đơn đặt phòng: Xử lý khi submit không hợp lệ
// const invalidSubmit = (event: any) => {
//   const errorElement = document.getElementById(Object.keys(event.errors)[0])
//   errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
//   errorElement?.focus()
// }

/* api */
// const { getRoomApi, getUserApi, addOrderApi } = useApi()
// const apiPending = computed(() => grPending.value || guPending.value || aoPending.value)

// api: Lấy thông tin phòng
// const {
//   data: room,
//   pending: grPending
// }: { data: Ref<RoomResponse | null>; pending: Ref<boolean> } = await getRoomApi(id as string, {
//   transform(res: any): RoomResponse {
//     return res.result
//   }
// })
const room = {
  _id: '1',
  name: 'Phòng Deluxe',
  description: 'Phòng Deluxe với đầy đủ tiện nghi.',
  areaInfo: '30 m²',
  bedInfo: '1 giường đôi',
  maxPeople: 2,
  layoutInfo: [{ name: 'Giường đôi' }, { name: 'Bàn làm việc' }, { name: 'Tủ lạnh' }],
  facilityInfo: [{ name: 'Điều hòa' }, { name: 'Tivi' }, { name: 'Wifi miễn phí' }],
  amenityInfo: [{ name: 'Khăn tắm' }, { name: 'Dầu gội' }, { name: 'Xà phòng' }],
  imageUrl: 'https://picsum.photos/400/300?random=1',
  price: 1000000
}
// api: Áp dụng thông tin thành viên
// const { refresh: getUserRefresh, pending: guPending } = await getUserApi({
//   immediate: false,
//   onResponse({ response }) {
//     if (response.status === 200) {
//       const { name, phone, email, address } = response._data.result
//       orderStore.order.userInfo = { ...orderStore.order.userInfo, name, phone, email, address }
//     }
//   }
// })
// guPending.value = false

// api: Thêm đơn đặt phòng
// const { pending: aoPending, refresh: addOrderRefresh } = await addOrderApi({
//   body: orderStore.order,
//   immediate: false,
//   watch: false,
//   async onResponse({ response }) {
//     if (response.status === 200) {
//       await navigateTo(`/confirmation/${response._data.result._id}`)
//     }
//   }
// })
// aoPending.value = false
</script>
