<template>
  <RouterView />
  <ScrollBtn />
</template>

<script lang="ts">
import ScrollBtn from './components/client/scrollToTop.vue';

export default {
  components: {
    ScrollBtn,
  },
};
</script>
