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
            <label class="text-sm font-medium text-gray-600" for="firstname">Số phòng</label>
            <input
              id="firstname"
              v-model="form.roomNum"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập số phòng"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="lastname">Tầng</label>
            <input
              id="lastname"
              v-model="form.floor"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Nhập tầng"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="email">Loại phòng</label>
            <input
              id="email"
              v-model="form.email"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Loại phòng"
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="address">Trạng thái</label>
            <input
              id="address"
              v-model="form.address"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Trạng thái phòng"
            />
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
            <label class="text-sm font-medium text-gray-600" for="username">Sức chứa</label>
            <input
              id="username"
              v-model="form.username"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Sức chứa"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="website">Số giường</label>
            <input
              id="website"
              v-model="form.website"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Số giường"
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="bio">Mô tả</label>
            <textarea
              id="bio"
              v-model="form.bio"
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
                id="user_avatar"
                class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
                type="file"
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
const props = defineProps({
  roomData: {
    type: Object,
    default: () => ({
      roomNum: '',
      floor: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      username: '',
      website: '',
      bio: '',
      photo: ''
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = reactive({ ...props.userData })

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>
