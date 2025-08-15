<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form
      class="mx-auto max-w-3xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
      @submit.prevent="onSubmit"
    >
      <fieldset class="grid grid-cols-4 gap-6">
        <div class="col-span-full lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin dịch vụ</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="name">Tên dịch vụ</label>
            <input
              id="name"
              v-model="form.name"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập tên dịch vụ"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="code">Mã dịch vụ</label>
            <input
              id="code"
              v-model="form.code"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập mã dịch vụ"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="type">Loại dịch vụ</label>
            <select
              id="type"
              v-model="form.type"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="" disabled>--Chọn loại--</option>
              <option value="laundry">Giặt ủi</option>
              <option value="restaurant">Nhà hàng</option>
              <option value="spa">Spa</option>
              <option value="pickup">Đưa đón</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="price">Giá</label>
            <input
              id="price"
              v-model="form.price"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="number"
              placeholder="Nhập giá dịch vụ"
              min="0"
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="unit">Đơn vị tính</label>
            <input
              id="unit"
              v-model="form.unit"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Ví dụ: lần, suất, kg..."
              required
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="membership"
              >Loại thành viên áp dụng</label
            >
            <select
              id="membership"
              v-model="form.membership"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Tất cả</option>
              <option value="vip">VIP</option>
              <option value="regular">Thường</option>
            </select>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="description">Mô tả</label>
            <textarea
              id="description"
              v-model="form.description"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Nhập mô tả dịch vụ"
              rows="3"
            ></textarea>
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
  serviceData: {
    type: Object,
    default: () => ({
      name: '',
      code: '',
      type: '',
      price: '',
      unit: '',
      membership: '',
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

const form = reactive({ ...props.serviceData })

// Đảm bảo form cập nhật khi props thay đổi (nếu dùng để sửa)
watch(
  () => props.serviceData,
  (val) => Object.assign(form, val),
  { deep: true }
)

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>
