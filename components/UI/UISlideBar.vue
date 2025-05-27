<template>
  <div class="flex" @click="toggleMenu">
    <!-- Sidebar -->
    <aside
      :class="[
        'flex flex-col bg-system-background text-white transition-all duration-300 ',
        isOpen ? 'w-64' : 'w-16'
      ]"
    >
      <!-- Menu Sections -->
      <div class="fixed flex-1 overflow-y-auto py-12">
        <div v-if="isOpen" class="px-2 py-2">
          <ul class="space-y-1 pb-4 pt-2 text-sm">
            <li v-for="menu in menuslidebar" :key="menu.title" class="rounded-sm">
              <div class="p-2 text-sm font-semibold uppercase tracking-widest dark:text-gray-600">
                {{ menu.title }}
              </div>
              <ul class="space-y-1">
                <li v-for="item in menu.items" :key="item.name" class="rounded-sm">
                  <NuxtLink
                    class="flex items-center space-x-3 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-200"
                    :to="item.link"
                  >
                    <Icon class="h-5 w-5 dark:text-gray-600" :name="item.icon" />
                    <span>{{ item.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-end">
          <button class="rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-200">
            <Icon
              class="h-10 w-9 dark:text-gray-800"
              :name="isOpen ? 'mdi:arrow-collapse-left' : 'mdi:menu'"
            />
          </button>
        </div>
      </div>
    </aside>
    <!-- User Info Section (Top) -->
    <div v-if="isOpen" class="fixed m-1 flex items-center space-x-4 p-1">
      <img
        class="h-12 w-12 rounded-lg dark:bg-gray-500"
        src="https://picsum.photos/400/300?random=1"
        alt="User avatar"
      />
      <div>
        <h2 class="text-lg font-semibold text-system-white">Leroy Jenkins</h2>
        <span class="flex items-center space-x-1">
          <NuxtLink
            class="text-xs text-system-white hover:underline dark:text-gray-600"
            to="/admin/profile"
          >
            View profile
          </NuxtLink>
        </span>
      </div>
    </div>
    <!-- Nội dung chính (slot hoặc router-view) -->
    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { menuslidebar } = useMenuSidebar()
const isOpen = ref(true)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped>
/* Thêm hiệu ứng mượt mà khi toggle */
.transition-all {
  transition: width 0.3s ease-in-out;
}
</style>
