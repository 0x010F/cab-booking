<template>
  <div>
    <h3 style="font-weight: bolder;">Pending Request</h3>
    <table>
      <thead >
      <tr>
        <th>Name</th>
        <th>Destination</th>
        <th>Number of people going</th>
        <th>Date of Going</th>
        <th>Status</th>
      </tr>
      </thead>
<div v-if="infone.length===0">
  <p>No requests pending</p></div>
      <tr v-for="requests in infone" :key="requests.reqId">
        <td>{{ requests.name }}</td>
        <td>{{ requests.dest }}</td>
        <td>{{ requests.nump }}</td>
        <td>{{ requests.date }}</td>
        <td class="text-center">
          <button class="btn btn-success mx-1" @click="done(requests)">Approve</button>
          <button class="btn btn-danger mx-1" @click="reject(requests)">Reject</button>
        </td>
      </tr>
    </table>
   
  </div>
</template>

<script>
export default {
  name: "Admin",
  props:["requests"],
 
  methods: {
    done: function (par) {
      par.status = true;
    }
  },
  computed:{
      infone :function(){
        console.log(this.requests);
         return this.requests.filter(i => i.status==false)
      }
  }
}
</script>

<style scoped>
table {
  width: 100%;
}
thead{
  color: white;
  background-color: rgb(31, 32, 34);
}
th{
  text-align: center;
  font-weight: 400;
}
td{
  text-align: center;
  background-color: rgb(255, 255, 255);
}
</style>