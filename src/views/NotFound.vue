<template>
  <div class="wrapper bg-primary bg-opacity-50">
    <div class="page-not-found p-4 p-md-10">
      <h1 class="fs-3xl fs-md-5xl fw-bold text-secondary mb-6">404 Page Not Found</h1>
      <div class="d-flex flex-column flex-md-row justify-content-center align-items-center gap-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="sadSvg">
          <path
            d="M8 11V9a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm7 1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1zm8 0A11 11 0 1 1 12 1a11.013 11.013 0 0 1 11 11zm-2 0a9 9 0 1 0-9 9 9.01 9.01 0 0 0 9-9zm-4 5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1 4 4 0 0 1 4-4h2a4 4 0 0 1 4 4zm-2.269-1A2 2 0 0 0 13 15h-2a2 2 0 0 0-1.731 1z"
          />
        </svg>
        <p class="fs-3xl text-secondary mb-6">很抱歉，未找到你搜尋的頁面</p>
      </div>
      <button
        type="button"
        class="btn btn-primary text-secondary w-fit d-block mx-auto px-10"
        @click="$router.push('/')"
      >
        返回首頁
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  place-content: center;
  min-height: 100vh;
}
.page-not-found {
  margin-inline: 1rem;
  border-radius: 2rem;
  outline: var(--bs-accent) 8px solid;
}
.sadSvg {
  max-height: 248px;
  fill: var(--bs-accent);
}
</style>
