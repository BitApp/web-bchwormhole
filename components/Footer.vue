<template>
  <footer class="ta-c footer">
    BitApp Team @ 2018
  </footer>
</template>

<script>
import Vue from "vue"
import { mapState } from "vuex"
import cookies from "~/plugins/cookies"

export default {
  computed: Object.assign({
  },mapState([
    "lang"
  ])),
  
  methods:{
  }
}
</script>

<style scoped lang="scss">
.footer{
}
</style>
