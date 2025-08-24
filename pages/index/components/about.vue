<template>
  <section class="section-container bg-system-background !pb-[7.5rem] xl:!pb-[12.5rem]">
    <div class="relative">
      <!-- Ảnh nền -->
      <NuxtImg
        class="absolute inset-0 h-full w-full object-cover"
        src="/imgur/STdNjcx.jpg"
        width="100vw"
      />

      <!-- Nội dung -->
      <div class="container relative flex flex-row-reverse px-5 xl:px-3">
        <div
          class="ml-5 translate-y-10 space-y-10 rounded-l-[2.5rem] rounded-tr-[2.5rem] bg-gradient-to-b from-system-background/80 to-system-primary-100/80 p-6 text-white xl:ml-0 xl:w-4/5 xl:translate-y-20 xl:space-y-20 xl:rounded-l-[5rem] xl:rounded-tr-[5rem] xl:p-20"
        >
          <!-- Tiêu đề -->
          <UITitle text1="Về chúng tôi" white />

          <!-- Mô tả -->
          <div class="space-y-4 text-body-2 xl:space-y-10 xl:text-body ">
            <p class="text-white">
              Khách sạn Nika Luxury, nằm ở trung tâm thành phố Hồ Chí Minh xinh đẹp, là viên ngọc
              sáng và niềm tự hào của thành phố này.<br />
              Sứ mệnh của chúng tôi không chỉ mang đến trải nghiệm lưu trú sang trọng mà còn gửi gắm
              vẻ đẹp và sức sống của Hồ Chí Minh đến từng vị khách.
            </p>
            <p class="text-white">
              Khách sạn của chúng tôi sở hữu thiết kế hiện đại, tinh tế, từng chi tiết đều toát lên
              nghệ thuật và sự sáng tạo.<br />
              Đội ngũ nhân viên luôn phục vụ tận tâm, chuyên nghiệp, giúp mỗi khách hàng cảm nhận
              được sự ấm áp như ở nhà.
            </p>
            <p class="text-white">
              Tại đây, bạn có thể ngắm nhìn thành phố Hồ Chí Minh sôi động qua khung cửa sổ, hoặc
              thưởng thức những món ăn tinh tế tại nhà hàng của chúng tôi, trải nghiệm bữa tiệc vị
              giác tuyệt vời.
            </p>
            <p class="text-white">
              Nika Luxury không chỉ là nơi lưu trú lý tưởng tại Hồ Chí Minh mà còn là sân khấu
              tuyệt vời để bạn cảm nhận trọn vẹn sức hút của thành phố này. Chúng tôi mong được chào
              đón bạn và cùng nhau tạo nên những kỷ niệm đáng nhớ tại Hồ Chí Minh.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import UITitle from './UI/UITitle.vue'
</script>
