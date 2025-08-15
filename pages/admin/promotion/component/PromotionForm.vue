<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form
      class="mx-auto max-w-3xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
      @submit.prevent="onSubmit"
    >
      <fieldset class="grid grid-cols-4 gap-6">
        <div class="col-span-full lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin khuyến mãi</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="name">Tên khuyến mãi</label>
            <input
              id="name"
              v-model="form.name"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập tên khuyến mãi"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="code">Mã khuyến mãi</label>
            <input
              id="code"
              v-model="form.code"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập mã khuyến mãi"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="type">Loại khuyến mãi</label>
            <select
              id="type"
              v-model="form.type"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>--Chọn loại--</option>
              <option value="percent">Phần trăm (%)</option>
              <option value="amount">Số tiền (VNĐ)</option>
            </select>
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="value">Giá trị</label>
            <input
              id="value"
              v-model="form.value"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="number"
              placeholder="Nhập giá trị"
              min="1"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="startDate">Ngày bắt đầu</label>
            <input
              id="startDate"
              v-model="form.startDate"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="date"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="endDate">Ngày kết thúc</label>
            <input
              id="endDate"
              v-model="form.endDate"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="date"
              required
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="description">Mô tả</label>
            <textarea
              id="description"
              v-model="form.description"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Nhập mô tả khuyến mãi"
              rows="3"
            ></textarea>
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="status">Loại thành viên</label>
            <select
              id="status"
              v-model="form.status"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="active">VIP</option>
              <option value="inactive">VIP1</option>
            </select>
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="status">Trạng thái</label>
            <select
              id="status"
              v-model="form.status"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="active">Đang áp dụng</option>
              <option value="inactive">Ngừng áp dụng</option>
            </select>
          </div>
        </div>
      </fieldset>
      <div class="flex justify-end">
        <button class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit">
          {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  promotionData: {
    type: Object,
    default: () => ({
      name: '',
      code: '',
      type: '',
      membership: '',
      value: '',
      startDate: '',
      endDate: '',
      description: '',
      status: 'active'
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = reactive({ ...props.promotionData })

// Đảm bảo form cập nhật khi props thay đổi (nếu dùng để sửa)
watch(
  () => props.promotionData,
  (val) => Object.assign(form, val),
  { deep: true }
)

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>
