import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import useAlert from '@/composable/useAlert';

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
    };
  },
  actions: {
    async getCarts() {
      try {
        const { data } = await useFetch(`v2/api/${path}/cart`, 'get');
        if (data.success) {
          this.carts = data.data.carts;
          this.total = data.data.total;
          this.f_total = Math.round(data.data.final_total);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateCart(cartItem: CartItem, isExist = false) {
      try {
        console.log(cartItem, isExist);
        const method = isExist ? 'put' : 'post';
        let apiPath = `v2/api/${path}/cart`;
        if (isExist) apiPath += `/${cartItem.product_id}`;
        const { data } = await useFetch(apiPath, method, false, { data: cartItem });
        if (data.success) await this.getCarts();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCart(id: string) {
      try {
        const { data } = await useFetch(`v2/api/${path}/cart/${id}`, 'delete');
        if (data.success) await this.getCarts();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAllCart() {
      try {
        const { data } = await useFetch(`v2/api/${path}/carts`, 'delete');
        if (data.success) await this.getCarts();
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default cartStore;
