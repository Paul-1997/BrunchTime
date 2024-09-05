import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'onActiveLink',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
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
