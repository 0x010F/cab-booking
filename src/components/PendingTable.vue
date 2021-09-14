<template>
  <div>
    <h3 style="font-weight: bolder">
      Pending Request
    </h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Destination</th>
          <th>Total Passengers</th>
          <th>Date of Travel</th>
          <th>Status</th>
          <th>Approval Status</th>
        </tr>
      </thead>
      <div v-if="pendingRequests.length === 0">
        <h3 class="noneLeft">
          No requests pending
        </h3>
      </div>
      <tr
        v-for="request in pendingRequests"
        :key="request._id"
      >
          <td>{{ request.empName }}</td>
          <td>{{ request.destination }}</td>
          <td>{{ request.passengers }}</td>
          <td>{{ request.travelDate }}</td>
          <td>{{ request.status }}</td>

          <td class="text-center">
            <button
              class="btn btn-success m-1"
              @click="Approve(request)"
            >
              Approve
            </button>
            <button
              class="btn btn-danger m-1"
              @click="Reject(request)"
            >
              Reject
            </button>
          </td>
      </tr>
    </table>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'

export default {
  name: 'Admin',
  props: ['allRequests'],

  methods: {
    Approve: function (rq) {
      new MQL()
        .setActivity('o.[UpdateCarRequest]')
        .setData({
          'id': rq._id,
          'empName': rq.empName,
          'desination': rq.desination,
          'halt': rq.halt,
          'passengers': rq.passengers,
          'phone': rq.phone,
          'pickup': rq.pickup,
          'programName': rq.programName,
          'remarks': rq.remarks,
          'travelDate': rq.travelDate,
          'status': 'approved'
        })
        .fetch()
        .then(rs => {
          // let res = rs.getActivity('UpdateCarRequest', true)
          // console.log("Response", res)
          this.$emit("set-requests")
        })
    },
    Reject: function (rq) {
      new MQL()
        .setActivity('o.[DeleteCarRequest]')
        .setData(
          {
            '_id': rq._id
          }
        )
        .fetch()
        .then(rs => {
          let res = rs.getActivity('DeleteCarRequest', true)
          // this.allRequests=res
          this.$emit('delete-request', rq._id)
        })
    }
  },
  computed: {
    pendingRequests: function () {
      return this.allRequests.filter(r => r.status === 'pending')
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
.noneLeft{
  color:red;
}
thead {
  color: white;
  background-color: rgb(31, 32, 34);
}
th {
  text-align: center;
  font-weight: 400;
}
td {
  text-align: center;
  background-color: rgb(255, 255, 255);
}
</style>
