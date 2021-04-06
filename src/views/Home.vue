<template>
  <main class="home" :class="isDarkMode ? '' : 'dark__home'">
    <TableContainer />
  </main>
</template>

<script>
import TableContainer from "../components/TableContainer";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    TableContainer,
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home {
  min-height: calc(100vh - (60px + 250px));
}
.dark__home {
  background-color: $dmodebackground;
  th,
  td,
  option,
  span,
  div {
    color: $dmodefontlight !important;
  }
}
</style>
