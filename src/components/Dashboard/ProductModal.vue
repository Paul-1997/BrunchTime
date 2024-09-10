<template>
  <!-- <Teleport to="body"> -->
  <div
    class="modal fade"
    id="ProductModal"
    tabindex="-1"
    aria-labelledby="ProductModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    ref="productModal"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-accent">
          <h5 class="modal-title fw-bold fs-2xl" id="ProductModalLabel">
            {{ product.id ? '新增產品' : '編輯產品' }}
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body d-flex flex-column flex-lg-row gap-4">
          <div class="col-lg-5 col-12">
            <img :src="deepCloneProduct.imageUrl" alt="" class="product__mainImage" />
          </div>
          <div class="flex-grow-1">
            <div class="row mb-3">
              <label for="inputProductTitle" class="col-sm-3 col-12 col-form-label">產品名稱</label>
              <div class="col-sm-9 col-12">
                <input
                  type="text"
                  class="form-control border border-neutral"
                  id="inputProductTitle"
                  v-model="deepCloneProduct.title"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputProductCategory" class="col-sm-3 col-12 col-form-label">產品種類</label>
              <div class="col-sm-9 col-12">
                <input
                  type="text"
                  class="form-control border border-neutral"
                  id="inputProductCategory"
                  v-model="deepCloneProduct.category"
                />
              </div>
            </div>
            <div class="row">
              <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                <label for="inputProductOriginPrice" class="col-sm-3 col-12 col-form-label">原價</label>
                <div class="col-sm-9 col-12 input__extraFix">
                  <input
                    type="number"
                    class="form-control border border-neutral"
                    id="inputProductOriginPrice"
                    v-model.number="deepCloneProduct.origin_price"
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                <label for="inputProductPrice" class="col-sm-3 col-12 col-form-label">定價</label>
                <div class="col-sm-9 col-12 input__extraFix">
                  <input
                    type="number"
                    class="form-control border border-neutral"
                    id="inputProductPrice"
                    v-model.number="deepCloneProduct.price"
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                <label for="inputProductNum" class="col-sm-3 col-12 col-form-label">數量</label>
                <div class="col-sm-9 col-12 input__extraFix">
                  <input
                    type="number"
                    class="form-control border border-neutral"
                    id="inputProductNum"
                    v-model.number="deepCloneProduct.num"
                  />
                </div>
              </div>
              <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                <label for="inputProductUnit" class="col-sm-3 col-12 col-form-label">單位</label>
                <div class="col-sm-9 col-12 input__extraFix">
                  <input
                    type="text"
                    class="form-control border border-neutral"
                    id="inputProductUnit"
                    v-model="deepCloneProduct.unit"
                  />
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputProductContent" class="col-sm-3 col-12 col-form-label">產品內容</label>
              <div class="col-sm-9 col-12">
                <textarea
                  type="text"
                  class="form-control border border-neutral"
                  id="inputProductContent"
                  placeholder="請輸入產品內容"
                  v-model="deepCloneProduct.content"
                  style="min-height: 100px"
                ></textarea>
              </div>
            </div>
            <div class="row mb-8">
              <label for="inputProductDesc" class="col-sm-3 col-12 col-form-label">產品描述</label>
              <div class="col-sm-9 col-12">
                <textarea
                  id="inputProductDesc"
                  class="form-control border border-neutral"
                  style="min-height: 150px"
                  aria-describedby="inputProductDesc"
                  v-model="deepCloneProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
            </div>
            <div class="mb-3 px-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input py-2 border border-neutral me-5"
                  type="checkbox"
                  role="switch"
                  id="inputProductIsEnable"
                  :true-value="1"
                  :false-value="0"
                  v-model="deepCloneProduct.is_enabled"
                  style="scale: 1.5"
                />
                <label class="form-check-label" for="inputProductIsEnable">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <!-- {{ deepCloneProduct }} -->
          <button type="button" class="px-6 btn btn-outline-neutral" @click="closeModal">取消</button>
          <button type="button" class="px-6 btn btn-success" @click="emitUpdate">
            {{ product.id ? '編輯' : '新增' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </Teleport> -->
</template>

<script lang="ts">
import { Modal } from 'bootstrap';
import type { VueElement } from 'vue';
import type Product from '@/interface/product.ts';

export default {
  props: ['product'],
  data() {
    return {
      modal: null as null | bootstrap.Modal,
      deepCloneProduct: {} as Product,
    };
  },
  methods: {
    openModal() {
      this.modal!.show();
    },
    closeModal() {
      this.modal!.hide();
    },
    emitUpdate() {
      this.$emit('updateProduct', this.deepCloneProduct);
      this.closeModal();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.productModal as VueElement);
  },
  watch: {
    product() {
      this.deepCloneProduct = JSON.parse(JSON.stringify(this.product));
    },
  },
};
</script>

<style scoped>
.input__extraFix {
  @media (width> 576px) {
    padding-inline-start: 6px;
  }
}
</style>
