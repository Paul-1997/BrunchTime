import { defineStore } from 'pinia';
import { errorAlert } from '@/composable/useAlert';
import useFetch from '@/composable/useFetch';
import Cookies from 'js-cookie';
import axios from 'axios';
import type { Admin } from '@/interface/Admin';

const userStore = defineStore('user', {
  actions: {
    async adminLogin(user: Admin) {
      const { data } = await useFetch('v2/admin/signin', 'post', false, user);
      Cookies.set('accessToken', data.token);
      return true;
    },
    async checkLogin() {
      try {
        await useFetch('v2/api/user/check', 'post', true, {});
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { message } = error.response.data as { success: boolean; message: string };

          const result = await errorAlert(message);
          if (result.isConfirmed) this.$router.push('/login');
        }
      }
    },
    async logout() {
      try {
        const { data } = await useFetch('v2/logout', 'post', true, {});
        if (data) this.$router.push('/');
      } catch (err) {
        errorAlert('伺服器出問題了');
      }
    },
  },
});

export default userStore;
