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
          path: 'product/:id',
          name: 'productDetail',
          component: () => import('../views/Client/ProductDetail.vue'),
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
        {
          path: 'carts',
          name: 'carts',
          component: () => import('../views/Client/CartView.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/Client/OrderView.vue'),
        },
        {
          path: 'order/:id',
          name: 'success',
          component: () => import('../views/Client/OrderSuccess.vue'),
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
          component: () => import('../views/Dashboard/AdminNewsView.vue'),
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

    // not found Redirect
    {
      path: '/NotFound',
      name: 'not_found',
      component: () => import('../views/NotFound.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // 通配符路由
      redirect: '/NotFound', // 访问不存在的路径时重定向到 NotFound 页面
    },
  ],
});

export default router;
