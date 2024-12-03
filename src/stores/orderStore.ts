import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import { errorAlert, toast } from '@/composable/useAlert';
import axios from 'axios';
import type { Order, BuyerInfo } from '@/interface/order';

const { VITE_APP_API_NAME: path } = import.meta.env;

const orderStore = defineStore('orders', {
  state() {
    return {
      orderList: [] as Order[],
      pagination: {},
      onLoading: false,
    };
  },
  actions: {
    async getOrders(from: 'admin' | 'custom', page: number = 0) {
      try {
        let apiPath = `v2/api/${path}/${from === 'admin' ? 'admin/' : ''}orders`;
        if (page > 0) apiPath += `?page=${page}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'get', from === 'admin');
        if (data.success) {
          this.orderList = data.orders;
          this.pagination = data.pagination;
        }
      } catch (err) {
        errorAlert('出錯了!');
      } finally {
        this.onLoading = false;
      }
    },
    async getSingleOrder(id: string) {
      try {
        const apiPath = `v2/api/${path}/order/${id}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'get');
        return data;
      } catch (err) {
        errorAlert('發生未知錯誤');
        return false;
      } finally {
        this.onLoading = false;
      }
    },
    async deleteOrder(id: string) {
      try {
        const apiPath = `v2/api/${path}/admin/order/${id}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'delete', true);
        if (data.success) {
          toast(data.message);
          this.getOrders('admin');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      } finally {
        this.onLoading = false;
      }
    },
    async updateOrder(order: Order) {
      try {
        const apiPath = `v2/api/${path}/admin/order/${order.id}`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'put', true, { data: order });
        if (data.success) {
          toast(data.message);
          this.getOrders('admin');
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errorAlert(err.response?.data.message || '錯誤!');
        }
      } finally {
        this.onLoading = false;
      }
    },
    // client post order
    async pushOrder(buyerInfo: BuyerInfo) {
      try {
        const apiPath = `v2/api/${path}/order`;
        this.onLoading = true;
        const { data } = await useFetch(apiPath, 'post', true, { data: buyerInfo });
        return data;
      } catch (err) {
        return false;
      } finally {
        this.onLoading = false;
      }
    },
  },
});

export default orderStore;
