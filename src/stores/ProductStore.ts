import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch.ts';

const { VITE_APP_API_NAME: path } = import.meta.env;
const productStore = defineStore('products', {
  actions: {
    async getProducts(from: 'admin' | 'custom', page: number = 0) {
      try {
        let apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}products`;
        if (page > 0) apiPath += `?page=${page}`;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async getAllProducts(from: 'admin' | 'custom') {
      try {
        const apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}products/all`;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async getSingleProduct(id: string) {
      try {
        const apiPath = `v2/api/${path}/product/${id}`;
        const { data } = await useFetch(apiPath, 'get');
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async deleteProduct(id: string) {
      try {
        const apiPath = `v2/api/${path}/admin/product/${id}`;
        const { data } = await useFetch(apiPath, 'get', true);
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async updateProducts(product: object) {
      try {
        const apiPath = product.id ? `v2/api/${path}/admin/product/${product.id}` : `v2/api/${path}/admin/product`;
        const { data } = await useFetch(apiPath, 'get', true, product);
        return data;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export default productStore;
