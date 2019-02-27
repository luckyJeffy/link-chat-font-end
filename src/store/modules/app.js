import Cookies from 'js-cookie'

const app = {
  state: {
    interest: Cookies.get('interest') !== undefined ? JSON.parse(Cookies.get('interest')) : [],
    language: Cookies.get('language') || 'en_US',
    matchStatus: ''
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_INTEREST: (state, interest) => {
      state.interest = interest
      Cookies.set('interest', JSON.stringify(interest))
    },
    SET_MATCH_STATUS: (state, status) => {
      state.matchStatus = status
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setInterest({ commit }, interest) {
      commit('SET_INTEREST', interest)
    },
    setMatchStatus({ commit }, status) {
      commit('SET_MATCH_STATUS', status)
    }
  }
}

export default app
