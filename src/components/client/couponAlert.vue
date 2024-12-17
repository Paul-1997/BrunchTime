<template>
  <div class="alert alert-info py-1 mb-0 text-center">
    <p class="d-none d-md-inline">
      限時優惠！憑此優惠碼享全品項95折優惠 優惠碼:
      <span ref="couponCode" class="me-2">happyBreakfast</span>
      <button type="button" class="btn btn-sm btn-accent" @click="copyToClipboard">複製優惠碼</button>
    </p>
    <p class="d-inline-block d-md-none fw-bold cursor-pointer" @click="copyToClipboard">
      點我領取限時優惠碼，享95折優惠!
    </p>
    <span
      class="btn-close position-absolute top-50 translate-middle-y end-0 me-4 d-none d-md-inline-block"
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
