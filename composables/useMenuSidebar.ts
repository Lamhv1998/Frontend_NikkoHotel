import { ref } from 'vue'

export function useMenuSidebar() {
  const menuslidebar = ref([
    {
      title: 'User Management',
      items: [
        { name: 'Installation', link: '/admin/installation', icon: 'mdi:home' },
        { name: 'Plugins', link: '/admin/plugins', icon: 'mdi:puzzle' },
        { name: 'Migrations', link: '/admin/migrations', icon: 'mdi:database-import' }
      ]
    },
    {
      title: 'Room Management',
      items: [
        { name: 'Header', link: '/admin/header', icon: 'mdi:page-layout-header' },
        { name: 'Drawer', link: '/admin/drawer', icon: 'mdi:menu-open' },
        { name: 'Page Title', link: '/admin/page-title', icon: 'mdi:format-title' }
      ]
    },
    {
      title: 'Booking Management',
      items: [
        { name: 'Homepage', link: '/admin/homepage', icon: 'mdi:home' },
        { name: 'Users', link: '/admin/users', icon: 'mdi:account-group' },
        { name: 'Tools', link: '/admin/tools', icon: 'mdi:tools' }
      ]
    },
    {
      title: 'Promotion Management',
      items: [
        { name: 'Tutorials', link: '/admin/tutorials', icon: 'mdi:school' },
        { name: 'Changelog', link: '/admin/changelog', icon: 'mdi:clipboard-text' }
      ]
    }
  ])

  return { menuslidebar }
}
