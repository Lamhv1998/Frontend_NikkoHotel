<template>
  <section class="p-6 dark:bg-gray-100 dark:text-gray-900">
    <form class="container mx-auto flex flex-col space-y-12" action="" novalidate="">
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
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder="First name"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm" for="lastname">Last name</label>
            <input
              id="lastname"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm" for="email">Email</label>
            <input
              id="email"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm" for="address">Address</label>
            <input
              id="address"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder=""
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <label class="text-sm" for="city">City</label>
            <input
              id="city"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder=""
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <label class="text-sm" for="state">State / Province</label>
            <input
              id="state"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder=""
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <label class="text-sm" for="zip">ZIP / Postal</label>
            <input
              id="zip"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder=""
            />
          </div>
        </div>
      </fieldset>
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
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <label class="text-sm" for="website">Website</label>
            <input
              id="website"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              type="text"
              placeholder="https://"
            />
          </div>
          <div class="col-span-full">
            <label class="text-sm" for="bio">Bio</label>
            <textarea
              id="bio"
              class="w-full rounded-md focus:ring focus:ring-opacity-75 dark:border-gray-300 dark:text-gray-50 focus:dark:ring-violet-600"
              placeholder=""
            ></textarea>
          </div>
          <div class="col-span-full">
            <label class="text-sm" for="bio">Photo</label>
            <div class="flex items-center space-x-2">
              <img
                class="h-10 w-10 rounded-full dark:bg-gray-300 dark:bg-gray-500"
                src="https://picsum.photos/400/300?random=2"
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
    </form>
  </section>
</template>
<script setup>
definePageMeta({
  layout: 'adminlayout'
})
</script>

<style scoped></style>
