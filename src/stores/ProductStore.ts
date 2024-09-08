import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch.ts';

const productStore = defineStore('products', {
  actions: {
    async getProducts(from: 'admin' | 'custom') {
      const { VITE_APP_API_NAME: path } = import.meta.env;
      try {
        const apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}products`;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async getAllProducts(from: 'admin' | 'custom') {
      const { VITE_APP_API_NAME: path } = import.meta.env;
      try {
        const apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}products/all`;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export default productStore;
