import type { UseFetchOptions } from 'nuxt/app'

const roomAPI = {
  getRoomsApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/rooms', options)
  },
  getRoomApi: <T = any>(id: string, options: UseFetchOptions<T>) => {
    return useHttp.get(`/api/v1/rooms/${id}`, options)
  }
}

export default roomAPI
