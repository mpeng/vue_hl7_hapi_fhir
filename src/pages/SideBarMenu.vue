<template>
  <sidebar-menu :menu="menu" />
</template>

<script>
  export default {
    data() {
      return {
        menu: [
          {
            header: true,
            title: 'Main Navigation',
            hiddenOnCollapse: false
          },
          {
            href: '/',
            title: 'Dashboard',
            icon: 'ti-layout-tab-window',
            child: [
              {
                href: '/codeSystem',
                title: 'Sub Link',
                icon: 'ti-layout-tab-window',
              },
              {
                href: '/codeSystem',
                title: 'Sub Link',
                icon: 'ti-layout-tab-window',
              },
              {
                href: '/codeSystem',
                title: 'Sub Link',
                icon: 'ti-layout-tab-window',
              }
            ]
          },
          {
            href: '/',
            title: 'Menus',
            icon: 'ti-layout-tab-window',
            child: [
              {
                href: '/codeSystem',
                title: 'Sub Link',
                icon: 'ti-layout-tab-window',
              },
              {
                href: '/codeSystem',
                title: 'Sub Link',
                icon: 'ti-layout-tab-window',
              },
              {
                href: '/codeSystem',
                title: 'Sub Link',
                icon: 'ti-layout-tab-window',
              }
            ]
          }
        ]
      }
    }
  }
</script>
