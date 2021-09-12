import { createRouter, createWebHistory } from 'vue-router'
import { isTokenExpired } from '../utils'

// pages
import Home from '../views/Home.vue'
import Checkout from '../views/Checkout.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'

import Account from '../views/Account.vue'
import AccountHome from '../components/Account/Home.vue'
import AccountHistory from '../components/Account/History.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: { requireAuth: true },
  },
  {
    path: '/account/',
    component: Account,
    meta: { requireAuth: true },
    children: [
      {
        path: '',
        component: AccountHome,
      },
      {
        path: 'history',
        component: AccountHistory,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {

  if (to.meta.requireAuth == true ) {
    if(isTokenExpired() == false){
      next()
    } else{
      next({path: "/login"})
    }
  } 
  else {
    next()
  }
})

export default router
