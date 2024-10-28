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
  <section class="bg-accent bg-opacity-75">
    <div class="container py-8 py-lg-10">
      <h2 class="fw-bold text-secondary text-center fs-3xl lh-1 mb-6 mb-lg-10">我們提供</h2>
      <ul class="d-flex align-items-center justify-content-around gap-4 rowgap-4 flex-wrap">
        <li class="col-md-3">
          <img src="/public/service.png" alt="" class="mb-4 img-square" />
          <p class="text-center text-secondary fw-semibold fs-lg-2xl fs-lg">優質的服務</p>
        </li>
        <li class="col-md-3">
          <img src="/public/food-index.jpg" alt="" class="mb-4 img-square" />
          <p class="text-center text-secondary fw-semibold fs-lg-2xl fs-lg">高品質的美食</p>
        </li>
        <li class="col-md-3">
          <img src="/public/area-index.png" alt="" class="mb-4 img-square" style="object-fit: fill" />
          <p class="text-center text-secondary fw-semibold fs-lg-2xl fs-lg">舒適的環境</p>
        </li>
      </ul>
    </div>
  </section>
  <!-- news -->
  <section class="container-field py-8 py-lg-10">
    <div class="row">
      <div class="col-6">
        <img src="/public/service.png" alt="" />
      </div>
      <div class="col-6">
        <h2 class="fw-bold text-secondary text-center fs-3xl lh-1 mb-6 mb-lg-10">最新消息</h2>
      </div>
    </div>
  </section>
  <!-- recommend_food -->
  <section id="recommend_Product" class="bg-primary bg-opacity-50">
    <div class="container py-8 py-lg-10">
      <h2 class="fw-bold text-secondary text-center fs-3xl lh-1 mb-6 mb-lg-10">精選推薦</h2>
      <swiper
        :slidesPerView="1"
        :initialSlide="4"
        :spaceBetween="10"
        :loop="true"
        :pagination="{
          clickable: true,
          el: '.swiper-pagination',
        }"
        :breakpoints="{
          '576': {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          '768': {
            slidesPerView: 3,
            spaceBetween: 36,
          },
          '992': {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }"
        :modules="modules"
        class="mySwiper"
      >
        <SwiperSlide v-for="product in productList" :key="product.id">
          <ProductCard :product="product"></ProductCard>
        </SwiperSlide>
      </swiper>
    </div>
  </section>
</template>

<script lang="ts">
import type Swiper from 'swiper';
import { Swiper as swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import ProductCard from '@/components/client/ProductCard.vue';
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  emits: ['updateCart'],
  props: ['carts'],
  components: {
    swiper,
    SwiperSlide,
    ProductCard,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
  },
  computed: {
    ...mapState(productStore, ['productList']),
  },
  async mounted() {
    this.getProducts('custom');
  },
};
</script>

<style scoped>
.banner__slogan__title {
  text-shadow: 1px 1px 0 currentColor;
}
</style>
