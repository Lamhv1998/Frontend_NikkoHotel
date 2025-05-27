<!-- pages/admin/user/index.vue -->
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Danh sách Users"></CTitle>
    <div
      class="flex flex-col flex-wrap items-center justify-around space-y-4 bg-white px-5 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          id="table-search-users"
          v-model="searchQuery"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Tìm kiếm người dùng"
        />
      </div>
      <UIDropdown>
        <UIButton
          class="inline-flex h-9 items-center rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          text="Lọc"
        >
        </UIButton>
        <template #item>
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                @click.prevent="softStatus = 'all'"
                >Tất cả</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                @click.prevent="softStatus = 'Active'"
                >Kích hoạt</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                @click.prevent="softStatus = 'Deleted'"
                >Đã xóa</a
              >
            </li>
          </ul>
        </template>
      </UIDropdown>
      <NuxtLink to="/admin/user/create">
        <UIButton
          class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          text="Thêm user"
        >
        </UIButton>
      </NuxtLink>
      <UIButton
        class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        text="Danh sách loại thành viên"
        @click="isModalVisible = true"
      ></UIButton>
    </div>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="p-4" scope="col">
            <div class="flex items-center">
              <UICheckboxSelect
                id="checkbox-table-search-all"
                v-model="selectAll"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                type="checkbox"
                @change="toggleSelectAll"
              />
              <label class="sr-only" for="checkbox-all-search">Chọn tất cả</label>
            </div>
          </th>
          <th class="px-6 py-3" scope="col">Tên</th>
          <th class="px-6 py-3" scope="col">Loại thành viên</th>
          <th class="px-6 py-3" scope="col">Trạng thái</th>
          <th class="px-6 py-3" scope="col">Hành động</th>
          <th>
            <button class="rounded bg-red-500 px-6 py-3 text-white" @click="deleteSelectedUsers">
              Xóa các user đã chọn
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in paginatedUsers"
          :key="user.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <UICheckboxSelect
              :id="'checkbox-table-search-' + user.id"
              v-model="user.selected"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              type="checkbox"
            />
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="`${user.name} avatar`" />
            <div class="pl-3">
              <div class="text-base font-semibold">{{ user.name }}</div>
              <div class="font-normal text-gray-500">{{ user.email }}</div>
            </div>
          </th>
          <td class="px-6 py-4">{{ user.position }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                :class="user.status === 'Online' ? 'bg-green-500' : 'bg-red-500'"
                class="me-2 h-2.5 w-2.5 rounded-full"
              ></div>
              {{ user.status }}
            </div>
          </td>
          <td class="px-6 py-4">
            <NuxtLink
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              :to="{ name: 'admin-staff-id', params: { id: user.id } }"
            >
              Sửa user
            </NuxtLink>
          </td>
          <td>
            <button @click="deleteUser(user.id)">Xóa user</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="flex items-center justify-end border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
    >
      <UIPagination
        v-model:page="page"
        v-model:pageSize="pageSize"
        :page-count="Math.ceil(filteredUsers.length / pageSize)"
        :page-sizes="[10, 20, 30]"
        show-size-picker
      />
    </div>
    <MembershipModal
      v-model:show="isModalVisible"
      :types="[selectedMemberType]"
      @close="isModalVisible = false"
      @update:type="updateMemberType"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import CTitle from '~/components/c/CTitle.vue'
import MembershipModal from '~/pages/admin/user/component/MembershipModal.vue'

definePageMeta({
  layout: 'adminlayout'
})

interface User {
  id: number
  name: string
  email: string
  position: string
  status: string
  avatar: string
  selected: boolean
}

interface MemberType {
  id?: string
  memberTypeName: string
  minimumRevenue: number
  discountOrPromotion: string
  description: string
  note: string
  actions: string
}

const isModalVisible = ref(false)
const page = ref(1)
const pageSize = ref(10)

// Dữ liệu mẫu cho users
const users = ref<User[]>([
  {
    id: 1,
    name: 'Giang',
    email: 'neil.sims@flowbite.com',
    position: 'VIP1',
    status: 'Active',
    avatar: 'https://picsum.photos/400/300?random=1',
    selected: false
  },
  {
    id: 2,
    name: 'Lâm',
    email: 'bonnie@flowbite.com',
    position: 'VIP2',
    status: 'Deleted',
    avatar: 'https://picsum.photos/400/300?random=2',
    selected: false
  },
  {
    id: 3,
    name: 'Tài',
    email: 'jese@flowbite.com',
    position: 'VIP3',
    status: 'Active',
    avatar: 'https://picsum.photos/400/300?random=3',
    selected: false
  },
  {
    id: 4,
    name: 'Hùng',
    email: 'thomas@flowbite.com',
    position: 'VIP3',
    status: 'Online',
    avatar: 'https://picsum.photos/400/300?random=4',
    selected: false
  },
  {
    id: 5,
    name: 'Linh',
    email: 'leslie@flowbite.com',
    position: 'VIP4',
    status: 'Offline',
    avatar: 'https://picsum.photos/400/300?random=5',
    selected: false
  },
  {
    id: 6,
    name: 'Thạch',
    email: 'leslie@flowbite.com',
    position: 'VIP6',
    status: 'Offline',
    avatar: 'https://picsum.photos/400/300?random=5',
    selected: false
  }
])

// Dữ liệu mẫu cho loại thành viên
const selectedMemberType = ref<MemberType>({
  memberTypeName: 'VIP',
  minimumRevenue: 1000000,
  discountOrPromotion: '10%',
  description: 'Thành viên cao cấp',
  note: 'Ưu đãi từ 2024',
  actions: ''
})

// Lọc theo trạng thái
const softStatus = ref('all')
const softUsers = computed(() => {
  if (softStatus.value === 'all') return users.value
  return users.value.filter((user) => user.status === softStatus.value)
})

// Lọc theo tìm kiếm
const searchQuery = ref('')
const filteredUsers = computed(() => {
  if (!searchQuery.value) return softUsers.value
  const q = searchQuery.value.toLowerCase()
  return softUsers.value.filter(
    (user) =>
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      user.status.toLowerCase().includes(q)
  )
})

// Phân trang
const paginatedUsers = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredUsers.value.slice(start, end)
})

// Chọn tất cả checkbox
const selectAll = ref(false)
const toggleSelectAll = () => {
  users.value.forEach((user) => {
    user.selected = selectAll.value
  })
}

// Xóa từng user
const deleteUser = (id: number) => {
  users.value = users.value.filter((user) => user.id !== id)
}

// Xóa các user đã chọn
const deleteSelectedUsers = () => {
  users.value = users.value.filter((user) => !user.selected)
  selectAll.value = false
}

// Cập nhật loại thành viên
const updateMemberType = (newType: MemberType) => {
  selectedMemberType.value = { ...newType }
}
</script>

<style scoped>
/* Thêm các kiểu tùy chỉnh tại đây */
</style>
