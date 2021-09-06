import { createStore } from 'vuex';
import createPersistentState from 'vuex-persistedstate';
import Auth from './modules/auth';
import Checkout from './modules/checkout';

export default createStore({
  modules: {
    Auth,
    Checkout
  },
  plugins: [
    createPersistentState()
  ]
})

