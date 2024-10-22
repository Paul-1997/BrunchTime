<template>
  <div class="about">
    <div class="container">
      <div class="row py-lg-lg py-md-10 py-6">
        <!-- product List -->
        <div class="col-md-3 d-none d-md-block">
          <nav class="position-sticky top-0">
            <h4 class="mb-1 border-accent border-bottom border-4 fw-semibold fs-2xl text-secondary">產品列表</h4>
            <ul style="background-color: var(--bs-gray-100)">
              <li
                v-for="type in productType"
                :key="type"
                class="productList-item p-4 border border-top-0 fw-semibold fs-lg text-secondary"
                :class="{ 'bg-accent text-white': currProductType === type }"
                @click="changeCategory(type)"
              >
                {{ type }}
              </li>
            </ul>
          </nav>
        </div>
        <div class="d-md-none mb-6">
          <select class="form-select border-neutral" v-model="currProductType" @click="changeCategory(currProductType)">
            <option :value="type" v-for="type in productType" :key="type">
              {{ type }}
            </option>
          </select>
        </div>
        <!-- product Card -->
        <div class="col-md-9">
          <div class="row row-gap-6 mb-8">
            <h3 class="mb-4 ms-4 ps-4 border-start border-accent border-5 text-xl fw-bold">{{ currProductType }}</h3>
            <div v-if="productList.length === 0" class="mx-auto w-fit text-center bg-primary py-4 px-8 rounded-pill">
              該系列尚未有任何產品
            </div>
            <div class="col-md-6 col-lg-4" v-for="product in productList" :key="product.id">
              <ProductCard :product="product" />
            </div>
          </div>
          <Pagination :pagination="pagination" @update-page="getNewProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import productStore from '@/stores/productStore';
import ProductCard from '@/components/client/ProductCard.vue';
import Pagination from '@/components/PaginationComp.vue';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    Pagination,
    ProductCard,
  },
  data() {
    return {
      currProductType: '全部產品',
      productType: ['全部產品', '沙拉', '拼盤', '漢堡', '三明治', '義大利麵', '點心', '飲品'],
    };
  },
  computed: {
    ...mapState(productStore, ['productList', 'pagination']),
  },
  methods: {
    ...mapActions(productStore, ['getProducts']),
    async getNewProduct(page: number) {
      await this.getProducts('custom', page);
    },
    changeCategory(category: string) {
      type Query = { path: string; query?: { category: string } };
      this.currProductType = category;
      const obj: Query = { path: '/products' };
      if (category !== '全部產品') obj.query = { category };
      // 觸發watch 重新抓取產品
      this.$router.replace(obj);
    },
  },
  watch: {
    '$route.query': {
      async handler({ category }) {
        if (category) await this.getProducts('custom', 0, category);
        else await this.getProducts('custom');
      },
    },
  },
  mounted() {
    this.getProducts('custom');
  },
};
</script>

<style>
.productList-item:not(.bg-accent):hover {
  cursor: pointer;
  background: var(--bs-gray-200);
}

.form-select:focus {
  background-color: var(--bs-primary); /* 聚焦时背景色 */
}

.form-select:hover {
  background-color: var(--bs-gray-200); /* 鼠标悬停时背景色 */
}
</style>
