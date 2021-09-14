<template>
  <div>
    <h3>Booked History</h3>
    <div>
      <select v-model="filterDate" class="form-select">
        <option v-for="(month, idx) in months" :key="idx" :value="idx">
          {{ month }}
        </option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Destination</th>
          <th>Number of people going</th>
          <th>Date of Going</th>
          <th>Status</th>
        </tr>
      </thead>

      <tr v-for="requests in filteredData" :key="requests.reqId">
        <td>{{ requests.empName }}</td>
        <td>{{ requests.destination }}</td>
        <td>{{ requests.passengers }}</td>
        <td>{{ requests.travelDate }}</td>
        <td class="text-center">
          <button class="btn btn-dark">Booked</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from "vue";

Vue.prototype.months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default {
  name: "Admin",
  props: ["allRequests"],
  data() {
    const date = new Date();
    return {
      filterDate: date.getMonth(),
    };
  },
  computed: {
    approvedRequests: function () {
      return this.allRequests.filter((r) => r.status === "approved");
    },
    filteredData: function () {
      // console.log(this.filterDate)
      return this.approvedRequests.filter(
        (r) => convert(r.travelDate) === this.filterDate
      );
    },
  },
};

function convert(date) {
  const ok = new Date(date);
  return ok.getMonth();
}
</script>

<style scoped>
input:focus,
input:hover {
  box-shadow: none;
}
input {
  border: 1px solid black;
}
table {
  width: 100%;
}
th {
  text-align: center;
  font-weight: 400;
}
thead {
  color: white;
  background-color: rgb(31, 32, 34);
}
h3 {
  margin-top: 20px;
  font-weight: bolder;
}
td {
  text-align: center;
  background-color: rgb(255, 255, 255);
}
</style>
