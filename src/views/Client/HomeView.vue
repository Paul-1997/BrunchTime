<template>
  <Loading :active="isLoading" />
  <!-- banner -->
  <section id="banner" class="banner align-content-center">
    <div class="banner__slogan container text-white">
      <h2 class="banner__slogan__title fw-bold fs-3xl fs-md-5xl mb-4">BrunchTime 食晨已到</h2>
      <p class="fw-semibold fs-lg fs-md-xl mb-6">
        無論是忙碌還是閒暇<br />
        我們的早午餐讓你輕鬆享受美味，每一口都是愉快的開始。
      </p>
      <button
        type="button"
        class="banner__btn btn btn-accent px-8 px-md-lg fs-md-lg fw-semibold text-hover-white"
        style="letter-spacing: 0.15ch"
        @click="$router.push('/products')"
      >
        立即選購
      </button>
    </div>
  </section>
  <!-- weApply -->
  <section class="bg-accent bg-opacity-25">
    <div class="container py-8 py-lg-10">
      <h2 class="fw-bold text-secondary text-center fs-3xl lh-1 mb-6 mb-lg-10">我們提供</h2>
      <ul class="d-flex align-items-center justify-content-around gap-4 rowgap-4 flex-wrap">
        <li class="col-md-3" data-aos="fade-up" data-aos-delay="200">
          <img src="/public/service.png" alt="" class="mb-4 img-square" />
          <p class="text-center text-secondary fw-semibold fs-lg-2xl fs-lg">優質的服務</p>
        </li>
        <li class="col-md-3" data-aos="fade-up" data-aos-delay="400">
          <img src="/public/food-index.jpg" alt="" class="mb-4 img-square" />
          <p class="text-center text-secondary fw-semibold fs-lg-2xl fs-lg">高品質的美食</p>
        </li>
        <li class="col-md-3" data-aos="fade-up" data-aos-delay="600">
          <img src="/public/area-index.png" alt="" class="mb-4 img-square" style="object-fit: fill" />
          <p class="text-center text-secondary fw-semibold fs-lg-2xl fs-lg">舒適的環境</p>
        </li>
      </ul>
    </div>
  </section>
  <!-- news -->
  <section id="newsSection" class="news-bg">
    <div
      class="container py-8 py-lg-10"
      data-aos="zoom-in"
      data-aos-offset="100"
      data-aos-anchor-placement="center-bottom"
    >
      <h2 class="fw-bold text-secondary text-center fs-3xl lh-1 mb-6 mb-lg-10">最新公告</h2>
      <ul class="mb-6 d-flex justify-content-around flex-column flex-md-row">
        <li
          v-for="news in articleList"
          :key="news.create_at"
          class="text-neutral-dark col-md-3 mb-6 mb-md-0 cursor-pointer"
          @click="$router.push(`/news/${news.id}`)"
        >
          <div class="news overflow-hidden">
            <img :src="news.image" alt="newsImage" class="news__photo w-100 transition" />
            <div class="news__content position-absolute align-content-center text-white">
              <p class="news__content__title fs-xl fs-sm-2xl fs-lg-xl fw-bold transition">{{ news.title }}</p>
              <p class="news__content__desc transition-transform">{{ news.description }}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="text-center">
        <button type="button" class="btn btn-primary text-secondary">
          <RouterLink to="/news">更多資訊</RouterLink>
        </button>
      </div>
    </div>
  </section>
  <!-- recommend_food -->
  <section id="recommend-product" class="bg-opacity-25 bg-primary">
    <div class="container py-8 py-lg-10" data-aos="zoom-in" data-aos-anchor-placement="center-bottom">
      <h2 class="fw-bold text-secondary text-center fs-3xl lh-1 mb-6 mb-lg-10">精選推薦</h2>
      <swiper
        :slidesPerView="1"
        :initialSlide="4"
        :spaceBetween="10"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
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
import { Swiper as swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules';
import ProductCard from '@/components/client/ProductCard.vue';
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';
import articleStore from '@/stores/newsStore';
import { formatDate } from '@/composable/useHelper';
import Loading from '@/components/LoadingComp.vue';

export default {
  props: ['carts'],
  components: {
    swiper,
    SwiperSlide,
    ProductCard,
    Loading,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  methods: {
    formatDate,
    ...mapActions(productStore, ['getProducts']),
    ...mapActions(articleStore, ['getArticles']),
  },
  computed: {
    ...mapState(productStore, ['productList']),
    ...mapState(articleStore, ['articleList']),
  },
  async mounted() {
    await this.getProducts('custom');
    await this.getArticles('custom');
    this.isLoading = false;
  },
};
</script>

<style scoped lang="scss">
.banner__slogan__title {
  text-shadow: 1px 1px 0 currentColor;
}
.banner {
  background-image: url('https://images.pexels.com/photos/2335690/pexels-photo-2335690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-attachment: fixed;
  background-color: #5e5e5e;
  background-blend-mode: overlay;
  background-position: center;
  padding-block: 30vh;

  .banner__btn:hover {
    color: rgb(243, 227, 227);
  }
}
.news-bg {
  &::after,
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 270px;
    z-index: -1;

    @media (width < 1100px) {
      width: 180px;
    }
    @media (width < 767px) {
      display: none;
    }
  }
  &::before {
    left: 0;
    background-image: url('/public/bg-sanwich.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  &::after {
    top: 0;
    right: 0;
    background-image: url('/public/bg-burger.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
.news {
  &__content {
    top: 0;
    height: 100%;
    width: 100%;
    align-content: center;
    text-align: center;

    @media (width > 767px) {
      &__desc {
        transform: translateY(500%);
        opacity: 0;
        line-height: 0;
      }
    }
  }

  &__photo {
    aspect-ratio: 1.25/1;
    filter: brightness(70%);
  }
}
.news:hover {
  .news__photo {
    filter: brightness(50%);
    scale: 1.25;
  }
  .news__content__desc {
    color: #ebe0e0;
    opacity: 1;
    transform: translateY(0);
    line-height: 1;
  }
}
.aos-animate {
  will-change: transform, opacity;
}
</style>
