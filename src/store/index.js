import axios from 'axios'
import { createStore } from 'vuex'
import moment from 'moment'



const moduleA = {
  state: () => ({
    test:''
  }),
  mutations: {},
  actions: {},
  getters: {},
  
}




export default createStore({
  state: {
    clients: [],
    showCalendarModal: false,
    meetings: [],
    datedMeetings: [],
    searchTerm: '',
    selectedClients: [],
    clientLimit: 5,
    currentPage: 1,
    selectedCompany: 'All',
    darkMode: true,
  },

  // MUTATIONS

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
    SET_DATED_MEETINGS(state, datedMeetings) {
      state.datedMeetings = datedMeetings
    },
    SET_SEARCH_TERM(state, searchTerm) {
      state.searchTerm = searchTerm
    },
    SET_SELECTED_CLIENTS(state, clients) {
      state.selectedClients = clients
    },
    SET_CLIENT_LIMIT(state, clientLimit) {
      state.clientLimit = clientLimit
    },
    SET_CURRENT_PAGE(state, direction) {
      (direction ? state.currentPage++ : state.currentPage--) 
    },
    SET_SELECTED_COMPANY(state, company) {
      state.selectedCompany = company
    },
    SET_CLIENTS_BY_COMPANY(state, clients){
      state.clients = clients
    },
    RESET_ALL_FILTERS(state) {
      state.searchTerm = []
      state.selectedCompany = 'All'
    },
    SET_DARK_MODE(state) {
      state.darkMode = !state.darkMode
    }
  },

  // ACTIONS

  actions: {
    fetchClients({commit}, searchTerm = '') {
      // Goal: Build the querystring
      const paginationLimit = this.state.clientLimit
      const paginationStart = this.state.currentPage === 1 ? 0 : (this.state.currentPage - 1) * paginationLimit
      const queryString = `${process.env.VUE_APP_API_URL}/clients?name_contains=${searchTerm}&_limit=${paginationLimit}&_start=${paginationStart}`
      commit('SET_SEARCH_TERM', searchTerm)
      axios.get(queryString)
      .then((response) => {
        commit('SET_CLIENTS', response.data)
      })
      .catch((err) => console.log(err))
    },
    resetFilters({commit}) {
      commit('RESET_ALL_FILTERS')
    },
    paginateTo({commit , dispatch}, direction) {
      const checkIfLastPage = this.state.clients.length >= this.state.clientLimit
      if(direction === 'prev' && this.state.currentPage !== 1 ) { 
        commit('SET_CURRENT_PAGE', false)
        dispatch('fetchClients')
      }else if (direction === 'next' && checkIfLastPage) {
        commit('SET_CURRENT_PAGE', true)
        dispatch('fetchClients')
      }
    },
    fetchClientsByCompany({commit}, newCompany) {
      let filterCompany;
      if (newCompany === 'All') {
        filterCompany = ''
      } else {
        filterCompany = newCompany
      }
      axios.get(`${process.env.VUE_APP_API_URL}/clients?_where[company_contains]=${filterCompany}`)
      .then((response) => {
        commit('SET_SELECTED_COMPANY', newCompany)
        commit('SET_CLIENTS_BY_COMPANY', response.data)
      }).catch((err)=> console.log(err))
    },

    openCalendar({commit}) {
      commit('SHOW_MODAL')
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
      //Sort the array by date with the TodayObj inside. 
      const sortedDays = datedMeetings.sort((a,b) => {
        return  new Date(a.datetime) - new Date(b.datetime)
      })
      commit('SET_DATED_MEETINGS', sortedDays )
    },
    selectClients({commit}, clickedClient) {
      let newSelected = [...this.state.selectedClients]
      if (this.state.selectedClients.includes(clickedClient)) {
        newSelected.splice(newSelected.indexOf(clickedClient), 1)
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
      commit('SET_SELECTED_CLIENTS', newSelectedClients )
    },
    selectLimit({commit, dispatch}, newLimit) {
      commit('SET_CLIENT_LIMIT', newLimit)
      commit('RESET_ALL_FILTERS')
      dispatch('fetchClients')
    },
    toggleDarkMode({commit}) {
      commit('SET_DARK_MODE')
    }
  },
  // GETTERS
  getters: {
    getAllClients: (state) => {
      return state.clients
    },
    areAllClientsSelected: (state) => {
      return ( state.selectedClients.length === state.clients.length  && state.clients.length > 0);
    },
    isClientSelected: (state) => (client) => {
      return state.selectedClients.includes(client)
    },
    isDisabled: (state) => (direction) => {
      const checkIfLastPage = state.clients.length >= state.clientLimit ? true : false
      if(direction === 'prev' && state.currentPage !== 1 ) {
        return true
      }
      if (direction === 'next' && checkIfLastPage) {
        return  true
      }
      return false;
    },
    getCompanies: (state) => {
      let getCompanies = state.clients.map((el)=> {
        return el.company
      })
      let uniqueCompanies = [...new Set(getCompanies)];
      return ['All', ...uniqueCompanies]
    },
    getLimit: (state)=> {
      return state.clientLimit
    },
    isDarkMode: (state) => {
      return state.darkMode
    }
  },
  modules: {
  }
})
