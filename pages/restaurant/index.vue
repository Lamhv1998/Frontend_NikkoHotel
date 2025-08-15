<template>
  <div class="min-h-screen">
    <!-- Banner -->
    <CBanner restaurant />

    <div class="section-container bg-system-primary-10">
      <div class="container space-y-10 xl:space-y-20">
        <!-- Tiêu đề -->
        <div class="text-center space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">Ẩm thực đặc sắc</p>
          <h1 class="text-h3 text-system-primary-100 xl:text-h1">
            Nhà hàng Nikko Luxury
          </h1>
          <p class="text-body text-gray-600 max-w-2xl mx-auto">
            Khám phá hương vị ẩm thực đa dạng từ truyền thống Việt Nam đến quốc tế, 
            được chế biến bởi đội ngũ đầu bếp chuyên nghiệp với nguyên liệu tươi ngon nhất
          </p>
        </div>

        <!-- Bộ lọc nâng cao -->
        <div class="search-filter-container relative rounded-2xl bg-white p-6 shadow-lg">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-system-primary-100">Tìm kiếm món ăn</h3>
            <p class="text-sm text-gray-600">Chọn loại món ăn và khoảng giá phù hợp</p>
          </div>
          
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <!-- Tìm kiếm -->
            <div class="relative">
              <label class="mb-2 block text-sm font-medium text-gray-700">Tìm kiếm</label>
              <input
                v-model="searchQuery"
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                type="text"
                placeholder="Tên món ăn..."
                @input="filterDishes"
              />
            </div>

            <!-- Loại món ăn -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Loại món</label>
              <select 
                v-model="selectedCategory" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                @change="filterDishes"
              >
                <option value="Tất cả">Tất cả loại</option>
                <option value="Khai vị">Khai vị</option>
                <option value="Món chính">Món chính</option>
                <option value="Món canh">Món canh</option>
                <option value="Tráng miệng">Tráng miệng</option>
                <option value="Thức uống">Thức uống</option>
              </select>
            </div>

            <!-- Khoảng giá -->
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Khoảng giá</label>
              <select 
                v-model="priceRange" 
                class="w-full rounded-lg border border-gray-300 p-3 focus:border-system-primary-100 focus:outline-none focus:ring-2 focus:ring-system-primary-100/20"
                @change="filterDishes"
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
                @change="filterDishes"
              >
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp-cao</option>
                <option value="price-high">Giá cao-thấp</option>
                <option value="category">Loại món</option>
                <option value="popular">Phổ biến</option>
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
            Hiển thị <span class="font-semibold text-system-primary-100">{{ pagedDishes.length }}</span> 
            trong tổng số <span class="font-semibold">{{ filteredDishes.length }}</span> món
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Hiển thị:</span>
            <select 
              v-model="pageSize" 
              class="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-system-primary-100 focus:outline-none"
              @change="currentPage = 1"
            >
              <option value="9">9 món</option>
              <option value="12">12 món</option>
              <option value="18">18 món</option>
            </select>
          </div>
        </div>

        <!-- Danh sách món ăn -->
        <div v-if="pagedDishes.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="dish in pagedDishes"
            :key="dish.id"
            class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <div class="relative overflow-hidden">
              <img 
                class="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                :src="dish.image" 
                :alt="dish.name"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <div class="absolute top-4 right-4">
                <span class="rounded-full bg-system-primary-100 px-3 py-1 text-xs font-semibold text-white">
                  {{ dish.category }}
                </span>
              </div>
              <div v-if="dish.isSpicy" class="absolute top-4 left-4">
                <span class="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                  🌶️ Cay
                </span>
              </div>
              <div v-if="dish.isVegetarian" class="absolute top-16 left-4">
                <span class="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  🥬 Chay
                </span>
              </div>
            </div>
            
            <div class="space-y-4 p-6">
              <div class="flex items-start justify-between">
                <h3 class="text-lg font-bold text-gray-800 line-clamp-2">{{ dish.name }}</h3>
                <span class="ml-2 text-xl font-bold text-system-primary-100">
                  {{ formatPrice(dish.price) }}
                </span>
              </div>
              
              <p class="text-sm text-gray-600 line-clamp-2">{{ dish.description }}</p>
              
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <span class="flex items-center gap-1">
                  <Icon name="ic:baseline-category" class="text-system-primary-100" />
                  {{ dish.category }}
                </span>
                <span class="flex items-center gap-1">
                  <Icon name="ic:baseline-timer" class="text-system-primary-100" />
                  {{ dish.cookingTime }} phút
                </span>
              </div>

              <div class="flex gap-3">
                <button 
                  class="flex-1 rounded-lg bg-system-primary-100 px-4 py-2 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-system-primary-80 hover:shadow-lg"
                  @click="addToCart(dish)"
                >
                  🛒 Thêm vào giỏ
                </button>
                <button 
                  class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-system-primary-100"
                  @click="toggleFavorite(dish.id)"
                >
                  <Icon 
                    :name="favorites.includes(dish.id) ? 'ic:baseline-favorite' : 'ic:baseline-favorite-border'" 
                    :class="favorites.includes(dish.id) ? 'text-red-500' : 'text-gray-400'"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Không có kết quả -->
        <div v-else class="text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy món ăn phù hợp</h3>
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

        <!-- Giỏ hàng mini -->
        <div v-if="cart.length > 0" class="fixed bottom-6 right-6 z-50">
          <div class="relative">
            <button
              class="flex h-16 w-16 items-center justify-center rounded-full bg-system-primary-100 text-white shadow-lg transition-all duration-300 hover:bg-system-primary-80 hover:scale-110"
              @click="showCart = !showCart"
            >
              <Icon name="ic:baseline-shopping-cart" class="text-2xl" />
              <span class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                {{ cart.length }}
              </span>
            </button>
            
            <!-- Popup giỏ hàng -->
            <div v-if="showCart" class="absolute bottom-20 right-0 w-80 rounded-2xl bg-white p-4 shadow-2xl">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="font-bold text-gray-800">Giỏ hàng ({{ cart.length }})</h4>
                <button @click="showCart = false" class="text-gray-500 hover:text-gray-700">
                  <Icon name="ic:baseline-close" />
                </button>
              </div>
              
              <div class="max-h-64 space-y-2 overflow-y-auto">
                <div v-for="item in cart" :key="item.id" class="flex items-center gap-3 rounded-lg bg-gray-50 p-2">
                  <img :src="item.image" :alt="item.name" class="h-12 w-12 rounded-lg object-cover" />
                  <div class="flex-1">
                    <h5 class="text-sm font-semibold text-gray-800">{{ item.name }}</h5>
                    <p class="text-xs text-gray-600">{{ formatPrice(item.price) }}</p>
                  </div>
                  <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700">
                    <Icon name="ic:baseline-delete" />
                  </button>
                </div>
              </div>
              
              <div class="mt-4 border-t pt-4">
                <div class="mb-3 flex justify-between font-bold">
                  <span>Tổng cộng:</span>
                  <span>{{ formatPrice(cartTotal) }}</span>
                </div>
                <button class="w-full rounded-lg bg-system-primary-100 py-2 text-white font-semibold hover:bg-system-primary-80">
                  Đặt món ngay
                </button>
              </div>
            </div>
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

// Dữ liệu món ăn
const dishes = [
  {
    id: 1,
    name: 'Phở bò đặc biệt',
    category: 'Món chính',
    price: 75000,
    image: 'https://picsum.photos/400/300?random=1',
    description: 'Phở bò truyền thống với nước dùng đậm đà, thịt bò tươi ngon, bánh phở mềm mại',
    cookingTime: 15,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 2,
    name: 'Gỏi cuốn tôm thịt',
    category: 'Khai vị',
    price: 45000,
    image: 'https://picsum.photos/400/300?random=2',
    description: 'Gỏi cuốn tươi ngon với tôm, thịt luộc, rau sống và nước chấm đặc biệt',
    cookingTime: 10,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 3,
    name: 'Bún bò Huế',
    category: 'Món chính',
    price: 80000,
    image: 'https://picsum.photos/400/300?random=3',
    description: 'Bún bò Huế với nước dùng đậm đà, thịt bò mềm ngon, bún sợi to',
    cookingTime: 20,
    isSpicy: true,
    isVegetarian: false
  },
  {
    id: 4,
    name: 'Canh chua cá lóc',
    category: 'Món canh',
    price: 65000,
    image: 'https://picsum.photos/400/300?random=4',
    description: 'Canh chua truyền thống với cá lóc tươi, rau cải chua, dứa và cà chua',
    cookingTime: 25,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 5,
    name: 'Cơm tấm sườn nướng',
    category: 'Món chính',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=5',
    description: 'Cơm tấm với sườn nướng thơm ngon, bì, chả và nước mắm đặc biệt',
    cookingTime: 18,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 6,
    name: 'Bánh xèo miền Tây',
    category: 'Khai vị',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=6',
    description: 'Bánh xèo giòn rụm với nhân tôm thịt đầy đủ, rau sống tươi ngon',
    cookingTime: 12,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 7,
    name: 'Chè ba màu',
    category: 'Tráng miệng',
    price: 35000,
    image: 'https://picsum.photos/400/300?random=7',
    description: 'Chè ba màu truyền thống với đậu xanh, đậu đỏ và bột báng',
    cookingTime: 8,
    isSpicy: false,
    isVegetarian: true
  },
  {
    id: 8,
    name: 'Cafe sữa đá',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=8',
    description: 'Cafe sữa đá đặc trưng Việt Nam với hương vị đậm đà, sữa đặc ngọt',
    cookingTime: 5,
    isSpicy: false,
    isVegetarian: true
  },
  {
    id: 9,
    name: 'Bún chả Hà Nội',
    category: 'Món chính',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=9',
    description: 'Bún chả truyền thống Hà Nội với thịt nướng thơm ngon, nước chấm đặc biệt',
    cookingTime: 16,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 10,
    name: 'Súp cua',
    category: 'Khai vị',
    price: 55000,
    image: 'https://picsum.photos/400/300?random=10',
    description: 'Súp cua nóng hổi với thịt cua tươi, trứng cút và hành ngò',
    cookingTime: 14,
    isSpicy: false,
    isVegetarian: false
  },
  {
    id: 11,
    name: 'Bánh flan',
    category: 'Tráng miệng',
    price: 25000,
    image: 'https://picsum.photos/400/300?random=11',
    description: 'Bánh flan mềm mịn với hương vani thơm ngon, caramel ngọt ngào',
    cookingTime: 6,
    isSpicy: false,
    isVegetarian: true
  },
  {
    id: 12,
    name: 'Trà sữa trân châu',
    category: 'Thức uống',
    price: 50000,
    image: 'https://picsum.photos/400/300?random=12',
    description: 'Trà sữa trân châu với hương vị đa dạng, trân châu dai giòn',
    cookingTime: 7,
    isSpicy: false,
    isVegetarian: true
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
const cart = ref([])
const showCart = ref(false)

// Computed properties
const filteredDishes = computed(() => {
  let result = dishes.filter((dish) => {
    const matchSearch = dish.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                       dish.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchCategory = selectedCategory.value === 'Tất cả' || dish.category === selectedCategory.value
    
    const matchPrice = priceRange.value ? dish.price <= Number(priceRange.value) : true
    
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
    case 'popular':
      // Giả lập sắp xếp theo độ phổ biến
      result.sort((a, b) => Math.random() - 0.5)
      break
  }

  return result
})

const totalPages = computed(() => Math.ceil(filteredDishes.value.length / pageSize.value))

const pagedDishes = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredDishes.value.slice(start, start + pageSize.value)
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

const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0)
})

// Methods
const filterDishes = () => {
  currentPage.value = 1
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Tất cả'
  priceRange.value = ''
  sortBy.value = 'name'
  currentPage.value = 1
}

const toggleFavorite = (dishId) => {
  const index = favorites.value.indexOf(dishId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(dishId)
  }
}

const addToCart = (dish) => {
  cart.value.push(dish)
  showCart.value = true
}

const removeFromCart = (dishId) => {
  const index = cart.value.findIndex(item => item.id === dishId)
  if (index > -1) {
    cart.value.splice(index, 1)
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
  filterDishes()
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
