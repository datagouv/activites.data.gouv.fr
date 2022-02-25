import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const BASE_URL = 'https://object.files.data.gouv.fr/opendata/datagouv/dashboard'

export default new Vuex.Store({
  state: {
    promises: {},
    data: {},
    selectedPeriode:"monthly"
  },
  actions: {
    getData ({ commit, state }, indicator) {
      if (state.promises[indicator]) {
        return state.promises[indicator]
      }
      const url = `${BASE_URL}/${indicator}.json`
      const promise = fetch(url).then(res => {
        return res.json()
      }).then(data => {
        commit('setData', { indicator: indicator, data: data })
        return data
      })
      commit('setPromise', { indicator: indicator, promise: promise })
      return promise
    }
  },
  mutations: {
    setPromise (state, payload) {
      state.promises[payload.indicator] = payload.promise
    },
    setData (state, payload) {
      state.data[payload.indicator] = payload.data
    },
    setPeriode (state, periode) {
      state.selectedPeriode = periode
    }
  }
})
