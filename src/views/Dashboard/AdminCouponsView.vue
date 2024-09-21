<template>
  <div class="container mx-auto">
    <div class="couponWrapper mx-auto">
      <h2 class="fw-bold fs-4xl text-center text-secondary my-10">優惠卷管理</h2>
      <div class="toolbar mb-3 d-flex align-items-center justify-content-end gap-3">
        <label for="couponHideExpired" class="fs-sm"
          ><input
            type="checkbox"
            id="couponHideExpired"
            class="rounded"
            style="accent-color: var(--bs-accent)"
            v-model="isHideExpired"
          />&nbsp;&nbsp;隱藏過期項目</label
        >
        <button type="button" class="btn btn-accent" @click="getEditCoupon()">新增優惠卷</button>
      </div>
      <div class="mb-10">
        <ul class="couponList">
          <li
            v-for="coupon in finalCouponList"
            :key="coupon.id"
            class="mb-3 mx-auto bg-primary px-4 py-3 d-flex align-items-center justify-content-between rounded-2 cursor-pointer"
            @click="getEditCoupon(coupon)"
          >
            <div class="d-flex flex-wrap align-items-center gap-2">
              <span class="badge" :class="coupon.is_enabled ? 'bg-success' : 'bg-neutral'">
                {{ coupon.is_enabled ? '已啟用' : '未啟用' }}
              </span>
              <span class="badge bg-danger" v-if="isDateExpired(coupon.due_date)"> 已過期 </span>
              <p class="fs-xl fw-semibold">{{ coupon.title }}</p>
            </div>
            <div class="fs-sm text-neutral-dark">
              <p>{{ formatDate(coupon.due_date) }}</p>
              <p>剩餘數量: {{ coupon.num }}</p>
            </div>
            <div
              class="position-absolute btn-close"
              style="top: -0.5rem; right: -0.5rem"
              @click.stop="doDeleteCoupon(coupon)"
            ></div>
          </li>
        </ul>
      </div>
      <Pagination :pagination="pagination" @update-page="getNewCoupons" />
    </div>
  </div>
  <DeleteModal
    ref="delete"
    :title="tempCoupon.title"
    :target-id="tempCoupon.id"
    @delete-target="async (id: string) => await deleteCoupon(id)"
  />
  <CouponModal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupons" />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import couponStore from '@/stores/couponStore';
import { formatDate } from '@/composable/useHelper';
import CouponModal from '@/components/Dashboard/CouponModal.vue';
import DeleteModal from '@/components/Dashboard/DeleteModal.vue';
import Pagination from '@/components/PaginationComp.vue';
import type Coupon from '@/interface/coupon';

export default {
  data() {
    return {
      tempCoupon: {} as Coupon,
      isHideExpired: false,
    };
  },
  computed: {
    ...mapState(couponStore, ['couponList', 'pagination']),
    finalCouponList() {
      if (this.isHideExpired) {
        const date = Date.now() / 1000;
        return this.couponList.filter((coupon) => coupon.due_date > date);
      }
      return this.couponList;
    },
  },
  methods: {
    formatDate,
    ...mapActions(couponStore, ['getCoupons', 'deleteCoupon', 'updateCoupons']),
    async getNewCoupons(page: number) {
      await this.getCoupons(page);
    },
    getEditCoupon(coupon?: Coupon) {
      if (coupon) this.tempCoupon = coupon;
      // reset for new
      else
        this.tempCoupon = {
          code: '',
          due_date: 0,
          num: 1,
          percent: 0,
          title: '',
          is_enabled: 0,
        };
      (this.$refs.couponModal as InstanceType<typeof CouponModal>).openModal();
    },
    doDeleteCoupon(coupon: Coupon) {
      this.tempCoupon = coupon;
      (this.$refs.delete as InstanceType<typeof DeleteModal>).openModal();
    },
    isDateExpired(timestamp: number): boolean {
      const currentTime = Math.floor(Date.now() / 1000); // 获取当前时间的时间戳（秒）
      return timestamp < currentTime; // 如果时间戳小于当前时间，则已过期
    },
  },
  components: {
    CouponModal,
    DeleteModal,
    Pagination,
  },
  async mounted() {
    await this.getCoupons();
  },
};
</script>

<style>
.couponWrapper {
  width: clamp(340px, 72vw, 672px);
}
</style>
