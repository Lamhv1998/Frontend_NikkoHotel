<template>
  <form class="container mx-auto flex flex-col space-y-12" @submit.prevent="onSubmit">
    <!-- Thông tin cá nhân -->
    <fieldset class="grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm dark:bg-gray-50">
      <div class="col-span-full space-y-2 lg:col-span-1">
        <p class="font-medium">Thông tin cá nhân</p>
        <p class="text-xs">Vui lòng nhập thông tin cá nhân của bạn.</p>
      </div>
      <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
        <div class="col-span-full sm:col-span-3">
          <label class="text-sm" for="firstname">First name</label>
          <input
            id="firstname"
            v-model="form.firstname"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
            placeholder="First name"
          />
        </div>
        <div class="col-span-full sm:col-span-3">
          <label class="text-sm" for="lastname">Last name</label>
          <input
            id="lastname"
            v-model="form.lastname"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
            placeholder="Last name"
          />
        </div>
        <div class="col-span-full sm:col-span-3">
          <label class="text-sm" for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="col-span-full">
          <label class="text-sm" for="address">Address</label>
          <input
            id="address"
            v-model="form.address"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
          />
        </div>
        <div class="col-span-full sm:col-span-2">
          <label class="text-sm" for="city">City</label>
          <input
            id="city"
            v-model="form.city"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
          />
        </div>
        <div class="col-span-full sm:col-span-2">
          <label class="text-sm" for="state">State / Province</label>
          <input
            id="state"
            v-model="form.state"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
          />
        </div>
        <div class="col-span-full sm:col-span-2">
          <label class="text-sm" for="zip">ZIP / Postal</label>
          <input
            id="zip"
            v-model="form.zip"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
          />
        </div>
      </div>
    </fieldset>

    <!-- Thông tin khác -->
    <fieldset class="grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm dark:bg-gray-50">
      <div class="col-span-full space-y-2 lg:col-span-1">
        <p class="font-medium">Thông tin khác</p>
        <p class="text-xs">Hình ảnh hoặc biệt hiệu ...</p>
      </div>
      <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
        <div class="col-span-full sm:col-span-3">
          <label class="text-sm" for="username">Username</label>
          <input
            id="username"
            v-model="form.username"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="col-span-full sm:col-span-3">
          <label class="text-sm" for="website">Website</label>
          <input
            id="website"
            v-model="form.website"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
            type="text"
            placeholder="https://"
          />
        </div>
        <div class="col-span-full">
          <label class="text-sm" for="bio">Bio</label>
          <textarea
            id="bio"
            v-model="form.bio"
            class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
          ></textarea>
        </div>
        <div class="col-span-full">
          <label class="text-sm">Photo</label>
          <div class="flex items-center space-x-2">
            <img
              class="h-10 w-10 rounded-full dark:bg-gray-300"
              :src="form.photo || 'https://picsum.photos/400/300?random=2'"
              alt=""
            />
            <button class="rounded-md border px-4 py-2 dark:border-gray-800" type="button">
              Update
            </button>
            <button class="rounded-md border px-4 py-2 dark:border-gray-800" type="button">
              Change
            </button>
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
