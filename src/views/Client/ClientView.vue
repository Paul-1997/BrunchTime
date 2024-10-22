<script lang="ts">
import HeaderComp from '@/components/client/HeaderComp.vue';
import FooterComp from '@/components/client/FooterComp.vue';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  components: {
    HeaderComp,
    FooterComp,
  },
  computed: {
    ...mapState(cartStore, ['carts']),
    isOrder() {
      return this.$route.path !== '/orders';
    },
  },
  methods: {
    ...mapActions(cartStore, ['getCarts', 'updateCart']),
  },
  async mounted() {
    await this.getCarts();
  },
};
</script>
<template>
  <HeaderComp :cartsLength="carts.length" />
  <!-- header + footer 200px -->
  <main style="min-height: calc(100dvh - 200px)">
    <RouterView @update-cart="updateCart" :carts="carts" />
  </main>
  <FooterComp />
</template>
