<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Danh sách booking"></CTitle>
    <div
      class="flex flex-col justify-between bg-white px-5 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <!-- Phần bên trái: Thanh tìm kiếm và Dropdown -->
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
        <!-- Thanh tìm kiếm -->
        <div class="relative mb-4 md:mb-0">
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
            id="table-search-booking_id"
            v-model="searchQuery"
            class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            placeholder="Search for bookings by booking_id"
          />
        </div>
        <!-- Dropdown -->
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
                  @click.prevent="softStatus = 'Chưa đến'"
                  >Chưa đến</a
                >
              </li>
              <li>
                <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  href="#"
                  @click.prevent="softStatus = 'Đã đến'"
                  >Đã đến</a
                >
              </li>
              <li>
                <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  href="#"
                  @click.prevent="softStatus = 'Hoàn thành'"
                  >Hoàn thành</a
                >
              </li>
              <li>
                <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  href="#"
                  @click.prevent="softStatus = 'Đã hủy'"
                  >Đã hủy</a
                >
              </li>
            </ul>
          </template>
        </UIDropdown>
      </div>

      <!-- Phần bên phải: Nút Thêm nhân viên -->
      <div class="flex items-center">
        <NuxtLink to="/admin/booking/create">
          <UIButton
            class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            text="Thêm Booking"
          >
          </UIButton>
        </NuxtLink>
      </div>
    </div>
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="p-4" scope="col">
            <UICheckboxSelect
              id="checkbox-table-search-all"
              v-model="selectAll"
              label="Select all"
              @change="toggleSelectAll"
            />
          </th>
          <th class="px-6 py-3" scope="col">Booking ID</th>
          <th class="px-6 py-3" scope="col">Name</th>
          <th class="px-6 py-3" scope="col">Room Info</th>
          <th class="px-6 py-3" scope="col">Status</th>
          <th class="px-6 py-3" scope="col">Action</th>
          <th>
            <button class="rounded bg-red-500 px-6 py-3 text-white" @click="deleteSelectedBookings">
              Xóa các booking đã chọn
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="booking in paginatedBookings"
          :key="booking.booking_id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <UICheckboxSelect
              :id="'checkbox-table-search-' + booking.booking_id"
              v-model="booking.selected"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              type="checkbox"
            />
          </td>
          <th
            class="flex items-center whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            scope="row"
          >
            {{ booking.booking_id }}
          </th>
          <th class="px-6 py-4">{{ booking.name }}</th>
          <td class="px-6 py-4">{{ booking.position }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                :class="
                  booking.status === 'Chưa đến'
                    ? 'bg-yellow-500'
                    : booking.status === 'Đã đến'
                      ? 'bg-green-500'
                      : booking.status === 'Hoàn thành'
                        ? 'bg-gray-500'
                        : booking.status === 'Đã hủy'
                          ? 'bg-red-500'
                          : 'bg-gray-300'
                "
                class="me-2 h-2.5 w-2.5 rounded-full"
              ></div>
              {{ booking.status }}
            </div>
          </td>
          <td class="px-6 py-4">
            <NuxtLink
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              :to="{ name: 'admin-booking-id', params: { id: booking.booking_id } }"
            >
              Edit Booking
            </NuxtLink>
          </td>
          <td>
            <button @click="deleteBooking(booking.booking_id)">Xóa Booking</button>
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
        :page-count="pageCount"
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
const bookings = ref([
  {
    booking_id: 1,
    name: 'Giang',
    email: 'neil.sims@flowbite.com',
    position: 'Phòng 101 - Tầng 1 - VIP',
    status: 'Chưa đến',
    avatar: 'https://picsum.photos/400/300?random=1',
    selected: false
  },
  {
    booking_id: 2,
    name: 'Lâm',
    email: 'bonnie@flowbite.com',
    position: 'Phòng 202 - Tầng 2 - Standard',
    status: 'Đã đến',
    avatar: 'https://picsum.photos/400/300?random=2',
    selected: false
  },
  {
    booking_id: 3,
    name: 'Tài',
    email: 'jese@flowbite.com',
    position: 'Phòng 303 - Tầng 3 - Deluxe',
    status: 'Hoàn thành',
    avatar: 'https://picsum.photos/400/300?random=3',
    selected: false
  },
  {
    booking_id: 4,
    name: 'Hùng',
    email: 'thomas@flowbite.com',
    position: 'Phòng 404 - Tầng 4 - Suite',
    status: 'Đã hủy',
    avatar: 'https://picsum.photos/400/300?random=4',
    selected: false
  },
  {
    booking_id: 5,
    name: 'Linh',
    email: 'leslie@flowbite.com',
    position: 'Phòng 505 - Tầng 5 - VIP',
    status: 'Đã hủy',
    avatar: 'https://picsum.photos/400/300?random=5',
    selected: false
  },
  {
    booking_id: 6,
    name: 'Thạch',
    email: 'leslie@flowbite.com',
    position: 'Phòng 606 - Tầng 6 - Standard',
    status: 'Chưa đến',
    avatar: 'https://picsum.photos/400/300?random=5',
    selected: false
  }
])

// Lọc theo trạng thái
const softStatus = ref('all')
const softBookings = computed(() => {
  if (softStatus.value === 'all') return bookings.value
  return bookings.value.filter((booking) => booking.status === softStatus.value)
})

// Lọc theo tìm kiếm trên kết quả đã lọc trạng thái
const searchQuery = ref('')
const filteredBookings = computed(() => {
  if (!searchQuery.value) return softBookings.value
  const q = searchQuery.value.toLowerCase()
  return softBookings.value.filter(
    (booking) =>
      booking.name.toLowerCase().includes(q) ||
      booking.email.toLowerCase().includes(q) ||
      booking.status.toLowerCase().includes(q) ||
      booking.booking_id.toString().includes(q)
  )
})

// Checkbox functionality
const selectAll = ref(false)
const toggleSelectAll = () => {
  bookings.value.forEach((booking) => {
    booking.selected = selectAll.value
  })
}

// Xóa từng Booking theo booking_id
const deleteBooking = (id) => {
  bookings.value = bookings.value.filter((booking) => booking.booking_id !== id)
}

// Xóa tất cả Booking đã chọn
const deleteSelectedBookings = () => {
  bookings.value = bookings.value.filter((booking) => !booking.selected)
  selectAll.value = false
}

// Phân trang
const page = ref(1)
const pageSize = ref(10)
const paginatedBookings = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredBookings.value.slice(start, end)
})
const pageCount = computed(() => Math.ceil(filteredBookings.value.length / pageSize.value))
</script>

<style scoped>
/* Add any custom styles here */
</style>
