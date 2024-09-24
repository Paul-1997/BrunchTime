import { createRouter, createWebHashHistory } from 'vue-router';
import ClientView from '@/views/Client/ClientView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'onActiveLink',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/AdminLogin.vue'),
    },
    // frontend
    {
      path: '/',
      name: 'base',
      component: ClientView,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/Client/HomeView.vue'),
        },
        {
          path: 'aboutUs',
          name: 'about',
          component: () => import('../views/Client/AboutView.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/Client/ProductsView.vue'),
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('../views/Client/NewsView.vue'),
        },
        {
          path: 'news/:id',
          name: 'newDetail',
          component: () => import('../views/Client/NewDetail.vue'),
        },
      ],
    },

    // dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard/DashboardView.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/Dashboard/DashboardView.vue'),
        },
        {
          path: 'products',
          component: () => import('../views/Dashboard/AdminProductsView.vue'),
        },
        {
          path: 'articles',
          component: () => import('../views/Dashboard/AdminArticlesView.vue'),
        },
        {
          path: 'Orders',
          component: () => import('../views/Dashboard/AdminOrdersView.vue'),
        },
        {
          path: 'Coupons',
          component: () => import('../views/Dashboard/AdminCouponsView.vue'),
        },
      ],
    },
  ],
});

export default router;
