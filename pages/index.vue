<template>
  <div class="wh-index ta-c">
    <b-table striped hover 
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc" 
        :fields="fields" 
        :items="properties">
      <template slot="url" slot-scope="item">
        <a :href="item.value" target="_blank">{{item.value}}</a>
      </template>
  </b-table>
  </div>
</template>

<style lang="scss" scoped>
.wh-index {
  padding: 30px;
  width: 70%;
  margin: 0 auto;
}
</style>

<script>
import Vue from "vue"
import utils from "~/plugins/utils"
import { mapState } from "vuex"

export default {
  head() {
    return {
      title: "Token广场"
    }
  },

  data() {
    return {
      sortBy: 'propertyid',
      sortDesc: true,
      fields: {
        propertyid: {
          label: '序号'
        },
        name: {
          label: 'Token名称'
        },
        url: {
          label: '官网'
        },
        data: {
          label: '相关信息'
        }
      },
    }
  },

  asyncData({ req, app, query }) {
    // properties
    return app.axios
    .init(req)
    .get("/api/wormhole/listproperties")
    .then(res => {
      if(!res.code){
        return {
          properties:res.data.data
        }
      }
    }).catch(e=>{
      console.error(e)
    });
  },

  mounted() {
  }
};
</script>

