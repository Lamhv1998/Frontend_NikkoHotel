<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form
      class="mx-auto max-w-5xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
      @submit.prevent="onSubmit"
    >
      <!-- THÔNG TIN PHÒNG -->
      <fieldset class="grid grid-cols-4 gap-6">
        <div class="col-span-full lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin phòng</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="roomNum">Số phòng</label>
            <input
              id="roomNum"
              v-model="form.roomNum"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập số phòng"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="floor">Tầng</label>
            <input
              id="floor"
              v-model="form.floor"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập tầng"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="roomType">Loại phòng</label>
            <select
              id="roomType"
              v-model="form.roomType"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn loại phòng--</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="status">Trạng thái</label>
            <select
              id="status"
              v-model="form.status"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn trạng thái--</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
          </div>
        </div>
      </fieldset>

      <!-- THÔNG TIN KHÁC -->
      <fieldset class="grid grid-cols-4 gap-6">
        <div class="col-span-full lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin khác</p>
          <p class="text-sm text-gray-500">Bao gồm sức chứa, giường, mô tả và hình ảnh</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="maxPeople">Sức chứa</label>
            <input
              id="maxPeople"
              v-model="form.maxPeople"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="number"
              placeholder="Sức chứa"
              min="1"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="bedCount">Số giường</label>
            <input
              id="bedCount"
              v-model="form.bedCount"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="number"
              placeholder="Số giường"
              min="1"
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="description">Mô tả</label>
            <textarea
              id="description"
              v-model="form.description"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Thêm mô tả chi tiết..."
              rows="3"
            ></textarea>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600">Ảnh phòng</label>
            <div class="mt-2 flex items-center gap-4">
              <img
                class="h-40 w-40 rounded-md border object-cover"
                :src="form.photo || 'https://picsum.photos/400/300?random=2'"
                alt="Preview"
              />
            </div>
            <div class="mt-4">
              <input
                id="room_photo"
                class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                type="file"
                @change="onFileChange"
              />
              <p class="mt-1 text-sm text-gray-500">Tải lên ảnh của phòng</p>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Nút submit -->
      <div class="flex justify-end">
        <button
          class="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          type="submit"
        >
          {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const props = defineProps({
  roomData: {
    type: Object,
    default: () => ({
      roomNum: '',
      floor: '',
      roomType: '',
      status: '',
      maxPeople: 1,
      bedCount: 1,
      description: '',
      photo: ''
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = reactive({ ...props.roomData })

const onSubmit = () => {
  emit('submit', { ...form })
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      form.photo = event.target.result
    }
    reader.readAsDataURL(file)
  }
}
</script>
