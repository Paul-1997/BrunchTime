<template>
  <Teleport to="body">
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
              {{ product.id ? '編輯產品' : '新增產品' }}
            </h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <VeeForm ref="form" v-slot="{ errors }" @submit="emitUpdate">
            <div class="modal-body d-flex flex-column flex-lg-row gap-4">
              <!-- product image -->
              <div class="col-lg-4 col-12 d-flex flex-column">
                <div class="border rounded border-neutral mb-3">
                  <img :src="deepCloneProduct.imageUrl" alt="" class="product__mainImage" />
                </div>
                <div class="productImageGroup mb-5">
                  <template v-for="(image, i) in deepCloneProduct.imagesUrl" :key="image">
                    <img
                      :src="image"
                      :alt="`productImages${i + 1}`"
                      class="border border-neutral rounded"
                      v-if="image !== ''"
                    />
                    <img src="/not-found.png" class="border border-neutral rounded" alt="" v-else />
                  </template>
                </div>
                <div>
                  <div class="form-group mb-2 border border-info border-2 p-2 rounded">
                    <label for="editMainImage" class="form-label">主圖</label>
                    <input type="text" class="form-control" id="editMainImage" v-model="deepCloneProduct.imageUrl" />
                  </div>
                  <hr class="my-1" />
                  <template v-for="(images, index) in deepCloneProduct.imagesUrl" :key="index + '.' + images">
                    <div class="form-group mb-2 border border-natural-light border-2 p-2 rounded">
                      <label :for="'moreImg' + index" class="form-label d-flex"
                        >圖片{{ index + 1 }}
                        <span
                          class="btn btn-close align-middle ms-auto"
                          @click="deepCloneProduct.imagesUrl!.splice(index, 1)"
                        ></span
                      ></label>

                      <input
                        type="text"
                        class="form-control"
                        :value="deepCloneProduct.imagesUrl![index]"
                        @input="handleImgGroupInput(($event.target as HTMLInputElement).value, index)"
                      />
                    </div>
                    <hr class="my-1" />
                  </template>
                  <button type="button" class="btn btn-success btn-sm" @click="addImages">
                    <!-- :disabled="isEnableAddNewImgBtn" -->
                    新增副圖
                  </button>
                </div>
              </div>
              <!-- product properties columns -->
              <div class="flex-grow-1">
                <div class="row mb-3">
                  <label for="inputProductTitle" class="col-sm-3 col-12 col-form-label"> 產品名稱 </label>
                  <div class="col-sm-9 col-12">
                    <VeeField
                      v-model="deepCloneProduct.title"
                      v-slot="{ field, meta }"
                      type="text"
                      rules="required"
                      name="productTitle"
                      label="產品名稱"
                    >
                      <input
                        id="inputProductTitle"
                        v-bind="field"
                        class="form-control border border-neutral"
                        :class="{ 'is-invalid': errors['productTitle'], 'is-valid': meta.valid && meta.touched }"
                      />
                    </VeeField>
                  </div>
                  <VeeErrorMessage name="productTitle" class="Vee__errMsg" />
                </div>
                <div class="row mb-3">
                  <label for="inputProductCategory" class="col-sm-3 col-12 col-form-label">產品種類</label>
                  <div class="col-sm-9 col-12">
                    <VeeField
                      v-model="deepCloneProduct.category"
                      v-slot="{ field, meta }"
                      type="text"
                      rules="required"
                      name="productCategory"
                      label="產品種類"
                    >
                      <input
                        id="inputProductCategory"
                        v-bind="field"
                        class="form-control border border-neutral"
                        :class="{ 'is-invalid': errors['productCategory'], 'is-valid': meta.valid && meta.touched }"
                      />
                    </VeeField>
                  </div>
                  <VeeErrorMessage name="productCategory" class="Vee__errMsg" />
                </div>
                <div class="row mb-3">
                  <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                    <label for="inputProductOriginPrice" class="col-sm-3 col-12 col-form-label">原價</label>
                    <div class="col-sm-9 col-12 input__extraFix">
                      <VeeField
                        v-slot="{ field, meta }"
                        v-model.number="deepCloneProduct.origin_price"
                        type="number"
                        rules="integer|required"
                        name="ProductOriginPrice"
                        label="原價"
                      >
                        <input
                          v-bind="field"
                          class="form-control border border-neutral"
                          :class="{
                            'is-invalid': errors['ProductOriginPrice'],
                            'is-valid': meta.valid && meta.touched,
                          }"
                          id="inputProductOriginPrice"
                          inputmode="numeric"
                        />
                      </VeeField>
                      <VeeErrorMessage name="ProductOriginPrice" class="Vee__errMsg" />
                    </div>
                  </div>
                  <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                    <label for="inputProductPrice" class="col-sm-3 col-12 col-form-label">定價</label>
                    <div class="col-sm-9 col-12 input__extraFix">
                      <VeeField
                        v-slot="{ field, meta }"
                        v-model.number="deepCloneProduct.price"
                        type="number"
                        rules="integer|required"
                        name="ProductPrice"
                        label="定價"
                      >
                        <input
                          v-bind="field"
                          class="form-control border border-neutral"
                          :class="{ 'is-invalid': errors['ProductPrice'], 'is-valid': meta.valid && meta.touched }"
                          id="inputProductPrice"
                          inputmode="numeric"
                        />
                      </VeeField>
                      <VeeErrorMessage name="ProductPrice" class="Vee__errMsg" />
                    </div>
                  </div>
                  <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                    <label for="inputProductNum" class="col-sm-3 col-12 col-form-label">數量</label>
                    <div class="col-sm-9 col-12 input__extraFix">
                      <VeeField
                        v-slot="{ field, meta }"
                        v-model.number="deepCloneProduct.num"
                        type="number"
                        rules="integer|required"
                        name="ProductNum"
                        label="數量"
                      >
                        <input
                          v-bind="field"
                          class="form-control border border-neutral"
                          :class="{ 'is-invalid': errors['ProductNum'], 'is-valid': meta.valid && meta.touched }"
                          id="inputProductNum"
                          inputmode="numeric"
                        />
                      </VeeField>
                      <VeeErrorMessage name="ProductNum" class="Vee__errMsg" />
                    </div>
                  </div>
                  <div class="d-flex flex-wrap col-lg-6 col-xl-3 mb-3">
                    <label for="inputProductUnit" class="col-sm-3 col-12 col-form-label">單位</label>
                    <div class="col-sm-9 col-12 input__extraFix">
                      <VeeField
                        v-slot="{ field, meta }"
                        v-model="deepCloneProduct.unit"
                        type="text"
                        rules="required"
                        name="ProductUnit"
                        label="單位"
                      >
                        <input
                          v-bind="field"
                          class="form-control border border-neutral"
                          :class="{ 'is-invalid': errors['ProductUnit'], 'is-valid': meta.valid && meta.touched }"
                          id="inputProductUnit"
                        />
                      </VeeField>
                      <VeeErrorMessage name="ProductUnit" class="Vee__errMsg" />
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
              <button type="button" class="px-6 btn btn-outline-neutral" @click="closeModal">取消</button>
              <button type="submit" class="px-6 btn btn-success">
                {{ product.id ? '編輯' : '新增' }}
              </button>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { Modal } from 'bootstrap';
import type { VueElement } from 'vue';
import type Product from '@/interface/product';
import useDebounce from '@/composable/useDebounce';

export default {
  props: ['product'],
  emits: ['updateProduct'],
  data() {
    return {
      modal: null as null | bootstrap.Modal,
      deepCloneProduct: {} as Product,
    };
  },
  methods: {
    updateImg({ imageUrl }) {
      this.deepCloneProduct.imageUrl = imageUrl;
    },
    openModal() {
      this.modal!.show();
    },
    closeModal() {
      this.modal!.hide();
      (this.$refs.form as any).resetForm();
    },
    emitUpdate() {
      const time = Date.now();
      if (!this.deepCloneProduct.createAt) this.deepCloneProduct.createAt = time;
      this.deepCloneProduct.updateAt = time;
      this.$emit('updateProduct', this.deepCloneProduct);
      this.closeModal();
    },
    addImages() {
      if (!this.deepCloneProduct.imagesUrl) this.deepCloneProduct.imagesUrl = [''];
      else {
        this.deepCloneProduct.imagesUrl = [...this.deepCloneProduct.imagesUrl, ''];
      }
    },
    doDebounce: useDebounce((t, idx, v) => {
      const target = t;
      target[idx] = v;
    }),
    handleImgGroupInput(url: string, idx: number) {
      this.doDebounce(this.deepCloneProduct.imagesUrl, idx, url);
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
.product__mainImage {
  object-fit: cover;
  min-height: 200px;
  max-height: 400px;
}
.productImageGroup {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  & > img {
    width: 100%;
    object-fit: cover;
    height: 80px;
  }
}
</style>
