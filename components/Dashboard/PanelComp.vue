<template>
  <nav ref="panel__wrapper" class="panel__wrapper vh-100 d-flex z-2 top-0 position-fixed">
    <div class="panel bg-accent d-flex flex-column align-items-center overflow-hidden" ref="panel">
      <img src="/logo.png" alt="logo" class="home-logo mb-4" />
      <ul class="w-100 text-center fs-xl">
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" :to="{ name: 'dashboard-home' }">總覽</RouterLink>
        </li>
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" :to="{ name: 'dashboard-products' }">產品管理</RouterLink>
        </li>
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" :to="{ name: 'dashboard-orders' }">訂單管理</RouterLink>
        </li>
        <li class="nav__link mb-3">
          <RouterLink class="py-3 px-2 d-block" :to="{ name: 'dashboard-articles' }">文章管理</RouterLink>
        </li>
        <li class="nav__link">
          <RouterLink class="py-3 px-2 d-block" :to="{ name: 'dashboard-coupons' }">優惠卷管理</RouterLink>
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
    <button class="toggle-btn d-md-none align-self-center" @click="togglePanel">
      <span class="material-symbols-outlined transition duration-250" :class="{ 'rotate-180': isPanelOpen }">
        double_arrow
      </span>
    </button>
  </nav>
</template>

<script lang="ts">
export default {
  name: 'PanelComp',
  emits: ['userLoginOut'],
  data() {
    return {
      panel: null as HTMLElement | null,
      isPanelOpen: false,
    };
  },
  methods: {
    togglePanel() {
      if (!this.panel) return;
      this.isPanelOpen = !this.isPanelOpen;
      this.panel.classList.toggle('hidden');
    },
    handleResize() {
      if (!this.panel) return;
      const isMobile = window.innerWidth < 769;
      this.isPanelOpen = !isMobile;
      this.panel.classList.toggle('hidden', isMobile);
    },
  },
  mounted() {
    this.panel = this.$refs.panel as HTMLElement;
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    '$route.query': {
      handler() {
        if (window.innerWidth < 768) this.togglePanel();
      },
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

.toggle-btn {
  border-radius: 0 100vw 100vw 0;
  height: 40px;
  border-color: transparent;
  span {
    --slide-distance: 15%;
    color: hsla(from currentColor h s l / 0.5);
  }
  &:hover > span:not(.rotate-180) {
    animation: slide 1s infinite;
  }

  @keyframes slide {
    0% {
      transform: translateX(calc(var(--slide-distance) * -1));
    }
    100% {
      transform: translateX(var(--slide-distance));
    }
  }
}
</style>
