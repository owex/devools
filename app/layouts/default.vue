<template>
  <div>
    <SiteHeader />
    <main class="min-h-screen-60">
    <Nuxt />
    </main>
    <SiteFooter />

    <client-only>
      <SiteGdpr />
    </client-only>
  </div>
</template>
