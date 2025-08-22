import type { UseFetchOptions } from 'nuxt/app'

// Types cho dữ liệu tỉnh thành Việt Nam
export type Province = {
  code: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  code_name: string
  administrative_unit_id: number
  administrative_region_id: number
}

export type District = {
  code: string
  name: string
  name_en: string
  full_name: string
  full_name_en: string
  code_name: string
  province_code: string
  administrative_unit_id: number
}

const addressAPI = {
  // Lấy danh sách tỉnh/thành phố
  getProvincesApi: <T = any>(options: UseFetchOptions<T>) => {
    return $fetch<Province[]>('/api/provinces', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  // Lấy danh sách quận/huyện theo tỉnh
  getDistrictsApi: <T = any>(options: UseFetchOptions<T>) => {
    const query = options.query as any
    const provinceCode = query?.provinceCode
    if (!provinceCode) {
      throw new Error('Province code is required')
    }
    
    return $fetch<District[]>(`/api/districts?provinceCode=${provinceCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  // API cũ để tương thích (nếu cần)
  getCitysApi: <T = any>(options: UseFetchOptions<T>) => {
    return addressAPI.getProvincesApi(options)
  },

  getDistrictApi: <T = any>(options: UseFetchOptions<T>) => {
    return addressAPI.getDistrictsApi(options)
  }
}

export default addressAPI
