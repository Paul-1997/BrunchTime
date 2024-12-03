<template>
  <Loading
    :active="active"
    :color="'#fd9843'"
    :loader="loader"
    :background-color="'#fff'"
    :opacity="0.5"
    :height="128"
    :width="128"
    :is-full-page="isFullPage"
    :can-cancel="canCancel"
    :lock-scroll="true"
  />
</template>
<script>
import Loading from 'vue-loading-overlay';

export default {
  components: { Loading },
  props: {
    active: { type: Boolean, default: false },
    loader: { type: String, default: 'dots' },
    isFullPage: { type: Boolean, default: true },
    canCancel: { type: Boolean, default: false },
  },
};
</script>
