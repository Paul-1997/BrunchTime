<template>
  <Teleport to="body">
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="deleteModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="deleteModalLabel" class="modal-title font-semibold">
              確定要刪除 <span class="font-semibold fs-xl text-danger">{{ title }}</span> 嗎 ?
            </h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-neutral">此操作無法回復，請小心注意!</p>
          </div>
          <div class="modal-footer py-2">
            <button type="button" class="btn px-6 py-1 btn-outline-neutral" @click="closeModal">取消</button>
            <button type="button" class="btn px-6 py-1 btn-danger" @click="deleteTarget">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { Modal } from 'bootstrap';
import type { VueElement } from 'vue';

export default {
  props: ['title', 'targetId'],
  emits: ['deleteTarget'],
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
    deleteTarget() {
      this.$emit('deleteTarget', this.targetId);
      this.closeModal();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.deleteModal as VueElement);
  },
};
</script>
