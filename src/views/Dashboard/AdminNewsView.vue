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
    <div class="row">
      <div class="col-4"></div>
    </div>
    <NewsModal ref="news" />
  </div>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import News from '@/stores/newsStore';
import NewsModal from '@/components/Dashboard/NewsModal.vue';

export default {
  components: {
    NewsModal,
  },
  data() {
    return {
      orderValue: 'latest',
      tempArticle: {},
    };
  },
  computed: {
    ...mapState(News, ['articleList', 'pagination']),
  },
  methods: {
    getModal(modalName: string, data?: any) {
      const modal: any = this.$refs[modalName];
      this.tempArticle = { ...data };
      modal.openModal();
    },
    ...mapActions(News, ['getArticles']),
  },
  async mounted() {
    await this.getArticles('admin');
  },
};
</script>
