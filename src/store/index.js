import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    clients: [],
    showCalendarModal: false,
  },
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
    SHOW_MODAL(state) {
      state.showCalendarModal = !state.showCalendarModal
    }
  },
  actions: {
    fetchClients({commit}) {
      axios.get('http://localhost:1337/clients')
      .then((response) => {
        console.log(response.data)
        commit('SET_CLIENTS', response.data)
      })
      .catch((err) => console.log(err))
    },
    showModal({commit}) {
      commit('SHOW_MODAL')
    }
  },
  modules: {
  }
})
