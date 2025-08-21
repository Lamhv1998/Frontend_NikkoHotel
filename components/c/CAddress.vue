<template>
  <div class="space-y-2">
    <label :class="[blackhead ? 'text-black' : 'text-text-inverse', 'text-sub-title  xl:text-title']"
      >Địa chỉ</label
    >

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <!-- Tỉnh/Thành phố -->
      <UISelect
        v-model="selectedProvince"
        placeholder="--Tỉnh/Thành phố--"
        :error="props.zipcodeError"
        :options="provinces"
        value="code"
        label="name"
        :disabled="props.disabled"
        @update:model-value="onProvinceChange"
      />
      
      <!-- Quận/Huyện -->
      <UISelect
        v-model="selectedDistrict"
        placeholder="--Quận/Huyện--"
        :error="props.zipcodeError"
        :options="districts"
        value="code"
        label="name"
        :disabled="props.disabled || !selectedProvince"
        @update:model-value="onDistrictChange"
      />
    </div>
    
    <VField
      v-model="addressCity"
      class="hidden"
      name="city"
      label="Tỉnh/Thành phố"
    />
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      name="city"
    />
    
    <UIInput
      v-model="addressDetail"
      name="detail"
      label="Địa chỉ chi tiết"
      placeholder="Vui lòng nhập địa chỉ chi tiết (số nhà, tên đường, ...)"
      :error="props.detailError"
      headless
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Address } from '@/types'
import type { Province, District } from '@/api/address'
import { vietnamProvinces, vietnamDistricts } from '@/data/vietnam-provinces'

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
  default: { city: '', district: '', detail: '' }
})

// Đảm bảo address luôn là object
const ensureAddressObject = (value: any): Address => {
  if (typeof value === 'string') {
    // Nếu là string, tách thành các phần và gán vào object
    const parts = value.split(',').map(part => part.trim())
    return {
      city: parts[2] || '', // TP.HCM
      district: parts[1] || '', // Q1
      detail: parts[0] || '' // 123A Lê Lợi
    }
  }
  return value || { city: '', district: '', detail: '' }
}

/* Selected values */
const selectedProvince = ref('')
const selectedDistrict = ref('')

/* API - Không cần thiết khi sử dụng dữ liệu tĩnh */
// const { getProvincesApi, getDistrictsApi } = useApi()

// Lấy danh sách tỉnh/thành phố
const provinces = ref<Province[]>([])
const districts = ref<District[]>([])

// Load provinces
const loadProvinces = async () => {
  // Sử dụng dữ liệu tĩnh hoàn toàn
  provinces.value = vietnamProvinces
}

// Load districts
const loadDistricts = async (provinceCode: string) => {
  // Sử dụng dữ liệu tĩnh hoàn toàn
  districts.value = (vietnamDistricts as any)[provinceCode] || []
}

// Load provinces on mount
await loadProvinces()

// Khi chọn tỉnh/thành phố
const onProvinceChange = (value: string | number | undefined) => {
  if (typeof value === 'string' && value) {
    selectedDistrict.value = ''
    // Đảm bảo address là object trước khi gán
    if (typeof address.value === 'string') {
      address.value = ensureAddressObject(address.value)
    }
    address.value.city = provinces.value?.find((p: Province) => p.code === value)?.name || ''
    address.value.district = ''
    loadDistricts(value)
  }
}

// Khi chọn quận/huyện
const onDistrictChange = (value: string | number | undefined) => {
  if (typeof value === 'string' && value) {
    // Đảm bảo address là object trước khi gán
    if (typeof address.value === 'string') {
      address.value = ensureAddressObject(address.value)
    }
    address.value.district = districts.value?.find((d: District) => d.code === value)?.name || ''
  }
}

// Computed properties
const addressCity = computed({
  get: () => {
    if (typeof address.value === 'string') {
      return ''
    }
    return address.value?.city || ''
  },
  set: (value: string) => {
    if (typeof address.value === 'string') {
      // Nếu address là string, chuyển thành object
      const parts = (address.value as string).split(',').map((part: string) => part.trim())
      address.value = {
        city: value,
        district: parts[1] || '',
        detail: parts[0] || ''
      }
    } else {
      if (address.value && typeof address.value === 'object') {
        address.value.city = value
      }
    }
  }
})

const addressDetail = computed({
  get: () => {
    if (typeof address.value === 'string') {
      return address.value
    }
    return address.value?.detail || ''
  },
  set: (value: string) => {
    if (typeof address.value === 'string') {
      // Nếu address là string, chuyển thành object
      const parts = (address.value as string).split(',').map((part: string) => part.trim())
      address.value = {
        city: parts[2] || '',
        district: parts[1] || '',
        detail: value
      }
    } else {
      if (address.value && typeof address.value === 'object') {
        address.value.detail = value
      }
    }
  }
})

// Watch để cập nhật address khi có dữ liệu từ props
watch(() => address.value, (newAddress) => {
  // Đảm bảo address là object
  if (typeof newAddress === 'string') {
    address.value = ensureAddressObject(newAddress)
    return
  }
  
  if (newAddress?.city && provinces.value) {
    const province = provinces.value.find((p: Province) => p.name === newAddress.city)
    if (province) {
      selectedProvince.value = province.code
      loadDistricts(province.code)
    }
  }
  
  if (newAddress?.district && districts.value) {
    const district = districts.value.find((d: District) => d.name === newAddress.district)
    if (district) {
      selectedDistrict.value = district.code
    }
  }
}, { deep: true, immediate: true })
</script>
