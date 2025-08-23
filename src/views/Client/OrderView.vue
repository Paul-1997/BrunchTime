<template>
  <Loading :active="onLoading" />
  <div class="container py-8 py-lg-lg">
    <OrderProgressbar :state="OrderState" />
    <div class="row row-gap-6">
      <div class="col-lg-7">
        <h3 class="mb-4 border-bottom border-neutral fw-bold fs-2xl">訂購項目</h3>
        <div v-if="carts.length">
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
            <span class="fs-xl">總數：</span
            ><span class="fs-2xl fw-bold text-secondary">{{ carts.reduce((a: any, b: any) => a + b.qty, 0) }}份</span>
          </div>
          <div class="d-flex justify-content-between align-items-center px-md-4">
            <span class="fs-xl">總計：</span><span class="fs-2xl fw-bold text-secondary">${{ f_total }}&nbsp;元</span>
          </div>
        </div>
        <Loading :active="!carts.length" :is-full-page="false" class="text-center" />
      </div>
      <VeeForm class="col-lg-5" ref="orderForm" as="form" v-slot="{ errors }" @submit="submitOrder">
        <h2 class="fw-bold border-bottom border-neutral">購買人資訊</h2>
        <div class="mb-3">
          <label for="customName" class="col-form-label fw-bold"><sup style="color: red">*</sup>購買人姓名</label>
          <VeeField
            v-model="user.name"
            v-slot="{ field, meta }"
            type="text"
            rules="required"
            name="Buyer__name"
            label="購買人姓名"
          >
            <input
              v-bind="field"
              id="customName"
              class="form-control"
              :class="{ 'is-invalid': errors['Buyer__name'], 'is-valid': meta.valid && meta.touched }"
              placeholder="請輸入姓名"
            />
          </VeeField>
          <VeeErrorMessage name="Buyer__name" class="Vee__errMsg" />
        </div>
        <div class="mb-3">
          <label for="customEmail" class="col-form-label fw-bold"><sup style="color: red">*</sup>購買人信箱</label>
          <VeeField
            v-model="user.email"
            v-slot="{ field, meta }"
            type="email"
            rules="email|required"
            name="Buyer__email"
            label="購買人姓名"
          >
            <input
              v-bind="field"
              id="customEmail"
              class="form-control"
              :class="{ 'is-invalid': errors['Buyer__email'], 'is-valid': meta.valid && meta.touched }"
              placeholder="請輸入信箱"
            />
          </VeeField>
          <VeeErrorMessage name="Buyer__email" class="Vee__errMsg" />
        </div>
        <div class="mb-3">
          <label for="customTel" class="col-form-label fw-bold"><sup style="color: red">*</sup>購買人電話</label>
          <VeeField
            v-model="user.tel"
            v-slot="{ field, meta }"
            type="number"
            rules="required|numeric|min:8"
            name="Buyer__tel"
            label="購買人電話"
          >
            <input
              v-bind="field"
              id="customTel"
              class="form-control"
              :class="{ 'is-invalid': errors['Buyer__tel'], 'is-valid': meta.valid && meta.touched }"
              placeholder="請輸入電話"
            />
          </VeeField>
          <VeeErrorMessage name="Buyer__tel" class="Vee__errMsg" />
        </div>
        <div class="mb-3">
          <label for="customAddress" class="col-form-label fw-bold"><sup style="color: red">*</sup>購買人地址</label>
          <VeeField
            v-model="user.address"
            v-slot="{ field, meta }"
            type="text"
            rules="required"
            name="Buyer__address"
            label="購買人地址"
          >
            <input
              v-bind="field"
              id="customAddress"
              class="form-control"
              :class="{ 'is-invalid': errors['Buyer__address'], 'is-valid': meta.valid && meta.touched }"
              placeholder="請輸入地址"
            />
          </VeeField>
          <VeeErrorMessage name="Buyer__address" class="Vee__errMsg" />
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
        <button type="submit" class="d-block btn btn-accent w-50 mx-auto">送出訂單</button>
      </VeeForm>
    </div>
  </div>
</template>

<script lang="ts">
import OrderProgressbar from '@/components/client/OrderProgressbar.vue';
import Loading from '@/components/LoadingComp.vue';
import cartStore from '@/stores/cartStore';
import orderStore from '@/stores/orderStore';
import { mapActions, mapState } from 'pinia';
import formatDate from '@/utils/formatDate';

export default {
  props: ['carts'],
  data() {
    return {
      OrderDetail: {},
      OrderState: 2,
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
    ...mapState(orderStore, ['onLoading']),
  },
  methods: {
    formatDate,
    ...mapActions(orderStore, ['pushOrder']),
    ...mapActions(cartStore, ['getCarts']),
    async submitOrder() {
      const result = await this.pushOrder({ user: this.user, message: this.message });
      if (result.success) {
        await this.getCarts();
        (this.$refs.orderForm as HTMLFormElement).resetForm();
        this.$router.push(`/order/${result.orderId}`);
      }
    },
  },
  components: {
    OrderProgressbar,
    Loading,
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
