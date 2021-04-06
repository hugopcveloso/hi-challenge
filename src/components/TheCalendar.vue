<template>
  <div class="main__calendar__container" id="style-3">
    <div v-for="day in $store.state.datedMeetings" :key="day.day">
      <div class="today__divider" v-if="day.today === true"></div>
      <div class="calendar__day" v-if="!day.today">{{ day.day }}</div>
      <SvgTodayMarker ref="day-ref" class="today__marker" v-if="day.today" />
      <div
        v-for="meeting in day.meetings"
        :key="meeting.id"
        class="event__container"
      >
        <div class="event">
          <p class="meeting-name" :meeting="meeting.name">
            {{ meeting.name }}
          </p>
          <p class="meeting-schedule">{{ getSchedule(meeting) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgTodayMarker from "./svgs/SvgTodayMarker";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "TheCalendar",
  components: {
    SvgTodayMarker,
  },
  methods: {
    getSchedule(meeting) {
      let startTime = moment(meeting.start_time).format("hh:mm");
      let endTime = moment(meeting.end_time).format("hh:mm A");
      return `${startTime} - ${endTime}`;
    },
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
  async created() {
    await this.$store.dispatch("setDatedMeetings");
  },
};
</script>

<style lang="scss" scoped>
.main__calendar__container {
  padding: 12px;
  max-height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    height: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: $accentblue;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: $fontlight;
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }
}

.calendar__day {
  color: #61656add;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}
.event__container {
  padding: 9px;
  background-color: $accentblue;
  color: $backgroundgrey;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  line-height: 1.4;
  margin-bottom: 8px;
  .meeting-schedule {
    margin-top: 4px;
    font-size: 12px;
  }
}
.today__divider {
  color: red;
}
</style>