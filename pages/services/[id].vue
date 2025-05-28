<template>
    <div class="min-h-screen w-full" style="background-color: antiquewhite;">
        <div class="max-w-screen-xl mx-auto p-6 font-serif">
            <!-- Quay lại -->
            <button @click="navigateTo('/services')" class="mb-6 text-yellow-500 hover:underline text-sm">
            ← Quay lại danh sách dịch vụ
            </button>

            <!-- Thông tin dịch vụ chính -->
            <div v-if="service" class="bg-white rounded-xl shadow-md p-6 space-y-6 md:flex md:space-x-8">
            <!-- Ảnh -->
            <img :src="service.image" alt="" class="w-full md:w-1/2 h-64 object-cover rounded-lg shadow" />

            <!-- Nội dung -->
            <div class="flex-1 space-y-4">
                <h1 class="text-3xl font-bold text-gray-800">{{ service.name }}</h1>
                <p class="text-gray-500 italic text-sm">{{ service.category }}</p>
                <p class="text-yellow-500 font-semibold text-xl">{{ service.price.toLocaleString() }}₫</p>

                <!-- Mô tả -->
                <div v-if="service.description">
                <h2 class="text-lg font-semibold text-gray-700 mt-4 mb-1">Mô tả:</h2>
                <p class="text-gray-600 leading-relaxed whitespace-pre-line">
                    {{ service.description }}
                </p>
                </div>

                <!-- Số lượng -->
                <div class="flex items-center space-x-4 pt-2">
                <label class="font-medium">Số lượng:</label>
                <div class="flex items-center border rounded overflow-hidden">
                    <button @click="decrement" class="px-4 py-2 bg-yellow-400 hover:bg-yellow-300">-</button>
                    <input
                    type="number"
                    v-model.number="quantity"
                    min="1"
                    class="w-16 text-center border-l border-r focus:outline-none"
                    />
                    <button @click="increment" class="px-4 py-2 bg-yellow-400 hover:bg-yellow-300">+</button>
                </div>
                </div>

                <!-- Ghi chú -->
                <div>
                <label class="font-medium block mb-1">Ghi chú:</label>
                <textarea
                    v-model="note"
                    rows="3"
                    placeholder="Ví dụ: Không lấy hành, giao lúc 12h..."
                    class="w-full border rounded p-3 focus:outline-yellow-400"
                ></textarea>
                </div>

                <!-- Hẹn giờ -->
                <div>
                <label class="font-medium block mb-1">Hẹn giờ giao dịch vụ:</label>
                <input
                    type="datetime-local"
                    v-model="scheduledTime"
                    class="w-full border rounded p-2 focus:outline-yellow-400"
                />
                </div>

                <!-- Đặt dịch vụ -->
                <button
                class="w-full bg-yellow-500 text-white text-lg font-semibold py-3 rounded hover:bg-yellow-400 transition-all"
                >
                Đặt dịch vụ
                </button>
            </div>
            </div>

            <!-- Dịch vụ cùng loại -->
            <div v-if="relatedServices.length" class="mt-10">
                    <div class="max-w-5xl mx-auto mb-8">
            <UITitle text1="Dịch vụ cùng loại"/>
            </div>
            <!-- <h2 class="text-2xl font-semibold mb-4">Dịch vụ cùng loại</h2> -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div
                v-for="item in relatedServices"
                :key="item.id"
                class="bg-white rounded-lg shadow hover:shadow-lg p-4 cursor-pointer transition-all"
                @click="navigateTo(`/services/${item.id}`)"
                >
                <img :src="item.image" alt="" class="w-full h-32 object-cover rounded" />
                <h3 class="mt-2 font-semibold text-gray-800">{{ item.name }}</h3>
                <p class="text-yellow-500 font-bold">{{ item.price.toLocaleString() }}₫</p>
                </div>
            </div>
            </div>

            <!-- Không có dịch vụ -->
            <div v-else class="mt-10 text-gray-500 italic text-center">
            Không có dịch vụ nào cùng loại.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'
import UITitle from '~/pages/blog/components/UI/UITitle.vue'


// Dữ liệu mẫu (thêm description)
const services = [
  {
    id: 1,
    name: 'Phở bò',
    category: 'Đồ ăn',
    price: 75000,
    image: 'https://picsum.photos/400/300?random=10',
    description: 'Một tô phở bò truyền thống với nước dùng đậm đà, thịt bò mềm, hành ngò thơm lừng. Phù hợp cho bữa sáng, trưa hoặc tối.'
  },
  {
    id: 2,
    name: 'Cafe sữa',
    category: 'Thức uống',
    price: 40000,
    image: 'https://picsum.photos/400/300?random=11',
    description: 'Cà phê pha phin truyền thống kết hợp với sữa đặc ngọt béo. Uống nóng hoặc đá đều ngon.'
  },
  {
    id: 6,
    name: 'Bún chả',
    category: 'Đồ ăn',
    price: 70000,
    image: 'https://picsum.photos/400/300?random=15',
    description: 'Bún chả Hà Nội với thịt nướng thơm lừng, nước chấm pha vừa miệng, ăn kèm rau sống.'
  },
  {
    id: 8,
    name: 'Bánh mì pate',
    category: 'Đồ ăn',
    price: 30000,
    image: 'https://picsum.photos/400/300?random=17',
    description: 'Ổ bánh mì giòn rụm với lớp pate béo ngậy, dưa leo, đồ chua, và nước sốt đặc biệt.'
  },
  {
    id: 9,
    name: 'Cơm tấm',
    category: 'Đồ ăn',
    price: 60000,
    image: 'https://picsum.photos/400/300?random=18',
    description: 'Cơm tấm sườn bì chả, ăn kèm nước mắm chua ngọt, đồ chua, trứng ốp và mỡ hành.'
  },
]

const route = useRoute()
const id = Number(route.params.id)

const service = computed(() => {
  const id = Number(route.params.id)
  return services.value.find(s => s.id === id) || null
})

const quantity = ref(1)
const increment = () => quantity.value++
const decrement = () => {
  if (quantity.value > 1) quantity.value--
}

const note = ref('')
const scheduledTime = ref('')

const relatedServices = computed(() => {
  if (!service) return []
  return services.value
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3)
})
</script>
