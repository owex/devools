<template>
  <div class="max-w-screen-lg mx-auto px-5">
    <Heading class="text-3xl bold" level="1">
      Code Snippet
    </Heading>

    <p>
      A selection of handy code snippets.
    </p>

    <p v-if="$fetchState.pending">Fetching posts...</p>

    <div class="flex justify-end">

      <div class="mr-2">
        <label for="search">
          <input class="p-2 border shadow" type="text" placeholder="Search" v-model="filters.search" />
        </label>
      </div>

      <select class="px-3 py-2 border shadow" v-model="filters.category">
        <option class="capitalize" value="">
          Filter by Category
        </option>
        <option v-for="(category, index) in categories" :key="index" :value="category.id">
          {{ category.title }}
        </option>
      </select>
    </div>
    <div v-for="(snippet, index) in filteredResults" :key="index">
      <NuxtLink :to="snippet.path" class="flex justify-between py-5 border-b">
        <div>
          <h2 class="text-primary text-lg">
            {{ snippet.title }} <span class="text-xs text-gray-500"> - {{ snippet.category.title }} </span>
          </h2>
          <p class="text-sm">
            {{ snippet.description }}
          </p>
        </div>
        <div>View Snippet</div>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

interface keyable {
  [key: string]: any
}

interface filtersTypes {
  category: string | null,
  search: string | null,
}

interface dataTypes {
  filters: filtersTypes,
  snippets: any,
  categories: any,
}

export default Vue.extend({
  data(): dataTypes {
    return {
      filters: {
        category: '',
        search: '',
      },
      snippets: [],
      categories: [],
    }
  },
  computed: {
    filteredResults(): Array<object> {
      const snippetsArray = [...this.snippets];

      const filteredResults = snippetsArray.filter((item: keyable) => {
        let showElement = true;

        if (this.filters.category && item.category.id !== this.filters.category) {
          showElement = false;
        }

        if (this.filters.search && item.title.toLowerCase().indexOf(this.filters.search.toLowerCase()) === -1) {
          showElement = false;
        }

        return showElement;
      });
    return filteredResults;
    }
  },
  async fetch() {
    const url = 'https://devools.com/api/snippets';
    const jsonData = await fetch(url).then((res) => res.json());

    this.snippets = jsonData.data.map((item: any) => {
      const snippet = item.attributes;
      snippet.path =  `/snippets/${snippet.slug}`;
      return snippet;
    });

    const categoriesIds: any = new Set();
    this.categories = this.snippets
      .map((item: keyable) => {
          return item.category;
      })
      .filter((item: keyable) => {
        if (categoriesIds.has(item.id)) {
          return false;
        }
        categoriesIds.add(item.id);
        return true;
      });
  },
});
</script>
