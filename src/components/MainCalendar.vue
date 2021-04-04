<template>
  <div class="main__calendar__container" id="style-3">
    <div v-for="day in $store.state.datedMeetings" :key="day.day">
      <div class="today__divider" v-if="day.today === true"></div>
      <div class="calendar__day" v-if="!day.today">{{ day.day }}</div>
      <SvgTodayMarker class="today__marker" v-if="day.today" />
      <div
        v-for="meeting in day.meetings"
        :key="meeting.id"
        class="event__container"
      >
        <div class="event">
          <p>{{ meeting.client?.id === $store.state.activeClient }}</p>
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

export default {
  name: "MainCalendar",
  components: {
    SvgTodayMarker,
  },
  methods: {
    getSchedule(meeting) {
      let options = {
        hour: "numeric",
        minute: "numeric",
      };
      let startTime = new Date(meeting.start_time).toLocaleString(
        "en-US",
        options
      );
      let endTime = new Date(meeting.end_time).toLocaleString("en-US", options);
      startTime = startTime.slice(0, -2); //removing PM
      return `${startTime} - ${endTime}`;
    },
  },
  async created() {
    await this.$store.dispatch("setDatedMeetings");
  },
};
</script>

<style lang="scss" scoped>
.main__calendar__container {
  padding: 12px;
  max-height: 70vh;
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
  padding: 7px;
  background-color: $accentblue;
  color: $backgroundgrey;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  line-height: 1.3;
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