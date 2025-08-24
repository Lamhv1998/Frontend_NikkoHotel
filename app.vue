<template>
  <AppLoading />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UIScrollTop />
  <!-- AI Chat Button - Hiển thị toàn cục trên tất cả các trang -->
  <AIChatButton />
</template>

<script lang="ts" setup>
import AppLoading from './components/global/AppLoading.vue'
import AIChatButton from './components/UI/AIChatButton.vue'
import { useLoadingStore } from './stores/loading'
/* Thuộc tính toàn cục */
const commonStore = useCommonStore()
const { $Swal } = useNuxtApp()
const loadingStore = useLoadingStore()

/* Lưu thuộc tính toàn cục */
const { width } = useWindowSize()
onMounted(() => {
  watch(
    width,
    () => {
      // Xác định: Có phải thiết bị di động không
      commonStore.isMobile = width.value <= 1200
    },
    {
      immediate: true
    }
  )
  // Xác định: Có phải phía client không
  commonStore.isClient = true
})

/* Chuyển trang về đầu trang */
const { y } = useWindowScroll()
const route = useRoute()
watch(
  () => route.name,
  () => {
    y.value = 0
  }
)

/* Theo dõi thông báo lỗi */
onMounted(() => {
  const showSweetAlert = () => {
    if (commonStore.sweetalertList.length > 0) {
      $Swal?.fire(commonStore.sweetalertList[0]).then(() => {
        commonStore.sweetalertList.shift()
        showSweetAlert()
      })
    }
  }

  watchEffect(() => {
    if (commonStore.sweetalertList.length > 0) {
      showSweetAlert()
    }
  })
})
watch(
  () => route.fullPath,
  async () => {
    loadingStore.startLoading()
    await nextTick() // chờ Nuxt render lại giao diện
    // Dừng loading sau một khoảng delay nhỏ (hoặc khi API xong)
    setTimeout(() => {
      loadingStore.stopLoading()
    }, 1000)
  }
)
</script>
