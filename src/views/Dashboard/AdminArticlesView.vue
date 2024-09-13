<template>
  <p>article</p>
  {{ articleList }}
  {{ pagination }}
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import articleStore from '@/stores/articleStore.ts';

export default {
  computed: {
    ...mapState(articleStore, ['articleList', 'pagination']),
  },
  methods: {
    ...mapActions(articleStore, ['getArticles']),
  },
  async mounted() {
    await this.getArticles('admin');
  },
};
</script>
