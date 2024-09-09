<template>
  <nav ref="panel__wrapper" class="panel__wrapper vh-100 d-flex z-2 top-0 position-fixed">
    <div class="panel bg-accent d-flex flex-column align-items-center overflow-hidden" ref="panel">
      <img src="/logo.png" alt="logo" class="home-logo mb-4" />
      <ul class="w-100 text-center fs-xl">
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" to="/dashboard">總覽</RouterLink>
        </li>
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" to="/dashboard/products">產品管理</RouterLink>
        </li>
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" to="/dashboard/orders">訂單管理</RouterLink>
        </li>
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" to="/dashboard/articles">文章管理</RouterLink>
        </li>
        <li class="nav__link">
          <RouterLink class="py-3 px-2 d-block" to="/dashboard/coupons">優惠卷管理</RouterLink>
        </li>
      </ul>
      <div class="panel__footer mt-auto">
        <ul class="d-flex gap-8 pb-6">
          <li>
            <RouterLink to="/">
              <span class="material-symbols-outlined fs-3xl cursor-pointer">home</span>
            </RouterLink>
          </li>
          <li>
            <span class="material-symbols-outlined fs-3xl cursor-pointer" @click="$emit('userLoginOut')">logout</span>
          </li>
        </ul>
      </div>
    </div>
    <a
      href=""
      class="rounded-end-pill pe-1 py-3 d-md-none align-self-center"
      @click.prevent="togglePanel"
      style="background-color: #ffc50f"
    >
      <span class="material-symbols-outlined transition duration-250" :class="isPanelOpenIconClass">
        double_arrow
      </span>
    </a>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      panel: null as HTMLElement | null,
      isPanelOpen: false,
    };
  },
  methods: {
    togglePanel() {
      if (this.panel === null) return;
      if (!this.panel.classList.contains('hidden')) {
        this.panel.classList.add('hidden');
        this.isPanelOpen = false;
      } else {
        this.panel.classList.remove('hidden');
        this.isPanelOpen = true;
      }
    },
    togglePanelByWidth() {
      if (this.panel === null) return;
      const width = window.innerWidth;
      if (width < 769) {
        this.panel.classList.add('hidden');
        this.isPanelOpen = false;
      } else {
        this.panel?.classList.remove('hidden');
        this.isPanelOpen = true;
      }
    },
  },
  computed: {
    isPanelOpenIconClass() {
      return this.isPanelOpen ? 'rotate-180' : '';
    },
  },
  mounted() {
    this.panel = this.$refs.panel as HTMLElement;
    // 初始檢查瀏覽器高度
    this.togglePanelByWidth();

    // 在 resize 時監聽瀏覽器高度變化
    window.addEventListener('resize', this.togglePanelByWidth);
  },
  beforeUnmount() {
    // 移除監聽器
    window.removeEventListener('resize', this.togglePanelByWidth);
  },
  watch: {
    '$route.query': function () {
      if (window.innerWidth < 768) this.togglePanel();
    },
  },
};
</script>

<style scoped lang="scss">
$sideBarSize: clamp(248px, 22.5vw, 300px);

.home-logo {
  margin-inline: auto;
  aspect-ratio: 1;
  height: 120px;
}

.panel {
  width: $sideBarSize;
  transition: width 0.2s ease-out;

  &.hidden {
    width: 0;
  }
}
</style>
