import jwt_decode from "jwt-decode";
import { API_URL } from '../../config.json'
import axios from 'axios'

// flow: actions -> commit -> mutation -> state
export default {
  state: () => ({
    userToken: localStorage.getItem('userToken'),
    user: {},
  }),

  mutations: {
    CloseSession(state) {
      localStorage.removeItem('userToken')
      state.user = {}
    },

    UpdateLSToken(state, token) {
      state.userToken = token
      state.user = jwt_decode(token)
      localStorage.setItem('userToken', token)
    },

    UpdateUser(state, user) {
      state.user = user
    },

    UpdateSubscription(state, newSubId) {
      state.user.stripe.stripeSubscriptionId = newSubId
      console.log("Updated")
      console.log(state.user.stripe.stripeSubscriptionId)
    }
  },

  actions: {
    SetUserToken(context, token) {
      context.commit('UpdateLSToken', token)
    },
    SetUserDetails(context, user) {
      context.commit('UpdateUser', user)
    },
    Logout(context) {
      context.commit('CloseSession')
    },
    Login(context, { email, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_URL}/login`, {
            email,
            password,
          })
          .then(res => {
            // context.commit('LoginSuccess');
            return resolve(res)
          })
          .catch(err => {
            //context.commit('LoginError');
            return reject(err)
          })
      })
    },
    SignUp(context, { name, email, password }) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${API_URL}/signup`, {
            name,
            email,
            password,
          })
          .then(res => {
            // context.commit('SignupSuccess');
            return resolve(res)
          })
          .catch(err => {
            //context.commit('SignupError');
            return reject(err)
          })
      })
    },
    SubscriptionChange(context, newSubId){
      context.commit("UpdateSubscription", newSubId)
    }
  },

  getters: {
    $GetToken(state) {
      return state.userToken
    },
    $GetUser(state) {
      return state.user
    },
  },
}
