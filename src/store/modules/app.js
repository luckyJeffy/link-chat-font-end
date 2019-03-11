const app = {
  state: {
    interest: [],
    language: 'en_US'
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
    },
    SET_INTEREST: (state, interest) => {
      state.interest = interest
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setInterest({ commit }, interest) {
      commit('SET_INTEREST', interest)
    }
  }
}

export default app
