<template>
  <section class="section-container relative overflow-hidden">
    <!-- Background giống phần "Phòng nghỉ sang trọng" -->
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" style="background-image: url('/img/bg.png')"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-system-primary-10/90 via-system-primary-5/80 to-white/90"></div>
    
    <div class="container relative z-10 py-12 space-y-12">
      <!-- Tiêu đề section -->
      <div class="text-center space-y-6">
        <div class="inline-flex items-center gap-3 text-system-primary-80 text-sm font-medium">
          <div class="w-8 h-px bg-system-primary-80"></div>
          <span>DI CHUYỂN</span>
          <div class="w-8 h-px bg-system-primary-80"></div>
        </div>
        <h2 class="text-h2 xl:text-h1 text-system-primary-120 font-bold">
          Phương tiện di chuyển
        </h2>
        <p class="text-body xl:text-h6 text-system-primary-100 max-w-3xl mx-auto leading-relaxed">
          Khám phá các cách di chuyển thuận tiện đến khách sạn Nikko Luxury tại trung tâm TP.HCM. 
          Chúng tôi đảm bảo mọi hành trình đều thoải mái và sang trọng.
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
        <!-- Bản đồ và địa chỉ -->
        <div class="space-y-6">
          <!-- Địa chỉ -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-system-primary-120 to-system-primary-100 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div class="relative bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-2xl border border-white/20">
              <div class="flex items-start gap-5">
                <div class="bg-gradient-to-br from-system-primary-120 to-system-primary-100 p-3 rounded-2xl shadow-lg">
                  <Icon name="ic:baseline-location-on" class="text-white text-xl" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-bold text-system-primary-120 mb-2">Địa chỉ khách sạn</h3>
                  <p class="text-system-primary-100 text-base mb-2">123 Đường Lê Lợi, Quận 1, TP.HCM, Việt Nam</p>
                  <div class="flex items-center gap-2 text-system-primary-80">
                    <Icon name="ic:baseline-access-time" class="text-system-primary-100" />
                    <span class="text-sm font-medium">Cách trung tâm thành phố chỉ 5 phút đi bộ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bản đồ google -->
          <div class="group relative">
            <div class="absolute inset-0 bg-gradient-to-br from-system-primary-120 to-system-primary-100 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div class="relative bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-2xl border border-white/20">
              <div class="mb-3 flex items-center gap-3">
                <Icon name="ic:baseline-map" class="text-system-primary-120 text-lg" />
                <h4 class="text-base font-semibold text-system-primary-120">Vị trí trên bản đồ</h4>
              </div>
              <div
                id="GOOGLE_MAP"
                ref="mapRefs"
                class="h-72 w-full overflow-hidden rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>

        <!-- Phương tiện di chuyển -->
        <div class="space-y-5">
          <div
            v-for="(travel, index) in travels"
            :key="index"
            class="group relative"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-system-primary-120 to-system-primary-100 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div class="relative bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
              <!-- Header -->
              <div class="flex items-center gap-5 mb-3">
                <div class="bg-gradient-to-br from-system-primary-120 to-system-primary-100 p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon
                    class="text-white text-lg"
                    :name="travel.icon"
                  />
                </div>
                <div class="flex-1">
                  <h3 class="text-base font-bold text-system-primary-120 mb-1">{{ travel.name }}</h3>
                  <div class="flex items-center gap-2 text-system-primary-100">
                    <Icon name="ic:baseline-access-time" class="text-system-primary-80" />
                    <span class="font-semibold text-sm">{{ travel.time }}</span>
                  </div>
                </div>
              </div>

              <!-- Mô tả -->
              <p class="text-system-primary-100 leading-relaxed text-sm mb-3">{{ travel.description }}</p>
              
              <!-- Thông tin bổ sung -->
              <div v-if="travel.additional" class="pt-3 border-t border-system-primary-20">
                <div class="flex items-center gap-3 text-system-primary-80">
                  <div class="bg-system-primary-10 p-2 rounded-lg">
                    <Icon name="ic:baseline-info" class="text-system-primary-120 text-sm" />
                  </div>
                  <span class="font-medium text-xs">{{ travel.additional }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-br from-system-primary-120 via-system-primary-100 to-system-primary-80 rounded-3xl blur-xl opacity-30"></div>
        <div class="relative bg-gradient-to-r from-system-primary-120 to-system-primary-100 rounded-3xl p-10 text-white text-center overflow-hidden">
          <!-- Background pattern -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div class="relative z-10">
            <div class="inline-flex items-center gap-3 text-system-primary-20 text-sm font-medium mb-3">
              <div class="w-6 h-px bg-system-primary-20"></div>
              <span>DỊCH VỤ ĐẶT XE</span>
              <div class="w-6 h-px bg-system-primary-20"></div>
            </div>
            <h3 class="text-xl xl:text-2xl font-bold mb-3">Cần hỗ trợ đặt xe?</h3>
            <p class="text-base opacity-90 mb-5 max-w-2xl mx-auto leading-relaxed">
              Chúng tôi cung cấp dịch vụ đặt xe đưa đón từ sân bay và các địa điểm khác. 
              Xe sang trọng với tài xế chuyên nghiệp, đảm bảo hành trình thoải mái.
            </p>
            <button class="group bg-white text-system-primary-120 px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-system-primary-10 transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-white">
              <span class="flex items-center gap-2">
                <Icon name="ic:baseline-phone" class="group-hover:scale-110 transition-transform duration-300" />
                Liên hệ đặt xe
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'

/* Phương tiện di chuyển cải tiến */
const travels = [
  {
    icon: 'ic:baseline-directions-car',
    name: 'Tự lái xe',
    time: '10-15 phút từ trung tâm',
    description:
      'Nếu bạn chọn tự lái xe, có thể đi theo Quốc lộ 1, ra khỏi giao lộ Hồ Chí Minh, đi về hướng trung tâm thành phố và làm theo biển chỉ dẫn để đến "Khách sạn Nikko". Khách sạn có bãi đậu xe thuận tiện cho bạn.',
    additional: 'Bãi đậu xe miễn phí cho khách lưu trú'
  },
  {
    icon: 'ic:baseline-train',
    name: 'Tàu điện ngầm',
    time: '5 phút đi bộ từ ga',
    description:
      'Sử dụng tuyến tàu điện ngầm số 1, xuống tại ga Bến Thành. Từ đây đi bộ khoảng 5 phút là đến khách sạn. Tàu điện ngầm hoạt động từ 5:30 sáng đến 11:30 tối.',
    additional: 'Ga Bến Thành cách khách sạn 300m'
  },
  {
    icon: 'ic:baseline-local-taxi',
    name: 'Taxi / Grab',
    time: '15-20 phút từ sân bay',
    description:
      'Taxi và Grab có sẵn tại sân bay Tân Sơn Nhất. Chi phí khoảng 200,000 - 300,000 VND. Chúng tôi khuyến nghị sử dụng Grab để có giá cố định và an toàn.',
    additional: 'Grab có sẵn 24/7 tại sân bay'
  },
  {
    icon: 'IconLuxuryCar',
    name: 'Dịch vụ xe đưa đón',
    time: 'Theo lịch hẹn',
    description:
      'Nikko Hotel cung cấp dịch vụ xe đưa đón riêng từ sân bay và các địa điểm khác. Xe sang trọng với tài xế chuyên nghiệp, phí dịch vụ thay đổi tùy theo điểm đến.',
    additional: 'Đặt trước ít nhất 24h'
  }
]

/* Google Maps */
const mapRefs = ref<HTMLElement | null>(null)

// Tọa độ khách sạn (Quận 1, TP.HCM)
const location = { lat: 10.7769, lng: 106.7009 }

// API Key
const loader = new Loader({
  apiKey: 'AIzaSyDDes3MJu5RkOYFeTvZWNbvMZwH6eetYHs',
  version: 'weekly'
})

// Khởi tạo bản đồ
onMounted(() => {
  loader.importLibrary('maps').then(async () => {
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker')
    const { ColorScheme } = await google.maps.importLibrary('core')

    const map = new Map(mapRefs.value as HTMLElement, {
      center: location,
      zoom: 16,
      disableDefaultUI: true,
      mapId: '784f9fa87240c874',
      colorScheme: ColorScheme.LIGHT,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })

    // Thêm marker
    const marker = new AdvancedMarkerElement({
      map,
      position: location,
      title: 'Nikko Luxury Hotel'
    })
  })
})
</script>

<style lang="scss" scoped>
.section-container {
  @apply relative overflow-hidden;
}

:deep(.gm-style-cc) {
  @apply hidden;
}

/* Custom scrollbar for better UX */
:deep(.gm-style) {
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(191, 157, 125, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(191, 157, 125, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(191, 157, 125, 0.5);
    }
  }
}

/* Enhanced hover effects */
.group:hover {
  .group-hover\:scale-110 {
    transform: scale(1.1);
  }
  
  .group-hover\:opacity-30 {
    opacity: 0.3;
  }
}

/* Smooth transitions */
* {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glass morphism effect */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Enhanced shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Background image optimization */
.section-container {
  background-attachment: fixed;
  
  @media (max-width: 768px) {
    background-attachment: scroll;
  }
}
</style>
