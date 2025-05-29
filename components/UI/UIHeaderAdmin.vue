<template>
  <header class="relative text-white shadow-md z-20 h-80 flex items-center">
    <!-- Hình nền -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://picsum.photos/1200/300?random=1');"
    ></div>
    <!-- Lớp phủ để cải thiện khả năng đọc văn bản -->
    <div class="absolute inset-0 bg-black opacity-40"></div>
    
    <div class="relative flex w-full h-full p-4 items-center">
      <!-- Phần thông tin người dùng (Cố định bên trái) -->
      <div class="flex items-center w-1/4">
        <UserInfo />
      </div>

      <!-- Đường kẻ trắng ngăn cách -->
      <div class="w-px h-12 bg-white mx-4"></div>

      <!-- Điều hướng và hành động (Bên phải) -->
      <div class="flex flex-wrap justify-start items-center w-3/4">
        <nav class="flex space-x-4 flex-wrap">
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

<style lang="scss" scoped>

</style>
