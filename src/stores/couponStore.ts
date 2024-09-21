import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch';
import type Coupon from '@/interface/coupon';

const { VITE_APP_API_NAME: path } = import.meta.env;
const couponStore = defineStore('coupons', {
  state() {
    return {
      couponList: [] as Coupon[],
      pagination: {},
    };
  },
  actions: {
    async getCoupons(page: number = 0) {
      try {
        let apiPath = `v2/api/${path}/admin/coupons`;
        if (page > 0) apiPath += `?page=${page}`;
        const { data } = await useFetch(apiPath, 'get', true);
        this.couponList = data.coupons;
        this.pagination = data.pagination;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteCoupon(id: string) {
      try {
        const apiPath = `v2/api/${path}/admin/coupon/${id}`;
        const { data } = await useFetch(apiPath, 'delete', true);
        if (data.success) this.getCoupons();
      } catch (err) {
        console.log(err);
      }
    },
    async updateCoupons(coupon: Coupon) {
      try {
        const apiPath = coupon.id ? `v2/api/${path}/admin/coupon/${coupon.id}` : `v2/api/${path}/admin/Coupon`;
        const method = coupon.id ? 'put' : 'post';
        const { data } = await useFetch(apiPath, method, true, { data: coupon });
        if (data.success) this.getCoupons();
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export default couponStore;
