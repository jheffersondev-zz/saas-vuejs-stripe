export default {
  state: () => ({
    chosenPlan: localStorage.getItem("chosenPlan")
  }),
  mutations: {
    UpdateChosenPlan(state, plan) {
      state.chosenPlan = plan
      localStorage.setItem('chosenPlan', JSON.stringify(plan))
    }
  },
  actions: {
    SetChosenPlan(context, plan){
      context.commit('UpdateChosenPlan', plan)
    }
  },
  getters: {
    $GetChosenPlan(state) {
      return state.chosenPlan
    }
  }
}