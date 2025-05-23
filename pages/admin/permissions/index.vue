<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Cài đặt các nhóm phân quyền"></CTitle>
    <div
      class="flex flex-col flex-wrap items-center justify-around space-y-4 bg-white px-5 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
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
                >All</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                @click.prevent="softStatus = 'Active'"
                >Active</a
              >
            </li>
            <li>
              <a
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                href="#"
                @click.prevent="softStatus = 'Deleted'"
                >Deleted</a
              >
            </li>
          </ul>
        </template>
      </UIDropdown>
      <UIButton
        class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        text="Thêm phân quyền"
      >
      </UIButton>
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
          id="table-search-permission"
          v-model="searchQuery"
          class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Search for permission"
        />
      </div>
    </div>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="p-4" scope="col">
            <div class="flex items-center">
              <UICheckboxSelect
                id="`checkbox-table-search-${permission.id}`"
                v-model="selectAll"
                class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                type="checkbox"
                @change="toggleSelectAll"
              />
              <label class="sr-only" for="checkbox-all-search">Select all</label>
            </div>
          </th>
          <th class="px-6 py-3" scope="col">Tên Phân Quyền</th>
          <th class="px-6 py-3" scope="col">Ghi Chú</th>
          <th class="px-6 py-3" scope="col">Ngày Tạo</th>
          <th class="px-6 py-3" scope="col">Status</th>
          <th class="px-6 py-3" scope="col">Action</th>
          <th>
            <button class="rounded bg-red-500 px-6 py-3 text-white" @click="deleteSelectedPermisss">
              Xóa các permission đã chọn
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="permission in filteredPermiss"
          :key="permission.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <UICheckboxSelect
              id="`checkbox-table-search-${permission.id}`"
              v-model="permission.selected"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              type="checkbox"
            />
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <div class="pl-3">
              <div class="text-base font-semibold">{{ permission.permissionName }}</div>
            </div>
          </th>
          <td>
            <div class="font-normal text-gray-500">{{ permission.note }}</div>
          </td>
          <td>
            <div class="font-normal text-gray-500">{{ permission.create_at }}</div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                :class="permission.status === 'Online' ? 'bg-green-500' : 'bg-red-500'"
                class="me-2 h-2.5 w-2.5 rounded-full"
              ></div>
              {{ permission.status }}
            </div>
          </td>
          <td class="px-6 py-4">
            <NuxtLink class="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Edit user
            </NuxtLink>
          </td>
          <td>
            <button @click="deletePermiss(permission.id)">Xóa</button>
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
        :page-count="20"
        :page-sizes="[10, 20, 30]"
        show-size-picker
      />
    </div>
  </div>
</template>

<script setup>
import CTitle from '~/components/c/CTitle.vue'

definePageMeta({
  layout: 'adminlayout'
})

// Sample data
const permissions = ref([
  {
    id: 1,
    permissionName: 'ADMIN',
    note: 'neil.sims@flowbite.com',
    create_at: '2024-01-01',
    status: 'Active',
    selected: false
  },
  {
    id: 2,
    permissionName: 'Lễ Tân',
    note: 'neil.sims@flowbite.com',
    create_at: '2024-01-01',
    status: 'Active',
    selected: false
  },
  {
    id: 3,
    permissionName: 'Kho',
    note: 'neil.sims@flowbite.com',
    create_at: '2024-01-01',
    status: 'Active',
    selected: false
  },
  {
    id: 4,
    permissionName: 'Vệ Sinh',
    note: 'neil.sims@flowbite.com',
    create_at: '2024-01-01',
    status: 'Active',
    selected: false
  }
])

// Lọc theo trạng thái
const softStatus = ref('all')
const softPermissions = computed(() => {
  if (softStatus.value === 'all') return permissions.value
  return permissions.value.filter((permissions) => permissions.status === softStatus.value)
})

// Lọc theo tìm kiếm trên kết quả đã lọc trạng thái
const searchQuery = ref('')
const filteredPermiss = computed(() => {
  if (!searchQuery.value) return softPermissions.value
  const q = searchQuery.value.toLowerCase()
  return softPermissions.value.filter(
    (permission) =>
      permission.permissionName.toLowerCase().includes(q) ||
      permission.create_at.toLowerCase().includes(q) ||
      permission.status.toLowerCase().includes(q)
  )
})

// Checkbox functionality
const selectAll = ref(false)
const toggleSelectAll = () => {
  permissions.value.forEach((permissions) => {
    permissions.selected = selectAll.value
  })
}
// Xóa từng permission theo id
const deletePermiss = (id) => {
  permissions.value = permissions.value.filter((permissions) => permissions.id !== id)
}

// Xóa tất cả permission đã chọn
const deleteSelectedPermisss = () => {
  permissions.value = permissions.value.filter((permissions) => !permissions.selected)
  selectAll.value = false
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
