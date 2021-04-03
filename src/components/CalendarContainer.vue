<template>
  <transition name="pop" appear>
    <div class="calendar__wrapper">
      <div class="calendar__header">
        <div class="calendar__header--left">
          <h3>CALENDAR</h3>
          <div class="select-date">
            {{ getDate }}
            <svg
              width="7"
              height="3"
              viewBox="0 0 7 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 3L0.468911 -9.41288e-08L6.53109 4.35844e-07L3.5 3Z"
                fill="#AEAEAE"
              />
            </svg>
          </div>
        </div>
        <div class="calendar__header--right">
          <div>big screen</div>
          <div>close modal</div>
        </div>
      </div>
      <div class="calendar__subheader">
        <div>Today</div>
        <div>...</div>
      </div>
      <div class="calendar__body">
        <h1>Calendar Feature</h1>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Calendar Container",
  methods: {},
  computed: {
    getDate: () => {
      let options = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };

      return new Date().toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar__wrapper {
  padding: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 400px;
  margin: 0 auto;
  z-index: 99;
  display: block;
  width: 340px;
  background: #f6f7f8;
  box-shadow: 0px 25px 65px rgba(4, 111, 226, 0.5);
  border-radius: 8px;
}

.calendar__header {
  display: flex;
  justify-content: space-between;
  .calendar__header--left {
    h3 {
      font-size: 10px;
      font-family: "Poppins", sans-serif;
      color: $fontlight;
    }
    .select-date {
      margin-top: 5px;
      font-size: 14px;
      display: flex;
      align-items: center;
      svg {
        margin-left: 5px;
        transform: scale(1.2);
      }
    }
  }
  .calendar__header--right {
    display: flex;
  }
}

.calendar__subheader {
  display: flex;
  justify-content: space-between;
}

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
    width: 0;
    height: 0px;
  }
  to {
    opacity: 1;
    width: 340px;
    height: auto;
  }
}
</style>