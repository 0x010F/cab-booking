<template>
  <div>This isAdmin Page
      <PendingTable :requests="cablistp"></PendingTable>
            <ApprovedTable :requests="cablistp"></ApprovedTable>
    </div>
</template>

<script>
import PendingTable from '@/components/PendingTable.vue'
import ApprovedTable from '@/components/ApprovedTable.vue'
export default {  
  name: "Admin",
  data  () {
    return {
     cablistp: [
        {
          name: "Nachiket Digha",
          dest: "Pune",
          nump: 3,
          date: "02-09-2021",
          status: false,
          reqId:1,
        },
        {
          name: "Arjun Odedra",
          dest: "Mumbai",
          nump: 4,
          date: "04-09-2021",
          status: false,
          reqId:2,

        },
        {
          name: "Surmdra Rajput",
          dest: "Mumbai",
          nump: 5,
          date: "02-10-2021",
          status: false,
                    reqId:3,

        },
        {
          name: "Nachiket Digha",
          dest: "Pune m",
          nump: 6,
          date: "03-08-2021",
          status: false,
                    reqId:4,

        },
        {
          name: "Omkar Chorghe",
          dest: "Pune k",
          nump: 1,
          date: "01-09-2021",
          status: false,
                    reqId:5,

        },
      ],
    }
  },
  components:{
    PendingTable,
    ApprovedTable
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
</style>