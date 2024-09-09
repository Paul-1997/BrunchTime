<template>
  <div class="d-flex">
    <Panel @userLoginOut="logout" />
    <main class="mainDashboardContent flex-grow-1 mx-3">
      <RouterView />
    </main>
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

<style scoped>
.mainDashboardContent {
  @media (width > 767px) {
    margin-inline-start: calc(clamp(248px, 22.5vw, 300px) + 12px);
  }
}
</style>
