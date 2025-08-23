<template>
  <Teleport to="body">
    <div
      class="modal fade"
      id="CouponModal"
      tabindex="-1"
      aria-labelledby="CouponModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="CouponModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-accent">
            <h5 class="modal-title fw-bold fs-2xl" id="CouponModalLabel">
              {{ coupon.id ? '編輯優惠卷' : '新增優惠卷' }}
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3" v-if="cloneCoupon.id">
              <label for="couponId" class="form-label">優惠卷編號</label>
              <input type="text" class="form-control" id="couponId" :value="cloneCoupon.id" disabled readonly />
            </div>
            <div class="mb-3">
              <label for="couponTitle" class="form-label">優惠卷名稱</label>
              <input
                type="text"
                class="form-control"
                id="couponTitle"
                placeholder="請輸入優惠卷名稱"
                v-model="cloneCoupon.title"
              />
            </div>
            <div class="mb-3">
              <label for="couponCode" class="form-label">優惠卷代碼</label>
              <input
                type="text"
                class="form-control"
                id="couponCode"
                placeholder="請輸入優惠卷代碼"
                v-model="cloneCoupon.code"
              />
            </div>
            <div class="mb-3">
              <label for="couponNum" class="form-label">優惠卷數量</label>
              <input
                type="number"
                class="form-control"
                id="couponNum"
                placeholder="請輸入優惠卷數量"
                v-model="cloneCoupon.num"
              />
            </div>
            <div class="mb-3">
              <label for="couponTitle" class="form-label">優惠折扣</label>
              <div class="d-flex align-center justify-content-between">
                <input
                  type="range"
                  class="form-range"
                  max="100"
                  min="0"
                  id="couponTitle"
                  placeholder="請輸入優惠卷名稱"
                  v-model.number="cloneCoupon.percent"
                  style="width: calc(100% - 100px)"
                />
                <span class="ms-2 fs-sm text-neutral">{{ `${100 - cloneCoupon.percent} % off` }} </span>
              </div>
            </div>
            <div class="mb-5">
              <label for="couponDueTo" class="form-label">優惠卷到期日</label>
              <input type="date" class="form-control" id="couponDueTo" :value="DatePickerVal" @change="updateDateVal" />
            </div>
            <div class="mb-3 px-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input py-2 border border-neutral me-5"
                  type="checkbox"
                  role="switch"
                  id="couponIsEnable"
                  :true-value="1"
                  :false-value="0"
                  v-model="cloneCoupon.is_enabled"
                  style="scale: 1.5"
                />
                <label class="form-check-label" for="couponIsEnable">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="px-6 btn btn-outline-neutral" @click="closeModal">取消</button>
            <button type="button" class="px-6 btn btn-success" @click="updateCoupon">
              {{ coupon.id ? '編輯' : '新增' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { Modal } from 'bootstrap';
import type { VueElement } from 'vue';
import formatDate from '@/utils/formatDate';
import type Coupon from '@/types/coupon';

export default {
  props: ['coupon'],
  emits: ['updateCoupon'],
  data() {
    return {
      modal: null as null | bootstrap.Modal,
      cloneCoupon: {} as Coupon,
    };
  },
  methods: {
    openModal() {
      this.modal!.show();
    },
    closeModal() {
      this.modal!.hide();
    },
    updateDateVal(event: Event) {
      const target = event.target as HTMLInputElement | null;
      if (target) {
        const date = new Date(target.value).getTime();
        this.cloneCoupon.due_date = date / 1000;
      }
    },
    updateCoupon() {
      this.$emit('updateCoupon', this.cloneCoupon);
      this.closeModal();
    },
  },
  computed: {
    DatePickerVal() {
      if (this.cloneCoupon.due_date < 1) return '';
      return formatDate(this.cloneCoupon.due_date).split('/').join('-');
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.CouponModal as VueElement);
  },
  watch: {
    coupon() {
      this.cloneCoupon = { ...this.coupon };
    },
  },
};
</script>
