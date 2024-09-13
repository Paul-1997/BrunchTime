<template>
  <p>這是coupons</p>
  {{ couponList }}
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import couponStore from '@/stores/couponStore.ts';

export default {
  computed: {
    ...mapState(couponStore, ['couponList']),
  },
  methods: {
    ...mapActions(couponStore, ['getCoupon']),
  },
  async mounted() {
    await this.getCoupon('admin');
  },
};
</script>
