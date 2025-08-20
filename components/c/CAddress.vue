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
        label="city"
        value="city"
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
    default: false
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
const { data: districts, execute: fetchDistricts } = await getDistrictApi({
  query: { city },
  immediate: false,
  transform(input) {
    console.log('District API response:', input)
    return input.data
  }
})

// Khi chọn tỉnh/thành phố, load quận/huyện
watch(city, async (newCity) => {
  console.log('=== CAddress Component Debug ===')
  console.log('City changed to:', newCity)
  console.log('City type:', typeof newCity)
  console.log('City length:', newCity ? newCity.length : 0)
  
  if (newCity) {
    try {
      console.log('Calling fetchDistricts with city:', newCity)
      await fetchDistricts({ query: { city: newCity } })
      console.log('Districts loaded:', districts.value)
      console.log('Districts count:', districts.value ? districts.value.length : 0)
      // Reset zipcode khi chọn tỉnh/thành phố mới
      address.value.zipcode = 0
    } catch (error) {
      console.error('Error loading districts:', error)
    }
  } else {
    // Clear districts khi không có tỉnh/thành phố
    districts.value = []
  }
}, { immediate: false })

// Khi zipcode thay đổi, lấy thông tin tỉnh/thành phố
watch(
  () => address.value.zipcode,
  () => {
    // Không xử lý khi zipcode là 0
    if (address.value.zipcode === 0) return

    // Tìm tỉnh/thành phố tương ứng với zipcode
    const selectedDistrict = districts.value.find((d: any) => d.zip_code === address.value.zipcode.toString())
    if (selectedDistrict) {
      // Nếu tìm thấy quận/huyện, đảm bảo tỉnh/thành phố đã được chọn
      if (!city.value) {
        // Tìm tỉnh/thành phố tương ứng
        const cityData = citys.value.find((c: any) => {
          return c.zip_code === address.value.zipcode.toString().substring(0, 5) + '000'
        })
        if (cityData) {
          city.value = cityData.city
        }
      }
    }
  },
  { immediate: true }
)
</script>
