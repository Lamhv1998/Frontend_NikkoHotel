export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Hydrate store từ localStorage ngay khi plugin được load
  console.log('Hydrating auth store from localStorage...')
  authStore.hydrateFromStorage()
  
  console.log('Store hydration completed. State:', {
    hasToken: !!authStore.token,
    hasUser: !!authStore.user,
    hasCustomerProfile: !!authStore.customerProfile
  })
})
