<template>
  <CouponAlert />
  <header class="bg-primary position-sticky top-0 z-2">
    <nav class="navbar navbar-expand-md navbar-primary bg-primary py-0">
      <div class="container">
        <RouterLink
          class="logo navbar-brand d-flex align-items-center py-0 text-secondary text-hover-secondary fs-xl fs-md-xl"
          to="/"
        >
          <img src="/logo.png" alt="logoImage" class="logo__image" />BrunchTime
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <nav class="nav ms-md-auto flex-column flex-md-row align-items-md-center">
            <RouterLink class="nav-link fw-semibold fs-lg" to="/products">產品介紹</RouterLink>
            <RouterLink class="nav-link fw-semibold fs-lg" to="/aboutUs">關於我們</RouterLink>
            <RouterLink class="nav-link fw-semibold fs-lg" to="/news">最新消息</RouterLink>
            <RouterLink class="nav-link fw-semibold fs-lg" to="/carts">
              <div>
                <span
                  class="position-absolute top-0 start-100 translate-middle px-2 bg-danger rounded-circle badge z-1"
                >
                  {{ cartsLength }}
                </span>
                <span class="material-symbols-outlined"> shopping_cart </span>
              </div>
            </RouterLink>
          </nav>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import CouponAlert from './couponAlert.vue';

export default {
  props: ['cartsLength'],
  components: {
    CouponAlert,
  },
};
</script>

<style lang="css" scoped>
.logo__image {
  aspect-ratio: 1;
  margin-right: -0.5rem;
  height: 60px;
  @media (width > 767px) {
    height: 80px;
  }
}
</style>
