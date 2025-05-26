<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Danh sách giao ca"></CTitle>
    <div
      class="justify-content-end flex flex-col flex-wrap items-center space-y-4 bg-white px-5 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
            <path
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          type="text"
          placeholder="Tìm kiếm nhân viên"
        />
      </div>
    </div>

    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-6 py-3" scope="col">Thời gian</th>
          <th class="px-6 py-3" scope="col">Nhân viên nhận ca</th>
          <th class="px-6 py-3" scope="col">Tiền nhận Ca trước (1)</th>
          <th class="px-6 py-3" scope="col">Tiền thu Trong ca (2)</th>
          <th class="px-6 py-3" scope="col">Tiền giao quản lý (3)</th>
          <th class="px-6 py-3" scope="col">Tiền giao ca (4) = (1)+(2)-(3)</th>
          <th class="px-6 py-3" scope="col">Tiền quầy (5)</th>
          <th class="px-6 py-3" scope="col">Thực tế giao ca (4)+/-(5)</th>
          <th class="px-6 py-3" scope="col">Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="px-6 py-4">{{ user.receivedTime }}</td>
          <td class="flex items-center px-6 py-4">
            <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="`${user.name} avatar`" />
            <div class="pl-3">
              <div class="text-base font-semibold">{{ user.name }}</div>
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </div>
          </td>
          <td class="px-6 py-4">{{ user.cashIn.toLocaleString() }} đ</td>
          <td class="px-6 py-4">{{ user.cashCollected.toLocaleString() }} đ</td>
          <td class="px-6 py-4">{{ user.cashToManager.toLocaleString() }} đ</td>
          <td class="px-6 py-4">
            {{ (user.cashIn + user.cashCollected - user.cashToManager).toLocaleString() }} đ
          </td>
          <td class="px-6 py-4">{{ user.cashCounter.toLocaleString() }} đ</td>
          <td class="px-6 py-4">
            {{
              (
                user.cashIn +
                user.cashCollected -
                user.cashToManager -
                user.cashCounter
              ).toLocaleString()
            }}
            đ
          </td>
          <td class="px-6 py-4">{{ user.note }}</td>
        </tr>
      </tbody>
    </table>

    <div
      class="flex items-center justify-end border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
    >
      <UIPagination
        v-model:page="page"
        v-model:pageSize="pageSize"
        :page-count="20"
        :page-sizes="[10, 20, 30]"
        show-size-picker
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CTitle from '~/components/c/CTitle.vue'

definePageMeta({
  layout: 'adminlayout'
})

const users = ref([
  {
    id: 1,
    name: 'Giang',
    email: 'giang@example.com',
    receivedTime: '2024-09-01 07:00',
    cashIn: 500000,
    cashCollected: 300000,
    cashToManager: 200000,
    cashCounter: 590000,
    note: 'Không có vấn đề',
    avatar: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 2,
    name: 'Lâm',
    email: 'lam@example.com',
    receivedTime: '2024-09-01 15:00',
    cashIn: 300000,
    cashCollected: 250000,
    cashToManager: 100000,
    cashCounter: 430000,
    note: 'Thừa tiền quầy',
    avatar: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 3,
    name: 'Tài',
    email: 'tai@example.com',
    receivedTime: '2024-09-02 07:00',
    cashIn: 400000,
    cashCollected: 400000,
    cashToManager: 500000,
    cashCounter: 290000,
    note: 'Thiếu tiền quầy',
    avatar: 'https://picsum.photos/400/300?random=3'
  }
])

const searchQuery = ref('')
const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return users.value.filter((user) => {
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.note.toLowerCase().includes(q)
    )
  })
})

const page = ref(1)
const pageSize = ref(10)
</script>
