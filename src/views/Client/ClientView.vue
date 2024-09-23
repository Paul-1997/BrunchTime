<script lang="ts">
import HeaderComp from '@/components/client/HeaderComp.vue';
import FooterComp from '@/components/client/FooterComp.vue';

export default {
  components: {
    HeaderComp,
    FooterComp,
  },
};
</script>
<template>
  <HeaderComp />
  <main class="min-vh-100">
    <RouterView />
  </main>
  <FooterComp />
</template>
