<template>
    <div>
      <b-alert class="ta-c" variant="danger" v-if="errorText?true:false" :show="3" @dismissed="close">
        {{errorText}}
      </b-alert>
      <b-alert class="ta-c" variant="success" v-if="successText?true:false" :show="3" @dismissed="close">
        {{successText}}
      </b-alert>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed:mapState([
    "errorText",
    "successText"
  ]),
  methods:{
    close:function(){
      this.$store.dispatch("setErrorText",null)
      this.$store.dispatch("setSuccessText",null)
    }
  }
}
</script>