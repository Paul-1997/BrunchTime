import { defineStore } from 'pinia';
import useFetch from '@/composable/useFetch.ts';
import useAlert from '@/composable/useAlert.ts';
import Cookies from 'js-cookie';
import axios from 'axios';
import type { Admin } from '@/interface/Admin.ts';

const userStore = defineStore('user', {
  actions: {
    async adminLogin(user: Admin) {
      console.log('收到了');
      const { data } = await useFetch('v2/admin/signin', 'post', false, user);
      Cookies.set('accessToken', data.token);
      return true;
    },
    async checkLogin() {
      try {
        const { data } = await useFetch('v2/api/user/check', 'post', true, {});
        if (data.success) {
          useAlert({});
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const { message } = error.response.data as { success: boolean; message: string };
          const result = await useAlert({
            title: message,
            icon: 'error',
            allowOutsideClick: false,
          });

          if (result.isConfirmed) {
            this.$router.push('/login');
          }
        }
      }
    },
  },
});

export default userStore;
