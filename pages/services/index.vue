<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-primary-600 to-primary-700 py-20 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Icon name="ic:outline-room-service" class="mr-2 h-5 w-5" />
            Dịch vụ khách sạn
          </div>
          <h1 class="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Đặt Dịch Vụ Khách Sạn
          </h1>
          <p class="mx-auto mb-6 max-w-2xl text-xl text-primary-100">
            Khám phá các dịch vụ đa dạng từ ẩm thực, spa đến vận chuyển. Trải nghiệm hoàn hảo ngay tại khách sạn.
          </p>
          <div class="inline-flex items-center rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
            <Icon name="ic:outline-local-offer" class="mr-2 h-5 w-5 text-yellow-300" />
            <span class="text-yellow-300 font-medium">{{ filteredServices.length }} dịch vụ có sẵn</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Filter Section -->
    <section class="relative -mt-8 pb-8">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div class="rounded-2xl bg-white p-6 shadow-xl">
          <div class="mb-4 text-center">
            <h2 class="text-lg font-semibold text-gray-900">Chọn danh mục dịch vụ</h2>
          </div>
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectCategory(cat)"
              :class="[
                'group relative overflow-hidden rounded-xl transition-all duration-300',
                selectedCategory === cat
                  ? 'ring-2 ring-primary-500 shadow-lg'
                  : 'hover:shadow-md'
              ]"
            >
              <div class="relative h-24 w-full overflow-hidden rounded-xl">
                <img
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  :src="categoryImages[cat] || defaultImage"
                  :alt="cat"
                />
                <div class="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/30"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <h3 class="text-center text-sm font-semibold text-white drop-shadow">{{ cat }}</h3>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-12">
      <div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <!-- Results Count & Sort -->
        <div class="mb-8 flex items-center justify-between">
          <p class="text-gray-600">
            Hiển thị {{ pagedServices.length }} trong {{ filteredServices.length }} dịch vụ
          </p>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Hiển thị:</span>
            <select
              v-model="pageSize"
              class="rounded-lg border border-gray-200 px-3 py-1 text-sm focus:border-primary-500 focus:outline-none"
            >
              <option value="9">9 dịch vụ</option>
              <option value="12">12 dịch vụ</option>
              <option value="18">18 dịch vụ</option>
            </select>
          </div>
        </div>

        <!-- Services Grid -->
        <div v-if="pagedServices.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="service in pagedServices"
            :key="service.id"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <!-- Service Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                :src="service.image" 
                :alt="service.name" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute bottom-4 left-4">
                <span class="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800">
                  {{ service.category }}
                </span>
              </div>
            </div>

            <!-- Service Content -->
            <div class="p-6">
              <div class="mb-4">
                <h3 class="mb-2 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {{ service.name }}
                </h3>
                <div class="flex items-center justify-between">
                  <span class="text-2xl font-bold text-primary-600">
                    {{ service.price.toLocaleString() }}₫
                  </span>
                  <button class="rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
                    <Icon name="ic:outline-favorite" class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <NuxtLink 
                  :to="`/services/${service.id}`"
                  class="flex-1 rounded-xl bg-primary-600 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-700"
                >
                  Xem chi tiết
                </NuxtLink>
                <button class="rounded-xl border border-primary-600 px-4 py-3 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50">
                  <Icon name="ic:outline-shopping-cart" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Icon name="ic:outline-search-off" class="h-12 w-12 text-gray-400" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900">Không có dịch vụ nào</h3>
          <p class="mb-6 text-gray-600">Hãy thử chọn danh mục khác hoặc quay lại sau</p>
          <button
            @click="selectCategory('Tất cả')"
            class="rounded-lg bg-primary-600 px-6 py-2 text-white transition-colors hover:bg-primary-700"
          >
            Xem tất cả
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <nav class="flex items-center gap-2">
            <button
              :disabled="currentPage === 1"
              @click="currentPage = currentPage - 1"
              class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ic:baseline-chevron-left" class="h-4 w-4" />
              Trước
            </button>

            <div class="flex items-center gap-1">
              <button
                v-for="page in visiblePages"
                :key="page"
                :class="{
                  'bg-primary-600 text-white': currentPage === page,
                  'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page
                }"
                class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition-all"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>

            <button
              :disabled="currentPage === totalPages"
              @click="currentPage = currentPage + 1"
              class="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
              <Icon name="ic:baseline-chevron-right" class="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = ['Tất cả', 'Đồ ăn', 'Thức uống', 'Giặt ủi', 'Đặt xe', 'Khác']

const services = [
  {
    id: 1,
    name: 'Phở bò truyền thống',
    category: 'Đồ ăn',
    price: 75000,
    image: 'https://picsum.photos/400/300?random=10'
  },
  {
    id: 2,
    name: 'Cà phê sữa đá',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=11'
  },
  {
    id: 3,
    name: 'Giặt áo sơ mi',
    category: 'Giặt ủi',
    price: 20000,
    image: 'https://picsum.photos/400/300?random=12'
  },
  {
    id: 4,
    name: 'Thuê xe máy',
    category: 'Đặt xe',
    price: 150000,
    image: 'https://picsum.photos/400/300?random=13'
  },
  {
    id: 5,
    name: 'Massage thư giãn',
    category: 'Khác',
    price: 250000,
    image: 'https://picsum.photos/400/300?random=14'
  },
  {
    id: 6,
    name: 'Bún chả Hà Nội',
    category: 'Đồ ăn',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=15'
  },
  {
    id: 7,
    name: 'Nước ép cam tươi',
    category: 'Thức uống',
    price: 45000,
    image: 'https://picsum.photos/400/300?random=16'
  },
  {
    id: 8,
    name: 'Bánh mì pate truyền thống',
    category: 'Đồ ăn',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=17'
  },
  {
    id: 9,
    name: 'Cơm tấm sườn nướng',
    category: 'Đồ ăn',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=18'
  },
  {
    id: 10,
    name: 'Bún bò Huế',
    category: 'Đồ ăn',
    price: 80000,
    image: 'https://picsum.photos/400/300?random=19'
  },
  {
    id: 11,
    name: 'Bánh xèo miền Tây',
    category: 'Đồ ăn',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=20'
  },
  {
    id: 12,
    name: 'Cháo gà nấm',
    category: 'Đồ ăn',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=21'
  },
  {
    id: 13,
    name: 'Gỏi cuốn tôm thịt',
    category: 'Đồ ăn',
    price: 35000,
    image: 'https://picsum.photos/400/300?random=22'
  },
  {
    id: 14,
    name: 'Trà sữa trân châu',
    category: 'Thức uống',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=23'
  },
  {
    id: 15,
    name: 'Sinh tố bơ sữa',
    category: 'Thức uống',
    price: 45000,
    image: 'https://picsum.photos/400/300?random=24'
  },
  {
    id: 16,
    name: 'Cà phê đen',
    category: 'Thức uống',
    price: 35000,
    image: 'https://picsum.photos/400/300?random=25'
  },
  {
    id: 17,
    name: 'Trà đào cam sả',
    category: 'Thức uống',
    price: 48000,
    image: 'https://picsum.photos/400/300?random=26'
  },
  {
    id: 18,
    name: 'Soda chanh muối',
    category: 'Thức uống',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=27'
  },
  {
    id: 19,
    name: 'Giặt quần jeans',
    category: 'Giặt ủi',
    price: 25000,
    image: 'https://picsum.photos/400/300?random=28'
  },
  {
    id: 20,
    name: 'Giặt áo khoác',
    category: 'Giặt ủi',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=29'
  },
  {
    id: 21,
    name: 'Giặt chăn mền',
    category: 'Giặt ủi',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=30'
  },
  {
    id: 22,
    name: 'Ủi áo dài',
    category: 'Giặt ủi',
    price: 20000,
    image: 'https://picsum.photos/400/300?random=31'
  },
  {
    id: 23,
    name: 'Giặt khăn lông',
    category: 'Giặt ủi',
    price: 15000,
    image: 'https://picsum.photos/400/300?random=32'
  },
  {
    id: 24,
    name: 'Đặt taxi 4 chỗ',
    category: 'Đặt xe',
    price: 120000,
    image: 'https://picsum.photos/400/300?random=33'
  },
  {
    id: 25,
    name: 'Đặt taxi 7 chỗ',
    category: 'Đặt xe',
    price: 180000,
    image: 'https://picsum.photos/400/300?random=34'
  },
  {
    id: 26,
    name: 'Đặt xe ôm',
    category: 'Đặt xe',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=35'
  },
  {
    id: 27,
    name: 'Thuê xe đạp',
    category: 'Đặt xe',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=36'
  },
  {
    id: 28,
    name: 'Thuê xe hơi',
    category: 'Đặt xe',
    price: 500000,
    image: 'https://picsum.photos/400/300?random=37'
  },
  {
    id: 29,
    name: 'Gội đầu thư giãn',
    category: 'Khác',
    price: 100000,
    image: 'https://picsum.photos/400/300?random=38'
  },
  {
    id: 30,
    name: 'Trang điểm dự tiệc',
    category: 'Khác',
    price: 300000,
    image: 'https://picsum.photos/400/300?random=39'
  },
  {
    id: 31,
    name: 'Cắt tóc nam',
    category: 'Khác',
    price: 80000,
    image: 'https://picsum.photos/400/300?random=40'
  },
  {
    id: 32,
    name: 'Cắt tóc nữ',
    category: 'Khác',
    price: 120000,
    image: 'https://picsum.photos/400/300?random=41'
  },
  {
    id: 33,
    name: 'Làm móng tay',
    category: 'Khác',
    price: 90000,
    image: 'https://picsum.photos/400/300?random=42'
  },
  {
    id: 34,
    name: 'Bún riêu cua',
    category: 'Đồ ăn',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=43'
  },
  {
    id: 35,
    name: 'Bánh cuốn nóng',
    category: 'Đồ ăn',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=44'
  },
  {
    id: 36,
    name: 'Cơm chiên dương châu',
    category: 'Đồ ăn',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=45'
  },
  {
    id: 37,
    name: 'Trà gừng mật ong',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=46'
  },
  {
    id: 38,
    name: 'Cacao sữa nóng',
    category: 'Thức uống',
    price: 45000,
    image: 'https://picsum.photos/400/300?random=47'
  },
  {
    id: 39,
    name: 'Giặt bộ vest',
    category: 'Giặt ủi',
    price: 80000,
    image: 'https://picsum.photos/400/300?random=48'
  },
  {
    id: 40,
    name: 'Ủi quần âu',
    category: 'Giặt ủi',
    price: 20000,
    image: 'https://picsum.photos/400/300?random=49'
  },
  {
    id: 41,
    name: 'Giặt khăn trải giường',
    category: 'Giặt ủi',
    price: 35000,
    image: 'https://picsum.photos/400/300?random=50'
  },
  {
    id: 42,
    name: 'Đặt xe VIP',
    category: 'Đặt xe',
    price: 800000,
    image: 'https://picsum.photos/400/300?random=51'
  },
  {
    id: 43,
    name: 'Tắm trắng toàn thân',
    category: 'Khác',
    price: 400000,
    image: 'https://picsum.photos/400/300?random=52'
  },
  {
    id: 44,
    name: 'Spa thư giãn',
    category: 'Khác',
    price: 600000,
    image: 'https://picsum.photos/400/300?random=53'
  },
  {
    id: 45,
    name: 'Cạo mặt',
    category: 'Khác',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=54'
  },
  {
    id: 46,
    name: 'Xông hơi',
    category: 'Khác',
    price: 200000,
    image: 'https://picsum.photos/400/300?random=55'
  },
  {
    id: 47,
    name: 'Giặt đồ khẩn cấp',
    category: 'Giặt ủi',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=56'
  },
  {
    id: 48,
    name: 'Bánh flan',
    category: 'Đồ ăn',
    price: 25000,
    image: 'https://picsum.photos/400/300?random=57'
  },
  {
    id: 49,
    name: 'Trà vải',
    category: 'Thức uống',
    price: 42000,
    image: 'https://picsum.photos/400/300?random=58'
  },
  {
    id: 50,
    name: 'Đặt xe đường dài',
    category: 'Đặt xe',
    price: 1000000,
    image: 'https://picsum.photos/400/300?random=59'
  },
  {
    id: 51,
    name: 'Gội đầu dưỡng sinh',
    category: 'Khác',
    price: 180000,
    image: 'https://picsum.photos/400/300?random=60'
  }
]

const selectedCategory = ref('Tất cả')
const currentPage = ref(1)
const pageSize = ref(9)

function selectCategory(cat) {
  selectedCategory.value = cat
  currentPage.value = 1
}

const filteredServices = computed(() => {
  if (selectedCategory.value === 'Tất cả') return services
  return services.filter((s) => s.category === selectedCategory.value)
})

const totalPages = computed(() => Math.ceil(filteredServices.value.length / pageSize.value))

const pagedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredServices.value.slice(start, start + pageSize.value)
})

// Hiển thị trang phân trang
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages.value, start + maxVisible - 1)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const defaultImage = 'https://picsum.photos/400/300?random=99'

const categoryImages = {
  'Tất cả': 'https://picsum.photos/400/300?random=0',
  'Đồ ăn': 'https://picsum.photos/400/300?random=1',
  'Thức uống': 'https://picsum.photos/400/300?random=2',
  'Giặt ủi': 'https://picsum.photos/400/300?random=3',
  'Đặt xe': 'https://picsum.photos/400/300?random=4',
  Khác: 'https://picsum.photos/400/300?random=5'
}
</script>
