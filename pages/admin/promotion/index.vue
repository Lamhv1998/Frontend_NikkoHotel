<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <CTitle class="m-5 p-3" title="Danh sách khuyến mãi"></CTitle>
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
            id="table-search-promotion"
            v-model="searchQuery"
            class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            type="text"
            placeholder="Tìm kiếm khuyến mãi"
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
      <!-- Nút Thêm khuyến mãi -->
      <div class="flex items-center">
        <NuxtLink to="/admin/promotion/create">
          <UIButton
            class="flex h-9 items-center justify-end rounded-lg border border-gray-300 bg-black px-3 py-1.5 text-sm text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            text="Thêm khuyến mãi"
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
          <th class="px-6 py-3" scope="col">Tên khuyến mãi</th>
          <th class="px-6 py-3" scope="col">Mã</th>
          <th class="px-6 py-3" scope="col">Loại</th>
          <th class="px-6 py-3" scope="col">Đối tượng áp dụng</th>
          <th class="px-6 py-3" scope="col">Giá trị</th>
          <th class="px-6 py-3" scope="col">Ngày bắt đầu</th>
          <th class="px-6 py-3" scope="col">Ngày kết thúc</th>
          <th class="px-6 py-3" scope="col">Trạng thái</th>
          <th class="px-6 py-3" scope="col">Action</th>
          <th>
            <button
              class="rounded bg-red-500 px-6 py-3 text-white"
              @click="deleteSelectedPromotions"
            >
              Xóa các khuyến mãi đã chọn
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="promotion in paginatedPromotions"
          :key="promotion.id"
          class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td class="w-4 p-4">
            <UICheckboxSelect
              :id="'checkbox-table-search-' + promotion.id"
              v-model="promotion.selected"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              type="checkbox"
            />
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
            {{ promotion.name }}
          </td>
          <td class="px-6 py-4">{{ promotion.code }}</td>
          <td class="px-6 py-4">
            <span v-if="promotion.type === 'percent'">Phần trăm (%)</span>
            <span v-else>Số tiền (VNĐ)</span>
          </td>
          <td class="px-6 py-4">{{ promotion.membership }}</td>
          <td class="px-6 py-4">
            <span v-if="promotion.type === 'percent'">{{ promotion.value }}%</span>
            <span v-else>{{ promotion.value.toLocaleString() }}₫</span>
          </td>
          <td class="px-6 py-4">{{ promotion.startDate }}</td>
          <td class="px-6 py-4">{{ promotion.endDate }}</td>
          <td class="px-6 py-4">
            <div class="flex items-center">
              <div
                :class="promotion.status === 'active' ? 'bg-green-500' : 'bg-red-500'"
                class="me-2 h-2.5 w-2.5 rounded-full"
              ></div>
              <span>
                {{ promotion.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng' }}
              </span>
            </div>
          </td>
          <td class="px-6 py-4">
            <NuxtLink
              class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              :to="{ name: 'admin-promotion-id', params: { id: promotion.id } }"
            >
              Sửa
            </NuxtLink>
          </td>
          <td>
            <button @click="deletePromotion(promotion.id)">Xóa</button>
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

// Dữ liệu mẫu khuyến mãi
const promotions = ref([
  {
    id: 1,
    name: 'Giảm giá mùa hè',
    code: 'SUMMER2025',
    type: 'percent',
    membership: 'VIP',
    value: 20,
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    status: 'active',
    selected: false
  },
  {
    id: 2,
    name: 'Tặng 200k',
    code: 'GIFT200',
    type: 'amount',
    membership: 'VIP1',
    value: 200000,
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    status: 'inactive',
    selected: false
  }
])

// Lọc theo trạng thái
const softStatus = ref('all')
const softPromotions = computed(() => {
  if (softStatus.value === 'all') return promotions.value
  return promotions.value.filter((promotion) => promotion.status === softStatus.value)
})

// Lọc theo tìm kiếm trên kết quả đã lọc trạng thái
const searchQuery = ref('')
const filteredPromotions = computed(() => {
  if (!searchQuery.value) return softPromotions.value
  const q = searchQuery.value.toLowerCase()
  return softPromotions.value.filter(
    (promotion) =>
      promotion.name.toLowerCase().includes(q) ||
      promotion.code.toLowerCase().includes(q) ||
      promotion.status.toLowerCase().includes(q)
  )
})

// Checkbox functionality
const selectAll = ref(false)
const toggleSelectAll = () => {
  filteredPromotions.value.forEach((promotion) => {
    promotion.selected = selectAll.value
  })
}

// Xóa từng promotion theo id
const deletePromotion = (id) => {
  promotions.value = promotions.value.filter((promotion) => promotion.id !== id)
}

// Xóa tất cả promotion đã chọn
const deleteSelectedPromotions = () => {
  promotions.value = promotions.value.filter((promotion) => !promotion.selected)
  selectAll.value = false
}

// Phân trang
const page = ref(1)
const pageSize = ref(10)
const paginatedPromotions = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredPromotions.value.slice(start, end)
})
const pageCount = computed(() => Math.ceil(filteredPromotions.value.length / pageSize.value))
</script>
