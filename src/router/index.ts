import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/FrontEnd/HomeView.vue';

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
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/FrontEnd/AboutView.vue'),
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
