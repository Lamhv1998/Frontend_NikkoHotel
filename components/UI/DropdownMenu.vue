<template>
  <div class="relative">
    <!-- Nút kích hoạt dropdown -->
    <button
      @click="toggleDropdown(menu.title)"
      class="flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-gray-700"
    >
      <span>{{ menu.title }}</span>
      <Icon
        class="h-5 w-5"
        :name="openDropdown === menu.title ? 'mdi:chevron-up' : 'mdi:chevron-down'"
      />
    </button>

    <!-- Menu dropdown -->
    <div
      v-if="openDropdown === menu.title"
      class="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg z-30"
    >
      <ul class="py-1">
        <li v-for="item in menu.items" :key="item.name">
          <NuxtLink
            :to="item.link"
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Icon class="h-5 w-5" :name="item.icon" />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  menu: Object,
  openDropdown: String,
  toggleDropdown: Function,
})
</script>

<style lang="scss" scoped>
/* Xóa @apply để tránh lỗi circular dependency */
</style>
