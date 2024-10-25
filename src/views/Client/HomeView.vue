<template>
  <!-- banner -->
  <section
    id="banner"
    class="banner align-content-center"
    style="background-image: url('https://cdn.pixabay.com/photo/2014/08/21/03/07/scrambled-eggs-423066_640.jpg')"
  >
    <div class="container banner__slogan">
      <h2 class="banner__slogan__title fw-bold fs-3xl mb-4 text-white">BrunchTime 食晨已到</h2>
      <p class="fw-semibold fs-xl text-white">
        無論是忙碌還是閒暇<br />
        我們的早午餐讓你輕鬆享受美味，每一口都是愉快的開始。
      </p>
      <button type="button" class="btn btn-accent px-8">立即選購</button>
    </div>
  </section>
  <!-- weApply -->
  <section class="container py-8 py-lg-10">
    <h2 class="mb-6 fw-bold text-secondary text-center fs-xl">我們提供</h2>
    <ul class="d-inline-flex align-items-center justify-content-around gap-4">
      <li class="col-md-3">
        <img src="/public/service.png" alt="" class="mb-4 rounded-circle" />
        <p class="text-center fw-semibold fs-lg-2xl fs-lg">優質的服務</p>
      </li>
      <li class="col-md-3">
        <img src="/public/service.png" alt="" class="mb-4 rounded-circle" />
        <p class="text-center fw-semibold fs-lg-2xl fs-lg">高品質的美食</p>
      </li>
      <li class="col-md-3">
        <img src="/public/service.png" alt="" class="mb-4 rounded-circle" />
        <p class="text-center fw-semibold fs-lg-2xl fs-lg">舒適的環境</p>
      </li>
    </ul>
  </section>
  <!-- news -->
  <section class="container py-8 py-lg-10">
    <h2 class="mb-6 fw-bold text-secondary text-center fs-xl">最新消息</h2>
  </section>
  <!-- recommend_food -->
  <section id="recommend_Product" class="container-field py-8 py-lg-10">
    <h2 class="mb-6 fw-bold text-secondary text-center fs-xl">推薦產品</h2>
  </section>
  <!-- customer reply -->
  <section class="container py-8 py-lg-10">
    <h2 class="mb-6 fw-bold text-secondary text-center fs-xl">顧客評論</h2>
  </section>
</template>

<style scoped>
.banner__slogan__title {
  text-shadow: 1px 1px 0 currentColor;
}
</style>
