const API_URI = "http://localhost:3000"
import axios from 'axios';

// flow: actions -> commit -> mutation -> state

export default {
  state: () => ({
    userToken: localStorage.getItem("userToken")
  }),

  mutations: { 
    Logout(){
      localStorage.removeItem("userToken");
    },

    UpdateLSToken(state, token){
      state.userToken = token;
      localStorage.setItem("userToken", token)
    },

  },

  actions: { 
    SetUserToken(context, token){
      context.commit("UpdateLSToken", token)
    },
    Logout(context){
      context.commit("Logout");
    },
    Login(context, {email, password}){
      return new Promise((resolve, reject) => {

        axios.post(`${API_URI}/login`, {
          email,
          password
        })
        .then((res) => {
        // context.commit('LoginSuccess');
          return resolve(res)
        })
        .catch((err) => {
          //context.commit('LoginError');
          return reject(err)
        })
      })
    }, 

    SignUp(context, {
      name, 
      email, 
      password
    }){
      return new Promise((resolve, reject) => {
        axios.post(`${API_URI}/signup`, {
          name, 
          email, 
          password
        })
        .then((res) => {
          // context.commit('SignupSuccess');
            return resolve(res)
          })
          .catch((err) => {
            //context.commit('SignupError');
            return reject(err)
          })
      })
    }
  },

  getters: {
    $GetToken(state){
      return state.userToken
    }
  }
}