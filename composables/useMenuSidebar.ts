import { ref } from 'vue'

export function useMenuSidebar() {
  const menuslidebar = ref([
    {
      title: 'User Management',
      items: [
        { name: 'Users', link: '/admin/user', icon: 'mdi:account-group' },
        { name: 'Create-User', link: '/admin/user/create', icon: 'mdi:account' }
      ]
    },
    {
      title: 'Room Management',
      items: [{ name: 'Room', link: '/admin/header', icon: 'mdi:home-group' }]
    },
    {
      title: 'Booking Management',
      items: [{ name: 'Booking', link: '/admin/homepage', icon: 'mdi:home' }]
    },
    {
      title: 'Promotion Management',
      items: [{ name: 'Tutorials', link: '/admin/tutorials', icon: 'mdi:sale' }]
    },
    {
      title: 'Service Management',
      items: [{ name: 'Service', link: '/admin/tutorials', icon: 'mdi:room-service' }]
    }
  ])

  return { menuslidebar }
}
