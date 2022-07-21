import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import checkout from '../views/Checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkout
    }
  ]
})

export default router
