<template>
  <div class="container px-5">
    <div class="w-2/3">
      <BreadCrumbs :crumbs="crumbs" />
      <Heading
        class="w-2/3"
        level="1"
        size="3xl">
        {{ snippet.title }}
      </Heading>
      <p class="inline-block mb-5 pb-1 text-gray-700 border-b">
        {{ snippet.category.title }}
      </p>
      <p class="font-bold">
        Description
      </p>
      <div class="mb-3" v-html="snippet.instructions"></div>

      <p class="font-bold">
        Code
      </p>
      <prism language="bash">{{ snippet.code }}</prism>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'

  export default Vue.extend({
    data() {
      return {
        snippet: {}
      }
    },
    async asyncData({ $content, params }) {
      const url = `https://devools.com/api/snippets/${params.slug}`;

      const data = await fetch(url).then(res =>
        res.json()
      );

      const snippet = data.attributes;
      const crumbs = [
        {
          path: '/snippets',
          text: 'Snippets'
        },
        {
          path: '/',
          text: snippet.title
        },
      ];

      return {
        snippet: snippet,
        crumbs: crumbs
      }
    },
    head() {
      const snippet = this.snippet;
      return {
        title: snippet.title,
      }
    }
  });
</script>
