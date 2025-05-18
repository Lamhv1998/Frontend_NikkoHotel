import { ref } from 'vue'

export function useMenuSidebar() {
  const menuslidebar = ref([
    {
      title: 'Getting Started',
      items: [
        { name: 'Installation', link: '/admin/installation', icon: 'mdi:home' },
        { name: 'Plugins', link: '/admin/plugins', icon: 'mdi:puzzle' },
        { name: 'Migrations', link: '/admin/migrations', icon: 'mdi:database-import' },
        { name: 'Appearance', link: '/admin/appearance', icon: 'mdi:palette' },
        { name: 'Mamba UI', link: '/admin/mamba-ui', icon: 'mdi:brush' }
      ]
    },
    {
      title: 'Dashboard',
      items: [
        { name: 'Header', link: '/admin/header', icon: 'mdi:page-layout-header' },
        { name: 'Drawer', link: '/admin/drawer', icon: 'mdi:menu-open' },
        { name: 'Page Title', link: '/admin/page-title', icon: 'mdi:format-title' },
        { name: 'Menus', link: '/admin/menus', icon: 'mdi:menu' },
        { name: 'Sidebar', link: '/admin/sidebar', icon: 'mdi:view-dashboard' },
        { name: 'Footer', link: '/admin/footer', icon: 'mdi:page-layout-footer' }
      ]
    },
    {
      title: 'Pages',
      items: [
        { name: 'Homepage', link: '/admin/homepage', icon: 'mdi:home' },
        { name: 'Users', link: '/admin/users', icon: 'mdi:account-group' },
        { name: 'Tools', link: '/admin/tools', icon: 'mdi:tools' },
        { name: 'Settings', link: '/admin/settings', icon: 'mdi:cog' }
      ]
    },
    {
      title: 'Misc',
      items: [
        { name: 'Tutorials', link: '/admin/tutorials', icon: 'mdi:school' },
        { name: 'Changelog', link: '/admin/changelog', icon: 'mdi:clipboard-text' }
      ]
    }
  ])

  return { menuslidebar }
}
