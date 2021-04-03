<template>
  <main class="home">
    <TableContainer />
  </main>
</template>

<script>
import TableContainer from "../components/TableContainer";
export default {
  name: "Home",
  components: {
    TableContainer,
  },
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  place-items: center;
}
.home {
  min-height: calc(100vh - (60px + 250px));
}
</style>
