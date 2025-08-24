export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Hydrate store từ localStorage ngay khi plugin được load
  authStore.hydrateFromStorage()
})
