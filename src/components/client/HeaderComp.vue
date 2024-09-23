<template>
  <header class="bg-primary">
    <!-- coupon -->
    <div class="alert alert-info py-1 mb-0 text-center">
      <span class="me-5">限時優惠，套餐系列憑此優惠碼享95折優惠 優惠碼: happyBreakfast</span>
      <button type="button" class="btn btn-sm btn-accent">複製優惠碼</button>
      <span class="btn-close position-absolute end-0 me-4" data-bs-dismiss="alert" aria-label="Close"></span>
    </div>
    <nav class="navbar navbar-expand-md navbar-primary bg-primary py-0">
      <div class="container">
        <RouterLink class="navbar-brand d-flex align-items-center py-0 text-secondary text-hover-secondary" to="/">
          <img src="/logo.png" alt="logoImage" height="60" width="60" style="margin-right: -8px" />BrunchTime
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
            <RouterLink class="nav-link fw-semibold fs-lg" to="products">產品介紹</RouterLink>
            <RouterLink class="nav-link fw-semibold fs-lg" to="aboutUs">關於我們</RouterLink>
            <RouterLink class="nav-link fw-semibold fs-lg" to="news">最新消息</RouterLink>
            <RouterLink class="nav-link fw-semibold fs-lg" to="/dashboard">後臺管理</RouterLink>
          </nav>
        </div>
      </div>
    </nav>
  </header>
</template>
