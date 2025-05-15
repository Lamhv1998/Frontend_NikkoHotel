<template>
  <div>
    <!-- Toàn màn hình -->
    <CBanner />

    <!-- Tin tức mới nhất -->
    <News />

    <!-- Về chúng tôi -->
    <About />

    <!-- Xem trước phòng -->
    <Rooms />

    <!-- Ẩm thực đặc sắc -->
    <Menu />

    <!-- Phương tiện di chuyển -->
    <Travel />

    <!-- Trang trí sọc -->
    <CWave />
  </div>
</template>

<script lang="ts" setup>
import News from './components/news.vue'
import About from './components/about.vue'
import Rooms from './components/rooms.vue'
import Menu from './components/menu.vue'
import Travel from './components/travel.vue'

/* layout */
definePageMeta({
  layout: 'landing'
})
</script>
