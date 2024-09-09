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
      <button type="button" class="btn btn-accent" @click="getModal('productModal')">新增產品</button>
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
          <div>{{ product.price }} / {{ product.unit }}</div>
          <div class="ms-auto badge" :class="product.is_enabled ? 'bg-success' : 'bg-neutral'">
            {{ product.is_enabled ? '已啟用' : '未啟用' }}
          </div>
          <div class="button-group ms-auto">
            <span
              class="material-symbols-outlined interactive-button me-md-3 cursor-pointer"
              @click="getModal('productModal')"
            >
              edit
            </span>
            <span class="material-symbols-outlined interactive-button cursor-pointer" @click="getModal('deleteModal')">
              delete
            </span>
          </div>
        </li>
      </ul>
    </div>
    <Pagination :pagination="paginationData" @update-page="getNewProduct" />
  </div>

  <ProductModal ref="productModal" />
  <DeleteModal ref="deleteModal" />
</template>
<script lang="ts">
import { mapActions } from 'pinia';
import productStore from '@/stores/productStore.ts';
import ProductModal from '@/components/Dashboard/ProductModal.vue';
import Pagination from '@/components/PaginationComp.vue';
import DeleteModal from '@/components/Dashboard/DeleteModal.vue';

interface PaginationType {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string;
}

interface Product {
  category: string; // 类别
  content: string; // 内容
  description: string; // 描述
  id: string; // 唯一标识符
  imageUrl: string; // 图片 URL
  isNew: boolean; // 是否为新品
  is_enabled: string; // 是否启用（字符串类型）
  num: number; // 数量
  origin_price: number; // 原价
  price: number; // 价格
  title: string; // 标题
  unit: string; // 单位
}

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
      productList: [] as Product[],
      orderOption: [...Object.keys(orders)],
      currentOrderType: 'category',
      paginationData: {} as PaginationType,
    };
  },
  methods: {
    ...mapActions(productStore, ['getAllProducts', 'getProducts']),
    async getNewProduct(page: number) {
      const result = await this.getProducts('admin', page);
      if (result) {
        this.productList = result.products;
        this.paginationData = result.pagination;
      }
    },
    currentOrderHTML(order: keyof OrderOptions) {
      return orders[order];
    },
    changeOrder(order: string) {
      this.currentOrderType = order;
    },
    getModal(modalName: string) {
      const modal: any = this.$refs[modalName];
      modal.openModal();
    },
  },
  computed: {
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
    const result = await this.getProducts('admin');
    if (result) {
      this.productList = result.products;
      this.paginationData = result.pagination;
    }
    // (this.$refs.productModal as InstanceType<typeof ProductModal>).openModal();
  },
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
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
