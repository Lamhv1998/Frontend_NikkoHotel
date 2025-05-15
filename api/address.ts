import type { UseFetchOptions } from 'nuxt/app'

const addressAPI = {
  getCitysApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/citys', options)
  },
  getDistrictApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/district', options)
  }
}

export default addressAPI
