<template>
  <table>
    <thead>
      <tr>
        <th class="column column__check">
          <SvgCheckIcon
            :selected="areAllClientsSelected"
            @click="$store.dispatch('selectAllClients', $store.state.clients)"
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
      ];
      return colors[index];
    },
  },
  computed: {
    ...mapGetters(["isClientSelected", "areAllClientsSelected"]),
    selectedClient() {
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
  width: 90vw;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  tbody {
    tr {
      border-top: 2px solid rgba(211, 211, 211, 0.312);
    }
  }
  .no_table_data {
    position: absolute;
  }
  .column {
    cursor: pointer;
    text-align: left;

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
    width: 20%;
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
  .column__email {
    width: 20%;
  }
  .column__company {
    width: 15%;
  }
  .column__role {
    width: 10%;
  }
  .column__recent {
    width: 10%;
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