import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import { errorAlert, toast } from '@/composable/useAlert';
import axios from 'axios';
import type Article from '@/interface/news';

const { VITE_APP_API_NAME: path } = import.meta.env;

const articleStore = defineStore('articles', {
  state() {
    return {
      articleList: [] as Article[],
      pagination: {},
      onLoading: false,
    };
  },
  actions: {
    async getArticles(from: 'admin' | 'custom') {
      try {
        const apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}articles`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        this.articleList = data.articles;
        this.pagination = data.pagination;
      } catch (err) {
        errorAlert();
      } finally {
        this.onLoading = false;
      }
    },
    async getSingleArticle(id: string) {
      try {
        const apiPath = `v2/api/${path}/article/${id}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'get');
        return data.article;
      } catch (err) {
        errorAlert();
        return false;
      } finally {
        this.onLoading = false;
      }
    },
    async deleteArticle(id: string) {
      try {
        const apiPath = `v2/api/${path}/admin/article/${id}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'delete', true);
        if (data.success) {
          toast('文章已刪除');
          this.getArticles('admin');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      } finally {
        this.onLoading = false;
      }
    },
    async updateArticle(article: Article) {
      try {
        const apiPath = article.id ? `v2/api/${path}/admin/article/${article.id}` : `v2/api/${path}/admin/article`;
        const method = article.id ? 'put' : 'post';
        this.onLoading = true;
        const { data } = await useFetch(apiPath, method, true, { data: { ...article } });
        if (data.success) {
          toast(method === 'put' ? '文章已更新' : '文章已建立');
          this.getArticles('admin');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      } finally {
        this.onLoading = false;
      }
    },
  },
});

export default articleStore;
