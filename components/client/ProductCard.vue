<template>
  <div class="card product-card">
    <div class="card-img-wrap cursor-pointer overflow-hidden" @click="getProductDetail(product.id!)">
      <img :src="product.imageUrl" class="card-img-top img-square transition" :alt="product.title + '圖片'" />
      <div
        class="card-img-text position-absolute top-0 align-content-center bg-dark bg-opacity-25 w-100 h-100 text-white text-center fs-lg opacity-0 transition"
      >
        查看詳情
      </div>
    </div>
    <div class="card-body d-flex flex-column border-top pb-0">
      <span class="badge w-fit mb-1" style="background-color: var(--bs-orange)">{{ product.category }}</span>
      <h3 class="card-title fw-semibold fs-lg d-inline-flex align-items-center gap-1">
        {{ product.title }}
      </h3>
      <p>
        NT$ <span class="fs-xl lh-1">{{ product.price }}</span> 元
      </p>
    </div>
    <div class="text-center p-3">
      <button
        type="button"
        class="addCart-btn rounded-2 border-0 py-2 px-6 bg-accent w-100 text-secondary fw-semibold"
        @click="updateCart({ product_id: product.id, qty: 1 })"
      >
        加入購物車
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import cartStore from '@/stores/cartStore';
import { mapActions } from 'pinia';

export default {
  props: ['product'],
  methods: {
    getProductDetail(id: string) {
      this.$router.push({ name: 'productDetail', params: { id } });
    },
    ...mapActions(cartStore, ['updateCart']),
  },
};
</script>
