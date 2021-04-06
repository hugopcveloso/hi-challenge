<template>
  <transition name="pop" appear>
    <div class="calendar__wrapper">
      <div class="calendar__header">
        <div class="calendar__header--left">
          <h3>CALENDAR</h3>
          <div class="select-date">
            {{ getDate }}
            <SvgCaretDown class="svg-date" fill="#109cf1" />
          </div>
        </div>
        <div class="calendar__header--right">
          <SvgFullScreen class="header__svg" id="fullscreen__svg" />
          <SvgClose
            @click="$store.state.showCalendarModal = false"
            class="header__svg"
          />
        </div>
      </div>
      <div class="calendar__subheader">
        <div class="today__btn" ref="today-btn">Today</div>
        <SvgMenu class="subheader__svg" />
      </div>
      <div class="calendar__body">
        <TheCalendar />
      </div>
    </div>
  </transition>
</template>

<script>
import SvgCaretDown from "./svgs/SvgCaretDown";
import SvgFullScreen from "./svgs/SvgFullScreen";
import SvgClose from "./svgs/SvgClose";
import SvgMenu from "./svgs/SvgMenu";
import TheCalendar from "./TheCalendar";
import moment from "moment";
export default {
  name: "Calendar Container",
  components: {
    SvgCaretDown,
    SvgFullScreen,
    SvgClose,
    SvgMenu,
    TheCalendar,
  },
  computed: {
    getDate: () => {
      return moment().format("ddd, MMM Do ");
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar__wrapper {
  position: fixed;
  height: fit-content;
  top: 60px;
  left: 0;
  bottom: 60px;
  right: 0;
  margin: 0 auto;
  z-index: 99;
  display: block;
  width: 340px;
  background: #f6f7f8;
  box-shadow: 0px 25px 65px rgba(4, 111, 226, 0.5);
  border-radius: 8px;
  transition: all 0.5s linear;
}

.calendar__header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(60, 60, 60, 0.09);
  .calendar__header--left {
    h3 {
      font-size: 10px;
      font-family: "Poppins", sans-serif;
      color: $fontlight;
    }
    .select-date {
      color: $accentblue;
      margin-top: 10px;
      font-size: 15px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .svg-date {
        margin-left: 4px;
        width: 12px;
        height: auto;
        stroke-opacity: 0;
      }
    }
  }
  .calendar__header--right {
    display: flex;
    align-items: center;
    .header__svg {
      width: 15px;
      height: auto;
      fill: $fontlight;
      transition: all 0.5s ease;

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    #fullscreen__svg {
      margin-right: 25px;
    }
  }
}

.calendar__subheader {
  padding: 12px;
  display: flex;
  margin-top: 5px;

  justify-content: space-between;
  border-bottom: 1px solid rgba(14, 14, 14, 0.194);
  .today__btn {
    font-size: 13px;
    color: $accentblue;
    font-weight: 500;
  }
}

//Pop-animation
.pop-enter,
.pop-leave-to {
  opacity: 0;
}
.pop-enter-active {
  animation: popping 0.5s;
}

@keyframes popping {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>