<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Danh sách dịch vụ"></CTitle>
    <div
      class="flex flex-col justify-between bg-white px-5 py-4 dark:bg-gray-900 md:flex-row md:space-y-0"
    >
      <!-- Thanh tìm kiếm và Dropdown -->
      <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
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
            id="table-search-service"
            v-model="searchQuery"
            class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            placeholder="Tìm kiếm dịch vụ"
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
                  @click.prevent="softStatus = 'active'"
                  >Đang áp dụng</a
                >
              </li>
              <li>
                <a
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  href="#"
                  @click.prevent="softStatus = 'inactive'"
                  >Ngừng áp dụng</a
                >
              </li>
            </ul>
          </template>
        </UIDropdown>
      </div>
      <!-- Nút Thêm dịch vụ -->
      <div class="flex items-center">
        <NuxtLink to="/admin/services/create">
          <UIButton
            class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            text="Thêm dịch vụ"
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
          <th class="px-6 py-3" scope="col">Tên dịch vụ</th>
          <th class="px-6 py-3" scope="col">Mã</th>
          <th class="px-6 py-3" scope="col">Loại</th>
          <th class="px-6 py-3" scope="col">Giá</th>
          <th class="px-6 py-3" scope="col">Đơn vị</th>
          <th class="px-6 py-3" scope="col">Thành viên áp dụng</th>
          <th class="px-6 py-3" scope="col">Trạng thái</th>
          <th class="px-6 py-3" scope="col">Action</th>
          <th>
            <button class="rounded bg-red-500 px-6 py-3 text-white" @click="deleteSelectedServices">
              Xóa các dịch vụ đã chọn
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="service in paginatedServices"
          :key="service.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <UICheckboxSelect
              :id="'checkbox-table-search-' + service.id"
              v-model="service.selected"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              type="checkbox"
            />
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {{ service.name }}
          </td>
          <td class="px-6 py-4">{{ service.code }}</td>
          <td class="px-6 py-4">
            <span v-if="service.type === 'laundry'">Giặt ủi</span>
            <span v-else-if="service.type === 'restaurant'">Nhà hàng</span>
            <span v-else-if="service.type === 'spa'">Spa</span>
            <span v-else-if="service.type === 'pickup'">Đưa đón</span>
            <span v-else>Khác</span>
          </td>
          <td class="px-6 py-4">{{ service.price.toLocaleString() }}₫</td>
          <td class="px-6 py-4">{{ service.unit }}</td>
          <td class="px-6 py-4">
            <span v-if="service.membership === 'vip'">VIP</span>
            <span v-else-if="service.membership === 'regular'">Thường</span>
            <span v-else>Tất cả</span>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                :class="service.status === 'active' ? 'bg-green-500' : 'bg-red-500'"
                class="me-2 h-2.5 w-2.5 rounded-full"
              ></div>
              <span>
                {{ service.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng' }}
              </span>
            </div>
          </td>
          <td class="px-6 py-4">
            <NuxtLink
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              :to="{ name: 'admin-services-id', params: { id: service.id } }"
            >
              Sửa
            </NuxtLink>
          </td>
          <td>
            <button @click="deleteService(service.id)">Xóa</button>
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
import { ref, computed } from 'vue'
import CTitle from '~/components/c/CTitle.vue'

definePageMeta({
  layout: 'adminlayout'
})

// Dữ liệu mẫu dịch vụ
const services = ref([
  {
    id: 1,
    name: 'Giặt ủi cao cấp',
    code: 'LD001',
    type: 'laundry',
    price: 50000,
    unit: 'kg',
    membership: 'vip',
    status: 'active',
    selected: false
  },
  {
    id: 2,
    name: 'Đưa đón sân bay',
    code: 'PU001',
    type: 'pickup',
    price: 300000,
    unit: 'lượt',
    membership: '',
    status: 'inactive',
    selected: false
  }
])

// Lọc theo trạng thái
const softStatus = ref('all')
const softServices = computed(() => {
  if (softStatus.value === 'all') return services.value
  return services.value.filter((service) => service.status === softStatus.value)
})

// Lọc theo tìm kiếm trên kết quả đã lọc trạng thái
const searchQuery = ref('')
const filteredServices = computed(() => {
  if (!searchQuery.value) return softServices.value
  const q = searchQuery.value.toLowerCase()
  return softServices.value.filter(
    (service) =>
      service.name.toLowerCase().includes(q) ||
      service.code.toLowerCase().includes(q) ||
      service.status.toLowerCase().includes(q)
  )
})

// Checkbox functionality
const selectAll = ref(false)
const toggleSelectAll = () => {
  filteredServices.value.forEach((service) => {
    service.selected = selectAll.value
  })
}

// Xóa từng service theo id
const deleteService = (id) => {
  services.value = services.value.filter((service) => service.id !== id)
}

// Xóa tất cả service đã chọn
const deleteSelectedServices = () => {
  services.value = services.value.filter((service) => !service.selected)
  selectAll.value = false
}

// Phân trang
const page = ref(1)
const pageSize = ref(10)
const paginatedServices = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredServices.value.slice(start, end)
})
const pageCount = computed(() => Math.ceil(filteredServices.value.length / pageSize.value))
</script>
