<template>
  <div class="container py-8 py-lg-lg">
    <OrderProgressbar :state="OrderState" />
    <div class="row row-gap-6">
      <div class="col-lg-7">
        <h3 class="mb-4 border-bottom border-neutral fw-bold fs-2xl">訂購項目</h3>
        <ul class="mb-4 mb-md-0">
          <template v-for="item in carts" :key="item.id">
            <li class="cart d-flex align-items-center gap-2">
              <div class="cart__Img p-2" style="flex-basis: 100px">
                <img :src="item.product.imageUrl" alt="" class="w-100 h-100 object-fit-cover" />
              </div>
              <div class="flex-grow-1 d-flex justify-content-md-between flex-column flex-md-row row-gap-1">
                <div class="w-100">
                  <p class="fs-xl">
                    <span class="me-4">{{ item.product.title }}</span>
                    <span>{{ item.qty }}{{ item.product.unit }}</span>
                  </p>
                  <p class="w-fit fs-lg text-secondary">NT${{ item.final_total }}</p>
                </div>
              </div>
            </li>
            <!-- 分隔線 -->
            <hr class="text-neutral" />
          </template>
        </ul>
        <div class="d-flex justify-content-between align-items-center px-md-4">
          <span class="fs-xl">份數：</span><span class="fs-2xl fw-bold text-secondary">{{ carts.length }}份</span>
        </div>
        <div class="d-flex justify-content-between align-items-center px-md-4">
          <span class="fs-xl">總計：</span><span class="fs-2xl fw-bold text-secondary">${{ f_total }}&nbsp;元</span>
        </div>
      </div>
      <form class="col-lg-5" ref="orderForm">
        <h2 class="fw-bold border-bottom border-neutral">購買人資訊</h2>
        <div class="mb-3">
          <label for="customName" class="col-form-label fw-bold">購買人姓名</label>
          <div>
            <input type="text" class="form-control" id="customName" placeholder="請輸入姓名" v-model="user.name" />
          </div>
        </div>
        <div class="mb-3">
          <label for="customEmail" class="col-form-label fw-bold">購買人信箱</label>
          <div>
            <input type="email" class="form-control" id="customEmail" placeholder="請輸入信箱" v-model="user.email" />
          </div>
        </div>
        <div class="mb-3">
          <label for="customTel" class="col-form-label fw-bold">購買人電話</label>
          <div>
            <input type="tel" class="form-control" id="customTel" placeholder="請輸入電話" v-model="user.tel" />
          </div>
        </div>
        <div class="mb-3">
          <label for="customAddress" class="col-form-label fw-bold">購買人地址</label>
          <div>
            <input
              type="text"
              class="form-control"
              id="customAddress"
              placeholder="請輸入地址"
              v-model="user.address"
            />
          </div>
        </div>
        <div class="mb-8">
          <label for="userMessage" class="form-label fw-bold">備註</label>
          <textarea
            name=""
            id="userMessage"
            class="form-control"
            placeholder="請輸入備註項目"
            style="min-height: 100px"
            v-model="message"
          ></textarea>
        </div>
        <button type="submit" class="d-block btn btn-accent w-50 mx-auto" @click.prevent="submitOrder">送出訂單</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import OrderProgressbar from '@/components/client/OrderProgressbar.vue';
import { formatDate } from '@/composable/useHelper';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import { mapActions, mapState } from 'pinia';

export default {
  props: ['carts'],
  data() {
    return {
      OrderDetail: {},
      OrderState: 3,
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    };
  },
  computed: {
    ...mapState(cartStore, ['f_total']),
  },
  methods: {
    formatDate,
    ...mapActions(orderStore, ['pushOrder']),
    ...mapActions(cartStore, ['getCarts']),
    async submitOrder() {
      const result = await this.pushOrder({ user: this.user, message: this.message });
      console.log(result);
      if (result.success) {
        await this.getCarts();
        (this.$refs.orderForm as HTMLFormElement).reset();
        this.$router.push(`/order/${result.orderId}`);
      }
    },
  },
  components: {
    OrderProgressbar,
  },
};
/*
1.送出之後
*/
</script>

<!-- <style scoped>
.orderDetail > * {
  padding-inline: 16px;
}
</style> -->
