<template>
  <RouterView />
  <ScrollBtn />
</template>

<script lang="ts">
import AOS from 'aos';
import ScrollBtn from './components/client/scrollToTop.vue';

export default {
  components: {
    ScrollBtn,
  },
  mounted() {
    AOS.init();
  },
};
</script>
