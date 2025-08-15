<template>
  <div class="min-h-screen">
    <!-- Banner chính -->
    <CBanner />

    <!-- Hero Section - Giới thiệu ngắn gọn -->
    <section class="bg-gradient-to-br from-system-primary-120 via-system-primary-100 to-system-primary-80 py-20 relative overflow-hidden">
      <!-- Background pattern overlay -->
      <div class="absolute inset-0 bg-black/10"></div>
      
      <div class="container relative z-10">
        <div class="text-center space-y-6 max-w-4xl mx-auto">
          <h2 class="text-h2 xl:text-h1 text-white font-bold drop-shadow-lg">
            Chào mừng đến với Nikko Luxury Hotel
          </h2>
          <p class="text-body xl:text-h6 text-white/90 leading-relaxed">
            Trải nghiệm lưu trú đẳng cấp tại trung tâm thành phố Hồ Chí Minh. 
            Chúng tôi cam kết mang đến cho bạn những khoảnh khắc đáng nhớ nhất.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NuxtLink to="/rooms">
              <button class="bg-white text-system-primary-120 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-system-primary-10 hover:text-system-primary-120 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-white">
                🏨 Đặt phòng ngay
              </button>
            </NuxtLink>
            <NuxtLink to="/restaurant">
              <button class="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-system-primary-120 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                🍽️ Khám phá ẩm thực
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-20 translate-y-20"></div>
    </section>

    <!-- Về chúng tôi -->
    <About />

    <!-- Xem trước phòng -->
    <Rooms />

    <!-- Ẩm thực đặc sắc -->
    <Menu />

    <!-- Phương tiện di chuyển -->
    <Travel />

    <!-- Tin tức mới nhất - Di chuyển xuống dưới -->
    <News />

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
import CBanner from '~/components/c/CBanner.vue'
import CWave from '~/components/c/CWave.vue'

/* layout */
definePageMeta({
  layout: 'landing'
})
</script>
