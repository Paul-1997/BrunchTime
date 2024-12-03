<template>
  <Loading :active="onLoading" />
  <div class="container py-lg-lg py-md-10 py-6">
    <div class="row justify-content-center" v-if="!onLoading">
      <div class="col-md-5">
        <img
          :src="product.imageUrl"
          alt=""
          class="rounded-3 border border-neutral-light h-100 w-100 object-fit-cover"
        />
      </div>
      <div class="col-md-5">
        <div class="d-flex flex-column h-100">
          <div class="flex-grow-1 mb-auto">
            <h3 class="fw-bold fs-3xl text-secondary mb-2">{{ product.title }}</h3>
            <span class="badge p-2 bg-accent mb-2">{{ product.category }}</span>
            <p class="text-secondary fw-semibold fs-xl mb-5">NT${{ product.price }} / {{ product.unit }}</p>
            <p>{{ product.description }}</p>
          </div>
          <div class="d-flex gap-1 mb-3 align-items-center">
            <span class="fs-lg fw-semibold">產品數量：</span>
            <button type="button" class="btn btn-neutral-light px-4" @click="qty < 2 ? (qty = 1) : qty--">-</button>
            <input type="number" min="1" max="999" :value="qty" class="form-control text-center" style="width: 100px" />
            <button type="button" class="btn btn-neutral-light px-4" @click="qty++">+</button>
          </div>
          <button
            type="button"
            class="addCart-btn w-100 rounded-3 d-block border-0 py-2 py-lg-4 bg-accent text-secondary fw-semibold"
            @click="updateCart({ product_id: product.id!, qty })"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type Product from '@/interface/product';
import cartStore from '@/stores/cartStore';
import productStore from '@/stores/productStore';
import Loading from '@/components/LoadingComp.vue';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      product: {} as Product,
      qty: 1 as number,
    };
  },
  computed: {
    ...mapState(productStore, ['onLoading']),
  },
  methods: {
    ...mapActions(productStore, ['getSingleProduct']),
    ...mapActions(cartStore, ['updateCart']),
  },
  async mounted() {
    const data = await this.getSingleProduct(this.$route.params.id as string);
    if (data.success) this.product = data.product;
  },
};
</script>
