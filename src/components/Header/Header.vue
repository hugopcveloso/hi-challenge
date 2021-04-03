<template>
  <header class="header">
    <div class="header__content">
      <h4 class="header__content--logo">Hi Jiffy</h4>
      <Search />
      <HeaderUser />
    </div>
  </header>
</template>

<script>
import Search from "./Search";
import HeaderUser from "./HeaderUser";
export default {
  name: "Header",
  components: {
    Search,
    HeaderUser,
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
</style>