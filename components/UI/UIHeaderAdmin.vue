<template>
  <header class="relative z-20 flex h-44 items-center text-white shadow-md">
    <!-- Hình nền -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://picsum.photos/1200/300?random=1')"
    ></div>

    <!-- Lớp phủ để cải thiện khả năng đọc văn bản -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <div class="relative flex h-full w-full items-center p-4">
      <!-- Phần thông tin người dùng (Cố định bên trái) -->
      <div class="flex w-1/4 items-center">
        <UserInfo />
      </div>
      <PageLogo />
      <!-- Đường kẻ trắng ngăn cách -->
      <div class="mx-4 h-12 w-px bg-white"></div>

      <!-- Điều hướng và hành động (Bên phải) -->
      <div class="flex w-3/4 flex-wrap items-center justify-start">
        <nav class="flex flex-wrap space-x-4">
          <DropdownMenu
            v-for="menu in menuslidebar"
            :key="menu.title"
            :menu="menu"
            :openDropdown="openDropdown"
            :toggleDropdown="toggleDropdown"
          />
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useMenuSidebar } from '../../composables/useMenuSidebar'

const { menuslidebar } = useMenuSidebar()
const openDropdown = ref(null)

const toggleDropdown = (title) => {
  openDropdown.value = openDropdown.value === title ? null : title
}

import UserInfo from './UserInfo.vue'
import DropdownMenu from './DropdownMenu.vue'
</script>

<style lang="scss" scoped></style>
