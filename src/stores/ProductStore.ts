import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import type Product from '@/interface/product';
import type PaginationType from '@/interface/pagination';
import { errorAlert, toast } from '@/composable/useAlert';
import axios from 'axios';

const { VITE_APP_API_NAME: path } = import.meta.env;
const productStore = defineStore('products', {
  state() {
    return {
      productList: [] as Product[],
      pagination: {} as PaginationType,
    };
  },
  actions: {
    async getProducts(from: 'admin' | 'custom', page: number = 0, category: string = '') {
      try {
        let apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}products`;
        if (page > 0) apiPath += `?page=${page}`;
        if (category !== '') apiPath += page > 0 ? `&category=${category}` : `?category=${category}`;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        this.productList = data.products;
        this.pagination = data.pagination;
      } catch (err) {
        errorAlert('出錯了!');
      }
    },
    // async getAllProducts(from: 'admin' | 'custom') {
    //   try {
    //     const apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}products/all`;
    //     const { data } = await useFetch(apiPath, 'get', from === 'admin');
    //     return data;
    //   } catch (err) {
    //     console.log(err);
    //     return false;
    //   }
    // },
    async getSingleProduct(id: string) {
      try {
        const apiPath = `v2/api/${path}/product/${id}`;
        const { data } = await useFetch(apiPath, 'get');
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const result = await errorAlert(err.response?.data.message, '取得產品資訊異常', {
            confirmButtonText: '返回購物列表',
          });
          if (result.isConfirmed) {
            this.$router.push('/products');
          }
        }

        return false;
      }
    },
    async deleteProduct(id: string) {
      try {
        const apiPath = `v2/api/${path}/admin/product/${id}`;
        const { data } = await useFetch(apiPath, 'delete', true);
        if (data.success) {
          toast(data.message);
          this.getProducts('admin');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      }
    },
    async updateProducts(product: Product) {
      try {
        const apiPath = product.id ? `v2/api/${path}/admin/product/${product.id}` : `v2/api/${path}/admin/product`;
        const method = product.id ? 'put' : 'post';
        const { data } = await useFetch(apiPath, method, true, { data: { ...product } });
        if (data.success) {
          toast(data.message);
          this.getProducts('admin');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '');
        }
      }
    },
  },
});

export default productStore;
