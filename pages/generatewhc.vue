<template>
  <div class="wh-page-generatewhc">
    <div class="balance-line">
      <span class="fs-14 c-light">平台 BCH 余额:</span>
      <span :class="['fs-16', 'ml-3', bchbalance == 0 ? 'c-red' : '']">{{ bchbalance }} BCH</span>
    </div>

    <div class="balance-line mt-20">
      <span class="fs-14 c-light">测试 BCH 捐赠地址:</span>
      <span class="ml-3 c-green">bchtest:qzqvpextq0pd6ms3v5eee0rv37t5k8gyf5chvrd7uh</span>
    </div>

    <div class="burn-box mt-30">
      <div class="mt-10 ml-20 fw-bold">
        BCH : WHC = 1 : 100
      </div>
      <div class="d-flex ta-c flex-space-around mt-10">
        <input disabled type="number" v-model="number"/>
        <span class="fw-bold">BCH</span>
        <i class="icon iconfont icon-right"></i>
        <input disabled type="whc" v-model="whc"/>
        <span class="fw-bold">WHC</span>
      </div>
      <div class="mt-10 ml-20 c-red">
        燃烧数量不可小于一个BCH，由于测试币有限，每次燃烧只燃烧一个 BCH
      </div>
      <div class="ta-c mt-30">
        <b-button size="lg" :disabled="burned" @click="burn" variant="primary">生成WHC</b-button>
      </div>
      <div class="mt-30 ml-20">
        <div class="text" style="padding: 0px;"><p>1.测试网络中，经过3个确认后，即可获得WHC</p><p>2.BCH:WHC的比例为1:100</p><p>3.最小燃烧数量为1BCH</p><p>4.平台测试BCH有限，此功能仅供体验，请勿疯狂生成WHC</p></div>
      </div>
    </div>

    <div class="transaction-line mt-30">
      <div>交易记录:</div>
      <a v-if="trans" href="" target="_blank">{{trans}}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wh-page-generatewhc {
  padding: 30px;
  width: 70%;
  margin: 0 auto;
  .burn-box{
    background: #f5f5f5;
    padding:30px;
    span{
      line-height: 40px;
    }
    input{
      width: 300px;
      height: 40px;
      background: #dfdfdf;
      border: 1px solid #ccc;
      padding: 10px;
    }
    .icon-right{
      font-size:30px
    }
    border: 1px solid #ddd;
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
      title: "生成WHC"
    }
  },

  data() {
    return {
      bchbalance: 0,
      number: 1,
      whc: 100,
      trans: '',
      burned: false
    }
  },

  asyncData({ req, app, query }) {
    // properties
    return app.axios
    .init(req)
    .get("/api/wormhole/getbchbalance")
    .then(res => {
      if(!res.code){
        return {
          bchbalance:res.data.data
        }
      }
    }).catch(e=>{
      console.error(e)
    });
  },

  mounted(){
    this.trans = localStorage.getItem('trans')
  },

  methods: {
    burn: function(){
      const _this = this
      this.axios
      .get("/api/wormhole/bch2whc")
      .then(res => {
        if(!res.code){
          alert('燃烧成功，你已获得 100 个 WHC，请前往发行Token')
          _this.burned = true
          _this.trans = res.data
          localStorage.setItem('trans', _this.trans)
        }
      }).catch(e=>{
        console.error(e)
        _this.$store.dispatch("setErrorText", e.message)
      });
    }
  }
};
</script>

