<template>
  <div class="min-h-screen">
    <!-- Banner -->
    <CBanner services />

    <div class="section-container bg-system-primary-10">
      <div class="container space-y-10 xl:space-y-20">
        <!-- Tiêu đề -->
        <div class="text-center space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">Dịch vụ khách sạn</p>
          <h1 class="text-h3 text-system-primary-100 xl:text-h1">
            Đặt dịch vụ tiện ích
          </h1>
          <p class="text-body text-gray-600 max-w-2xl mx-auto">
            Khám phá các dịch vụ đa dạng từ ẩm thực, vận chuyển đến chăm sóc sức khỏe, 
            giúp bạn có trải nghiệm lưu trú hoàn hảo nhất
          </p>
        </div>

        <!-- Bộ lọc nâng cao -->
        <div class="search-filter-container relative rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-system-primary-100">Tìm kiếm dịch vụ</h3>
            <p class="text-sm text-gray-600">Chọn loại dịch vụ và khoảng giá phù hợp</p>
          </div>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <!-- Tìm kiếm -->
            <div class="relative">
              <label class="mb-2 block text-sm font-medium text-gray-700">Tìm kiếm</label>
              <input
                v-model="searchQuery"
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                type="text"
                placeholder="Tên dịch vụ..."
                @input="filterServices"
              />
            </div>

            <!-- Loại dịch vụ -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Loại dịch vụ</label>
              <select 
                v-model="selectedCategory" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                @change="filterServices"
              >
                <option value="Tất cả">Tất cả loại</option>
                <option value="Đồ ăn">Đồ ăn</option>
                <option value="Thức uống">Thức uống</option>
                <option value="Giặt ủi">Giặt ủi</option>
                <option value="Đặt xe">Đặt xe</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <!-- Khoảng giá -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Khoảng giá</label>
              <select 
                v-model="priceRange" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                @change="filterServices"
              >
                <option value="">Tất cả giá</option>
                <option value="50000">Dưới 50k</option>
                <option value="100000">50k - 100k</option>
                <option value="200000">100k - 200k</option>
                <option value="500000">200k - 500k</option>
                <option value="1000000">Trên 500k</option>
              </select>
            </div>

            <!-- Sắp xếp -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Sắp xếp</label>
              <select 
                v-model="sortBy" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                @change="filterServices"
              >
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp-cao</option>
                <option value="price-high">Giá cao-thấp</option>
                <option value="category">Loại dịch vụ</option>
              </select>
            </div>
          </div>

          <!-- Nút reset -->
          <div class="mt-6 flex justify-end">
            <button
              class="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-50"
              @click="resetFilters"
            >
              🔄 Đặt lại
            </button>
          </div>
        </div>

        <!-- Thống kê kết quả -->
        <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
          <div class="text-sm text-gray-600">
            Hiển thị <span class="font-semibold text-system-primary-100">{{ pagedServices.length }}</span> 
            trong tổng số <span class="font-semibold">{{ filteredServices.length }}</span> dịch vụ
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Hiển thị:</span>
            <select 
              v-model="pageSize" 
              class="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-system-primary-100 focus:outline-none"
              @change="currentPage = 1"
            >
              <option value="9">9 dịch vụ</option>
              <option value="12">12 dịch vụ</option>
              <option value="18">18 dịch vụ</option>
            </select>
          </div>
        </div>

        <!-- Danh sách dịch vụ -->
        <div v-if="pagedServices.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="service in pagedServices"
            :key="service.id"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div class="relative overflow-hidden">
              <img 
                class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                :src="service.image" 
                :alt="service.name"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div class="absolute top-4 right-4">
                <span class="rounded-full bg-system-primary-100 px-3 py-1 text-xs font-semibold text-white">
                  {{ service.category }}
                </span>
              </div>
            </div>
            
            <div class="space-y-4 p-6">
              <div class="flex items-start justify-between">
                <h3 class="text-lg font-bold text-gray-800 line-clamp-2">{{ service.name }}</h3>
                <span class="ml-2 text-xl font-bold text-system-primary-100">
                  {{ formatPrice(service.price) }}
                </span>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <Icon name="ic:baseline-category" class="text-system-primary-100" />
                  {{ service.category }}
                </span>
              </div>

              <div class="flex gap-3">
                <NuxtLink 
                  :to="`/services/${service.id}`"
                  class="flex-1 rounded-lg bg-system-primary-100 px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-system-primary-80 hover:shadow-lg"
                >
                  Xem chi tiết
                </NuxtLink>
                <button 
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-system-primary-100"
                  @click="toggleFavorite(service.id)"
                >
                  <Icon 
                    :name="favorites.includes(service.id) ? 'ic:baseline-favorite' : 'ic:baseline-favorite-border'" 
                    :class="favorites.includes(service.id) ? 'text-red-500' : 'text-gray-400'"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Không có kết quả -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy dịch vụ phù hợp</h3>
          <p class="text-gray-500 mb-6">Hãy thử thay đổi tiêu chí tìm kiếm</p>
          <button
            class="rounded-lg bg-system-primary-100 px-6 py-3 text-white transition-all duration-300 hover:bg-system-primary-80"
            @click="resetFilters"
          >
            Đặt lại bộ lọc
          </button>
        </div>

        <!-- Phân trang -->
        <div v-if="totalPages > 1" class="flex justify-center">
          <div class="flex items-center gap-2">
            <button
              :disabled="currentPage === 1"
              class="rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="currentPage === 1 ? 'text-gray-400' : 'text-system-primary-100 hover:bg-system-primary-10'"
              @click="currentPage = currentPage - 1"
            >
              ← Trước
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              :class="[
                'rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300',
                currentPage === page
                  ? 'bg-system-primary-100 text-white shadow-lg'
                  : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-system-primary-100'
              ]"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            
            <button
              :disabled="currentPage === totalPages"
              class="rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="currentPage === totalPages ? 'text-gray-400' : 'text-system-primary-100 hover:bg-system-primary-10'"
              @click="currentPage = currentPage + 1"
            >
              Sau →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <CWave />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CWave from '~/components/c/CWave.vue'

definePageMeta({ layout: 'landing' })

// Dữ liệu dịch vụ cải tiến
const services = [
  {
    id: 1,
    name: 'Phở bò đặc biệt',
    category: 'Đồ ăn',
    price: 75000,
    image: 'https://picsum.photos/400/300?random=10',
    description: 'Phở bò truyền thống với nước dùng đậm đà, thịt bò tươi ngon'
  },
  {
    id: 2,
    name: 'Cafe sữa đá',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=11',
    description: 'Cafe sữa đá đặc trưng Việt Nam với hương vị đậm đà'
  },
  {
    id: 3,
    name: 'Giặt áo sơ mi',
    category: 'Giặt ủi',
    price: 20000,
    image: 'https://picsum.photos/400/300?random=12',
    description: 'Dịch vụ giặt ủi chuyên nghiệp, đảm bảo áo sạch sẽ và phẳng phiu'
  },
  {
    id: 4,
    name: 'Thuê xe máy',
    category: 'Đặt xe',
    price: 150000,
    image: 'https://picsum.photos/400/300?random=13',
    description: 'Thuê xe máy để khám phá thành phố một cách thuận tiện'
  },
  {
    id: 5,
    name: 'Massage thư giãn',
    category: 'Khác',
    price: 250000,
    image: 'https://picsum.photos/400/300?random=14',
    description: 'Dịch vụ massage chuyên nghiệp giúp thư giãn cơ thể'
  },
  {
    id: 6,
    name: 'Bún chả Hà Nội',
    category: 'Đồ ăn',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=15',
    description: 'Bún chả truyền thống Hà Nội với thịt nướng thơm ngon'
  },
  {
    id: 7,
    name: 'Nước ép cam tươi',
    category: 'Thức uống',
    price: 45000,
    image: 'https://picsum.photos/400/300?random=16',
    description: 'Nước cam tươi nguyên chất, giàu vitamin C'
  },
  {
    id: 8,
    name: 'Bánh mì pate',
    category: 'Đồ ăn',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=17',
    description: 'Bánh mì pate truyền thống với nhân đậm đà'
  },
  {
    id: 9,
    name: 'Cơm tấm sườn nướng',
    category: 'Đồ ăn',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=18',
    description: 'Cơm tấm với sườn nướng thơm ngon, đặc trưng miền Nam'
  },
  {
    id: 10,
    name: 'Bún bò Huế',
    category: 'Đồ ăn',
    price: 80000,
    image: 'https://picsum.photos/400/300?random=19',
    description: 'Bún bò Huế với nước dùng đậm đà, thịt bò mềm ngon'
  },
  {
    id: 11,
    name: 'Bánh xèo miền Tây',
    category: 'Đồ ăn',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=20',
    description: 'Bánh xèo giòn rụm với nhân tôm thịt đầy đủ'
  },
  {
    id: 12,
    name: 'Cháo gà nấm',
    category: 'Đồ ăn',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=21',
    description: 'Cháo gà nấm thơm ngon, bổ dưỡng'
  },
  {
    id: 13,
    name: 'Gỏi cuốn tôm thịt',
    category: 'Đồ ăn',
    price: 35000,
    image: 'https://picsum.photos/400/300?random=22',
    description: 'Gỏi cuốn tươi ngon với nước chấm đặc biệt'
  },
  {
    id: 14,
    name: 'Trà sữa trân châu',
    category: 'Thức uống',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=23',
    description: 'Trà sữa trân châu với hương vị đa dạng'
  },
  {
    id: 15,
    name: 'Sinh tố bơ sữa',
    category: 'Thức uống',
    price: 45000,
    image: 'https://picsum.photos/400/300?random=24',
    description: 'Sinh tố bơ sữa béo ngậy, bổ dưỡng'
  }
]

// Biến reactive
const searchQuery = ref('')
const selectedCategory = ref('Tất cả')
const priceRange = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const pageSize = ref(9)
const favorites = ref([])

// Computed properties
const filteredServices = computed(() => {
  let result = services.filter((service) => {
    const matchSearch = service.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       service.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchCategory = selectedCategory.value === 'Tất cả' || service.category === selectedCategory.value
    
    const matchPrice = priceRange.value ? service.price <= Number(priceRange.value) : true
    
    return matchSearch && matchCategory && matchPrice
  })

  // Sắp xếp
  switch (sortBy.value) {
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price-low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'category':
      result.sort((a, b) => a.category.localeCompare(b.category))
      break
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredServices.value.length / pageSize.value))

const pagedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredServices.value.slice(start, start + pageSize.value)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const filterServices = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Tất cả'
  priceRange.value = ''
  sortBy.value = 'name'
  currentPage.value = 1
}

const toggleFavorite = (serviceId) => {
  const index = favorites.value.indexOf(serviceId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(serviceId)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

// Watch for changes
watch([searchQuery, selectedCategory, priceRange, sortBy], () => {
  filterServices()
})
</script>

<style scoped>
.search-filter-container {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #e2e8f0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
