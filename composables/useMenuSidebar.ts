import { ref } from 'vue'

export function useMenuSidebar() {
  const menuslidebar = ref([
    {
      title: 'User Management',
      items: [
        { name: 'Staff', link: '/admin/staff', icon: 'mdi:account-group' },
        { name: 'Users', link: '/admin/user', icon: 'mdi:account-group' },
        { name: 'Permission', link: '/admin/permissions', icon: 'mdi:account-group' },
        { name: 'Shift', link: '/admin/staff/shifthistory', icon: 'mdi:account-group' },
        { name: 'Handover', link: '/admin/staff/handover', icon: 'mdi:account-group' }
      ]
    },
    {
      title: 'Room Management',
      items: [{ name: 'Room', link: '/admin/room', icon: 'mdi:home-group' }]
    },
    {
      title: 'Booking Management',
      items: [{ name: 'Booking', link: '/admin/booking', icon: 'mdi:home' }]
    },
    {
      title: 'Promotion Management',
      items: [{ name: 'Promotion', link: '/admin/promotion', icon: 'mdi:sale' }]
    },
    {
      title: 'Service Management',
      items: [{ name: 'Service', link: '/admin/services', icon: 'mdi:room-service' }]
    },
    {
      title: 'Warehouse Management',
      items: [{ name: 'Warehouse', link: '/admin/warehouse', icon: 'mdi:room-service' }]
    }
  ])

  return { menuslidebar }
}
