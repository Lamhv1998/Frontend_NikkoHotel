<template>
  <div class="space-y-2">
    <label :class="[blackhead ? 'text-black' : 'text-text-inverse', 'text-sub-title  xl:text-title']"
      >Địa chỉ</label
    >

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <UISelect
        v-model="city"
        placeholder="--Tỉnh/Thành phố--"
        :error="props.zipcodeError"
        :options="citys"
        :disabled="props.disabled"
      />
      <UISelect
        id="zipcode"
        v-model="address.zipcode"
        label="district"
        value="zip_code"
        placeholder="--Quận/Huyện--"
        :error="props.zipcodeError"
        :options="districts"
        :placeholder-value="0"
        :disabled="props.disabled"
      />
    </div>
    <VField
      v-model.trim="address.zipcode"
      class="hidden"
      name="zipcode"
      label="Tỉnh/Thành phố, Quận/Huyện"
    />
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      name="zipcode"
    />
    <UIInput
      v-model="address.detail"
      name="detail"
      label="Địa chỉ chi tiết"
      placeholder="Vui lòng nhập địa chỉ chi tiết"
      :error="props.detailError"
      headless
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Address } from '@/types'

/* props */
const props = defineProps({
  zipcodeError: {
    type: String,
    default: ''
  },
  detailError: {
    type: String,
    default: ''
  },
  blackhead: Boolean,
  disabled: {
    type: Boolean,
    default: true
  }
})

/* Địa chỉ */
const address = defineModel<Address>({
  default: { zipcode: 0, detail: '' }
})

/* Tỉnh/Thành phố */
const city = ref('')

/* api */
const { getCitysApi, getDistrictApi } = useApi()

// api: Lấy danh sách tỉnh/thành phố
const { data: citys } = await getCitysApi({
  transform(input) {
    return input.data
  }
})

// api: Lấy danh sách quận/huyện
const { data: districts } = await getDistrictApi({
  query: { city },
  immediate: false,
  transform(input) {
    return input.data
  },
  onResponse({ response }) {
    // Khi zipcode không có trong danh sách quận/huyện, đặt lại zipcode về 0
    if (
      response.status === 200 &&
      response._data.data.every((item: any) => {
        return item.zip_code !== address.value.zipcode.toString()
      })
    ) {
      address.value.zipcode = 0
    }
  }
})

// Khi zipcode thay đổi, lấy thông tin tỉnh/thành phố và quận/huyện
watch(
  () => address.value.zipcode,
  () => {
    // Không xử lý khi zipcode là 0
    if (address.value.zipcode === 0) return

    getDistrictApi({
      query: { zip_code: address.value.zipcode },
      onResponse({ response }) {
        if (response.status === 200) {
          city.value = response._data.data[0].city
        }
      }
    })
  },
  { immediate: true }
)
</script>
