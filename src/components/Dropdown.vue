<template>
  <div class="select__container" v-if="type === 'company'">
    <p class="current_label">{{ $store.state.selectedCompany }}</p>
    <select
      :class="isDarkMode ? '' : 'select__dark'"
      class="selector"
      v-model="getCompaniesComputed"
    >
      <option
        class="select__item"
        v-for="(option, index) in getCompanies"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </select>
  </div>

  <div class="select__container" v-else>
    <p class="current_label-dark">Show</p>
    <p class="current_label">{{ getLimit }}</p>
    <p class="current_label">per page</p>
    <select
      class="selector"
      :class="isDarkMode ? '' : 'select__dark'"
      v-model="getLimitedClients"
    >
      <option
        class="select__item"
        v-for="(option, index) in getLimits"
        :value="option"
        :key="index + 1"
        :selected="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SvgCaretDown from "./svgs/SvgCaretDown";
export default {
  components: {
    SvgCaretDown,
  },
  props: {
    type: String,
  },
  computed: {
    ...mapGetters(["getCompanies", "getLimit", "isDarkMode"]),
    getLimits() {
      let limits = [5, 8, 10, 15, 20];
      return limits;
    },
    getCompaniesComputed: {
      get() {
        return this.getCompanies;
      },
      set(event) {
        this.$store.dispatch("fetchClientsByCompany", event);
      },
    },
    getLimitedClients: {
      get() {
        return this.getLimit;
      },
      set(event) {
        this.$store.dispatch("selectLimit", event);
      },
    },
  },
};
</script>


<style lang="scss" scoped>
select {
  display: block;
}
.current_label {
  margin-left: 6px;
  font-size: 12px;
  color: $accentblue;
}
.select__dark {
  background: $dmodebackground !important;
}
.selector {
  font-size: 12px;
  background: #f5f6f8;
  box-shadow: none !important;
  border: none;
  outline: none;
  font-family: "Poppins", sans-serif;
  box-shadow: none;
  color: $accentblue;
  width: 15px;
  * {
    color: $fontdark;
    background-color: #f5f6f8;
    border: none;
  }
}
.select__container {
  display: flex;
  align-items: center;
}
</style>