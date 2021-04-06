<template>
  <table :class="isDarkMode ? '' : 'dark__table'">
    <thead>
      <tr>
        <th class="column column__check">
          <SvgCheckIcon
            :selected="areAllClientsSelected"
            @click="$store.dispatch('selectAllClients', getAllClients)"
          />
        </th>
        <th class="column column__name">Name</th>
        <th class="column column__email">Email</th>
        <th class="column column__company">Company name</th>
        <th class="column column__role">Role</th>
        <th class="column column__recent">Recent Activity</th>
      </tr>
    </thead>

    <tbody v-if="$store.state.clients.length === 0">
      <tr class="no_table_data">
        <p>No data to dislay . . .</p>
      </tr>
    </tbody>

    <tbody v-else>
      <tr v-for="(client, index) in $store.state.clients" :key="client.id">
        <td class="column column__check">
          <SvgCheckIcon
            :selected="isClientSelected(client)"
            @click="$store.dispatch('selectClients', client)"
          />
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__name"
        >
          <div class="circle__container">
            <svg class="circle__svg">
              <!-- <svg:style> </svg:style> -->
              <circle
                class="circle"
                cx="11"
                cy="11"
                r="11"
                :fill="colors(index)"
              />
              <text
                class="circle__letter"
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                {{ client.name[0].toUpperCase() }}
              </text>
            </svg>
          </div>
          <div class="name__container">
            {{ client.name }}
          </div>
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__email"
        >
          {{ client.email }}
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__company"
        >
          {{ client.company }}
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__role"
        >
          {{ client.role }}
        </td>
        <td
          @click="$store.dispatch('openCalendar', client.id)"
          class="column column__recent"
        >
          {{ recentDate(client) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import SvgCheckIcon from "./svgs/SvgCheckIcon";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "Table",
  components: {
    SvgCheckIcon,
  },
  methods: {
    recentDate(client) {
      if (!client.meetings[0]) {
        return "-";
      }
      let date = moment(client.meetings[0]?.end_time).format("MMM, YYYY");
      return date;
    },
    colors(index) {
      //atribuir aos clientes
      const colors = [
        "#A1A1A1",
        "#A607F0",
        "#FECA11",
        "##F5FA14",
        "#10CE51",
        "#F40000",
        "#2878B7",
        "#C2CFE0",
        ...colors,
        ...colors,
      ];
      return colors[index];
    },
  },
  computed: {
    ...mapGetters([
      "isClientSelected",
      "areAllClientsSelected",
      "getAllClients",
      "isDarkMode",
    ]),
    selectedClient(client) {
      return this.isClientSelected(client);
    },
  },

  async created() {
    await this.$store.dispatch("fetchClients");
  },
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border: 0px solid white;
  table-layout: fixed;
  width: 90vw;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  tbody {
    tr {
      border-top: 2px solid rgba(211, 211, 211, 0.312);
      height: 48px;
    }
    td {
      font-weight: 400;
      color: $fontlight;
    }
  }
  .no_table_data {
    position: absolute;
    font-family: "Poppins", sans-serif;
    color: $fontlight;
    margin-left: 30px;
    padding-top: 5px;
  }

  .column {
    border-radius: none;
    cursor: pointer;
    text-align: left;
    border-radius: 4px;
    font-size: 13px;
    vertical-align: middle;
    font-family: "Poppins", sans-serif;
    &__check {
      width: 60px;
    }
    &__name {
      width: 25%;
      .name__container {
        margin-left: 30px;
        font-weight: 500;
        font-size: 15px;
        color: #323c47;
      }
      .circle__container {
        padding-bottom: 5px;
        width: 20px;
        position: relative;
        .circle__letter {
          font-weight: bold;
          z-index: 90;
          fill: white;
        }
        .circle__svg {
          position: absolute;
          height: 22px;
          width: 22px;
        }
      }
    }
    &__email {
      width: 30%;
    }
    &__company {
      width: 15%;
    }
    &__role {
      width: 12%;
    }
    &__recent {
      width: 12%;
    }
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
.dark__table {
  background-color: $dmodeaccentblue !important;
  th {
    opacity: 0.8;
  }
  th,
  td,
  span,
  div {
    color: $dmodefontlight !important;
  }
}
</style>