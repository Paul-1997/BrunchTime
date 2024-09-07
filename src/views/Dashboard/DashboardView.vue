<template>
  <div class="d-flex">
    <Panel @userLoginOut="logout" />
    <RouterView />
  </div>
</template>

<script lang="ts">
import Panel from '@/components/Dashboard/PanelComp.vue';
import userStore from '@/stores/userStore.ts';
import { mapActions } from 'pinia';

export default {
  methods: {
    ...mapActions(userStore, ['checkLogin', 'logout']),
  },
  components: {
    Panel,
  },
  mounted() {
    this.checkLogin();
  },
};
</script>
