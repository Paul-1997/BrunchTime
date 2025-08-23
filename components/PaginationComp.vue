<template>
  <nav aria-label="page navigation" class="pb-6">
    <ul class="pagination flex justify-content-center">
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          :class="{ disabled: !pagination.has_pre }"
          @click.prevent="changePage(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="page in pagination.total_pages" :key="page">
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(page)"
          :class="{ onActive: pagination.current_page === page }"
          >{{ page }}</a
        >
      </li>
      <li class="page-item">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          :class="{ disabled: !pagination.has_next }"
          @click.prevent="changePage(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
  props: ['pagination'],
  methods: {
    changePage(page: number) {
      if (page === this.pagination.current_page) return;
      this.$emit('updatePage', page);
    },
  },
};
</script>
