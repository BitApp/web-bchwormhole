<template>
  <div class="wh-page-sendtoken">
    <div class="balance-line">
      <span class="fs-14 c-light">平台 WHC 余额:</span>
      <span class="fs-16 ml-3">{{ whcbalance.balance / 1e8 }} WHC</span>
      <span v-if="whcbalance.balance == 0" class="c-red ml-5">
        <span> WHC 余额为0，请先生成WHC</span>
        <b-link class="ml-2" to="/generatewhc">去生成</b-link>
      </span>
    </div>
    <b-tabs class="mt-30">
      <b-tab title="固定Token" active>
        <div class="form-line mt-40">
        <b-form action="javascript:;">
          <b-form-group class="mt-20"
                        label="Token特性:"
                        label-size="lg"
                        horizontal
                        label-for="name-input">
                        <span>
                         <p>1.创建者拥有所有Token</p><p>2.不能增发，不能燃烧</p><p>3.不能发起众筹</p>
                        </span>
          </b-form-group>
          <b-form-group label="Token名称:"
                        label-size="lg"
                        horizontal
                        label-for="name-input">
            <b-form-input id="name-input"
                          type="text"
                          v-model="name"
                          placeholder="请填写Token名称">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Token数量:"
                        label-size="lg"
                        horizontal
                        label-for="amount-input">
            <b-form-input id="amount-input"
                          type="number"
                          v-model="amount"
                          placeholder="请填写Token数量">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Token官网:"
                        label-size="lg"
                        horizontal
                        label-for="url-input">
            <b-form-input id="url-input"
                          type="text"
                          v-model="url"
                          placeholder="请填写Token官网">
            </b-form-input>
          </b-form-group>
          <b-form-group label="描述:"
                        label-size="lg"
                        horizontal
                        label-for="desc-input">
            <b-form-input id="desc-input"
                          type="text"
                          maxlength="30"
                          v-model="desc"
                          placeholder="请填写Token描述">
            </b-form-input>
          </b-form-group>
          <b-form-group label="手续费:"
                        label-size="lg"
                        horizontal
                        label-for="fee-input">
            <b-form-input id="fee-input"
                          disabled
                          type="text"
                          v-model="fee"
                          placeholder="">
            </b-form-input>
          </b-form-group>
          <div class="button-line clearfix">
            <b-button size="lg" class="mt-10 fr" :disabled="!(name && url && desc && amount && whcbalance.balance*1>0)" @click="onSend" variant="primary">确认发行</b-button>
          </div>
        </b-form>
      </div>
      </b-tab>
      <b-tab title="可众筹Token">
        <br>
        <div class="ta-c">即将上线</div>
      </b-tab>
      <b-tab title="可管理Token">
        <br>
        <div class="ta-c">即将上线</div>
      </b-tab>
    </b-tabs>

    <div class="transaction-line mt-30 fs-16">
      <div>等待确认的Token:</div>
      <div v-if="trans" v-for="(item,index) in trans" :key="index"><a :href="'https://www.blocktrail.com/tBCC/tx/'+item.tx" target="_blank">{{item.name + '  ' + item.tx}}</a></div>
    </div>
  </div>
</template>

<style lang="scss">
.form-label {
  font-weight: bold;
}
</style>


<style lang="scss" scoped>
.wh-page-sendtoken {
  padding: 30px;
  width: 70%;
  margin: 0 auto;

  .form-label {
    font-weight: bold;
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
      title: "发行Token"
    }
  },

  data() {
    return {
      whcbalance:{
        balance:0
      },
      name: '',
      url: '',
      desc: '',
      fee: '1 WHC',
      trans:[],
      amount: 10000
    }
  },

  asyncData({ req, app, query }) {
    // properties
    return app.axios
    .init(req)
    .get("/api/wormhole/getwhcbalance")
    .then(res => {
      if(!res.code){
        return {
          whcbalance: res.data.data
        }
      }
    }).catch(e=>{
      console.error(e)
    });
  },

  mounted(){
    this.trans = localStorage.getItem('token.trans') ? JSON.parse(localStorage.getItem('token.trans')) : []
  },

  methods:{
    onSend: function(){
      const _this = this
      this.axios
      .get("/api/wormhole/sendfixedtoken?name="+this.name + "&amount="+this.amount + "&url="+this.url + "&data="+this.desc)
      .then(res => {
        if(!res.code){
          _this.trans.push({tx: res.data.data, name: _this.name})
          localStorage.setItem('token.trans', JSON.stringify(_this.trans))
          alert('你的' + _this.name + '发行成功，等待交易确认，可在页面底部查看交易ID')
        }
      }).catch(e=>{
        console.error(e)
        _this.$store.dispatch("setErrorText", e.message)
      });
    }
  }
};
</script>

