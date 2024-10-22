<template>
  <div class="container py-6 py-lg-lg" v-if="orderInfo.id">
    <OrderProgressbar :state="OrderState" />
    <div class="col-lg-6 mx-auto mb-8 mb-md-10">
      <h3 class="mb-6 fw-bold fs-lg fs-lg-2xl">訂單成立，以下是您的訂單明細：</h3>
      <div class="orderInfo border border-neutral-light rounded-2 shadow-lg p-4">
        <p class="mb-3"><strong class="fw-semibold">訂單標號:</strong> {{ orderInfo?.id }}</p>
        <p class="mb-6"><strong class="fw-semibold">訂單時間:</strong> {{ formatDate(orderInfo?.create_at, true) }}</p>
        <h4 class="border-bottom border-neutral fw-bold">產品明細</h4>
        <table class="table py-4 mb-6">
          <thead>
            <tr>
              <th>名稱</th>
              <th class="text-center">數量</th>
              <th class="text-center">金額</th>
              <th class="text-center">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderInfo.products" :key="item.id">
              <td class="pt-2">{{ item.product.title }}</td>
              <td class="pt-2 text-center">{{ item.qty }}({{ item.product.unit }})</td>
              <td class="pt-2 text-center">{{ item.product.price }}</td>
              <td class="pt-2 text-center">{{ item.final_total }}</td>
            </tr>
          </tbody>
        </table>
        <p class="text-end fs-xl">
          總計： <span class="text-secondary fs-2xl">NT${{ orderInfo?.total }}</span>
        </p>
        <h4 class="border-bottom border-neutral fw-bold">購買人資訊</h4>
        <ul class="py-4">
          <li class="mb-3">
            <strong class="fw-semibold">購買人姓名：</strong> <span>{{ orderInfo?.user?.name }}</span>
          </li>
          <li class="mb-3">
            <strong class="fw-semibold">購買人電話：</strong> <span>{{ orderInfo?.user?.tel }}</span>
          </li>
          <li class="mb-3">
            <strong class="fw-semibold">購買人信箱：</strong> <span>{{ orderInfo?.user?.email }}</span>
          </li>
          <li>
            <strong class="fw-semibold">購買人地址：</strong> <span>{{ orderInfo?.user?.address }}</span>
          </li>
        </ul>
        <div class="mb-2">備註：</div>
        <textarea
          class="form-control text-neutral"
          :value="orderInfo?.message"
          disabled
          style="min-height: 100px"
        ></textarea>
      </div>
    </div>
    <div class="d-flex justify-content-center gap-6">
      <button type="button" class="btn btn-outline-neutral"><RouterLink to="/">返回首頁</RouterLink></button>
      <button type="button" class="btn btn-primary"><RouterLink to="/products">繼續選購</RouterLink></button>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import OrderProgressbar from '@/components/client/OrderProgressbar.vue';
import orderStore from '@/stores/orderStore';
import { formatDate } from '@/composable/useHelper';
import { mapActions } from 'pinia';

export default {
  components: {
    OrderProgressbar,
  },
  data() {
    return {
      OrderState: 3,
      orderInfo: {},
    };
  },
  methods: {
    formatDate,
    ...mapActions(orderStore, ['getSingleOrder']),
  },
  async mounted() {
    const orderId = this.$route.path.split('/').pop();
    const result = await this.getSingleOrder(orderId!);
    console.log(result, orderId);
    // 若找無訂單推至not found page
    if (result === false || result.order === null) this.$router.push('/NotFound');
    else this.orderInfo = result.order;
  },
};
</script>
