<template>
  <div class="banner" style="background-image: url('BrunchTime/public/aboutBanner.jpg')">
    <h2 class="rounded-3 w-fit mx-auto text-center text-secondary fw-bold fs-3xl bg-primary bg-opacity-75 px-8">
      關於我們<br />
      About Us
    </h2>
  </div>
  <div class="container py-lg-lg py-md-10 py-6">
    <Breadcrumb class="position-absolute top-0 start-0">
      <template #breadcrumb-item-1> 關於我們 </template>
    </Breadcrumb>
    <section class="py-8 row">
      <h2 class="text-center text-secondary fs-xl fs-md-3xl fw-bold mb-4">我們的理念</h2>
      <p class="aboutUs text-neutral-dark col-md-8 col-10 mx-auto mb-10 p-4 rounded-3">
        <strong class="fw-bold text-secondary fs-xl">BreachTime</strong>
        是一家專注於提供優質早午餐體驗的餐廳。我們精選新鮮食材，打造美味的早午餐菜單，旨在為顧客營造舒適的用餐環境和愉悅的氛圍。無論是忙碌的工作日早餐，還是輕鬆的週末午餐，這裡都是您理想的選擇，讓每一餐都充滿美好回憶。歡迎您來體驗我們的美食和服務！
      </p>
      <div class="col-6 flex-grow-1">
        <img src="/clerk.jpg" alt="our nicest clerk" class="h-100" />
      </div>
      <div class="col-6 d-flex flex-column gap-6">
        <img src="/food.jpg" alt="our brunch" />
        <img src="/area.jpg" alt="our dinning area" />
      </div>
    </section>
    <!-- information -->
    <section class="py-8">
      <h2 class="fw-bold fs-xl fs-md-3xl text-center mb-4 text-secondary">相關資訊</h2>
      <ul class="text-center">
        <li class="mb-2">店家位置: 新北市板橋區漢生西路153號</li>
        <li class="mb-2">營業時間: 07:30 - 14:30 (休息另行通知)</li>
        <li class="mb-2">連絡電話: 02-12345678</li>
        <li class="mb-2">連絡信箱: BrunchTime@mail.com</li>
      </ul>
      <div class="storeMap d-flex justify-content-center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3
      !1d3615.3537592784273!2d121.462889!3d25.022066!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x
      3442a816b1801baf%3A0x16c9e36406769343!2zMjIw5paw5YyX5bi
      C5p2_5qmL5Y2A5ryi55Sf6KW_6LevMTUz6Jmf!5e0!3m2!1szh-TW!2stw!4v1727076499830!5m2!1szh-TW!2stw"
          style="border: 0; width: var(--map_width); aspect-ratio: 3/2"
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.storeMap {
  width: 100%;
  --map_width: clamp(300px, 85vw, 864px);
}
.aboutUs {
  letter-spacing: 0.25ch;
  line-height: 2;
  border: dashed 6px var(--bs-accent);
  background-color: color-mix(in hsl shorter hue, var(--bs-primary) 60%, #fff 40%);
}
</style>

<script lang="ts">
import Breadcrumb from '@/components/Breadcrumb.vue';

export default {
  components: {
    Breadcrumb,
  },
};
</script>
