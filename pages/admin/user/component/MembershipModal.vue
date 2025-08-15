<!-- pages/admin/user/component/MembershipModal.vue -->
<template>
  <UIModal v-model="isModalVisible" title="Danh sách Loại thành viên" position="center" size="lg">
    <div class="p-4">
      <!-- Thanh tìm kiếm và nút Thêm mới -->
      <div
        class="mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <div class="relative w-full md:w-1/3">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              class="h-4 w-4 text-gray-500"
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
            v-model="searchQuery"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            type="text"
            placeholder="Tìm kiếm..."
          />
        </div>
        <div class="flex space-x-2">
          <button
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            @click="openAddModal"
          >
            Thêm mới
          </button>
        </div>
      </div>

      <!-- Bảng -->
      <div class="overflow-x-auto">
        <table class="min-w-full border border-gray-300">
          <thead>
            <tr class="bg-gray-100 text-sm uppercase text-gray-700">
              <th class="border px-4 py-2 text-left">Tên Loại thành viên</th>
              <th class="border px-4 py-2 text-left">Doanh thu tối thiểu</th>
              <th class="border px-4 py-2 text-left">Giảm trị/KM</th>
              <th class="border px-4 py-2 text-left">Mô tả</th>
              <th class="border px-4 py-2 text-left">Ghi chú</th>
              <th class="border px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTypes.length === 0">
              <td class="border px-4 py-2 text-center text-gray-500" colspan="8">No Data</td>
            </tr>
            <tr v-for="type in filteredTypes" :key="type.id" class="border-b hover:bg-gray-50">
              <td class="border px-4 py-2">{{ type.memberTypeName }}</td>
              <td class="border px-4 py-2">{{ type.minimumRevenue.toLocaleString() }}</td>
              <td class="border px-4 py-2">{{ type.discountOrPromotion }}</td>
              <td class="border px-4 py-2">{{ type.description }}</td>
              <td class="border px-4 py-2">{{ type.note }}</td>
              <td class="border px-4 py-2">
                <button class="mr-2 text-blue-600 hover:underline" @click="editMemberType(type)">
                  Sửa
                </button>
                <button class="text-red-600 hover:underline" @click="deleteMemberType(type.id)">
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template #footer>
      <button
        class="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        @click="emit('close')"
      >
        Đóng
      </button>
    </template>
  </UIModal>
  <UIModal
    v-model="isModalOpen"
    title="Thêm mới loại thành viên"
    position="center"
    size="md"
    @close="isModalOpen = false"
    ><div class="bg-gray-100 p-4 px-4 py-10">
      <form
        class="mx-auto max-w-5xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
        @submit.prevent="onSubmit"
      >
        <fieldset class="grid grid-cols-1 gap-6">
          <div class="col-span-full lg:col-span-1">
            <p class="text-xl font-semibold text-gray-700">Tạo membership</p>
          </div>
          <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
            <div class="col-span-full sm:col-span-4">
              <label class="text-sm font-medium text-gray-600" for="firstname"
                >Tên tên loại thành viên</label
              >
              <input
                id="firstname"
                v-model="form.memberTypeName"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="text"
                placeholder="Nhập tên loại thành viên"
              />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label class="text-sm font-medium text-gray-600" for="lastname"
                >Doanh thu tối thiểu</label
              >
              <input
                id="lastname"
                v-model="form.minimumRevenue"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="text"
                placeholder="Nhập doanh thu tối thiểu"
              />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label class="text-sm font-medium text-gray-600" for="lastname">Giảm trị/KM</label>
              <input
                id="lastname"
                v-model="form.note"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="text"
                placeholder="Giảm trị/KM"
              />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label class="text-sm font-medium text-gray-600" for="lastname">Mô tả</label>
              <input
                id="lastname"
                v-model="form.description"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="text"
                placeholder="Nhập Mô tả"
              />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label class="text-sm font-medium text-gray-600" for="lastname">Ghi chú</label>
              <input
                id="lastname"
                v-model="form.minimumRevenue"
                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="text"
                placeholder="Nhập ghi chú"
              />
            </div>
          </div>
        </fieldset>
        <!-- Nút submit -->
        <div class="flex justify-end">
          <button
            class="m-2 rounded-md bg-blue-600 p-2 font-semibold text-white transition-colors hover:bg-blue-700"
            type="submit"
          >
            Tạo mới
          </button>
          <button
            class="m-2 rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            type="button"
            @click="isModalOpen = false"
          >
            Đóng
          </button>
        </div>
      </form>
    </div>
  </UIModal>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'

interface MemberType {
  id?: string
  memberTypeName: string
  minimumRevenue: number
  discountOrPromotion: string
  description: string
  note: string
  actions?: string
}

const props = defineProps<{
  show: boolean
  types: MemberType[]
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
}>()

const isModalVisible = ref(props.show)
const isModalOpen = ref(false)
const searchQuery = ref('')

// Đồng bộ prop show với isModalVisible
watch(
  () => props.show,
  (newValue) => {
    isModalVisible.value = newValue
  },
  { immediate: true }
)

watch(isModalVisible, (newValue) => {
  emit('update:show', newValue)
})

// Lọc dữ liệu theo tìm kiếm
const filteredTypes = computed(() => {
  if (!searchQuery.value) return props.types
  const q = searchQuery.value.toLowerCase()
  return props.types.filter(
    (type) =>
      type.memberTypeName.toLowerCase().includes(q) ||
      type.description.toLowerCase().includes(q) ||
      type.note.toLowerCase().includes(q)
  )
})

// Thêm mới loại thành viên (giả lập)
const form = reactive<MemberType>({
  memberTypeName: '',
  minimumRevenue: 0,
  discountOrPromotion: '',
  description: '',
  note: ''
})

const openAddModal = () => {
  Object.assign(form, {
    memberTypeName: '',
    minimumRevenue: 0,
    discountOrPromotion: '',
    description: '',
    note: ''
  })
  isModalOpen.value = true
}
const onSubmit = () => {
  alert(`Tạo loại thành viên`)
}

// Sửa loại thành viên (giả lập)
const editMemberType = (type: MemberType) => {
  // Tạm thời hiển thị alert, bạn có thể thay bằng form chỉnh sửa
  alert(`Chỉnh sửa: ${type.memberTypeName}`)
}

// Xóa loại thành viên (giả lập)
const deleteMemberType = (id?: string) => {
  if (confirm('Bạn có chắc chắn muốn xóa loại thành viên này?')) {
    // Giả lập xóa, vì không có API
    alert(`Đã xóa loại thành viên có ID: ${id}`)
  }
}
</script>

<style scoped>
/* Thêm style tùy chỉnh nếu cần */
</style>
