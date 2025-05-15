<template>
  <div class="col-sm-container">
    <section class="xl:col-span-7">
      <CRecentOrder v-if="recentOrder" :order="recentOrder">
        <div class="grid grid-cols-2 gap-4">
          <UIButton block text="Hủy đặt phòng" variant="secondary" @click="deleteOrder" />
          <NuxtLink :to="`/order/${recentOrder._id}`">
            <UIButton block text="Xem chi tiết" />
          </NuxtLink>
        </div>
      </CRecentOrder>
      <div v-else class="card">
        <div class="flex items-center justify-between">
          <div class="space-y-5">
            <p class="text-title text-black xl:text-h5">Chuyến đi sắp tới</p>
            <p>Hiện chưa có chuyến đi nào</p>
          </div>
          <NuxtLink to="/rooms">
            <UIButton icon="mdi:arrow-right" text="Đặt phòng ngay" variant="secondary" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="xl:col-span-5">
      <div class="card">
        <p class="text-title xl:text-h5">Lịch sử đặt phòng</p>

        <template v-for="(order, index) in historyOrder" :key="index">
          <div class="flex flex-col gap-6 xl:flex-row xl:gap-10">
            <NuxtImg
              class="h-[5rem] w-[7.5rem] rounded-lg object-cover"
              :src="order.roomId.imageUrl"
            />

            <div class="space-y-4 text-system-gray-80">
              <p class="text-body-2 xl:text-body">
                {{ `Mã đơn đặt phòng: ${order._id}` }}
              </p>

              <p class="text-sub-title xl:text-h6">{{ order.roomId.name }}</p>

              <div class="space-y-2">
                <p class="text-body-2 xl:text-body">
                  {{
                    `Số đêm lưu trú: ${$dayjs(order.checkOutDate).diff($dayjs(order.checkInDate), 'day')} đêm`
                  }}
                </p>
                <p class="text-body-2 xl:text-body">
                  {{ `Số người: ${order.peopleNum} người` }}
                </p>
              </div>

              <div class="space-y-2">
                <CTitle
                  :title="`Nhận phòng: ${$dayjs(order.checkInDate).format('D/M dddd')}`"
                  size="sm"
                />
                <CTitle
                  :title="`Trả phòng: ${$dayjs(order.checkOutDate).format('D/M dddd')}`"
                  gray
                  size="sm"
                />
              </div>

              <p class="text-sub-title xl:text-title">
                {{
                  useFormatCurrency(
                    order.roomId.price * $dayjs(order.checkOutDate).diff(order.checkInDate, 'day')
                  )
                }}
              </p>
            </div>
          </div>

          <UILine v-if="index + 1 !== historyOrder.length" color="lightGrey" />
        </template>

        <UIButton
          v-if="!more && orderList && orderList.length > 3"
          block
          icon="ic:baseline-keyboard-arrow-down"
          text="Xem thêm"
          variant="secondary"
          @click="more = true"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { OrderResponse } from '@/types'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* 全局屬性 */
const { $dayjs, $Swal } = useNuxtApp()
const styleStore = useStyleStore()

/* 即將來的訂單 */
const recentOrder = computed(() => {
  const list = orderList.value

  // 檢查 list 是否為空或 null
  if (list === null || (Array.isArray(list) && list.length === 0)) return null

  // 尋找最接近今天且尚未過期的訂單
  const closestOrder = list.find((order: OrderResponse) => {
    return (
      $dayjs(order.checkInDate).isAfter($dayjs()) ||
      $dayjs(order.checkInDate).isSame($dayjs(), 'day')
    )
  })

  // 如果都過期，回傳 null，否則回傳 closestOrder
  return closestOrder || null
})

/* 歷史訂單 */
const more = ref(false)
const historyOrder = computed(() => {
  const list = orderList.value
  if (list === null || (Array.isArray(list) && list.length === 0)) return []
  if (more.value) return list
  return list.slice(0, 3)
})

/* api */
const { getOrdersApi, deleteOrderApi } = useApi()

// api: 取得所有訂單
const { data: orderList, refresh: getOrders } = await getOrdersApi({
  server: false,
  transform(res: any): OrderResponse[] {
    return res.result
      .filter((order: OrderResponse) => order.status === 0)
      .sort((a: OrderResponse, b: OrderResponse) => {
        return $dayjs(a.checkInDate).isAfter($dayjs(b.checkInDate)) ? -1 : 1
      })
  }
})

// api: 取消訂單
const deleteOrder = () => {
  const id = recentOrder.value ? recentOrder.value._id : ''
  deleteOrderApi(id, {
    onResponse({ response }) {
      if (response.status === 200) {
        $Swal?.fire({
          title: '行程取消成功',
          icon: 'success',
          confirmButtonText: '確認',
          confirmButtonColor: styleStore.confirmButtonColor,
          willClose: () => {
            getOrders()
          }
        })
      }
    }
  })
}
</script>
