<template>
  <div class="container mx-auto" ref="adop">
    <h2 class="fw-bold fs-4xl text-center text-secondary my-10">訂單管理</h2>
    <!-- <div class="toolbar mb-3 d-flex align-items-center justify-content-end gap-3">
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
    </div> -->
    <div class="mb-10">
      <div class="accordion" id="adminOrderList">
        <template v-for="(order, i) in orderList" :key="order.id">
          <div class="accordion-item rounded-bottom rounded-2 overflow-hidden mb-3">
            <h2 class="accordion-header" :id="`order${i}`">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#orderItem${i + 1}`"
                aria-expanded="false"
                :aria-controls="`orderItem${i + 1}`"
                style="background-color: var(--bs-primary); box-shadow: none"
              >
                <div class="badge bg-secondary d-none d-md-inline me-1">
                  {{ formatDate(order.create_at) }}
                </div>
                <span class="badge me-3" :class="order.is_paid ? 'bg-success' : 'bg-neutral'">
                  {{ isPaid(order) }}
                </span>
                <span class="fw-bold fs-lg text-dark">{{ `訂單${i.toString().padStart(3, '0')}` }}</span>
              </button>
            </h2>
            <div
              :id="`orderItem${i + 1}`"
              class="accordion-collapse collapse"
              :aria-labelledby="`order${i}`"
              data-bs-parent="#adminOrderList"
            >
              <div class="accordion-body">
                <div class="mb-2">
                  <span v-if="!onEdit">訂單編號: {{ order.id }}</span>
                  <div class="editWrapper" v-else>
                    <label for="editOrderId" class="form-label me-2 mb-0">訂單編號</label>
                    <input type="text" id="editOrderId" :value="order.id" class="form-control" disabled readonly />
                  </div>
                </div>
                <div class="mb-2">
                  <span v-if="!onEdit">詳細日期: {{ formatDate(order.create_at, true) }}</span>
                  <div class="editWrapper" v-else>
                    <label for="editOrderDate" class="form-label me-2 mb-0">詳細日期</label>
                    <input
                      type="text"
                      id="editOrderDate"
                      :value="formatDate(order.create_at, true)"
                      class="form-control"
                      disabled
                      readonly
                    />
                  </div>
                </div>
                <div class="mb-5">
                  <span> 付款狀態: </span>
                  <div v-if="onEdit" class="d-inline">
                    <input
                      type="radio"
                      class="btn-check"
                      name="payment_options"
                      id="payment_options1"
                      autocomplete="off"
                      v-model="tempOrder.is_paid"
                      :value="true"
                    />
                    <label
                      class="btn btn-sm me-2"
                      for="payment_options1"
                      :class="tempOrder.is_paid ? 'btn-success' : 'btn-outline-neutral'"
                      >已付款</label
                    >

                    <input
                      type="radio"
                      class="btn-check"
                      name="payment_options"
                      id="payment_options2"
                      autocomplete="off"
                      v-model="tempOrder.is_paid"
                      :value="false"
                    />
                    <label
                      class="btn btn-sm"
                      for="payment_options2"
                      :class="tempOrder.is_paid ? 'btn-outline-neutral' : 'btn-neutral'"
                      >未付款</label
                    >
                  </div>
                  <span class="badge me-3 align-middle" :class="order.is_paid ? 'bg-success' : 'bg-neutral'" v-else>
                    {{ isPaid(order) }}
                  </span>
                </div>
                <h3 class="mb-3 fs-xl border-bottom">訂單資訊</h3>
                <div class="mb-5">
                  <div v-for="product in order.products" :key="product.id">
                    {{ product.product.title }}
                    {{ product.qty }}
                    {{ product.final_total }}
                    {{ product.id }}
                  </div>
                </div>

                <h3 class="mb-3 fs-xl border-bottom">訂購人資訊</h3>
                <ul>
                  <li class="mb-3">
                    <div v-if="onEdit" class="editWrapper">
                      <label for="editOrderUserName" class="me-sm-2">訂購人名稱: </label>
                      <input type="text" class="form-control" v-model="tempOrder.user.name" id="editOrderUserName" />
                    </div>
                    <div v-else><span class="me-2">訂購人名稱:</span>{{ order.user.name }}</div>
                  </li>
                  <li class="mb-3">
                    <div v-if="onEdit" class="editWrapper">
                      <label for="editOrderUserTel" class="me-sm-2">訂購人電話: </label>
                      <input type="text" class="form-control" v-model="tempOrder.user.tel" id="editOrderUserTel" />
                    </div>
                    <div v-else><span class="me-2">訂購人電話:</span>{{ order.user.tel }}</div>
                  </li>
                  <li class="mb-3">
                    <div v-if="onEdit" class="editWrapper">
                      <label for="editOrderUserEmail" class="me-sm-2">訂購人信箱: </label>
                      <input type="text" class="form-control" v-model="tempOrder.user.email" id="editOrderUserEmail" />
                    </div>
                    <div v-else><span class="me-2">訂購人信箱:</span>{{ order.user.email }}</div>
                  </li>
                  <li class="mb-3">
                    <div v-if="onEdit" class="editWrapper">
                      <label for="editOrderUserAddress" class="me-sm-2">訂購人地址: </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="tempOrder.user.address"
                        id="editOrderUserAddress"
                      />
                    </div>
                    <div v-else><span class="me-2">訂購人地址:</span>{{ order.user.address }}</div>
                  </li>
                </ul>
              </div>
              <div class="accordion-footer px-4 py-2 text-end border-top">
                <button
                  type="button"
                  class="btn px-6 py-1 bg-primary bg-hover-accent"
                  @click="editOrder(order.id)"
                  v-if="!onEdit"
                >
                  編輯
                </button>
                <button type="button" class="btn px-6 py-1 bg-accent bg-hover-success" @click="finishEdit" v-else>
                  確認
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <Pagination :pagination="pagination" />
  </div>
  <DeleteModal />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import Pagination from '@/components/PaginationComp.vue';
import DeleteModal from '@/components/Dashboard/DeleteModal.vue';
import orderStore from '@/stores/orderStore.ts';
import type { Order } from '@/interface/order';

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
      tempOrder: {} as Order,
      onEdit: false as boolean,
    };
  },
  methods: {
    ...mapActions(orderStore, ['getOrders']),

    currentOrderHTML(order: keyof OrderOptions) {
      return orders[order];
    },
    getModal(modalName: string) {
      const modal: any = this.$refs[modalName];
      modal.openModal();
    },
    formatDate(timestamp: number, full: boolean = false): string {
      const date = new Date(timestamp * 1000); // 时间戳单位为秒，转换为毫秒

      // 获取年份、月份、日期、小时、分钟和秒
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
      const day = String(date.getDate()).padStart(2, '0'); // 确保日期是两位数
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return full ? `${year}/${month}/${day} ${hours}:${minutes}:${seconds}` : `${year}/${month}/${day}`;
    },
    isPaid({ is_paid }) {
      return is_paid ? '已付款' : '未付款';
    },
    editOrder(id: string) {
      this.tempOrder = JSON.parse(JSON.stringify(this.orderList.find((o) => o.id === id)));
      this.onEdit = !this.onEdit;
    },
    finishEdit() {
      this.onEdit = false;
    },
  },
  computed: {
    ...mapState(orderStore, ['orderList', 'pagination']),

    // orderedProduct() {
    //   return [...this.productList].sort((a, b) => {
    //     if (this.currentOrderType === 'highest_price') return a.price - b.price;
    //     if (this.currentOrderType === 'lowest_price') return b.price - a.price;
    //     if (this.currentOrderType === 'is_enable') return a.is_enabled >= b.is_enabled ? 1 : 0;
    //     return a.category.localeCompare(b.category);
    //   });
    // },
  },
  async mounted() {
    await this.getOrders('admin');
  },
  components: {
    DeleteModal,
    Pagination,
  },
};
</script>

<style scoped>
.editWrapper {
  display: flex;
  align-items: center;
  & > label {
    width: fit-content;
  }
  & > input {
    max-width: 300px;
  }
  @media (width < 480px) {
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;
  }
}
</style>
