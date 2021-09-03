<template>
  <div>
    <h3>Booked History</h3>
    <table >
      <thead >
      <tr >
        <th>Name</th>
        <th>Destination</th>
        <th>Number of people going</th>
        <th>Date of Going</th>
        <th>Status</th>
      </tr>
      </thead>

      <tr v-for="requests in inftwo" :key="requests.name">
        <td>{{ requests.name }}</td>
        <td>{{ requests.dest }}</td>
        <td>{{ requests.nump }}</td>
        <td>{{ requests.date }}</td>
        <td class="text-center">
          <button class="btn btn-success" >Booked</button>
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