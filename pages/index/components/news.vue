<template>
  <section class="section-container relative bg-gradient-to-br from-white to-system-primary-10 py-20">
    <!-- Trang trí chấm -->
    <img
      class="absolute right-6 top-10 z-0 xl:right-[11.25rem] xl:top-[6.25rem]"
      src="/img/dot.png"
      alt="Dot decoration"
      width="100"
    />
    <img
      class="absolute -bottom-[3.75rem] left-6 z-0 xl:-bottom-20 xl:left-[12.5rem]"
      src="/img/dot.png"
      alt="Dot decoration"
      width="200"
    />

    <!-- Nội dung -->
    <div class="container relative">
      <!-- Tiêu đề section -->
      <div class="text-center mb-16">
        <h2 class="text-h2 xl:text-h1 text-system-primary-120 font-bold mb-4">
          Tin tức & Sự kiện
        </h2>
        <p class="text-body text-system-primary-100 max-w-2xl mx-auto">
          Cập nhật những tin tức mới nhất về khách sạn, ưu đãi đặc biệt và các sự kiện sắp diễn ra
        </p>
      </div>

      <!-- Danh sách tin -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(newItem, index) in news"
          :key="index"
          class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          @click="openNew(index)"
        >
          <!-- Ảnh -->
          <div class="relative overflow-hidden">
            <NuxtImg
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              :src="newItem.image"
              :alt="newItem.title"
            />
            <div class="absolute top-4 right-4">
              <span class="bg-system-primary-100 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {{ newItem.category }}
              </span>
            </div>
          </div>

          <!-- Nội dung -->
          <div class="p-6 space-y-4">
            <div class="flex items-center gap-2 text-sm text-gray-500">
              <Icon name="ic:baseline-calendar-today" class="text-system-primary-100" />
              <span>{{ newItem.date }}</span>
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 group-hover:text-system-primary-100 transition-colors duration-300">
              {{ newItem.title }}
            </h3>
            
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {{ newItem.description }}
            </p>
            
            <div class="flex items-center justify-between pt-2">
              <span class="text-system-primary-100 text-sm font-medium">Đọc thêm</span>
              <Icon 
                name="ic:baseline-arrow-forward" 
                class="text-system-primary-100 group-hover:translate-x-1 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Nút xem tất cả tin tức -->
      <div class="text-center mt-12">
        <button class="bg-system-primary-120 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-system-primary-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
          Xem tất cả tin tức
        </button>
      </div>
    </div>

    <!-- Modal -->
    <UIModal v-model="newOpen">
      <div class="bg-white rounded-2xl overflow-hidden max-w-4xl mx-4">
        <div class="relative">
          <!-- Ảnh header -->
          <div class="aspect-video overflow-hidden">
            <NuxtImg
              class="w-full h-full object-cover"
              :src="news[currentNew].image"
              :alt="news[currentNew].title"
            />
          </div>
          
          <!-- Nút đóng modal -->
          <button
            class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-gray-700 transition-all duration-300 hover:bg-white hover:scale-110"
            type="button"
            @click="newOpen = false"
          >
            <Icon name="ic:baseline-close" />
          </button>
        </div>

        <!-- Nội dung modal -->
        <div class="p-8">
          <div class="flex items-center gap-3 mb-4">
            <span class="bg-system-primary-100 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {{ news[currentNew].category }}
            </span>
            <span class="text-gray-500 text-sm">{{ news[currentNew].date }}</span>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ news[currentNew].title }}
          </h2>
          
          <p class="text-gray-600 leading-relaxed">
            {{ news[currentNew].description }}
          </p>
          
          <div class="mt-6 pt-6 border-t border-gray-200">
            <button 
              class="bg-system-primary-100 text-white px-6 py-3 rounded-lg font-semibold hover:bg-system-primary-80 transition-colors duration-300"
              @click="newOpen = false"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </UIModal>
  </section>
</template>

<script lang="ts" setup>
import UIModal from '~/components/UI/UIModal.vue'

// Dữ liệu mẫu cải tiến
const news = [
  {
    title: 'Khai trương nhà hàng Nhật Bản mới',
    description: 'Nhà hàng Nhật Bản "Sakura" tại tầng 2 đã chính thức mở cửa phục vụ quý khách. Thưởng thức ẩm thực Nhật Bản chính gốc với không gian sang trọng và view thành phố tuyệt đẹp.',
    image: 'https://picsum.photos/400/300?random=1',
    category: 'Nhà hàng',
    date: '15/12/2024'
  },
  {
    title: 'Ưu đãi đặc biệt mùa hè 2024',
    description: 'Giảm giá lên đến 30% cho tất cả các loại phòng trong tháng 6 và 7. Đặt phòng sớm để nhận thêm ưu đãi đặc biệt và dịch vụ spa miễn phí.',
    image: 'https://picsum.photos/400/300?random=2',
    category: 'Khuyến mãi',
    date: '10/12/2024'
  },
  {
    title: 'Đêm nhạc Acoustic cuối tuần',
    description: 'Thưởng thức đêm nhạc Acoustic đặc biệt vào mỗi tối thứ 7 tại sảnh chính. Hòa mình vào không gian âm nhạc lãng mạn với view thành phố về đêm.',
    image: 'https://picsum.photos/400/300?random=3',
    category: 'Sự kiện',
    date: '08/12/2024'
  }
]

const newOpen = ref(false)
const currentNew = ref(0)

const openNew = (index: number) => {
  currentNew.value = index
  newOpen.value = true
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
