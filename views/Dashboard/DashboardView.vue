<template>
  <div class="d-flex">
    <Panel @userLoginOut="logout" />
    <main class="mainDashboardContent flex-grow-1 p-6">
      <RouterView v-if="$route.name !== 'dashboard-home'" />
      <div class="row g-4" v-else>
        <!-- 統計卡片 -->
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 border-1 shadow">
            <div class="card-body">
              <h5 class="card-title text-primary">總產品數</h5>
              <p class="card-text fs-2xl">{{ productCount }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 border-1 shadow">
            <div class="card-body">
              <h5 class="card-title text-success">總訂單數</h5>
              <p class="card-text fs-2xl">{{ orderCount }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 border-1 shadow">
            <div class="card-body">
              <h5 class="card-title text-info">本月營業額</h5>
              <p class="card-text fs-2xl">NT$ {{ monthlyRevenue }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="card h-100 border-1 shadow">
            <div class="card-body">
              <h5 class="card-title text-warning">待處理訂單</h5>
              <p class="card-text fs-2xl">{{ pendingOrders }}</p>
            </div>
          </div>
        </div>

        <!-- 最新訂單 -->
        <div class="order-list-container col-12">
          <div class="card border-1 shadow h-100 flex-grow-1">
            <div class="card-header bg-white border-0">
              <h5 class="mb-0 fs-4xl fw-bold">最新訂單</h5>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-striped table-hover mb-0">
                  <thead>
                    <tr>
                      <th>訂單編號</th>
                      <th>客戶名稱</th>
                      <th>訂單金額</th>
                      <th>訂單狀態</th>
                      <th>建立時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in recentOrders" :key="order.id">
                      <td>{{ order.id }}</td>
                      <td>{{ order.user.name }}</td>
                      <td>NT$ {{ order.total }}</td>
                      <td>
                        <span :class="getStatusClass(order.is_paid)">
                          {{ order.is_paid ? '已付款' : '未付款' }}
                        </span>
                      </td>
                      <td>{{ formatDate(order.create_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Panel from '@/components/Dashboard/PanelComp.vue';
import userStore from '@/stores/userStore';
import productStore from '@/stores/productStore';
import orderStore from '@/stores/orderStore';
import { mapActions, mapState } from 'pinia';
import formatDate from '@/utils/formatDate';
import type { Order } from '@/types/order';

export default {
  components: {
    Panel,
  },
  data() {
    return {
      recentOrders: [] as Order[],
      productCount: 0,
      orderCount: 0,
      monthlyRevenue: 0,
      pendingOrders: 0,
    };
  },
  computed: {
    ...mapState(orderStore, ['orderList']),
  },
  methods: {
    ...mapActions(userStore, ['checkLogin', 'logout']),
    ...mapActions(productStore, ['getAllProducts']),
    ...mapActions(orderStore, ['getOrders']),
    formatDate,
    getStatusClass(isPaid: boolean) {
      return {
        'badge bg-success': isPaid,
        'badge bg-warning': !isPaid,
      };
    },
    async handleDashboardData() {
      try {
        const products = (await this.getAllProducts('admin')) || [];
        await this.getOrders('admin');
        if (products) {
          this.productCount = Object.keys(products).length;
        }
        if (this.orderList.length) {
          this.orderCount = this.orderList.length;
          this.recentOrders = this.orderList.slice(0, 5);
          // 計算本月營業額
          const currentMonth = new Date().getMonth();
          this.monthlyRevenue = this.orderList
            .filter((order: Order) => new Date(order.create_at).getMonth() === currentMonth && order.is_paid)
            .reduce((sum: number, order: Order) => sum + order.total, 0);

          // 計算待處理訂單
          this.pendingOrders = this.orderList.filter((order: Order) => !order.is_paid).length;
        }
      } catch (error) {
        // 錯誤已被 try-catch 捕獲，不需要額外處理
      }
    },
  },
  async mounted() {
    await this.checkLogin();
    await this.handleDashboardData();
  },
};
</script>

<style scoped lang="scss">
.mainDashboardContent {
  @media (width > 767px) {
    margin-inline-start: calc(clamp(248px, 22.5vw, 300px) + 12px);
  }
}

.badge {
  font-size: 0.875rem;
  padding: 0.5em 0.75em;
}

.table {
  @media (width > 997px) {
    font-size: 1.125rem;
  }

  th {
    font-weight: 600;
    color: #495057;
  }

  td {
    vertical-align: middle;
  }
}

.fs-2xl {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
}

.order-list-container {
  min-block-size: calc(100vh - 150px);
}
</style>
