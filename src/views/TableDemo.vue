<template>
  <!-- <m-table
    id-table="tblPlaces"//tableId -> for having different kind of table view
    restriction="o"     //restriction -> activity / query restriction ('o' for open, 'r' for restriction, 'c' for casbin rolebased)
    activity="GetUser"  //activity -> provide activityName of activity created in corestudio
                        //activity -> "query_1QMEsbbZE5l8pOoymSzgUxRo5HP" //query -> provide queryId of query created in corestudio
    msg="Table Component" //msg -> provide table header
    responsive="sm" //responsive -> to provide responsiveness 'sm/md/lg/xl'
    table-variant="success" //tableVariant -> to provide table variant (display) can have values 'success/info/danger etc.'
    foot-clone="1" //footClone -> to give the table header fields at bottom also
    striped="1" //striped -> to give css formatting to the table. For details do visit: Table style options on https://bootstrap-vue.js.org/docs/components/table/
    :fields="fields" //fields -> if provided it will shown only given and mapped fields, else it will show all fields
  /> -->

  <!-- Sample of query without parameters -->
  <m-table
    id-table="tblPlaces"
    restriction="o"
    activity="1tnTkU5kI7a4Kun9JlxkhUc1TDO"
    msg="Table Component"
    responsive="sm"
    bordered
    foot-clone
  />

  <!-- Sample of query with parameters (check commented code in data part of script section) -->
  <!-- <m-table
    id-table="tblPlaces"
    restriction="o"
    activity="query_1REWWZgEL1LR03QPfUdx3WlCKsf"
    msg="Table Component"
    responsive="sm"
    :params="params"
    bordered
    foot-clone
  /> -->

  <!-- Sample of activity without parameters -->
  <!-- <m-table
    id-table="tblPlaces"
    restriction="o"
    activity="GetEmployeeData"
    msg="Table Component"
    responsive="sm"
    result-key="GetDataValue"
    bordered
    foot-clone
  /> -->

  <!-- Sample of activity with parameters (check commented code in data part of script section) -->
  <!-- <m-table
    id-table="tblPlaces"
    restriction="o"
    activity="GetEmpData"
    msg="Table Component"
    responsive="sm"
    result-key="GetDataOneEmployee"
    :params="params"
    bordered
    foot-clone
  /> -->
</template>

<script>
// @ is an alias to /src
import MTable from '@/components/MTable.vue'

export default {
  components: {
    mTable: MTable
  },
  data () {
    return {
      // If provided, it will shown only those mapped columns. Else it will show all the fetched columns.
      // fields: [
      //   {
      //     key: 'empCode',
      //     label: 'Id',
      //     stickyColumn: true
      //   },
      //   {
      //     key: 'userName',
      //     label: 'User Name',
      //     sortable: true
      //   },
      //   {
      //     key: 'fullName',
      //     label: 'Full Name',
      //     sortable: true
      //   },
      //   {
      //     key: 'officeLocation',
      //     label: 'Office Location'
      //   }
      // ],

      // To call m-table with parameters
      // params: {
      //   'emp': {
      //     'employeeCode': '9105'
      //   }
      // }
    }
  }
}
</script>

<style lang="scss">
#login {
  .login-card {
    box-shadow: 0 0 10px #ccc;
    padding: 30px;
  }
}
</style>
