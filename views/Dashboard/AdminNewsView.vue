<template>
  <div class="container">
    <h2 class="fw-bold fs-4xl text-center text-secondary my-10">文章管理</h2>
    <div class="toolbar mb-3 d-flex align-items-center justify-content-end gap-3">
      <div class="dropdown">
        <button
          class="btn dropdown-toggle d-flex align-items-center text-neutral"
          type="button"
          id="articleDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-html="orderValue === 'latest' ? '最新' : '最舊'"
        ></button>
        <ul class="dropdown-menu" aria-labelledby="articleDropdown">
          <li>
            <a class="dropdown-item" href="#" @click.prevent="orderValue = 'latest'"> 最新 </a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click.prevent="orderValue = 'oldest'"> 最舊 </a>
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-accent" @click="getModal('news')">新增文章</button>
    </div>
    <div class="row justify-content-center gap-6">
      <template v-for="article in articleList" :key="article.id">
        <div class="col-md-8 p-3 bg-primary bg-opacity-50 d-flex">
          <img :src="article.image" alt="文章圖片" style="width: 20%" />
          <div class="article__content flex-grow-1 mx-3">
            <p class="article__content__title fw-bold fs-xl">{{ article.title }}</p>
            <p class="fs-sm ps-2">作者: {{ article.author }}</p>
            <p class="article__content__description ps-2 text-neutral">{{ article.description }}</p>
          </div>
          <div class="article__editTool" style="align-content: center">
            <div class="button-group">
              <span
                class="material-symbols-outlined interactive-button me-md-3 cursor-pointer"
                @click="getModal('news', article)"
              >
                edit
              </span>
              <span
                class="material-symbols-outlined interactive-button cursor-pointer"
                @click="getModal('delete', article)"
              >
                delete
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <NewsModal ref="news" :article="tempArticle" @update-news="updateArticle" />
    <DeleteModal
      ref="delete"
      :title="tempArticle.title!"
      :target-id="tempArticle.id!"
      @delete-target="async (id) => await deleteArticle(id)"
    />
    <Loading :active="onLoading" />
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import News from '@/stores/newsStore';
import NewsModal from '@/components/Dashboard/NewsModal.vue';
import DeleteModal from '@/components/Dashboard/DeleteModal.vue';
import type Article from '@/types/news';
import Loading from '@/components/LoadingComp.vue';

export default {
  components: {
    NewsModal,
    DeleteModal,
    Loading,
  },
  data() {
    return {
      orderValue: 'latest',
      tempArticle: {} as Article,
    };
  },
  computed: {
    ...mapState(News, ['articleList', 'pagination', 'onLoading']),
  },
  methods: {
    getModal(modalName: string, data?: any) {
      const modal: any = this.$refs[modalName];
      this.tempArticle = { ...data };
      modal.openModal();
    },
    ...mapActions(News, ['getArticles', 'updateArticle', 'deleteArticle']),
  },
  async mounted() {
    await this.getArticles('admin');
  },
};
</script>
