<template>
  <table>
    <thead>
      <tr>
        <th class="column column__check"><CheckIcon /></th>
        <th class="column column__name">Name</th>
        <th class="column column__email">Email</th>
        <th class="column column__company">Company name</th>
        <th class="column column__role">Role</th>
        <th class="column column__recent">Recent Activity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in $store.state.clients" :key="client.id">
        <td class="column column__check">
          <CheckIcon />
        </td>
        <td @click="$store.dispatch('showModal')" class="column column__name">
          {{ client.name }}
        </td>
        <td @click="$store.dispatch('showModal')" class="column column__email">
          {{ client.email }}
        </td>
        <td
          @click="$store.dispatch('showModal')"
          class="column column__company"
        >
          {{ client.company }}
        </td>
        <td @click="$store.dispatch('showModal')" class="column column__role">
          {{ client.role }}
        </td>
        <td @click="$store.dispatch('showModal')" class="column column__recent">
          {{ recentDate(client) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CheckIcon from "./CheckIcon";
export default {
  name: "Table",
  components: {
    CheckIcon,
  },

  methods: {
    recentDate(client) {
      console.log(client.meetings[0]?.end_time);
      let options = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      if (!client.meetings[0]) {
        return "-";
      }
      let date = new Date(client.meetings[0]?.end_time);

      return date.toLocaleDateString("en-US", options);
    },
  },

  async created() {
    await this.$store.dispatch("fetchClients");
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 90vw;
  background-color: white;
  .column {
    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid $fontlight;
    border-radius: 4px;
    height: 48px;
    font-size: 13px;
    vertical-align: middle;
    font-family: "Poppins", sans-serif;
  }
  td {
    font-weight: 400;
    color: $fontlight;
  }
  .column__check {
    width: 5%;
  }
  .column__name {
    width: 15%;
  }
  .column__email {
    width: 20%;
  }
  .column__company {
    width: 15%;
  }
  .column__role {
    width: 15%;
  }
  .column__recent {
    width: 20%;
  }

  thead {
    th {
      text-align: left;
      border-bottom: 1px solid lightgrey;
      border-radius: 4px;
      height: 48px;
      vertical-align: middle;
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      opacity: 0.5;
      color: #334d6e;
    }
  }
}
</style>