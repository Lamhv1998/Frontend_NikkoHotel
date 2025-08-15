<template>
  <div class="min-h-screen bg-gray-100 px-4 py-10">
    <form
      class="mx-auto max-w-5xl space-y-10 rounded-xl bg-white p-8 shadow-xl"
      @submit.prevent="onSubmit"
    >
      <!-- Thông tin cá nhân -->
      <fieldset class="grid grid-cols-4 gap-6">
        <div class="col-span-full space-y-2 lg:col-span-1">
          <p class="text-lg font-semibold text-gray-700">Thông tin cá nhân</p>
          <p class="text-xs text-gray-600">Vui lòng nhập thông tin cá nhân của bạn.</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <CTitle class="text-sm font-medium text-gray-600" title="Họ" for="firstname"></CTitle>
            <input
              id="firstname"
              v-model="form.firstname"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="First name"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <CTitle class="text-sm font-medium text-gray-600" title="Tên" for="lastname"></CTitle>
            <input
              id="lastname"
              v-model="form.lastname"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
              placeholder="Last name"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <CTitle
              class="text-sm font-medium text-gray-600"
              title="Ngày sinh"
              for="birthday"
            ></CTitle>
            <input
              id="birthday"
              v-model="form.birthday"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="date"
              placeholder="Ngày sinh"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <CTitle
              class="text-sm font-medium text-gray-600"
              title="Số điện thoại"
              for="customer_phone"
            ></CTitle>
            <input
              id="customer_phone"
              v-model="form.customer_phone"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="tel"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <CTitle class="text-sm font-medium text-gray-600" title="Email" for="email"></CTitle>
            <input
              id="email"
              v-model="form.email"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="col-span-full sm:col-span-3">
            <CTitle class="text-sm font-medium text-gray-600" title="Quyền" for="role"></CTitle>
            <select
              id="role"
              v-model="form.role"
              class="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn quyền--</option>
              <option value="admin">Admin</option>
              <option value="user">Người dùng</option>
              <option value="staff">Nhân viên</option>
            </select>
          </div>
          <div class="col-span-full">
            <CTitle class="text-sm font-medium text-gray-600" for="address">Địa chỉ</CTitle>
            <input
              id="address"
              v-model="form.address"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <CTitle class="text-sm font-medium text-gray-600" for="city">Thành phố</CTitle>
            <input
              id="city"
              v-model="form.city"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <CTitle class="text-sm font-medium text-gray-600" for="state">Tỉnh / Quận</CTitle>
            <input
              id="state"
              v-model="form.state"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
          <div class="col-span-full sm:col-span-2">
            <CTitle class="text-sm font-medium text-gray-600" for="zip">Mã bưu điện</CTitle>
            <input
              id="zip"
              v-model="form.zip"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="text"
            />
          </div>
        </div>
      </fieldset>
      <!-- Thông tin phòng -->
      <fieldset class="grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm dark:bg-gray-50">
        <div class="col-span-full space-y-2 lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin phòng</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <CTitle class="text-sm font-medium text-gray-600" title="Tầng" for="floor"></CTitle>
            <select
              id="floor"
              v-model="form.floor"
              class="mt-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn tầng--</option>
              <option value="standard">Tầng 1</option>
              <option value="deluxe">Tầng 2</option>
              <option value="suite">Tầng 3</option>
            </select>
          </div>
          <div class="col-span-full sm:col-span-3">
            <CTitle class="font-medium text-gray-600" title="Số phòng" for="room_number"></CTitle>
            <select
              id="room_number"
              v-model="form.room_number"
              class="mt-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn tầng--</option>
              <option value="standard">Tầng 1</option>
              <option value="deluxe">Tầng 2</option>
              <option value="suite">Tầng 3</option>
            </select>
          </div>

          <div class="col-span-full sm:col-span-3">
            <CTitle
              class="text-sm font-medium text-gray-600"
              title="Loại phòng:"
              for="roomType"
            ></CTitle>
            <select
              id="roomType"
              v-model="form.roomType"
              class="mt-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn loại phòng--</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="room_note">Ghi chú</label>
            <textarea
              id="room_note"
              v-model="form.room_note"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
        </div>
      </fieldset>
      <!-- Thông tin Booking -->
      <fieldset class="grid grid-cols-4 gap-6 rounded-md p-6 shadow-sm dark:bg-gray-50">
        <div class="col-span-full space-y-2 lg:col-span-1">
          <p class="text-xl font-semibold text-gray-700">Thông tin Booking</p>
          <p class="text-xs">Thông tin về đặt phòng của khách</p>
        </div>
        <div class="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
          <div class="col-span-full sm:col-span-3">
            <CTitle title="Ngày đặt phòng" size="md" />
            <div class="space-y-2">
              <div
                v-if="orderStore.order.checkInDate && orderStore.order.checkOutDate"
                class="space-y-6"
              >
                <p class="text-body text-system-info-120">
                  {{ `Nhận phòng: ${$dayjs(orderStore.order.checkInDate).format('D/M dddd')}` }}
                </p>
                <p class="text-body text-system-success-120">
                  {{ `Trả phòng: ${$dayjs(orderStore.order.checkOutDate).format('D/M dddd')}` }}
                </p>
              </div>
            </div>
            <datepicker />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <CTitle title="Số lượng khách" size="md" />
              <input
                id="guest_count"
                v-model="form.guest_count"
                class="w-40 rounded-md border-gray-700 p-5 text-system-info-100 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="number"
                placeholder="Nhập số lượng khách"
                min="1"
              />
            </div>
          </div>
          <div class="col-span-full">
            <CTitle
              class="text-sm font-medium text-gray-600"
              title="Dịch vụ :"
              for="service"
            ></CTitle>
            <select
              id="service"
              v-model="form.service"
              class="mt-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn dịch vụ--</option>
              <option value="pickup">Đưa đón</option>
              <option value="restaurant">Đặt bàn</option>
              <option value="special_staff">Nhân viên xinh đẹp</option>
            </select>
          </div>
          <div class="col-span-full">
            <CTitle class="text-sm font-medium text-gray-600" title="Ưu đãi" for="promotion">
              :</CTitle
            >
            <select
              id="promotion"
              v-model="form.promotion"
              class="mt-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="" disabled>--Chọn ưu đãi--</option>
              <option value="discount50">GIẢM 50%</option>
              <option value="discount25">GIẢM 25%</option>
              <option value="special_staff">Nhân viên xinh đẹp</option>
            </select>
          </div>
          <div class="col-span-full">
            <label class="text-sm font-medium text-gray-600" for="booking_note">Ghi chú</label>
            <textarea
              id="booking_note"
              v-model="form.booking_note"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div class="col-span-full">
            <CTitle
              class="text-xl-center font-medium text-gray-600"
              title="Tổng Giá tiền"
              for="price"
            ></CTitle>
            <input
              id="price"
              v-model="form.price"
              class="mt-1 h-20 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              type="number"
              placeholder="Giá tiền phòng"
              disabled
            />
          </div>
        </div>
      </fieldset>
      <div class="flex justify-end">
        <button class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" type="submit">
          {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import datepicker from '~/pages/reserve/components/datepicker.vue'
/* Thuộc tính toàn cục */

const { $dayjs } = useNuxtApp()
const orderStore = useOrderStore()
const props = defineProps({
  bookingData: {
    type: Object,
    default: () => ({
      firstname: '',
      lastname: '',
      birthday: '',
      customer_phone: '',
      email: '',
      role: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      room_number: '',
      floor: '',
      roomType: '',
      room_note: '',
      guest_count: 1,
      service: '',
      promotion: '',
      booking_note: '',
      price: ''
      // Các trường khác nếu cần
    })
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = reactive({ ...props.bookingData })

const onSubmit = () => {
  emit('submit', { ...form })
}
</script>
