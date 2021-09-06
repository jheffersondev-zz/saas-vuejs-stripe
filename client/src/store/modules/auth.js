import { API_URL } from '../../utils.json'
import axios from 'axios'

// flow: actions -> commit -> mutation -> state
export default {
  state: () => ({
    userToken: localStorage.getItem('userToken'),
    user: {},
  }),

  mutations: {
    Logout() {
      localStorage.removeItem('userToken')
    },

    UpdateLSToken(state, token) {
      state.userToken = token
      localStorage.setItem('userToken', token)
    },

    UpdateUser(state, user) {
      state.user = user
      console.log("USER CHANGED")
    },
  },

  actions: {
    SetUserToken(context, token) {
      context.commit('UpdateLSToken', token)
    },
    SetUserDetails(context, user) {
      context.commit('UpdateUser', user)
    },
    Logout(context) {
      context.commit('Logout')
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
