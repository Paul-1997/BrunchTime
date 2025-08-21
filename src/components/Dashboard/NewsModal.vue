<template>
  <div
    class="modal fade"
    id="NewsModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="NewsModalLabel"
    aria-hidden="true"
    ref="NewsModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold fs-2xl" id="NewsModalLabel">建立文章</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <VeeForm v-slot="{ errors }" @submit="emitUpdate">
          <div class="modal-body">
            <div class="mb-5">
              <img
                :src="cloneArticle.image"
                alt="文章圖片"
                class="d-block mb-2 w-100"
                style="min-height: 200px; outline: 4px rgb(196 200 193) solid"
                v-if="cloneArticle.image !== ''"
              />
              <label for="articleImage" class="form-label fw-bold">文章圖片</label>
              <input type="text" id="articleImage" class="form-control" v-model="cloneArticle.image" />
            </div>
            <div class="mb-3">
              <label for="articleTitle" class="fw-bold form-label">文章標題</label>
              <VeeField
                v-slot="{ field, meta }"
                v-model="cloneArticle.title"
                name="article__title"
                label="文章標題"
                rules="required"
                type="text"
              >
                <input
                  v-bind="field"
                  id="articleTitle"
                  class="form-control"
                  :class="{ 'is-invalid': errors['article__title'], 'is-valid': meta.valid && meta.touched }"
                  placeholder="請輸入文章標題"
                />
              </VeeField>
              <VeeErrorMessage name="article__title" class="ps-2 Vee__errMsg" />
            </div>
            <div class="mb-3">
              <label for="articleAuthor" class="fw-bold form-label">文章作者</label>
              <VeeField
                v-slot="{ field, meta }"
                v-model="cloneArticle.author"
                name="article__author"
                label="文章作者"
                rules="required"
                type="text"
              >
                <input
                  v-bind="field"
                  id="articleAuthor"
                  class="form-control"
                  :class="{ 'is-invalid': errors['article__author'], 'is-valid': meta.valid && meta.touched }"
                  placeholder="請輸入作者名稱"
                />
              </VeeField>
              <VeeErrorMessage name="article__author" class="ps-2 Vee__errMsg" />
            </div>
            <div class="mb-3">
              <label for="articleDesc" class="form-label fw-bold">文章描述</label>
              <textarea
                type="text"
                id="articleDesc"
                class="form-control"
                v-model="cloneArticle.description"
                placeholder="請輸入描述(限50字)"
                maxlength="50"
                rows="3"
              ></textarea>
            </div>
            <div class="mb-3">
              <label for="articleTitle" class="fw-bold form-label">文章內文</label>
              <QuillEditor
                theme="snow"
                contentType="html"
                v-model:content="cloneArticle.content"
                placeholder="請輸入文章內文"
                style="min-height: 100px"
                ref="quillEditor"
                class="border border-neutral-light"
              ></QuillEditor>
              <p v-if="check__IsArticleContentEmpty" name="article__content" class="ps-2 Vee__errMsg">內文欄位必填</p>
            </div>
            <div class="mb-3 px-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input py-2 border border-neutral me-5"
                  type="checkbox"
                  role="switch"
                  id="inputIsPublic"
                  v-model="cloneArticle.isPublic"
                  style="scale: 1.5"
                />
                <label class="form-check-label" for="inputIsPublic">是否公開</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-neutral" @click="closeModal">取消</button>
            <button type="submit" class="btn btn-accent" :disabled="!cloneArticle.content">
              {{ article.id ? '編輯' : '新增' }}
            </button>
          </div>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import type { VueElement } from 'vue';
import type Article from '@/types/news';

export default {
  components: {
    QuillEditor, // 文字編輯器
  },
  props: ['article'],
  emits: ['updateNews'],
  data() {
    return {
      modal: null as null | bootstrap.Modal,
      cloneArticle: {} as Article,
    };
  },
  computed: {
    check__IsArticleContentEmpty() {
      return !this.cloneArticle?.content;
    },
  },
  methods: {
    openModal() {
      this.modal!.show();
    },
    closeModal() {
      this.modal!.hide();
    },
    emitUpdate() {
      // first create
      if (!this.cloneArticle.create_at) this.cloneArticle.create_at = Date.now();
      this.$emit('updateNews', this.cloneArticle);
      this.closeModal();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.NewsModal as VueElement);
  },
  watch: {
    article() {
      if (!this.article.id) this.cloneArticle = {} as Article;
      this.cloneArticle = JSON.parse(JSON.stringify(this.article));
    },
  },
};
</script>
