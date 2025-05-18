<template>
  <div class="py-6">
    <!-- Tiêu đề -->
    <h1 class="mb-6 text-3xl font-bold text-system-gray-80">Dashboard</h1>

    <!-- Thẻ thống kê -->
    <div class="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="rounded-lg bg-system-gray-10 p-6 shadow-md">
        <h3 class="text-lg font-semibold text-system-gray-80">Tổng người dùng</h3>
        <p class="mt-2 text-2xl font-bold text-system-primary-100">{{ stats.totalUsers }}</p>
        <p class="mt-1 text-sm text-system-gray-60">+{{ stats.userGrowth }}% so với tháng trước</p>
      </div>
      <div class="=-4 rounded-lg bg-system-gray-10 p-6 shadow-md">
        <h3 class="text-lg font-semibold text-system-gray-80">Tổng bài viết</h3>
        <p class="mt-2 text-2xl font-bold text-system-primary-100">{{ stats.totalPosts }}</p>
        <p class="mt-1 text-sm text-system-gray-60">+{{ stats.postGrowth }}% so với tháng trước</p>
      </div>
      <div class="rounded-lg bg-system-gray-10 p-6 shadow-md">
        <h3 class="text-lg font-semibold text-system-gray-80">Doanh thu</h3>
        <p class="mt-2 text-2xl font-bold text-system-primary-100">{{ stats.revenue }} VNĐ</p>
        <p class="mt-1 text-sm text-system-gray-60">
          +{{ stats.revenueGrowth }}% so với tháng trước
        </p>
      </div>
      <div class="rounded-lg bg-system-gray-10 p-6 shadow-md">
        <h3 class="text-lg font-semibold text-system-gray-80">Doanh thu</h3>
        <p class="mt-2 text-2xl font-bold text-system-primary-100">{{ stats.revenue }} VNĐ</p>
        <p class="mt-1 text-sm text-system-gray-60">
          +{{ stats.revenueGrowth }}% so với tháng trước
        </p>
      </div>
    </div>

    <!-- Biểu đồ -->
    <div class="mb-6 rounded-lg bg-system-gray-10 p-6 shadow-md">
      <h3 class="mb-4 text-lg font-semibold text-system-gray-80">Lượt truy cập hàng tháng</h3>
      <div class="h-64">
        <!-- Biểu đồ sẽ được hiển thị ở đây -->
        <p class="text-center text-system-gray-60">Biểu đồ sẽ được hiển thị ở đây</p>
      </div>

      <!-- Bảng dữ liệu -->
      <div class="rounded-lg bg-system-gray-10 p-6 shadow-md">
        <h3 class="mb-4 text-lg font-semibold text-system-gray-80">Giao dịch gần đây</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b dark:border-gray-600">
                <th class="px-4 py-2 text-system-gray-80">ID</th>
                <th class="px-4 py-2 text-system-gray-80">Người dùng</th>
                <th class="px-4 py-2 text-system-gray-80">Số tiền</th>
                <th class="px-4 py-2 text-system-gray-80">Ngày</th>
                <th class="px-4 py-2 text-system-gray-80">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="border-b dark:border-gray-600"
              >
                <td class="px-4 py-2">{{ transaction.id }}</td>
                <td class="px-4 py-2">{{ transaction.user }}</td>
                <td class="px-4 py-2">{{ transaction.amount }} VNĐ</td>
                <td class="px-4 py-2">{{ transaction.date }}</td>
                <td class="px-4 py-2">
                  <span
                    :class="{
                      'text-system-success-100': transaction.status === 'Thành công',
                      'text-system-error-100': transaction.status === 'Thất bại'
                    }"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// Dữ liệu giả cho thẻ thống kê
const stats = ref({
  totalUsers: 1500,
  userGrowth: 12.5,
  totalPosts: 3200,
  postGrowth: 8.3,
  revenue: 45000000,
  revenueGrowth: 15.7
})

// Dữ liệu giả cho bảng giao dịch
const transactions = ref([
  { id: 1, user: 'Nguyễn Văn A', amount: 500000, date: '2025-05-18', status: 'Thành công' },
  { id: 2, user: 'Trần Thị B', amount: 1200000, date: '2025-05-17', status: 'Thất bại' },
  { id: 3, user: 'Lê Văn C', amount: 300000, date: '2025-05-16', status: 'Thành công' },
  { id: 4, user: 'Phạm Thị D', amount: 750000, date: '2025-05-15', status: 'Thành công' }
])
</script>

<style lang="scss" scoped>
table {
  min-width: 600px;
}
</style>
```
