<template>
  <div class="container px-5">
    <Heading level="1" size="2xl" v-if="error.statusCode === 404">Page not found</Heading>
    <h1 v-else>An error occurred</h1>
    <Button>
    <nuxt-link to="/">Home page</nuxt-link>
    </Button>
  </div>
</template>
<script>
export default {
  props: ['error']
}
</script>
