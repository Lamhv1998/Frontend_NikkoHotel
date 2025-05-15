<template>
  <Teleport v-if="isDefaultLayoutLoaded" to="#default-layout">
    <!-- Cố định dưới cùng màn hình -->
    <div class="sticky bottom-0 z-20 border-t border-system-gray-40 bg-white py-3 xl:hidden">
      <!-- Nội dung -->
      <div class="container flex items-center justify-between">
        <!-- Chưa chọn ngày -->
        <template v-if="!orderStore.isConfirmedDate">
          <!-- Giá mỗi đêm -->
          <p class="truncate text-body-2 text-system-gray-80">
            {{ `${useFormatCurrency(props.room.price)} / đêm` }}
          </p>

          <!-- Nút: Xem ngày có thể đặt -->
          <UIButton text="Xem ngày có thể đặt" @click="toggleModal('show')" />
        </template>

        <!-- Đã chọn ngày -->
        <template v-else>
          <div class="space-y-1">
            <!-- Giá, số đêm, số người -->
            <p class="truncate text-body-2 text-system-gray-80">
              {{
                `${useFormatCurrency(props.room.price)} / ${orderStore.totalNights} đêm / ${orderStore.order.peopleNum} người`
              }}
            </p>
            <p
              class="cursor-pointer truncate text-sub-title underline transition-opacity hover:opacity-85"
              @click="toggleModal('show')"
            >
              {{ orderStore.dateRange }}
            </p>
          </div>

          <!-- Liên kết: Đặt phòng ngay -->
          <NuxtLink
            :to="{
              name: 'reserve-id',
              params: { id: props.room._id }
            }"
            @click="saveRoomId"
          >
            <UIButton text="Đặt phòng ngay" />
          </NuxtLink>
        </template>
      </div>

      <!-- Modal -->
      <UIModal v-model="isModalShow" position="bottom">
        <div class="rounded-t-lg bg-white">
          <!-- Modal: Tiêu đề -->
          <div class="border-b border-system-gray-40 bg-system-gray-40">
            <div class="container flex items-center justify-between py-4">
              <!-- Thông báo -->
              <h2 v-if="!orderStore.isConfirmedDate" class="text-h5">Chọn ngày nhận phòng</h2>

              <!-- Số đêm, khoảng ngày -->
              <template v-else>
                <div class="flex items-center gap-4">
                  <p class="text-h5">
                    {{ `${orderStore.totalNights} đêm` }}
                  </p>
                  <p class="text-body text-system-gray-80">
                    {{ orderStore.dateRange }}
                  </p>
                </div>
              </template>

              <!-- Nút đóng modal -->
              <button
                class="flex h-6 w-6 items-center justify-center text-icon-24 transition-colors hover:text-system-primary-100"
                type="button"
                @click="toggleModal('close')"
              >
                <Icon name="ic:baseline-close" />
              </button>
            </div>
          </div>

          <!-- Bước 0: Chọn ngày -->
          <template v-if="progress === 0">
            <div class="border-t border-system-gray-40 py-6">
              <div class="container">
                <VDatePicker
                  ref="datePicker"
                  v-model.range.string="checkInOutDate"
                  :masks="{
                    modelValue: 'YYYY/M/DD'
                  }"
                  :min-date="$dayjs().format('YYYY/M/DD')"
                  :rows="2"
                  borderless
                  color="black"
                  expanded
                  mode="date"
                  title-position="left"
                />
              </div>
            </div>

            <!-- Nút: Xóa ngày, Xác nhận ngày -->
            <div class="border-t border-system-gray-40 py-3">
              <div class="container grid grid-cols-2 gap-4">
                <UIButton block text="Xóa ngày" variant="ghost-light" @click="reset" />
                <UIButton
                  block
                  text="Xác nhận ngày"
                  :disabled="!orderStore.isConfirmedDate"
                  @click="toggleProgress(1)"
                />
              </div>
            </div>
          </template>

          <!-- Bước 1: Chọn số người -->
          <template v-if="progress === 1">
            <div class="border-t border-system-gray-40 py-6">
              <div class="container space-y-4">
                <!-- Mô tả -->
                <div class="space-y-1">
                  <p class="text-title">Chọn số người</p>
                  <p class="text-body-2">Phòng này tối đa 4 người, không nhận thú cưng.</p>
                </div>

                <!-- Chọn số người -->
                <UIGuestCount v-model="orderStore.order.peopleNum" :max="props.room.maxPeople" />
              </div>
            </div>

            <!-- Nút: Quay lại chọn ngày, Lưu -->
            <div class="border-t border-system-gray-40 py-3">
              <div class="container grid grid-cols-2 gap-4">
                <UIButton
                  block
                  text="Chọn lại ngày"
                  variant="ghost-light"
                  @click="toggleProgress(0)"
                />
                <UIButton
                  block
                  text="Lưu"
                  :disabled="!orderStore.isConfirmedDate"
                  @click="toggleModal('close')"
                />
              </div>
            </div>
          </template>
        </div>
      </UIModal>
    </div>
  </Teleport>
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

/* 確認 #default-layout 已渲染 */
const isDefaultLayoutLoaded = ref(false)
onMounted(() => {
  watchEffect(() => {
    const layoutElement = document.getElementById('default-layout')
    if (layoutElement) {
      isDefaultLayoutLoaded.value = true
    }
  })
})

/* 控制彈窗顯示 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  toggleProgress(0)
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}
// 進度狀態
const progress = ref(0)
const toggleProgress = (val: number) => {
  progress.value = val
}

/* 日期選擇器 */
const checkInOutDate = computed({
  get() {
    return { start: orderStore.order.checkInDate, end: orderStore.order.checkOutDate }
  },
  set(value) {
    if (value) {
      orderStore.order.checkInDate = value.start
      orderStore.order.checkOutDate = value.end
    }
  }
})
// 重置日期
const reset = () => {
  orderStore.order.checkInDate = ''
  orderStore.order.checkOutDate = ''
}

/* 儲存客戶預訂房間 */
const saveRoomId = () => {
  orderStore.order.roomId = props.room._id
}
</script>
