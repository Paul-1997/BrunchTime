<template>
  <div
    role="button"
    id="scrollToTop"
    @click.prevent="scroll"
    class="scrollToTopBtn bg-info bg-opacity-75"
    aria-describedby="#scrollToTopBtnDesc"
  >
    <p class="visually-hidden" id="scrollToTopBtnDesc">scroll the page to top</p>
    <span class="material-symbols-outlined text-light fw-bold">arrow_upward_alt</span>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    scroll() {
      window.scroll(0, 0);
    },
  },
};
</script>
