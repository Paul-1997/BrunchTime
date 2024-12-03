<template>
  <div class="container">
    <div class="col-lg-10 py-6 py-lg-10 mx-auto">
      <h2 class="fw-bold fs-xl fs-md-2xl text-secondary mb-4 text-center">最新消息</h2>
      <ul class="col-md-8 mx-auto mb-10">
        <li
          v-for="news in articleList"
          :key="news.id"
          class="news__content d-flex flex-column flex-md-row mb-4 cursor-pointer"
          @mouseover="currentActive = news.id!"
          @mouseout="currentActive = ''"
          @click.prevent="$router.push(`/news/${news.id}`)"
          :class="{ active: currentActive === news.id }"
        >
          <div class="img-wrap col-md-3 me-md-4 overflow-hidden">
            <img :src="news.image" alt="news photo" aria-describedby="news__content__title" class="h-100 transition" />
          </div>
          <div class="p-md-2 col-md-9 d-flex flex-column" style="padding-bottom: 0">
            <h3 class="news__content__title transition mb-1">{{ news.title }}</h3>
            <div class="d-none d-md-flex flex-column flex-grow-1">
              <p class="ps-1 text-neutral text-sm flex-grow-1">
                {{ news.description }}
              </p>
              <time :datetime="new Date(news.create_at).toISOString()" class="fs-sm text-neutral text-end">{{
                formatDate(news.create_at / 1000)
              }}</time>
            </div>
          </div>
        </li>
      </ul>
      <PaginationComp :pagination="pagination" />
    </div>
  </div>
</template>

<style scoped>
.news__content.active {
  .img-wrap img {
    scale: 1.25;
  }
  .news__content__title {
    color: var(--bs-accent);
    font-weight: bold;
  }
}
</style>

<script lang="ts">
import articleStore from '@/stores/newsStore';
import { mapActions, mapState } from 'pinia';
import PaginationComp from '@/components/PaginationComp.vue';
import { formatDate } from '@/composable/useHelper';

export default {
  components: {
    PaginationComp,
  },
  data() {
    return {
      currentActive: '',
    };
  },
  methods: {
    formatDate,
    ...mapActions(articleStore, ['getArticles']),
  },
  computed: {
    ...mapState(articleStore, ['articleList', 'pagination']),
    isCurrentNews() {
      return true;
    },
  },
  async mounted() {
    await this.getArticles('custom');
  },
};
</script>
