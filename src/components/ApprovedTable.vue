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

      <tr v-for="requests in inftwo" :key="requests.name">
        <td>{{ requests.name }}</td>
        <td>{{ requests.dest }}</td>
        <td>{{ requests.nump }}</td>
        <td>{{ requests.date }}</td>
        <td>
          <button @click="done(idx)">Booking</button>
        </td>
      </tr>
    </table>
   
  </div>
</template>

<script>
export default {
  name: "Admin",
  props:['requests'],
  data() {
    return {
     
    };
  },
  methods: {
    done: function (par) {
      this.requests[par].status = true;
      this.$emit("sendData",this.requests)
    },
  },
  computed:{
      
      inftwo :function(){
         return this.requests.filter(i => i.status==true)
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