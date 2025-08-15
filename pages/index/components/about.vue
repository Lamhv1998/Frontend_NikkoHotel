<template>
  <section class="section-container bg-gradient-to-br from-system-primary-10 to-white py-20">
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Nội dung -->
        <div class="space-y-8 order-2 lg:order-1">
          <div class="space-y-4">
            <p class="text-system-primary-120 font-semibold text-lg">Về chúng tôi</p>
            <h2 class="text-h2 xl:text-h1 text-system-primary-120 font-bold leading-tight">
              Nikko Luxury Hotel
            </h2>
            <p class="text-h5 text-system-primary-100 font-medium">
              Trải nghiệm lưu trú đẳng cấp tại trung tâm TP.HCM
            </p>
          </div>
          
          <div class="space-y-6 text-system-primary-100 leading-relaxed">
            <p class="text-body">
              Khách sạn Nikko Luxury, nằm ở trung tâm thành phố Hồ Chí Minh xinh đẹp, là viên ngọc
              sáng và niềm tự hào của thành phố này. Sứ mệnh của chúng tôi không chỉ mang đến trải nghiệm lưu trú sang trọng mà còn gửi gắm vẻ đẹp và sức sống của Hồ Chí Minh đến từng vị khách.
            </p>
            <p class="text-body">
              Khách sạn của chúng tôi sở hữu thiết kế hiện đại, tinh tế, từng chi tiết đều toát lên
              nghệ thuật và sự sáng tạo. Đội ngũ nhân viên luôn phục vụ tận tâm, chuyên nghiệp, giúp mỗi khách hàng cảm nhận được sự ấm áp như ở nhà.
            </p>
          </div>

          <!-- Thống kê -->
          <div class="grid grid-cols-3 gap-6 pt-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-system-primary-100 mb-2">150+</div>
              <div class="text-sm text-gray-600">Phòng nghỉ</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-system-primary-100 mb-2">5★</div>
              <div class="text-sm text-gray-600">Tiêu chuẩn</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-system-primary-100 mb-2">24/7</div>
              <div class="text-sm text-gray-600">Dịch vụ</div>
            </div>
          </div>

          <!-- Nút xem thêm -->
          <div class="pt-4">
            <button class="bg-system-primary-120 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-system-primary-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        <!-- Ảnh -->
        <div class="order-1 lg:order-2 relative">
          <div class="relative">
            <!-- Ảnh chính -->
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <NuxtImg
                class="w-full h-96 object-cover"
                src="/imgur/STdNjcx.jpg"
                alt="Nikko Luxury Hotel"
              />
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            <!-- Ảnh phụ -->
            <div class="absolute -bottom-8 -right-8 w-48 h-32 rounded-xl overflow-hidden shadow-xl">
              <NuxtImg
                class="w-full h-full object-cover"
                src="https://picsum.photos/300/200?random=10"
                alt="Phòng nghỉ"
              />
            </div>
            
            <!-- Ảnh phụ 2 -->
            <div class="absolute -top-8 -left-8 w-40 h-28 rounded-xl overflow-hidden shadow-xl">
              <NuxtImg
                class="w-full h-full object-cover"
                src="https://picsum.photos/300/200?random=11"
                alt="Nhà hàng"
              />
            </div>
          </div>
          
          <!-- Decoration -->
          <div class="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-system-primary-100/10 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Component không cần logic phức tạp
</script>
