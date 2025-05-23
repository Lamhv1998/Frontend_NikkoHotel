<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form
      class="mx-auto max-w-5xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
      @submit.prevent="onSubmit"
    >
      <!-- Thông tin cá nhân -->
      <fieldset class="grid grid-cols-4 gap-6">
        <div class="col-span-full space-y-2 lg:col-span-1">
          <p class="text-lg font-semibold text-gray-700">Thông tin cá nhân</p>
          <p class="text-xs text-gray-600">Vui lòng nhập thông tin cá nhân của bạn.</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="firstname">First name</label>
            <input
              id="firstname"
              v-model="form.firstname"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="First name"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="lastname">Last name</label>
            <input
              id="lastname"
              v-model="form.lastname"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="role">Quyền:</label>
            <select
              id="role"
              v-model="form.role"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>-- Chọn quyền --</option>
              <option value="admin">Admin</option>
              <option value="user">Người dùng</option>
              <option value="staff">Nhân viên</option>
            </select>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="address">Address</label>
            <input
              id="address"
              v-model="form.address"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <label class="text-sm font-medium text-gray-600" for="city">City</label>
            <input
              id="city"
              v-model="form.city"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <label class="text-sm font-medium text-gray-600" for="state">State / Province</label>
            <input
              id="state"
              v-model="form.state"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <label class="text-sm font-medium text-gray-600" for="zip">ZIP / Postal</label>
            <input
              id="zip"
              v-model="form.zip"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
        </div>
      </fieldset>

      <!-- Thông tin khác -->
      <fieldset class="grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm dark:bg-gray-50">
        <div class="col-span-full space-y-2 lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin khác</p>
          <p class="text-xs">Hình ảnh hoặc biệt hiệu ...</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <label class="font-medium text-gray-600" for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm font-medium text-gray-600" for="website">Website</label>
            <input
              id="website"
              v-model="form.website"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="https://"
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="bio">Bio</label>
            <textarea
              id="bio"
              v-model="form.bio"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600">Photo</label>
            <div class="flex items-center space-x-2">
              <img
                class="h-10 w-10 rounded-full dark:bg-gray-300"
                :src="form.photo || 'https://picsum.photos/400/300?random=2'"
                alt=""
              />
            </div>
            <div class="mx-auto max-w-lg">
              <label
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
                >Upload file</label
              >
              <input
                id="user_avatar"
                class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                type="file"
                aria-describedby="user_avatar_help"
              />
              <div
                id="user_avatar_help"
                class="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Upload ảnh của nhân viên
              </div>
            </div>
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
const props = defineProps({
  userData: {
    type: Object,
    default: () => ({
      firstname: '',
      lastname: '',
      email: '',
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
