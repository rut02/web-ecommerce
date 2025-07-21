import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/user/HomeView.vue'
import CartView from '@/views/user/CartView.vue'
import Checkout from '@/views/user/Checkout.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import SuccessView from '@/views/user/SuccessView.vue'
import SearchView from '@/views/user/SearchView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'

import ProductUpdateView from '@/views/admin/product/UpdateView.vue'
import ProductListView from '@/views/admin/product/ListView.vue'

import UserUpdateView from '@/views/admin/user/UpdateView.vue'
import UserListView from '@/views/admin/user/ListView.vue'

import OrderDetailView from '@/views/admin/order/DetailView.vue'
import OrderListView from '@/views/admin/order/ListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
    },
    {
      path: '/success/:id',
      name: 'success',
      component: SuccessView,
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },



    //admin

    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardView,
      
    },
    {
      path: '/admiin/product/create',
      name: 'admin-product-create',
      component: ProductUpdateView
    },
    {
      path: '/admin/product/update/:id',
      name: 'admin-product-update',
      component: ProductUpdateView
    },
    {
      path: '/admin/products',
      name: 'admin-product-list',
      component: ProductListView
    },

    {
      path: '/admin/user/create',
      name: 'admin-user-create',
      component: UserUpdateView
    },
    {
      path: '/admin/user/update/:id',
      name: 'admin-user-update',
      component: UserUpdateView
    },
    {
      path: '/admin/users',
      name: 'admin-user-list',
      component: UserListView
    },

    {
      path: '/admin/orders',
      name: 'admin-order-list',
      component: OrderListView
    },
    {
      path: '/admin/orders/:id',
      name: 'admin-order-detail',
      component: OrderDetailView
    },

   
  ],
})

export default router
