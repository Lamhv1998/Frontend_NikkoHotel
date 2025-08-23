<template>
  <div>
    <div v-if="result">
      <!-- Khối chứa -->
      <div class="section-container col-md-container container">
        <!-- Khối thông tin đơn hàng -->
        <div class="space-y-10 text-white xl:col-span-7 xl:space-y-20">
          <!-- Khối đặt phòng thành công -->
          <div class="space-y-8 xl:space-y-10">
            <!-- Thông báo thành công -->
            <div class="flex flex-wrap items-center gap-4 xl:gap-10">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-system-success-100"
              >
                <Icon class="text-icon-40" name="ic:baseline-check" />
              </div>
              <h1 class="flex flex-col gap-2 text-h3 xl:text-h1">
                <span>{{ `Chúc mừng, ${authStore.userName}!` }}</span>
                <span>Bạn đã đặt phòng thành công</span>
              </h1>
            </div>

            <!-- Thông báo hướng dẫn -->
            <p class="text-body text-system-gray-40">
              Chúng tôi đã gửi thông tin đặt phòng và chi tiết đến email của bạn, khi nhận phòng vui
              lòng xuất trình giấy tờ tùy thân tại quầy lễ tân.
            </p>
          </div>

          <!-- Đường kẻ phân cách -->
          <UILine color="lightGrey" />

          <!-- Khối dẫn hướng -->
          <div class="space-y-6 xl:space-y-10">
            <p class="text-title xl:text-h5">Xem lịch sử đơn đặt phòng của bạn ngay</p>
            <NuxtLink class="block xl:inline-block" to="/user/bookings">
              <UIButton block text="Đến đơn đặt phòng của tôi" />
            </NuxtLink>
          </div>

          <!-- Đường kẻ phân cách -->
          <UILine color="lightGrey" />

          <!-- Khối thông tin người đặt phòng -->
          <div class="space-y-8 xl:space-y-10">
            <h2 class="text-h5">Thông tin người đặt phòng</h2>
            <ul class="space-y-6">
              <!-- Họ tên -->
              <li class="space-y-2">
                <p class="text-body text-system-gray-40">Họ tên</p>
                <p class="text-title">{{ result.userInfo.name }}</p>
              </li>

              <!-- Số điện thoại -->
              <li class="space-y-2">
                <p class="text-body text-system-gray-40">Số điện thoại</p>
                <p class="text-title">{{ result.userInfo.phone }}</p>
              </li>

              <!-- Email -->
              <li class="space-y-2">
                <p class="text-body text-system-gray-40">Email</p>
                <p class="text-title">{{ result.userInfo.email }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- Khối thông tin phòng -->
        <CRecentOrder class="xl:col-span-5" :order="result" />
      </div>

      <!-- Trang trí sóng -->
      <CWave />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrderResponse } from '@/types'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* Thuộc tính toàn cục */
const route = useRoute()
const authStore = useAuthStore()

/* ID phòng */
const {
  params: { id }
} = route

/* api */
const { getOrderApi } = useApi()

// api: Lấy thông tin đơn đặt phòng
const {
  data: result,
  refresh
}: {
  data: Ref<OrderResponse | null>
  refresh: (opts?: { dedupe?: 'cancel' | 'defer' }) => Promise<void>
} = await getOrderApi(id as string, {
  immediate: false,
  transform(res: any): OrderResponse {
    return res.result
  }
})

onMounted(() => {
  refresh()
})
</script>
