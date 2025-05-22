<template>
  <div class="min-h-screen bg-white bg-cover bg-center bg-no-repeat p-8 font-serif" style="background-color: antiquewhite;">
    <div class="max-w-5xl mx-auto mb-8">
      <UITitle text1="Đặt dịch vụ khách sạn"/>
    </div>
    <!-- Danh mục -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto mb-10">
      <div
        v-for="cat in categories"
        :key="cat"
        @click="selectCategory(cat)"
        class="cursor-pointer group relative rounded-xl overflow-hidden transition-all duration-300 border-2"
        :class="selectedCategory === cat
          ? 'border-yellow-500 shadow-lg'
          : 'border-white/50 hover:border-yellow-300'">
        <img
          :src="categoryImages[cat] || defaultImage"
          alt=""
          class="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h3 class="text-sm font-semibold text-white text-center drop-shadow">{{ cat }}</h3>
        </div>
      </div>
    </div>

    <!-- Danh sách dịch vụ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div
        v-for="service in pagedServices"
        :key="service.id"
        class="bg-white text-[#3B2500] rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
      >
        <img :src="service.image" alt="" class="w-full h-40 object-cover" />
        <div class="p-4 space-y-2">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">{{ service.name }}</h2>
            <span class="text-yellow-500 font-bold">{{ service.price.toLocaleString() }}₫</span>
          </div>
          <p class="text-sm italic text-gray-500">{{ service.category }}</p>

          <div class="flex justify-between mt-4">
            <NuxtLink :to="`/services/${service.id}`" class="block hover:text-yellow-600 flex-1">
            <button class="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-400">
              Xem chi tiết
            </button>
            </NuxtLink>
            <button class="text-sm text-yellow-500 hover:text-red-500">
              💖 Yêu thích
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Phân trang -->
    <div class="flex justify-center mt-12 space-x-4">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-md font-semibold transition-colors duration-300',
          currentPage === page
            ? 'bg-yellow-500 text-white shadow-lg'
            : 'bg-white/20 border border-yellow-500 text-white hover:bg-yellow-300 hover:text-[#4B2E00]'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import UITitle from '~/pages/blog/components/UI/UITitle.vue'

const categories = ['Tất cả', 'Đồ ăn', 'Thức uống', 'Giặt ủi', 'Đặt xe', 'Khác']

const services = [
  { id: 1, name: 'Phở bò', category: 'Đồ ăn', price: 75000, image: 'https://picsum.photos/400/300?random=10' },
  { id: 2, name: 'Cafe sữa', category: 'Thức uống', price: 40000, image: 'https://picsum.photos/400/300?random=11' },
  { id: 3, name: 'Giặt áo sơ mi', category: 'Giặt ủi', price: 20000, image: 'https://picsum.photos/400/300?random=12' },
  { id: 4, name: 'Thuê xe máy', category: 'Đặt xe', price: 150000, image: 'https://picsum.photos/400/300?random=13' },
  { id: 5, name: 'Massage', category: 'Khác', price: 250000, image: 'https://picsum.photos/400/300?random=14' },
  { id: 6, name: 'Bún chả', category: 'Đồ ăn', price: 70000, image: 'https://picsum.photos/400/300?random=15' },
  { id: 7, name: 'Nước ép cam', category: 'Thức uống', price: 45000, image: 'https://picsum.photos/400/300?random=16' },
  { id: 8, name: 'Bánh mì pate', category: 'Đồ ăn', price: 30000, image: 'https://picsum.photos/400/300?random=17' },
  { id: 9, name: 'Cơm tấm', category: 'Đồ ăn', price: 60000, image: 'https://picsum.photos/400/300?random=18' },
  { id: 10, name: 'Bún bò Huế', category: 'Đồ ăn', price: 80000, image: 'https://picsum.photos/400/300?random=19' },
  { id: 11, name: 'Bánh xèo', category: 'Đồ ăn', price: 50000, image: 'https://picsum.photos/400/300?random=20' },
  { id: 12, name: 'Cháo gà', category: 'Đồ ăn', price: 40000, image: 'https://picsum.photos/400/300?random=21' },
  { id: 13, name: 'Gỏi cuốn', category: 'Đồ ăn', price: 35000, image: 'https://picsum.photos/400/300?random=22' },
  { id: 14, name: 'Trà sữa', category: 'Thức uống', price: 50000, image: 'https://picsum.photos/400/300?random=23' },
  { id: 15, name: 'Sinh tố bơ', category: 'Thức uống', price: 45000, image: 'https://picsum.photos/400/300?random=24' },
  { id: 16, name: 'Cà phê đen', category: 'Thức uống', price: 35000, image: 'https://picsum.photos/400/300?random=25' },
  { id: 17, name: 'Trà đào cam sả', category: 'Thức uống', price: 48000, image: 'https://picsum.photos/400/300?random=26' },
  { id: 18, name: 'Soda chanh', category: 'Thức uống', price: 30000, image: 'https://picsum.photos/400/300?random=27' },
  { id: 19, name: 'Giặt quần jeans', category: 'Giặt ủi', price: 25000, image: 'https://picsum.photos/400/300?random=28' },
  { id: 20, name: 'Giặt áo khoác', category: 'Giặt ủi', price: 30000, image: 'https://picsum.photos/400/300?random=29' },
  { id: 21, name: 'Giặt chăn mền', category: 'Giặt ủi', price: 60000, image: 'https://picsum.photos/400/300?random=30' },
  { id: 22, name: 'Ủi áo dài', category: 'Giặt ủi', price: 20000, image: 'https://picsum.photos/400/300?random=31' },
  { id: 23, name: 'Giặt khăn lông', category: 'Giặt ủi', price: 15000, image: 'https://picsum.photos/400/300?random=32' },
  { id: 24, name: 'Đặt taxi 4 chỗ', category: 'Đặt xe', price: 120000, image: 'https://picsum.photos/400/300?random=33' },
  { id: 25, name: 'Đặt taxi 7 chỗ', category: 'Đặt xe', price: 180000, image: 'https://picsum.photos/400/300?random=34' },
  { id: 26, name: 'Đặt xe ôm', category: 'Đặt xe', price: 40000, image: 'https://picsum.photos/400/300?random=35' },
  { id: 27, name: 'Thuê xe đạp', category: 'Đặt xe', price: 50000, image: 'https://picsum.photos/400/300?random=36' },
  { id: 28, name: 'Thuê xe hơi', category: 'Đặt xe', price: 500000, image: 'https://picsum.photos/400/300?random=37' },
  { id: 29, name: 'Gội đầu thư giãn', category: 'Khác', price: 100000, image: 'https://picsum.photos/400/300?random=38' },
  { id: 30, name: 'Trang điểm dự tiệc', category: 'Khác', price: 300000, image: 'https://picsum.photos/400/300?random=39' },
  { id: 31, name: 'Cắt tóc nam', category: 'Khác', price: 80000, image: 'https://picsum.photos/400/300?random=40' },
  { id: 32, name: 'Cắt tóc nữ', category: 'Khác', price: 120000, image: 'https://picsum.photos/400/300?random=41' },
  { id: 33, name: 'Làm móng tay', category: 'Khác', price: 90000, image: 'https://picsum.photos/400/300?random=42' },
  { id: 34, name: 'Bún riêu', category: 'Đồ ăn', price: 60000, image: 'https://picsum.photos/400/300?random=43' },
  { id: 35, name: 'Bánh cuốn', category: 'Đồ ăn', price: 50000, image: 'https://picsum.photos/400/300?random=44' },
  { id: 36, name: 'Cơm chiên dương châu', category: 'Đồ ăn', price: 70000, image: 'https://picsum.photos/400/300?random=45' },
  { id: 37, name: 'Trà gừng mật ong', category: 'Thức uống', price: 40000, image: 'https://picsum.photos/400/300?random=46' },
  { id: 38, name: 'Cacao sữa nóng', category: 'Thức uống', price: 45000, image: 'https://picsum.photos/400/300?random=47' },
  { id: 39, name: 'Giặt bộ vest', category: 'Giặt ủi', price: 80000, image: 'https://picsum.photos/400/300?random=48' },
  { id: 40, name: 'Ủi quần âu', category: 'Giặt ủi', price: 20000, image: 'https://picsum.photos/400/300?random=49' },
  { id: 41, name: 'Giặt khăn trải giường', category: 'Giặt ủi', price: 35000, image: 'https://picsum.photos/400/300?random=50' },
  { id: 42, name: 'Đặt xe VIP', category: 'Đặt xe', price: 800000, image: 'https://picsum.photos/400/300?random=51' },
  { id: 43, name: 'Tắm trắng toàn thân', category: 'Khác', price: 400000, image: 'https://picsum.photos/400/300?random=52' },
  { id: 44, name: 'Spa thư giãn', category: 'Khác', price: 600000, image: 'https://picsum.photos/400/300?random=53' },
  { id: 45, name: 'Cạo mặt', category: 'Khác', price: 60000, image: 'https://picsum.photos/400/300?random=54' },
  { id: 46, name: 'Xông hơi', category: 'Khác', price: 200000, image: 'https://picsum.photos/400/300?random=55' },
  { id: 47, name: 'Giặt đồ khẩn cấp', category: 'Giặt ủi', price: 40000, image: 'https://picsum.photos/400/300?random=56' },
  { id: 48, name: 'Bánh flan', category: 'Đồ ăn', price: 25000, image: 'https://picsum.photos/400/300?random=57' },
  { id: 49, name: 'Trà vải', category: 'Thức uống', price: 42000, image: 'https://picsum.photos/400/300?random=58' },
  { id: 50, name: 'Đặt xe đường dài', category: 'Đặt xe', price: 1000000, image: 'https://picsum.photos/400/300?random=59' },
  { id: 51, name: 'Gội đầu dưỡng sinh', category: 'Khác', price: 180000, image: 'https://picsum.photos/400/300?random=60' }
]


const selectedCategory = ref('Tất cả')
const currentPage = ref(1)
const pageSize = 9

function selectCategory(cat) {
  selectedCategory.value = cat
  currentPage.value = 1
}

const filteredServices = computed(() => {
  if (selectedCategory.value === 'Tất cả') return services
  return services.filter(s => s.category === selectedCategory.value)
})

const totalPages = computed(() => Math.ceil(filteredServices.value.length / pageSize))

const pagedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredServices.value.slice(start, start + pageSize)
})

const defaultImage = 'https://picsum.photos/400/300?random=99'

const categoryImages = {
  'Tất cả': 'https://picsum.photos/400/300?random=0',
  'Đồ ăn': 'https://picsum.photos/400/300?random=1',
  'Thức uống': 'https://picsum.photos/400/300?random=2',
  'Giặt ủi': 'https://picsum.photos/400/300?random=3',
  'Đặt xe': 'https://picsum.photos/400/300?random=4',
  'Khác': 'https://picsum.photos/400/300?random=5',
}

</script>
