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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">delete</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
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
    this.modal = new Modal(this.$refs.deleteModal as VueElement);
  },
};
</script>
