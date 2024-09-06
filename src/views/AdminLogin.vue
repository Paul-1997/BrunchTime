<template>
  <div class="wrap container-field">
    <div class="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <img class="mx-auto" src="/logo.png" alt="logo" style="height: 300px" />
      <h1 class="login__title mb-4 text-center text-secondary fw-bold">管理者登入</h1>
      <form id="loginForm" action="post" class="p-4 mx-auto">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="login__input form-control text-secondary"
            id="userEmail"
            placeholder="請輸入帳號"
            v-model="user.email"
          />
          <label for="userEmail" class="text-neutral">Email address</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="password"
            class="login__input form-control text-secondary"
            id="userPassword"
            placeholder="請輸入密碼"
            v-model="user.password"
          />
          <label for="userPassword" class="text-neutral">Password</label>
        </div>
        <div class="text-center mb-4">
          <button
            type="button"
            class="login__btn btn btn-primary text-secondary col-8 px-3 mb-3"
            @click.prevent="doLogin"
          >
            登入
          </button>
          <div class="backToFront">
            <RouterLink to="./" class="text-secondary">返回前台</RouterLink>
          </div>
        </div>
        <div>
          <!-- <div class="mx-auto" :class="{ loader: onLoading && errMsg === '' }">
          <p class="text-danger fs-5 text-center" v-if="errMsg">
            {{ errMsg }}
          </p>
        </div> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'pinia';
import userStore from '@/stores/user.ts';
import type { Admin } from '@/interface/Admin.ts';

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      } as Admin,
    };
  },
  methods: {
    ...mapActions(userStore, ['adminLogin']),
    async doLogin() {
      try {
        const isLogin = await this.adminLogin(this.user);
        if (isLogin) {
          console.log(this.$router);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  --secondary: rgb(132, 32, 41);
  background: linear-gradient(to bottom, rgb(254, 203, 161) 7%, rgb(243, 227, 211));
}

.login {
  &__title {
    text-shadow: 0.1rem currentColor;
  }
  &__input {
    width: min(300px, 95vw);
    box-shadow: 0 0 0.25rem var(--secondary);
  }
  &__btn:hover {
    background: #ffb066;
  }
}

.loader {
  width: 48px;
  aspect-ratio: 1;
  border-radius: 100vw;
  border: 8px solid transparent;
  border-top-color: gray;
  animation: spin 0.8s infinite linear;
}

@keyframes spin {
  to {
    rotate: 360deg;
  }
}
</style>
