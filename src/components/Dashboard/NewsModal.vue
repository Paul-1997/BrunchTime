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
        <div class="modal-body">
          <QuillEditor theme="snow"></QuillEditor>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from 'bootstrap';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import type { VueElement } from 'vue';

export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      modal: null as null | bootstrap.Modal,
    };
  },
  methods: {
    openModal() {
      this.modal!.show();
    },
    closeModal() {
      this.modal!.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.NewsModal as VueElement);
  },
};
</script>
