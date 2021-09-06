<template>
  <div>
    <h3>Booked History</h3>
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

      <tr
        v-for="requests in allRequests"
        :key="requests.reqId"
      >
        <template v-if="requests.status === 'approved'">
          <td>{{ requests.empName }}</td>
          <td>{{ requests.destination }}</td>
          <td>{{ requests.passengers }}</td>
          <td>{{ requests.travelDate }}</td>
          <td class="text-center">
            <button class="btn btn-success">
              Booked
            </button>
          </td>
        </template>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  props: ['allRequests'],
  data () {
    return {

    }
  },

  computed: {

    inftwo: function () {
      return this.allRequests.filter(i => i.status == 'approved')
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
th{
  text-align: center;
  font-weight: 400;
}
thead{
  color: white;
  background-color: rgb(31, 32, 34);
}
h3{
  margin-top: 20px;
  font-weight: bolder;
}
td{
  text-align: center;
  background-color: rgb(255, 255, 255);
}
</style>
