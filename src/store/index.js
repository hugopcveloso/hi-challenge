import axios from 'axios'
import { createStore } from 'vuex'
import moment from 'moment'

export default createStore({
  state: {
    clients: [],
    showCalendarModal: false,
    meetings: [],
    activeClient: null,
    datedMeetings: []
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
    }
    
  },
  actions: {
    fetchClients({commit}) {
      axios.get(`${process.env.VUE_APP_API_URL}/clients`)
      .then((response) => {
        commit('SET_CLIENTS', response.data)
      })
      .catch((err) => console.log(err))
    },
    openCalendar({commit}, clientId) {
      commit('SHOW_MODAL')
      commit('SET_ACTIVE_CLIENT')
    },
    fetchMeetings({commit}, clientId) {
      axios.get(`${process.env.VUE_APP_API_URL}/meetings?_sort=end_time`)
      .then((response) => {
        commit('SET_MEETINGS', response.data)
        commit('SET_ACTIVE_CLIENT', clientId )
      })
      .catch((err)=> console.log(err))
    },
    async setDatedMeetings({commit}) {
      //Fetch already sorted array
      const meetingsResponse = await axios.get(`${process.env.VUE_APP_API_URL}/meetings?_sort=end_time`)
      .then((response) => {
        return response.data
      })
      // Goal: loop through all the meetings, and group them by day
      // adding Today to the array of days. and sorting them again
      let datedMeetings = [];
      datedMeetings.push({
        datetime: moment(Date.now()).format(),
        day: moment(Date.now()).format('ddd, Do'),
        meetings: [],
        today: true,
      });

      meetingsResponse.forEach((meeting) => {
        let last
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
 
      const sortedDays = datedMeetings.sort((a,b) => {
        return  new Date(a.datetime) - new Date(b.datetime)
      })
    
      commit('SET_DATED_MEETINGS', sortedDays )

    },
  },
  
  modules: {
  }
})
