<template>
  <Teleport to="body">
    <div
      class="modal fade"
      id="orderEdit"
      tabindex="-1"
      aria-labelledby="orderEditLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="orderEdit"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 id="orderEditLabel" class="modal-title fw-bold">編輯訂單</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <VeeForm
            ref="form"
            v-slot="{ errors }"
            @submit="updateOrder"
            :initialValues="{
              orderUserName: deepCloneOrder.user.name,
              orderUserEmail: deepCloneOrder.user.email,
              orderUserTel: deepCloneOrder.user.tel,
              orderUserAddress: deepCloneOrder.user.address,
            }"
            :validateOnMount="true"
          >
            <div class="modal-body">
              <div class="mb-3">
                <label for="editOrderId" class="form-label">訂單編號</label>
                <input type="text" id="editOrderId" :value="order.id" class="form-control" disabled readonly />
              </div>
              <div class="mb-3">
                <label for="editOrderDate" class="form-label">訂購時間</label>
                <input
                  type="text"
                  id="editOrderDate"
                  :value="formatDate(order.create_at, true)"
                  class="form-control"
                  disabled
                  readonly
                />
              </div>
              <div class="d-flex align-items-center mb-3">
                <span class="me-3">付款狀態:</span>
                <input
                  type="radio"
                  class="btn-check"
                  name="payment_options"
                  id="payment_options1"
                  autocomplete="off"
                  v-model="deepCloneOrder.is_paid"
                  :value="true"
                />
                <label
                  class="btn btn-sm me-2"
                  for="payment_options1"
                  :class="deepCloneOrder.is_paid ? 'btn-success' : 'btn-outline-neutral'"
                  >已付款</label
                >

                <input
                  type="radio"
                  class="btn-check"
                  name="payment_options"
                  id="payment_options2"
                  autocomplete="off"
                  v-model="deepCloneOrder.is_paid"
                  :value="false"
                />
                <label
                  class="btn btn-sm"
                  for="payment_options2"
                  :class="deepCloneOrder.is_paid ? 'btn-outline-neutral' : 'btn-neutral'"
                  >未付款</label
                >
              </div>
              <h3 class="fs-xl fw-semibold border-bottom mb-3">訂購項目</h3>
              <table class="table table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">產品</th>
                    <th scope="col">單價</th>
                    <th scope="col">數量</th>
                    <th scope="col">總計</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in deepCloneOrder.products" :key="product.id" :data-id="product.id">
                    <td class="fw-semibold itemListDropdown">
                      <div class="form-control p-0 cursor-pointer">
                        <div
                          class="d-flex align-items-center dropdown-toggle"
                          id="itemListDropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <picture style="padding: 0.125rem; flex: 0 0 48px" class="me-1">
                            <img :src="product.product.imageUrl" alt="" style="aspect-ratio: 1" />
                          </picture>
                          <span class="overflow-hidden">{{ product.product.title }}</span>
                        </div>
                        <ul class="dropdown-menu" aria-labelledby="itemListDropdown">
                          <li v-for="item in productItemList" :key="item.id">
                            <div class="d-flex align-items-center" @click="updateItem(item, product.id)">
                              <picture style="padding: 0.125rem; flex: 0 0 48px" class="me-1">
                                <img :src="item.imageUrl" alt="" style="aspect-ratio: 1" />
                              </picture>
                              <span class="overflow-hidden">{{ item.title }}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td width="48px">
                      {{ product.product.price }}
                    </td>
                    <td>
                      <select
                        class="form-select"
                        @change="updateQty(product.id)"
                        v-model="product.qty"
                        style="width: 50px; background-position-x: 28px; padding: 0.25rem"
                      >
                        <option :value="i" v-for="i in 20" :key="`qty${i}`">{{ i }}</option>
                      </select>
                    </td>
                    <td>${{ product.final_total }}</td>
                    <td><button class="btn btn-danger px-2 py-0" @click="removeOrderItem(product.id)">X</button></td>
                  </tr>
                  <tr>
                    <td colspan="5">
                      <button
                        class="mx-auto d-flex align-item-center justify-content-center btn text-neutral border-bottom"
                        type="button"
                        id="itemListDropdown2"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >
                        <span class="material-symbols-outlined">add_circle</span>新增產品
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="itemListDropdown2">
                        <li v-for="item in productItemList" :key="item.id">
                          <div class="d-flex align-items-center" @click="addNewItem(item)">
                            <picture style="padding: 0.125rem; flex: 0 0 48px" class="me-1">
                              <img :src="item.imageUrl" alt="" style="aspect-ratio: 1" />
                            </picture>
                            <span class="overflow-hidden">{{ item.title }}</span>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end fs-lg">總計金額$ {{ deepCloneOrder.total }} 元</div>
              <h3 class="fs-xl fw-semibold border-bottom mb-3">訂購人資訊</h3>
              <div class="mb-3">
                <label for="editOrderUserName" class="form-label">訂購人名稱 </label>
                <VeeField
                  v-model="deepCloneOrder.user.name"
                  v-slot="{ field, meta }"
                  type="text"
                  rules="required"
                  name="OrderUserName"
                  :value="deepCloneOrder.user.name"
                  label="訂購人名稱"
                >
                  <input
                    id="editOrderUserName"
                    v-bind="field"
                    class="form-control"
                    :class="{ 'is-invalid': errors['OrderUserName'], 'is-valid': meta.valid && meta.touched }"
                  />
                </VeeField>
                <VeeErrorMessage name="OrderUserName" class="Vee__errMsg" />
              </div>
              <div class="mb-3">
                <label for="editOrderUserTel" class="form-label">訂購人電話 </label>
                <VeeField
                  v-model.number="deepCloneOrder.user.tel"
                  v-slot="{ field, meta }"
                  type="number"
                  rules="numeric|required"
                  name="OrderUserTel"
                  :value="deepCloneOrder.user.tel"
                  label="訂購人電話"
                >
                  <input
                    id="editOrderUserTel"
                    inputmode="numeric"
                    v-bind="field"
                    class="form-control"
                    :class="{ 'is-invalid': errors['OrderUserName'], 'is-valid': meta.valid && meta.touched }"
                  />
                </VeeField>
                <VeeErrorMessage name="OrderUserTel" class="Vee__errMsg" />
              </div>
              <div class="mb-3">
                <label for="editOrderUserEmail" class="form-label">訂購人信箱 </label>
                <VeeField
                  v-model="deepCloneOrder.user.email"
                  v-slot="{ field, meta }"
                  type="email"
                  rules="email|required"
                  name="OrderUserEmail"
                  :value="deepCloneOrder.user.email"
                  label="訂購人信箱"
                >
                  <input
                    id="editOrderUserEmail"
                    v-bind="field"
                    class="form-control"
                    :class="{ 'is-invalid': errors['OrderUserName'], 'is-valid': meta.valid && meta.touched }"
                  />
                </VeeField>
                <VeeErrorMessage name="OrderUserEmail" class="Vee__errMsg" />
              </div>
              <div class="mb-3">
                <label for="editOrderUserAddress" class="form-label">訂購人地址 </label>
                <VeeField
                  v-model="deepCloneOrder.user.address"
                  v-slot="{ field, meta }"
                  type="text"
                  rules="required"
                  name="OrderUserAddress"
                  :value="deepCloneOrder.user.address"
                  label="訂購人電話"
                >
                  <input
                    id="editOrderUserAddress"
                    inputmode="numeric"
                    v-bind="field"
                    class="form-control"
                    :class="{ 'is-invalid': errors['OrderUserName'], 'is-valid': meta.valid && meta.touched }"
                  />
                </VeeField>
                <VeeErrorMessage name="OrderUserAddress" class="Vee__errMsg" />
              </div>
              <div class="mb-3">
                <h3 class="fs-xl fw-semibold">訂單備註</h3>
                <p class="p-1 border border-neutral-light text-neutral bg-mute rounded" style="min-height: 100px">
                  {{ order.message ? order.message : '無備註內容' }}
                </p>
              </div>
            </div>
            <div class="modal-footer py-2">
              <button type="button" class="btn px-6 py-1 btn-outline-neutral" @click="closeModal">取消</button>
              <button type="submit" class="btn px-6 py-1 btn-success">送出</button>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import type { Order, ProductItem } from '@/types/order';
import type Product from '@/types/product';
import { Modal } from 'bootstrap';
import type { VueElement } from 'vue';
import { mapActions } from 'pinia';
import productStore from '@/stores/productStore';

export default {
  props: ['order', 'formatDate'],
  emits: ['updateOrder'],
  data() {
    return {
      modal: null as null | bootstrap.Modal,
      deepCloneOrder: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: '',
        },
      } as Order,
      itemList: [] as Product[],
    };
  },
  methods: {
    openModal() {
      this.modal!.show();
    },
    closeModal() {
      this.deepCloneOrder = JSON.parse(JSON.stringify(this.order));
      (this.$refs.form as any).resetForm({
        value: {
          orderUserName: this.deepCloneOrder.user.name,
          orderUserEmail: this.deepCloneOrder.user.email,
          orderUserTel: this.deepCloneOrder.user.tel,
          orderUserAddress: this.deepCloneOrder.user.address,
        },
        touched: false,
      });
      this.modal!.hide();
    },
    updateItem(item: Product, targetId: string) {
      const target = this.deepCloneOrder.products[targetId];
      const { price } = item;
      if (target.product.id === item.id) return;
      (target.product as Product) = item;
      target.qty = 1;
      target.final_total = price * target.qty;
      target.total = price * target.qty;
      this.updateTotal();
    },
    updateQty(targetId: string) {
      const target = this.deepCloneOrder.products[targetId];
      const { price } = target.product;
      target.final_total = price * target.qty;
      target.total = price * target.qty;
      this.updateTotal();
    },
    updateTotal() {
      this.deepCloneOrder.total = Object.values(this.deepCloneOrder.products as unknown as ProductItem[]).reduce(
        (a, b) => a + b.qty * b.product.price,
        0,
      );
    },
    addNewItem(item: Product) {
      const getUniqueId = () => `-${crypto.randomUUID()} `;
      const { price, id: pid } = item;
      const uniqueId = getUniqueId();
      const obj = {
        id: uniqueId,
        product_id: pid!,
        product: item,
        qty: 1,
        final_total: price * 1,
        total: price * 1,
      };
      this.deepCloneOrder.products[uniqueId] = obj;
      this.updateTotal();
    },
    removeOrderItem(id: string) {
      this.deepCloneOrder.products = Object.fromEntries(
        Object.entries(this.deepCloneOrder.products).filter(([key]) => key !== id),
      );
      this.updateTotal();
    },
    updateOrder() {
      this.$emit('updateOrder', this.deepCloneOrder);
      this.closeModal();
    },
    ...mapActions(productStore, ['getAllProducts']),
  },
  computed: {
    productItemList(): Product[] | [] {
      return this.itemList;
    },
  },
  async mounted() {
    this.modal = new Modal(this.$refs.orderEdit as VueElement);
    const products = (await this.getAllProducts('admin')) || [];
    this.itemList = Object.values(products) as Product[];
  },
  watch: {
    order() {
      this.deepCloneOrder = JSON.parse(JSON.stringify(this.order));
    },
  },
};
</script>
<style scoped>
.itemListDropdown {
  max-width: 240px;
  @media (width < 390px) {
    max-width: 150px;
  }
}
</style>
