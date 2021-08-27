import { createRouter, createWebHistory } from 'vue-router'

// pages
import Home from '../views/Home.vue'
import AutoCheckoutPlans from '../views/AutoCheckoutPlans.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/auto-checkout-plans",
    name: 'AutoCheckout',
    component: AutoCheckoutPlans
  }, 
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
