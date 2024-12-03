<template>
  <div class="container">
    <div class="d-flex justify-content-center py-6">
      <div class="col-md-9">
        <Loading
          :active="onLoading"
          :is-full-page="false"
          :loader="'spinner'"
          style="display: grid; place-content: center; min-height: 60vh"
        />
        <div class="news__detail mx-auto d-flex flex-column" v-if="!onLoading">
          <h3 class="news__detail__title fw-bold text-secondary fs-xl fs-md-3xl">{{ article.title }}</h3>
          <p class="ps-1 mb-2 text-neutral">
            <time
              :datetime="new Date(article.create_at).toISOString()"
              class="fs-sm text-neutral text-end"
              v-if="article.id"
              >發布日期:{{ formatDate(article.create_at / 1000) }}</time
            >
          </p>
          <div class="news__detail__photoWrapper">
            <img :src="article.image" :alt="`${article.title} photo`" class="news__detail__photo mb-4 w-100" />
          </div>
          <p v-html="article.content" class="news__detail__content py-6 py-md-8 border-bottom border-neutral-light"></p>

          <div class="d-flex justify-content-between py-4" v-if="articleList.length">
            <a
              href="#"
              @click.prevent="$router.push(`/news/${newsLinkOption(-1).id}`)"
              v-if="newsLinkOption(-1)"
              class="me-auto"
            >
              <p>上一篇：</p>
              {{ newsLinkOption(-1).title }}
            </a>
            <a
              href="#"
              @click.prevent="$router.push(`/news/${newsLinkOption(1).id}`)"
              v-if="newsLinkOption(1)"
              class="ms-auto"
            >
              <p>下一篇：</p>
              {{ newsLinkOption(1).title }}
            </a>
          </div>
        </div>
      </div>
      <div class="col-md-3 d-none d-md-block">
        <nav class="position-sticky" style="top: 70px">
          <h3 class="fw-bold fs-xl text-secondary p-4 ps-0 pb-0 mb-1 border-bottom border-accent border-4">最新消息</h3>
          <ul class="newsListNav">
            <li
              v-for="news in articleList"
              :key="news.id"
              class="border"
              :class="{ 'bg-accent text-white': isCurrentNews(news.id!) }"
            >
              <a href="#" @click.prevent="$router.push(`/news/${news.id}`)" class="p-3 d-block fw-semibold">
                {{ news.title }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news__detail {
  width: min(100%, 664px);
  &__title {
    text-shadow: 1px 1px currentColor;
  }
}
</style>

<script lang="ts">
import type Article from '@/interface/news';
import articleStore from '@/stores/newsStore';
import { mapActions, mapState } from 'pinia';
import { formatDate } from '@/composable/useHelper';
import Loading from '@/components/LoadingComp.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      article: {} as Article,
    };
  },
  methods: {
    formatDate,
    newsLinkOption(num: number) {
      const idx = this.articleList.findIndex((x) => x.id === this.article.id);
      return this.articleList[idx + num];
    },
    isCurrentNews(uid: string) {
      const id = this.$route.path.split('/').pop();
      return uid === id;
    },
    ...mapActions(articleStore, ['getArticles', 'getSingleArticle']),
  },
  computed: {
    ...mapState(articleStore, ['articleList', 'pagination', 'onLoading']),
  },
  async mounted() {
    await this.getArticles('custom');
    this.article = await this.getSingleArticle(this.$route.path.split('/').pop()!);
  },
  watch: {
    '$route.path': {
      async handler(path) {
        this.article = await this.getSingleArticle(path.split('/').pop());
      },
    },
  },
};
</script>
