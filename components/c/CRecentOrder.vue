<template>
  <div class="card">
    <div class="space-y-2">
      <p class="text-body-2 text-system-gray-80 xl:text-body">
        {{ `Mã đơn đặt phòng: ${props.order._id}` }}
      </p>
      <p class="text-title text-black xl:text-h5">Chuyến đi sắp tới</p>
    </div>

    <div class="flex h-[9.375rem] overflow-hidden rounded-lg xl:h-[17rem]">
      <NuxtImg class="h-full w-full object-cover" :src="props.order.roomId.imageUrl" />
    </div>

    <div class="space-y-6 text-system-gray-80">
      <div
        class="flex flex-wrap items-center gap-x-4 gap-y-2 text-nowrap text-sub-title xl:text-h6"
      >
        {{ `${props.order.roomId.name}, ${totalDays} đêm` }}

        <!-- Phân cách -->
        <UILine class="h-4" col color="darkGray" />

        {{ `Số người: ${props.order.peopleNum} người` }}
      </div>

      <div class="space-y-2">
        <CTitle
          :title="`Nhận phòng: ${$dayjs(props.order.checkInDate).format('D/M dddd')}, 15:00 nhận phòng`"
          size="md"
        />
        <CTitle
          :title="`Trả phòng: ${$dayjs(props.order.checkOutDate).format('D/M dddd')}, trả phòng trước 12:00`"
          gray
          size="md"
        />
      </div>

      <p class="text-sub-title xl:text-title">
        {{ useFormatCurrency(props.order.roomId.price * totalDays) }}
      </p>
    </div>

    <!-- Phân cách -->
    <UILine color="lightGrey" />

    <div class="space-y-6">
      <CTitle title="Tiện nghi trong phòng" size="md" />
      <CRoomDetail :details="props.order.roomId.facilityInfo" border />
    </div>

    <div class="space-y-6">
      <CTitle title="Đồ dùng cung cấp" size="md" />
      <CRoomDetail :details="props.order.roomId.amenityInfo" border />
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  order: {
    type: Object,
    default: () => ({
      userInfo: {
        address: {
          zipcode: 802,
          detail: '文山路23號'
        },
        name: 'Joanne Chen',
        phone: '0912345678',
        email: 'example@gmail.com'
      },
      _id: '653e335a13831c2ac8c389bb',
      roomId: {
        name: '尊爵雙人房',
        description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
        imageUrl: '/img/desktop/room2-1.png',
        imageUrlList: [
          '/img/desktop/room2-1.png',
          '/img/desktop/room2-2.png',
          '/img/desktop/room2-3.png',
          '/img/desktop/room2-4.png',
          '/img/desktop/room2-5.png'
        ],
        areaInfo: '24坪',
        bedInfo: '一張大床',
        maxPeople: 4,
        price: 10000,
        status: 1,
        facilityInfo: [
          {
            title: '平面電視',
            isProvide: true
          },
          {
            title: '吹風機',
            isProvide: true
          },
          {
            title: '冰箱',
            isProvide: true
          },
          {
            title: '熱水壺',
            isProvide: true
          },
          {
            title: '檯燈',
            isProvide: true
          },
          {
            title: '衣櫃',
            isProvide: true
          },
          {
            title: '除濕機',
            isProvide: true
          },
          {
            title: '浴缸',
            isProvide: true
          },
          {
            title: '書桌',
            isProvide: true
          },
          {
            title: '音響',
            isProvide: true
          }
        ],
        amenityInfo: [
          {
            title: '衛生紙',
            isProvide: true
          },
          {
            title: '拖鞋',
            isProvide: true
          },
          {
            title: '沐浴用品',
            isProvide: true
          },
          {
            title: '清潔用品',
            isProvide: true
          },
          {
            title: '刮鬍刀',
            isProvide: true
          },
          {
            title: '吊衣架',
            isProvide: true
          },
          {
            title: '浴巾',
            isProvide: true
          },
          {
            title: '刷牙用品',
            isProvide: true
          },
          {
            title: '罐裝水',
            isProvide: true
          },
          {
            title: '梳子',
            isProvide: true
          }
        ],
        _id: '653e4661336cdccc752127a0',
        createdAt: '2023-10-29T11:47:45.641Z',
        updatedAt: '2023-10-29T11:47:45.641Z'
      },
      checkInDate: '2023-06-17T16:00:00.000Z',
      checkOutDate: '2023-06-18T16:00:00.000Z',
      peopleNum: 2,
      orderUserId: '6533f0ef4cdf5b7f762747b0',
      status: 0,
      createdAt: '2023-10-29T10:26:34.498Z',
      updatedAt: '2023-10-29T10:26:34.498Z'
    })
  }
})

const { $dayjs } = useNuxtApp()

const totalDays = computed(() =>
  $dayjs(props.order.checkOutDate).diff($dayjs(props.order.checkInDate), 'day')
)
</script>
