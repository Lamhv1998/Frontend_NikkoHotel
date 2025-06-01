<template>
  <div>
    <CTitle class="m-5 p-3" title="Danh sách kho"></CTitle>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="px-6 py-3" scope="col">Mã mặt hàng</th>
            <th class="px-6 py-3" scope="col">Tên mặt hàng</th>
            <th class="px-6 py-3" scope="col">Danh mục</th>
            <th class="px-6 py-3" scope="col">Số lượng tồn kho</th>
            <th class="px-6 py-3" scope="col">Giá mỗi đơn vị</th>
            <th class="px-6 py-3" scope="col">Số lượng tối thiểu</th>
            <th class="px-6 py-3" scope="col">Vị trí</th>
            <th class="px-6 py-3" scope="col">Trạng thái</th>
            <th class="px-6 py-3" scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="warehouse in warehouses"
            :key="warehouse.id"
            class="border-b border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">{{ warehouse.item_id }}</td>
            <td class="px-6 py-4">{{ warehouse.item_name }}</td>
            <td class="px-6 py-4">{{ warehouse.category }}</td>
            <td class="px-6 py-4">{{ warehouse.quantity_in_stock }}</td>
            <td class="px-6 py-4">{{ warehouse.unit_price }}</td>
            <td class="px-6 py-4">{{ warehouse.minimum_stock }}</td>
            <td class="px-6 py-4">Tầng: {{ warehouse.floor }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <div
                  :class="warehouse.status === 'active' ? 'bg-green-500' : 'bg-gray-300'"
                  class="me-2 h-2.5 w-2.5 rounded-full"
                ></div>
                {{ warehouse.status }}
              </div>
            </td>
            <td class="px-6 py-4">
              <NuxtLink
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                :to="{ name: 'admin-warehouse-id', params: { id: warehouse.id } }"
              >
                Edit warehouse
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import CTitle from '~/components/c/CTitle.vue'

definePageMeta({
  layout: 'adminlayout'
})

// Sample data
const warehouses = ref([
  {
    id: 1,
    item_id: 'I001',
    item_name: 'Máy quạt nhỏ',
    category: 'Đồ dùng phòng',
    quantity_in_stock: 50,
    unit_price: 200000.0,
    minimum_stock: 10,
    warehouseNum: 'W001',
    floor: '1',
    status: 'active'
  },
  {
    id: 2,
    item_id: 'I002',
    item_name: 'Ghế ',
    category: 'Đồ dùng phòng',
    quantity_in_stock: 30,
    unit_price: 150000.0,
    minimum_stock: 5,
    warehouseNum: 'W002',
    floor: '2',
    status: 'inactive'
  },
  {
    id: 3,
    item_id: 'I003',
    item_name: 'Bàn Làm Việc',
    category: 'Vật tư',
    quantity_in_stock: 10,
    unit_price: 5000000.0,
    minimum_stock: 2,
    warehouseNum: 'W003',
    floor: '3',
    status: 'active'
  }
])
</script>
<style scoped></style>
