<template>
  <ol class="order-step overflow-hidden mx-auto mb-8 col-md-6 col-10 d-flex align-items-center justify-content-between">
    <li class="step d-flex align-items-center justify-content-center flex-column">
      <div class="step__icon mb-4" :class="state > 1 ? 'done' : 'current'">1</div>
      <div class="step__text">確認訂單</div>
    </li>
    <li class="step d-flex align-items-center justify-content-center flex-column">
      <div class="step__icon mb-4" :class="{ current: state > 1, done: state > 2 }">2</div>
      <div class="step__text">填寫資訊</div>
    </li>
    <li class="step d-flex align-items-center justify-content-center flex-column">
      <div class="step__icon mb-4" :class="{ done: state === 3 }">3</div>
      <div class="step__text">完成訂單</div>
    </li>
  </ol>
</template>

<script>
export default {
  // 根據state調整進度條顏色
  props: ['state'],
};
</script>

<style lang="scss" scoped>
$undo: var(--bs-gray-400);
$done: var(--bs-primary);
.step {
  --size: 30px;
  position: static;
  z-index: 1;
  &__icon {
    position: static;
    background-color: $undo;
    aspect-ratio: 1;
    height: var(--size);
    border-radius: 50%;
    display: grid;
    place-content: center;
  }
}
.step:not(:last-child) > .step__icon::after {
  z-index: 0;
  width: calc(100% / 2 - var(--size) - 20px);
  margin-left: var(--size);
  content: '';
  position: absolute;
  top: calc(var(--size) / 2 - 2.5px);
  height: 5px;
  background-color: $undo;
}
.step:not(:last-child) > .step__icon.done::after {
  background-color: $done;
}
:where(.current, .done) {
  background-color: $done !important;
}
@media (width > 767px) {
  .step {
    --size: 50px;
  }
}
</style>
