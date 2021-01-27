
<template>
  <header class="p-3 bg-primary text-white text-lg font-heading mb-5 border-b">
    <nav class="flex justify-center items-center">
      <site-header-nav-item title="Home" link="/" :external="false" />
      <site-header-nav-item title="Tools" link="" :external="false" :children="tools" />
      <NuxtLink to="/" class="block mr-4 text-white" style="max-width: 40px;">
        <SvgLogo class="block max-w-full fill-current transition duration-500 ease-in-out transform hover:rotate-45" />
      </NuxtLink>
      <site-header-nav-item title="Snippets" link="/snippets" :external="false" />
      <site-header-nav-item title="Donate" link="https://www.paypal.me/owen/" :external="true" />
    </nav>
  </header>
</template>

<script>
import SiteHeaderNavItem from './SiteHeaderNavItem.vue'
import SvgLogo from '@/assets/logo.svg?inline'

export default {
  components: {
    SiteHeaderNavItem,
    SvgLogo
  },
  data() {
    return {
      tools: [
        {
          path: '/tools/colour-manager',
          title: 'Colour Manager',
        },
        {
          path: '/tools/password-generator',
          title: 'Password Generator',
        },
        {
          path: '/tools/text-to',
          title: 'Text To',
        },
        {
          path: '/tools/pixel-to-em',
          title: 'Pixel to EM/REM',
        },
        {
          path: '/tools/html-list-generator',
          title: 'HTML List Generator',
        },
        {
          path: '/tools/strip-tags',
          title: 'Strip HTML Tags',
        },
        {
          path: 'https://csstriangle.firebaseapp.com/',
          title: 'CSS Triangle Generator',
          external: true,
        }
      ]
    }
  }
}
</script>
