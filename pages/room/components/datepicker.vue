<template>
  <div class="grid grid-cols-2 gap-2">
    <!-- Nút: Mở chọn ngày -->
    <UIDataButton
      title="Nhận phòng"
      :date="orderStore.order.checkInDate"
      @click="toggleModal('show')"
    />
    <UIDataButton
      title="Trả phòng"
      :date="orderStore.order.checkOutDate"
      @click="toggleModal('show')"
    />

    <!-- Modal: Chọn ngày -->
    <UIModal v-model="isModalShow" size="auto">
      <div class="space-y-10 p-[2rem]">
        <div class="flex items-center gap-20">
          <div class="space-y-2">
            <!-- Thông báo -->
            <p v-if="!orderStore.isConfirmedDate" class="text-h5">Chọn ngày nhận phòng</p>

            <!-- Số đêm/Chọn khoảng ngày -->
            <template v-else>
              <p class="text-h5">
                {{ `${orderStore.totalNights} đêm` }}
              </p>
              <p class="text-body">
                {{ orderStore.dateRange }}
              </p>
            </template>
          </div>

          <!-- Nút: Đến ngày đã chọn -->
          <div class="grid flex-1 grid-cols-2 gap-2">
            <UIDataButton
              title="Nhận phòng"
              :date="orderStore.order.checkInDate"
              :disabled="!orderStore.isConfirmedDate"
              @click="datePickerMove(orderStore.order.checkInDate)"
            />

            <UIDataButton
              title="Trả phòng"
              :date="orderStore.order.checkOutDate"
              :disabled="!orderStore.isConfirmedDate"
              @click="datePickerMove(orderStore.order.checkOutDate)"
            />
          </div>
        </div>

        <!-- Bộ chọn khoảng ngày -->
        <VDatePicker
          ref="datePicker"
          v-model.range.string="checkInOutDate"
          class="ui-datepicker"
          :columns="2"
          :masks="{
            modelValue: 'YYYY/M/DD'
          }"
          :min-date="$dayjs().format('YYYY/M/DD')"
          borderless
          color="black"
          mode="date"
        />

        <!-- Nút: Xóa ngày, Xác nhận ngày -->
        <div class="flex justify-end">
          <UIButton text="Xóa ngày" variant="ghost-light" @click="reset" />
          <UIButton text="Xác nhận ngày" @click="toggleModal('close')" />
        </div>
      </div>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type { DatePicker } from 'v-calendar'

/* Thuộc tính toàn cục */
const orderStore = useOrderStore()

/* Hiển thị modal */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

/* Bộ chọn khoảng ngày */
const datePicker = ref<typeof DatePicker | null>(null)

// Khoảng ngày nhận/trả phòng
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

// Đặt lại ngày
const reset = () => {
  orderStore.order.checkInDate = ''
  orderStore.order.checkOutDate = ''
}

// Di chuyển đến ngày chỉ định
const datePickerMove = (val: string) => {
  val && datePicker.value?.move(val)
}
</script>
