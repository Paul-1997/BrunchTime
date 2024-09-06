<template>
  <div class="d-flex">
    <Panel />
    <RouterView />
  </div>
</template>

<script lang="ts">
import Panel from '@/components/Dashboard/PanelComp.vue';
import userStore from '@/stores/user.ts';
import { mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(userStore, ['checkLogin']),
  },
  components: {
    Panel,
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
