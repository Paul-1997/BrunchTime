<template>
  <div class="alert alert-info py-1 mb-0 text-center">
    <p>
      限時優惠，套餐系列憑此優惠碼享95折優惠 優惠碼:
      <span ref="couponCode" class="me-2">happyBreakfast</span>
      <button type="button" class="btn btn-sm btn-accent" @click="copyToClipboard">複製優惠碼</button>
    </p>
    <span
      class="btn-close position-absolute top-50 translate-middle-y end-0 me-4"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></span>
  </div>
</template>

<script lang="ts">
import { toast } from '@/composable/useAlert';

export default {
  methods: {
    copyToClipboard() {
      const code = (this.$refs.couponCode as HTMLDivElement).innerText;
      navigator.clipboard.writeText(code);

      toast('已複製優惠碼!');
    },
  },
};
</script>
