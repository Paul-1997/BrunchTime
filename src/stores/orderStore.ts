import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import type { Order } from '@/interface/order';

const { VITE_APP_API_NAME: path } = import.meta.env;

const orderStore = defineStore('orders', {
  state() {
    return {
      orderList: [] as Order[],
      pagination: {},
    };
  },
  actions: {
    async getOrders(from: 'admin' | 'custom', page: number = 0) {
      try {
        let apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}orders`;
        if (page > 0) apiPath += `?page=${page}`;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        if (data.success) {
          this.orderList = data.orders;
          this.pagination = data.pagination;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getSingleOrder(id: string) {
      try {
        const apiPath = `v2/api/${path}/order/${id}`;
        const { data } = await useFetch(apiPath, 'get');
      } catch (err) {
        console.log(err);
      }
    },
    async deleteOrder(id: string) {
      try {
        const apiPath = `v2/api/${path}/admin/product/${id}`;
        const { data } = await useFetch(apiPath, 'get', true);
        if (data.success) this.getOrders('admin');
      } catch (err) {
        console.log(err);
      }
    },
    async updateOrder(order: Order) {
      try {
        const apiPath = `v2/api/${path}/admin/order/${order.id}`;
        const { data } = await useFetch(apiPath, 'put', true, { data: order });
        if (data.success) this.getOrders('admin');
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default orderStore;
