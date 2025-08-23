<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item transition"><router-link to="/">首頁</router-link></li>
      <li class="breadcrumb-item transition">
        <slot name="breadcrumb-item-1"></slot>
      </li>
      <li class="breadcrumb-item transition" v-if="$route.params.id">
        <slot name="breadcrumb-item-2"></slot>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb {
  margin-top: 0.5rem;
  display: inline-flex;
  .breadcrumb-item:not(:last-child) {
    &:hover {
      color: color-mix(in oklab, var(--bs-secondary) 70%, white 30%);
    }
    &::after {
      content: '/';
      color: black;
      margin-inline: 0.25em;
    }
  }
  .breadcrumb-item:last-child {
    color: var(--bs-secondary);
  }
}
</style>
