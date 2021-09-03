<template>
  <div>
    <div>
      <h1><u>{{ msg }}</u></h1>
    </div>
    <b-table
      :striped="striped"
      :bordered="bordered"
      :borderless="borderless"
      :outlined="outlined"
      :small="small"
      :hover="hover"
      :dark="dark"
      :fixed="fixed"
      :foot-clone="footClone"
      :responsive="responsive"
      :table-variant="tableVariant"
      :id="idTable"
      :items="itemList"
      :fields="fields"
    />
    <div>
      <p>
        <u>This is a table component example</u>
      </p>
      <hr>
    </div>
  </div>
</template>

<script>
import MQL from '@/plugins/mql.js'

export default {
  name: 'MTable',
  props: {
    msg: {
      type: String,
      default: null
    },
    activity: {
      type: String,
      required: true,
      default: null
    },
    restriction: {
      type: String,
      required: true,
      default: null
    },
    params: {
      type: Object,
      default: null
    },
    resultKey: {
      type: String,
      default: null
    },
    idTable: {
      type: String,
      default: 'appTable'
    },
    items: {
      type: Array,
      default: null
    },
    fields: {
      type: Array,
      default: null
    },
    striped: Boolean,
    bordered: Boolean,
    borderless: Boolean,
    outlined: Boolean,
    small: Boolean,
    hover: Boolean,
    dark: Boolean,
    fixed: Boolean,
    footClone: Boolean,
    responsive: {
      type: String,
      default: null
    },
    tableVariant: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      itemList: []
    }
  },
  mounted () {
    this.getActivityData()
  },
  methods: {
    // call for activity specific mql
    getActivityData () {
      new MQL()
        .setActivity(this.restriction + '.[' + this.activity + ']')
        // In case params not provided it will go with empty object
        .setData(this.params || {})
        .fetch()
        .then(rs => {
          let res = rs.getActivity(this.activity, false)
          if (rs.isValid(this.activity)) {
            // Check if the request is of query type
            if ((this.activity).startsWith('query_')) {
              // Request is of query type
              this.itemList = res
            } else {
              // Request is of activity type
              this.itemList = res.result[this.resultKey || []]
            }
          } else {
            // In case there is error from server side
            rs.showErrorToast(this.activity)
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
