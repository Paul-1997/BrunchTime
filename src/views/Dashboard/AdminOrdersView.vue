<template>
  <div class="container mx-auto">
    <h2 class="fw-bold fs-4xl text-center text-secondary my-10">訂單管理</h2>
    <div class="toolbar mb-3">
      <div class="d-flex flex-wrap align-items-center justify-content-md-between">
        <div class="d-flex align-items-center gap-3">
          <button
            type="button"
            :class="currFilter === '全部' ? 'btn-primary' : 'btn-neutral-light'"
            class="btn border-0 px-4 py-1"
            @click="currFilter = '全部'"
          >
            全部
          </button>
          <button
            type="button"
            :class="currFilter === '已付款' ? 'btn-primary' : 'btn-neutral-light'"
            class="btn border-0 px-4 py-1"
            @click="currFilter = '已付款'"
          >
            已付款
          </button>
          <button
            type="button"
            :class="currFilter === '未付款' ? 'btn-primary' : 'btn-neutral-light'"
            class="btn border-0 px-4 py-1"
            @click="currFilter = '未付款'"
          >
            未付款
          </button>
        </div>
        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-neutral dropdown-toggle"
            type="button"
            id="dropdown__OrderSorter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ OrderSortBy }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdown__OrderSorter">
            <li
              class="dropdown-item cursor-pointer"
              v-for="option in ['最新', '最舊']"
              :key="option"
              @click="OrderSortBy = option"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <div class="accordion" id="adminOrderList">
        <template v-for="(order, i) in finalOrder" :key="order.id">
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
                  {{ order.is_paid ? '已付款' : '未付款' }}
                </span>
                <span class="fw-bold fs-lg text-dark">{{ `訂單${order.id}` }}</span>
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
                  <span>訂單編號: {{ order.id }}</span>
                </div>
                <div class="mb-2">
                  <span>詳細日期: {{ formatDate(order.create_at, true) }}</span>
                </div>
                <div class="mb-5">
                  <span> 付款狀態: </span>
                  <span class="badge me-3 align-middle" :class="order.is_paid ? 'bg-success' : 'bg-neutral'">
                    {{ order.is_paid ? '已付款' : '未付款' }}
                  </span>
                </div>
                <h3 class="mb-3 fs-xl border-bottom">訂單資訊</h3>
                <div class="mb-5 d-flex flex-wrap gap-4">
                  <div
                    v-for="product in order.products"
                    :key="product.id"
                    class="p-1 bg-primary d-flex align-items-center mb-3"
                    style="max-width: 320px"
                  >
                    <img :src="product.product.imageUrl" alt="" style="width: 40px; aspect-ratio: 1" class="me-2" />
                    <p class="flex-grow-1 me-auto">
                      {{ product.product.title }}
                      <span class="ms-1">{{ product.qty }}({{ product.product.unit }})</span>
                    </p>
                    <p class="ms-2">共{{ product.final_total }}元</p>
                  </div>
                </div>
                <p class="text-end fw-semibold fs-lg">
                  總計: <span class="fs-base"> {{ order.total }}</span>
                </p>

                <h3 class="mb-3 fs-xl border-bottom">訂購人資訊</h3>
                <ul class="mb-5">
                  <li class="mb-3"><span class="me-2">訂購人名稱:</span>{{ order.user.name }}</li>
                  <li class="mb-3"><span class="me-2">訂購人電話:</span>{{ order.user.tel }}</li>
                  <li class="mb-3"><span class="me-2">訂購人信箱:</span>{{ order.user.email }}</li>
                  <li class="mb-3"><span class="me-2">訂購人地址:</span>{{ order.user.address }}</li>
                </ul>
                <h3 class="mb-3 fs-xl border-bottom">訂單備註</h3>
                <p class="p-1 text-neutral bg-mute rounded" style="min-height: 100px">
                  {{ order.message ? order.message : '無備註內容' }}
                </p>
              </div>
              <div class="accordion-footer px-4 py-2 text-end border-top">
                <button
                  type="button"
                  class="btn px-6 py-1 bg-danger text-white me-4 bg-hover-danger"
                  @click="getDeleteOrder(order)"
                >
                  刪除
                </button>
                <button type="button" class="btn px-6 py-1 bg-primary bg-hover-accent" @click="editOrder(order)">
                  編輯
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <Pagination :pagination="pagination" @update-page="getNewOrder" />
  </div>
  <DeleteModal
    ref="delete"
    :title="tempOrder.id"
    :target-id="tempOrder.id"
    @delete-target="async (id) => await deleteOrder(id)"
  />
  <OrderModal ref="edit" :order="tempOrder" :formatDate="formatDate" @update-order="updateOrder" />
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import Pagination from '@/components/PaginationComp.vue';
import DeleteModal from '@/components/Dashboard/DeleteModal.vue';
import orderStore from '@/stores/orderStore';
import type { Order } from '@/interface/order';
import OrderModal from '@/components/Dashboard/OrderModal.vue';
import { formatDate } from '@/composable/useHelper';

export default {
  data() {
    return {
      tempOrder: {} as Order,
      onEdit: false as boolean,
      currFilter: '全部' as '全部' | '已付款' | '未付款',
      OrderSortBy: '最新' as string,
    };
  },
  methods: {
    ...mapActions(orderStore, ['getOrders', 'updateOrder', 'deleteOrder']),
    async getNewOrder(page: number) {
      await this.getOrders('admin', page);
    },
    getModal(modalName: string) {
      const modal: any = this.$refs[modalName];
      modal.openModal();
    },
    editOrder(order: Order) {
      this.tempOrder = order;
      this.getModal('edit');
    },
    getDeleteOrder(order: Order) {
      this.tempOrder = order;
      this.getModal('delete');
    },
    formatDate,
  },
  computed: {
    ...mapState(orderStore, ['orderList', 'pagination']),

    finalOrder() {
      const filterOrder = [...this.orderList].filter((order) => {
        if (this.currFilter === '全部') return true;

        const isValid = order.is_paid ? '已付款' : '未付款';
        return isValid === this.currFilter;
      });
      return filterOrder.sort((a, b) => {
        if (this.OrderSortBy === '最新') return a.create_at - b.create_at;
        return b.create_at - a.create_at;
      });
    },
  },
  async mounted() {
    await this.getOrders('admin');
  },
  components: {
    DeleteModal,
    OrderModal,
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
