<template>
  <div class="pagination" :class="isDarkMode ? 'dark__mode' : ''">
    <svg
      @click="$store.dispatch('paginateTo', 'prev')"
      class="pagination__arrow"
      :class="isPaginationDisabled('prev') ? '' : 'disabled'"
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.67 1.87001L9.9 0.100006L0 10L9.9 19.9L11.67 18.13L3.54 10L11.67 1.87001Z"
        fill="#D5D5D5"
      />
    </svg>
    <p
      @click="$store.dispatch('paginateTo', 'prev')"
      class="pagination__text"
      :class="isPaginationDisabled('prev') ? '' : 'disabled'"
    >
      Prev
    </p>
    <p class="pagination__current">{{ $store.state.currentPage }}</p>
    <p
      @click="$store.dispatch('paginateTo', 'next')"
      class="pagination__text"
      :class="isPaginationDisabled('next') ? '' : 'disabled'"
    >
      Next
    </p>
    <svg
      @click="$store.dispatch('paginateTo', 'next')"
      :class="isPaginationDisabled('next') ? '' : 'disabled'"
      class="pagination__arrow"
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.33 18.13L2.1 19.9L12 9.99999L2.1 0.0999938L0.330001 1.86999L8.46 9.99999L0.33 18.13Z"
        fill="#D5D5D5"
      />
    </svg>
    <div class="pagination__filter">
      <Dropdown type="limitClients" />
    </div>
  </div>
</template>

<script>
import SvgCaretDown from "./svgs/SvgCaretDown";
import { mapGetters } from "vuex";
import Dropdown from "./Dropdown";
export default {
  components: {
    SvgCaretDown,
    Dropdown,
  },
  method: {},
  computed: {
    ...mapGetters(["isPaginationDisabled", "isDarkMode"]),
    disabledClasses(direction) {
      return isPaginationDisabled(direction);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
  &__arrow {
    margin-left: 7px;
    margin-right: 7px;
    cursor: pointer;
  }
  &__text {
    font-size: 10px;
    font-weight: 400;
    margin: 10px;
    cursor: pointer;
  }
  &__current {
    font-size: 10px;
    font-weight: bold;
    line-height: 15px;
  }
  &__filter {
    width: 100%;
    position: absolute;
    display: flex;
    left: 160px;
    font-size: 12px;
    font-weight: normal;
    margin: 10px;
    .caret__down {
      margin-top: 1px;
      margin-left: 6px;
    }
  }
}
.disabled {
  cursor: text !important;
  opacity: 0.5;
}
.dark__mode {
  p {
    color: black !important;
  }
}
</style>