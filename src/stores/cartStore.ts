import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import { errorAlert, toast } from '@/composable/useAlert';
import axios from 'axios';

const { VITE_APP_API_NAME: path } = import.meta.env;

type CartItem = {
  product_id: string;
  qty: number;
};

const cartStore = defineStore('cart', {
  state() {
    return {
      carts: [],
      total: 0,
      f_total: 0,
      onLoading: false,
    };
  },
  actions: {
    async getCarts() {
      try {
        this.onLoading = true;
        const { data } = await useFetch(`v2/api/${path}/cart`, 'get');
        if (data.success) {
          this.carts = data.data.carts;
          this.total = data.data.total;
          this.f_total = Math.round(data.data.final_total);
        }
      } catch (error) {
        errorAlert('發生錯誤');
      } finally {
        this.onLoading = false;
      }
    },
    async updateCart(cartItem: CartItem, isExist = false) {
      try {
        const method = isExist ? 'put' : 'post';
        let apiPath = `v2/api/${path}/cart`;
        if (isExist) apiPath += `/${cartItem.product_id}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, method, false, { data: cartItem });
        if (data.success) {
          toast(method === 'post' ? '已加入購物車' : '購物車已更新');
          this.getCarts();
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      } finally {
        this.onLoading = false;
      }
    },
    async deleteCart(id: string) {
      try {
        this.onLoading = true;
        const { data } = await useFetch(`v2/api/${path}/cart/${id}`, 'delete');
        if (data.success) {
          this.getCarts();
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      } finally {
        this.onLoading = false;
      }
    },
    async deleteAllCart() {
      try {
        this.onLoading = true;
        const { data } = await useFetch(`v2/api/${path}/carts`, 'delete');
        if (data.success) {
          toast('購物車已清空');
          this.getCarts();
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

export default cartStore;
