export const useAuthStore = defineStore(
  'auth',
  () => {
    const userName = ref('')
    const token = ref('')
    const email = ref('')
    const id = ref('')

    return {
      userName,
      token,
      email,
      id
    }
  },
  {
    persist: {
      storage: persistedState.localStorage
    }
  }
)
