<template>
  <div class="container mx-auto">
    <h2 class="fw-bold fs-4xl text-center text-secondary my-10">產品管理</h2>
    <div class="toolbar mb-3 d-flex align-items-center justify-content-end gap-3">
      <div class="dropdown">
        <button
          class="btn dropdown-toggle d-flex align-items-center"
          type="button"
          id="orderDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-html="currentOrderHTML(currentOrderType as keyof OrderOptions)"
        ></button>
        <ul class="dropdown-menu" aria-labelledby="orderDropdown">
          <li v-for="order in orderOption" :key="`order${order}`">
            <a class="dropdown-item" href="#" @click.prevent="changeOrder(order)">
              <span v-html="currentOrderHTML(order as keyof OrderOptions)" class="d-flex align-items-center"></span>
            </a>
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-accent" @click="getModal('productModal', {} as Product)">新增產品</button>
    </div>
    <div class="mb-10">
      <ul class="row">
        <li
          class="d-flex align-items-center gap-2 bg-primary rounded p-3 mb-4"
          v-for="product in orderedProduct"
          :key="product.id"
        >
          <div class="me-md-2">
            <img :src="product.imageUrl" alt="" class="product__image" />
          </div>
          <div class="badge bg-secondary d-none d-md-inline">{{ product.category }}</div>
          <div class="col-3 fs-md-lg fs-lg-xl">{{ product.title }}</div>
          <div>
            <span class="fs-lg">{{ product.price }}</span> / {{ product.unit }}
          </div>
          <div class="ms-auto badge" :class="product.is_enabled ? 'bg-success' : 'bg-neutral'">
            {{ product.is_enabled ? '已啟用' : '未啟用' }}
          </div>
          <div class="button-group ms-auto">
            <span
              class="material-symbols-outlined interactive-button me-md-3 cursor-pointer"
              @click="getModal('productModal', product)"
            >
              edit
            </span>
            <span
              class="material-symbols-outlined interactive-button cursor-pointer"
              @click="getModal('deleteModal', product)"
            >
              delete
            </span>
          </div>
        </li>
      </ul>
    </div>
    <Pagination :pagination="pagination" @update-page="getNewProduct" />
  </div>
  <Loading :active="onLoading" />
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProducts" />
  <DeleteModal
    ref="deleteModal"
    :title="tempProduct.title"
    :target-id="tempProduct.id"
    @delete-target="async (id) => await deleteProduct(id)"
  />
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia';
import productStore from '@/stores/productStore';
import ProductModal from '@/components/Dashboard/ProductModal.vue';
import Pagination from '@/components/PaginationComp.vue';
import DeleteModal from '@/components/Dashboard/DeleteModal.vue';
import type Product from '@/interface/product';
import Loading from '@/components/LoadingComp.vue';

interface OrderOptions {
  highest_price: `價格<span class="material-symbols-outlined fs-base ms-2">arrow_upward</span>`;
  lowest_price: `價格<span class="material-symbols-outlined fs-base ms-2">arrow_downward</span>`;
  category: `種類`;
  is_enable: `是否啟用`;
}

const orders: OrderOptions = {
  category: '種類',
  highest_price: '價格<span class="material-symbols-outlined fs-base ms-2">arrow_upward</span>',
  lowest_price: '價格<span class="material-symbols-outlined fs-base ms-2">arrow_downward</span>',
  is_enable: '是否啟用',
};

export default {
  data() {
    return {
      orderOption: [...Object.keys(orders)],
      currentOrderType: 'category',
      tempProduct: {} as Product,
    };
  },
  methods: {
    ...mapActions(productStore, ['getProducts', 'updateProducts', 'deleteProduct']),
    async getNewProduct(page: number) {
      await this.getProducts('admin', page);
    },
    currentOrderHTML(order: keyof OrderOptions) {
      return orders[order];
    },
    changeOrder(order: string) {
      this.currentOrderType = order;
    },
    getModal(modalName: string, data: Product) {
      const modal: any = this.$refs[modalName];
      this.tempProduct = { ...data };
      modal.openModal();
    },
  },
  computed: {
    ...mapState(productStore, ['productList', 'pagination', 'onLoading']),
    orderedProduct() {
      return [...this.productList].sort((a, b) => {
        if (this.currentOrderType === 'highest_price') return a.price - b.price;
        if (this.currentOrderType === 'lowest_price') return b.price - a.price;
        if (this.currentOrderType === 'is_enable') return a.is_enabled >= b.is_enabled ? 1 : 0;
        return a.category.localeCompare(b.category);
      });
    },
  },
  async mounted() {
    await this.getProducts('admin');
  },
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
    Loading,
  },
};
</script>

<style scoped>
.product__image {
  width: 180px;
  aspect-ratio: 3/2;
  @media (width < 982px) {
    width: 150px;
  }
  @media (width < 768px) {
    width: 100px;
  }
}
</style>
