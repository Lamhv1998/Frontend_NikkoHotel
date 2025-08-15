<template>
  <section class="relative bg-gradient-to-br from-system-primary-120 via-system-primary-100 to-system-primary-80 py-20">
    <!-- Wave decoration -->
    <div class="absolute top-0 left-0 w-full overflow-hidden">
      <img 
        class="w-full h-20 object-cover" 
        src="/img/line2.png" 
        alt="Wave decoration"
      />
    </div>

    <!-- Footer content -->
    <div class="container relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
        <!-- Thông tin khách sạn -->
        <div class="space-y-4">
          <h3 class="text-xl font-bold">Nikko Luxury Hotel</h3>
          <p class="text-sm opacity-90 leading-relaxed">
            Trải nghiệm lưu trú đẳng cấp tại trung tâm TP.HCM với dịch vụ 5 sao và tiện nghi hiện đại.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-white hover:text-system-primary-20 transition-colors duration-300">
              <Icon name="ic:baseline-facebook" class="text-2xl" />
            </a>
            <a href="#" class="text-white hover:text-system-primary-20 transition-colors duration-300">
              <Icon name="ic:baseline-instagram" class="text-2xl" />
            </a>
            <a href="#" class="text-white hover:text-system-primary-20 transition-colors duration-300">
              <Icon name="ic:baseline-youtube" class="text-2xl" />
            </a>
          </div>
        </div>

        <!-- Liên kết nhanh -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Liên kết nhanh</h4>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/rooms" class="hover:text-system-primary-20 transition-colors duration-300">Đặt phòng</NuxtLink></li>
            <li><NuxtLink to="/restaurant" class="hover:text-system-primary-20 transition-colors duration-300">Nhà hàng</NuxtLink></li>
            <li><NuxtLink to="/services" class="hover:text-system-primary-20 transition-colors duration-300">Dịch vụ</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-system-primary-20 transition-colors duration-300">Về chúng tôi</NuxtLink></li>
          </ul>
        </div>

        <!-- Dịch vụ -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Dịch vụ</h4>
          <ul class="space-y-2 text-sm">
            <li>Phòng nghỉ sang trọng</li>
            <li>Nhà hàng đa dạng</li>
            <li>Spa & Wellness</li>
            <li>Hội nghị & Sự kiện</li>
          </ul>
        </div>

        <!-- Liên hệ -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Liên hệ</h4>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2">
              <Icon name="ic:baseline-phone" class="text-system-primary-20" />
              <span>+84 28 1234 5678</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="ic:baseline-email" class="text-system-primary-20" />
              <span>info@nikkohotel.com</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="ic:baseline-location-on" class="text-system-primary-20" />
              <span>123 Lê Lợi, Q1, TP.HCM</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-white/20 mt-12 pt-8 text-center">
        <p class="text-sm opacity-80">
          © 2024 Nikko Luxury Hotel. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Component không cần logic phức tạp
</script>
