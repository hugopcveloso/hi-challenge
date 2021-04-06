<template>
  <main :class="isDarkMode ? '' : 'dark__main__area'">
    <TableHeader />
    <Table />
    <Pagination class="pagination-component" />
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="$store.state.showCalendarModal"
        @click="$store.state.showCalendarModal = false"
      ></div>
    </transition>
    <CalendarContainer v-if="$store.state.showCalendarModal" />
  </main>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "./Table";
import TableHeader from "./TableHeader";
import CalendarContainer from "./CalendarContainer";
import Pagination from "./Pagination";
export default {
  name: "TheCalendar",
  components: {
    Table,
    TableHeader,
    CalendarContainer,
    Pagination,
  },
  computed: {
    ...mapGetters(["isPaginationDisabled"]),
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  background: rgba(35, 90, 148, 0.32);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  transition: all 0.5s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  animation: appear 0.5s;
}
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dark__main__area {
  th,
  td,
  span,
  div {
    color: $dmodefontlight !important;
  }
}
</style>