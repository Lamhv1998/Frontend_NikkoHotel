<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UIScrollTop />
</template>

<script lang="ts" setup>
/* Thuộc tính toàn cục */
const commonStore = useCommonStore()
const { $Swal } = useNuxtApp()

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
</script>
