<template>
  <header class="relative text-white shadow-md">
    <!-- Background Image -->
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('https://picsum.photos/1200/300?random=1');"
    ></div>
    <!-- Overlay for better text readability -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <div class="relative z-10 container mx-auto flex flex-col p-4">
      <!-- Top Section - Search and Free in Order -->

      <!-- Bottom Section - User Info and Navigation -->
      <div class="flex justify-between items-center">
        <!-- User Info Section (Left) -->
        <div class="flex items-center space-x-4">
          <img
            class="h-10 w-10 rounded-lg dark:bg-gray-500"
            src="~/public/img/5EHlsYm.png"
            alt="User avatar"
          />
          <div>
            <h2 class="text-lg font-semibold text-system-white">Nguyễn Văn A</h2>
            <span class="flex items-center space-x-1 text-xs text-system-white">
              <NuxtLink to="/admin/profile" class="hover:underline">View profile</NuxtLink>
            </span>
          </div>
        </div>

        <!-- Navigation and Actions (Right) -->
        <div class="flex items-center space-x-4">
          <nav class="flex space-x-4">
            <div v-for="menu in menuslidebar" :key="menu.title" class="relative">
              <!-- Dropdown Trigger -->
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

              <!-- Dropdown Menu -->
              <div
                v-if="openDropdown === menu.title"
                class="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg z-20"
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
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { menuslidebar } = useMenuSidebar()
const openDropdown = ref(null)

const toggleDropdown = (title) => {
  openDropdown.value = openDropdown.value === title ? null : title
}
</script>

<style lang="scss" scoped>
header {
  height: 200px;
}

/* Smooth transitions for dropdown */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Ensure dropdowns are positioned correctly */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* Ensure the main container stays fixed */
.z-10 {
  position: relative;
  z-index: 10;
}

/* Higher z-index for dropdown to ensure it appears above other elements */
.z-20 {
  z-index: 20;
}

/* Prevent layout shift by ensuring nav items don't affect flow */
nav {
  display: flex;
  align-items: center;
}

/* Search input styling */
input::placeholder {
  color: white;
  opacity: 0.8;
}
</style>