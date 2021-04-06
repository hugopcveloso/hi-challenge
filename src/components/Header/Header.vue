<template>
  <header class="header" :class="isDarkMode ? '' : 'header__dark'">
    <div class="header__content">
      <router-link to="/" class="logo__link"
        ><h4 class="header__content--logo">Hi Jiffy</h4></router-link
      >

      <Search />
      <HeaderUser />
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "./Search";
import HeaderUser from "./HeaderUser";

export default {
  name: "Header",
  components: {
    Search,
    HeaderUser,
  },
  computed: {
    ...mapGetters(["isDarkMode"]),
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background-color: white;
  display: grid;
  place-items: center;
  border-bottom: 2px solid #ebeff2;
  .logo__link {
    text-decoration: none;
  }
  .header__content {
    width: 90vw;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    .header__content--logo {
      color: $accentblue;
      font-size: 18px;
      font-weight: 700;
      font-family: "Open sans", sans-serif;
    }
    .header__content--user {
      display: flex;
    }
  }
}
.header__dark {
  background-color: $dmodeaccentblue !important;
  border-bottom: 2px solid black;
}
</style>