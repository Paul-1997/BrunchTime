<template>
  <div class="d-flex">
    <Panel />
    <RouterView />
  </div>
</template>

<script lang="ts">
import Panel from '@/components/Dashboard/PanelComp.vue';

export default {
  data() {
    return {
      panel: '',
    };
  },
  components: {
    Panel,
  },
};
</script>
