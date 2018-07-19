<template>
  <div class="wh-page-contact ta-c">
    <div class="wechat-line mt-60 ta-c">
      <img src="~assets/imgs/wechat.jpeg" width="180">
      <div class="title mt-20">联系小助手加入虫洞交流群</div>
    </div>
    <div class="title-line mt-60 ta-c">
      <div class="title">BitApp Team</div>
      <div class="title mt-10">专注数字货币应用生态</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wh-page-contact {
  padding: 30px;
  .wechat-line{
    .title{
      font-size: 20px;
    }
  }
  .title-line{
    font-size: 16px;
  }
}
</style>

<script>
import Vue from "vue"
import utils from "~/plugins/utils"
import { mapState } from "vuex"

export default {
  head() {
    return {
      title: "联系我们"
    }
  },

  data() {
    return {
    }
  },

  asyncData({ req, app, query }) {
    return {
    }
  },

  mounted() {
  }
};
</script>

