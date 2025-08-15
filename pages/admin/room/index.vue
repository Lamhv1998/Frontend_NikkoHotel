<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Danh sách phòng"></CTitle>
    <div
      class="flex flex-col justify-between bg-white px-5 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
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
            id="table-search-room"
            v-model="searchQuery"
            class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            placeholder="Search"
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
                  >All</a
                >
              </li>
              <li>
                <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  href="#"
                  @click.prevent="softStatus = 'Vacant'"
                  >Vacant
                </a>
              </li>
              <li>
                <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  href="#"
                  @click.prevent="softStatus = 'Novacancy'"
                  >Novacancy
                </a>
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
      </div>
      <div class="flex items-center"></div>

      <NuxtLink to="/admin/room/create">
        <UIButton
          class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          text="Thêm phòng"
        >
        </UIButton>
      </NuxtLink>
    </div>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="p-4" scope="col">
            <UICheckboxSelect
              id="checkbox-table-search-${room.id}"
              v-model="selectAll"
              label="Select all"
              @change="toggleSelectAll"
            />
          </th>
          <th class="px-6 py-3" scope="col">Số phòng</th>
          <th class="px-6 py-3" scope="col">Vị trí</th>
          <th class="px-6 py-3" scope="col">Trạng thái</th>
          <th class="px-6 py-3" scope="col">Action</th>
          <th>
            <button class="rounded bg-red-500 px-6 py-3 text-white" @click="deleteSelectedrooms">
              Xóa các phòng đã chọn
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="room in filteredrooms"
          :key="room.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <UICheckboxSelect
              id="`checkbox-table-search-${room.id}`"
              v-model="room.selected"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              type="checkbox"
            />
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            <img class="h-10 w-10 rounded-full" :src="room.image" :alt="`${room.roomnum} avatar`" />
            <div class="pl-3">
              <div class="text-base font-semibold">{{ room.roomnum }}</div>
            </div>
          </th>
          <td class="px-6 py-4">Tầng: {{ room.floor }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                :class="
                  room.status === 'Novacancy'
                    ? 'bg-yellow-500'
                    : room.status === 'Vacant'
                      ? 'bg-green-500'
                      : room.status === 'Deleted'
                        ? 'bg-red-500'
                        : 'bg-gray-300'
                "
                class="me-2 h-2.5 w-2.5 rounded-full"
              ></div>
              {{ room.status }}
            </div>
          </td>
          <td class="px-6 py-4">
            <NuxtLink
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              :to="{ name: 'admin-room-id', params: { id: room.id } }"
            >
              Edit room
            </NuxtLink>
          </td>
          <td>
            <button @click="deleteroom(room.id)">Xóa room</button>
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
import UICheckboxSelect from '~/components/UI/UICheckboxSelect.vue'
import CTitle from '~/components/c/CTitle.vue'

definePageMeta({
  layout: 'adminlayout'
})

// Sample data
const rooms = ref([
  {
    id: 1,
    roomnum: '104',
    floor: '1',
    roomtype: 'Resident',
    status: 'Vacant',
    image: 'https://picsum.photos/400/300?random=1',
    selected: false
  },
  {
    id: 2,
    roomnum: '105',
    floor: '1',
    roomtype: 'Resident',
    status: 'Deleted',
    image: 'https://picsum.photos/400/300?random=1',
    selected: false
  },
  {
    id: 3,
    roomnum: '106',
    floor: '1',
    roomtype: 'Resident',
    status: 'Novacancy',
    image: 'https://picsum.photos/400/300?random=1',
    selected: false
  },
  {
    id: 4,
    roomnum: '107',
    floor: '1',
    roomtype: 'Resident',
    status: 'Vacant',
    image: 'https://picsum.photos/400/300?random=1',
    selected: false
  },
  {
    id: 5,
    roomnum: '103',
    floor: '1',
    roomtype: 'Resident',
    status: 'Vacant',
    image: 'https://picsum.photos/400/300?random=1',
    selected: false
  }
])

// Lọc theo trạng thái
const softStatus = ref('all')
const softrooms = computed(() => {
  if (softStatus.value === 'all') return rooms.value
  return rooms.value.filter((rooms) => rooms.status === softStatus.value)
})

// Lọc theo tìm kiếm trên kết quả đã lọc trạng thái
const searchQuery = ref('')
const filteredrooms = computed(() => {
  if (!searchQuery.value) return softrooms.value
  const q = searchQuery.value.toLowerCase()
  return softrooms.value.filter(
    (rooms) =>
      rooms.roomnum.toLowerCase().includes(q) ||
      rooms.floor.toLowerCase().includes(q) ||
      rooms.status.toLowerCase().includes(q)
  )
})

// Checkbox functionality
const selectAll = ref(false)
const toggleSelectAll = () => {
  rooms.value.forEach((room) => {
    room.selected = selectAll.value
  })
}
// Xóa từng room theo id
const deleteroom = (id) => {
  rooms.value = rooms.value.filter((room) => room.id !== id)
}

// Xóa tất cả room đã chọn
const deleteSelectedrooms = () => {
  rooms.value = rooms.value.filter((room) => !room.selected)
  selectAll.value = false
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
