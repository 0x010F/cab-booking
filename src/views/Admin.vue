<template>
  <div>
    <button class="logout btn btn-danger m-3" @click="logout">Logout</button>
    <PendingTable
      :all-requests="requests"
      @set-requests="setRequests"
      @delete-request="deleteRequest"
    />
    <ApprovedTable
      :all-requests="requests"
      @set-requests="setRequests"
      @update-request="updateRequest"
    />
  </div>
</template>

<script>
import PendingTable from '@/components/PendingTable.vue'
import ApprovedTable from '@/components/ApprovedTable.vue'
import MQL from '@/plugins/mql.js'

export default {
  name: 'Admin',
  data  () {
    return {
      requests: []
    }
  },
  components: {
    PendingTable,
    ApprovedTable
  },
  mounted () {
    this.GetAllRequests()
    // console.log('INSIDE ADMIn mounted ')
    // setInterval(() => {
    //   this.GetAllRequests()
    // }, 2000)
    // console.log(this.requests)
  },
  methods: {
    GetAllRequests () {
      new MQL()
        .setActivity('o.[query_1xcneJEpSxA9KstRDqN9frcAIbJ]')
        .setData({
          fetchId: '1xcneJEpSxA9KstRDqN9frcAIbJ'
        })
        .enablePageLoader(false)
        .fetch()
        .then(rs => {
          let res = rs.getActivity('query_1xcneJEpSxA9KstRDqN9frcAIbJ', true)
          this.requests = res
        })
    },
    deleteRequest (id) {
      this.requests = this.requests.filter(r => r._id !== id)
    },
    updateRequest (id) {
      this.requests = this.requests.filter(r => r._id !== id)
    },
    logout () {
      this.$store.dispatch('AUTH_LOGOUT')
    },
    setRequests() {
      this.GetAllRequests()
    }
  }
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.logout{
  float: right;
}
</style>
