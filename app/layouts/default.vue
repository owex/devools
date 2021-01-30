<template>
  <div>
    <SiteHeader />
    <main class="min-h-screen">
    <Nuxt />
    </main>
    <SiteFooter />

    <client-only>
      <SiteGdpr />
    </client-only>
  </div>
</template>
