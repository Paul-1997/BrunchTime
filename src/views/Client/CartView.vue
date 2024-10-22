<template>
  <div class="container">
    <div v-if="carts.length">
      <OrderProgressbar :state="1" />
      <div class="row flex-column-reverse flex-lg-row-reverse justify-content-center align-items-start my-10">
        <div class="col-lg-4">
          <div class="orderInfo d-flex flex-column h-100 p-3">
            <h3 class="mb-3 border-bottom border-neutral fw-bold">訂單資訊</h3>
            <div class="flex-grow-1 mb-auto fw-bold">
              <p class="mb-3" :class="{ 'text-decoration-line-through  text-neutral': f_total < total }">
                小計： NT$<span class="ms-2">{{ total }}</span>
              </p>
              <p class="mb-3 fs-xl">
                總計： NT$<span class="ms-2">{{ f_total }}</span>
              </p>
            </div>
            <div class="input-group justify-content-end mb-5">
              <input
                type="text"
                ref="couponInput"
                id="isCouponUse"
                class="form-control rounded-0"
                placeholder="請輸入優惠代碼"
              />
              <button type="button" class="btn px-6 btn-neutral rounded-0" @click="useCoupon">套用</button>
            </div>
            <button
              type="button"
              class="btn btn-lg btn-accent text-secondary w-100 rounded-pill"
              @click="$router.push('/order')"
              :disabled="!carts.length"
            >
              我要結帳
            </button>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="carts p-3">
            <h3 class="mb-4 fw-bold border-bottom border-neutral">訂單項目</h3>
            <div class="d-flex align-items-center justify-content-between mb-4">
              <p>
                目前購物車內共 <span class="fs-lg fw-bold text-secondary">{{ carts.length }}</span> 件商品
              </p>
              <button type="button" class="btn btn-outline-danger" @click="deleteAllCart">清空購物車</button>
            </div>
            <ul class="carts__list mb-4" v-if="carts.length">
              <li
                v-for="item in carts"
                :key="item.id"
                class="cart d-flex align-items-center mb-2 border border-neutral-light border-1 gap-2"
              >
                <div class="cart__Img w-fit border-end border-neutral-light">
                  <img :src="item.product.imageUrl" alt="" class="w-100 h-100 object-fit-cover" />
                </div>
                <div class="flex-grow-1 d-flex justify-content-md-between flex-column flex-md-row row-gap-1">
                  <div class="cart__content">
                    <p class="w-fit" @click.prevent="getProductDetail(item.product.id)">{{ item.product.title }}</p>
                    <p class="w-fit" @click.prevent="getProductDetail(item.product.id)">NT${{ item.final_total }}</p>
                  </div>
                  <div class="d-inline-flex align-items-center gap-1">
                    <button
                      type="button"
                      class="btn btn-sm btn-neutral-light"
                      @click="updateQty(item.id, item.qty - 1)"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="999"
                      :value="item.qty"
                      class="form-control py-1 text-center"
                      style="width: 70px"
                      @change="updateQty(item.id, +$event.target.value)"
                    />
                    <button
                      type="button"
                      class="btn btn-sm btn-neutral-light"
                      @click="updateQty(item.id, item.qty + 1)"
                    >
                      +
                    </button>
                  </div>
                </div>

                <span
                  class="material-symbols-outlined me-3 text-hover-danger transition-color duration-350 cursor-pointer"
                  @click="deleteCart(item.id)"
                >
                  delete
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      class="my-2 p-4 align-content-center text-center text-secondary fw-semibold"
      style="min-height: 60dvh; margin-block: 40px"
      v-else
    >
      <p class="mb-5 fs-3xl">購物車內空空如也 <br />來點一些東西吃吧! <br />😋</p>
      <button class="btn btn-accent text-dark py-3" @click="$router.push('/products')">點我瀏覽產品</button>
    </div>
  </div>
</template>

<script lang="ts">
import cartStore from '@/stores/cartStore';
import { mapActions, mapState } from 'pinia';
import useFetch from '@/composable/useFetch';
import OrderProgressbar from '@/components/client/OrderProgressbar.vue';

export default {
  props: ['carts'],
  data() {
    return {
      isCouponUse: false,
    };
  },
  methods: {
    ...mapActions(cartStore, ['updateCart', 'deleteCart', 'deleteAllCart', 'getCarts']),
    async updateQty(id: string, qty: number) {
      if (qty < 1) qty = 1;
      await this.updateCart({ product_id: id, qty }, true);
    },
    async useCoupon() {
      const { value } = this.$refs.couponInput as HTMLInputElement;
      if (value.trim() === '') return;
      try {
        const { VITE_APP_API_NAME: path } = import.meta.env;
        const { data } = await useFetch(`/v2/api/${path}/coupon`, 'post', false, { data: { code: value } });
        if (data.success) {
          this.getCarts();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 點擊產品會跳轉到產品資訊頁
    getProductDetail(id: string) {
      this.$router.push({ name: 'productDetail', params: { id } });
    },
  },
  computed: {
    ...mapState(cartStore, ['f_total', 'total']),
  },
  components: {
    OrderProgressbar,
  },
};
</script>

<!-- 
1. 套用優惠眷文字 (改用toast顯示)
2. 更新數量時顯示loading
-->
