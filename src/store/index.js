import axios from 'axios'
import { createStore, storeKey } from 'vuex'
import moment from 'moment'

export default createStore({
  state: {
    clients: [],
    showCalendarModal: false,
    meetings: [],
    activeClient: null,
    datedMeetings: [],
    searchTerm: '',
    selectedClients: [],
  },
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
    SHOW_MODAL(state) {
      state.showCalendarModal = !state.showCalendarModal
    },
    SET_MEETINGS(state, meetings) {
      state.meetings = meetings
    },
    SET_ACTIVE_CLIENT(state, clientId) {
      if (state.showCalendarModal) {
        state.activeClient = clientId
      } else {
        state.activeClient = null
      }
    },
    SET_DATED_MEETINGS(state, datedMeetings) {
      state.datedMeetings = datedMeetings
    },
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    SET_SELECTED_CLIENTS(state, clients) {
      state.selectedClients = clients
    }
  },
  actions: {
    fetchClients({commit}, searchTerm = '') {
      commit('SET_SEARCH_TERM', searchTerm)
      axios.get(`${process.env.VUE_APP_API_URL}/clients?name_contains=${searchTerm}`)
      .then((response) => {
        commit('SET_CLIENTS', response.data)
      })
      .catch((err) => console.log(err))
    },
    openCalendar({commit}, clientId) {
      commit('SHOW_MODAL')
      commit('SET_ACTIVE_CLIENT')
    },
    async setDatedMeetings({commit}) {
      //Fetch already sorted array
      const meetingsResponse = await axios.get(`${process.env.VUE_APP_API_URL}/meetings?_sort=end_time`)
      .then((response) => {
        return response.data
      }).catch((err)=> console.log(err))
      // Goal: loop through all the meetings, and create a new array of "day" objects
      // Push Today to the array with of days"today:true" . and sorting them again
      let datedMeetings = [];
      datedMeetings.push({
        datetime: moment(Date.now()).format(),
        day: moment(Date.now()).format('ddd, Do'),
        meetings: [],
        today: true,
      });
      meetingsResponse.forEach((meeting) => {
        let lastDate =   moment(datedMeetings.slice(-1)[0].meetings.slice(-1)[0]?.end_time).format('ddd, Do, YY')
        let currentDate = moment(meeting.end_time).format('ddd, Do, YY')
        if (currentDate !== lastDate) {
          datedMeetings.push({
            datetime: moment(meeting.end_time).format(),    
            day: moment(meeting.end_time).format('ddd, Do'),
            meetings: [meeting],
            today: false,
          });
        } else if (currentDate === lastDate) {
          let sameDay = datedMeetings.find(( ele ) => {
            return ele.day === moment(meeting.end_time).format('ddd, Do');
          });
          sameDay.meetings.push(meeting)
        }
      });
      //sort the array by date with todayobj
      const sortedDays = datedMeetings.sort((a,b) => {
        return  new Date(a.datetime) - new Date(b.datetime)
      })
      commit('SET_DATED_MEETINGS', sortedDays )
    },
    selectClients({commit}, clickedClient) {
      let newSelected = [...this.state.selectedClients]
      if (this.state.selectedClients.includes(clickedClient)) {
        let clientIndex = newSelected.indexOf(clickedClient); 
        newSelected.splice(clientIndex, 1)
      } else {
        newSelected.push(clickedClient)
      }
      commit('SET_SELECTED_CLIENTS', newSelected)
    },
    selectAllClients({commit}, clients) {
      let newSelectedClients = [...this.state.selectedClients]
      if(newSelectedClients.length > 0) {
        newSelectedClients = []
      } else  {
        newSelectedClients = [...this.state.clients]
      }
      console.log(newSelectedClients)
      commit('SET_SELECTED_CLIENTS', newSelectedClients )
    }
  },
  getters: {
    areAllClientsSelected: (state) => {
      return ( state.selectedClients.length === state.clients.length  && state.clients.length > 0);
    },
    isClientSelected: (state) => {
      return (client) => {
      return state.selectedClients.includes(client)
      }
    }
  },
  modules: {
  }
})
