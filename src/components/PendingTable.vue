<template>
  <div>
    <table>
      <tr>
        <th>Name</th>
        <th>Destination</th>
        <th>Number of people going</th>
        <th>Date of Going</th>
        <th>status</th>
      </tr>
<div v-if="infone.length===0">
  <p>No requests pending</p></div>
      <tr v-for="requests in infone" :key="requests.reqId">
        <td>{{ requests.name }}</td>
        <td>{{ requests.dest }}</td>
        <td>{{ requests.nump }}</td>
        <td>{{ requests.date }}</td>
        <td>
          <button @click="done(requests)">Approve</button>
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
    },
  },
  computed:{
      infone :function(){
         return this.requests.filter(i => i.status==false)
      }
  }
};
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
</style>