<template>
  <header class="header">
    <div class="clearfix mt-20">
        <span class="va-m">
          <span class="logo">虫洞工具</span>
          <span class="ml-3 c-light">测试网络</span>
        </span>
      <b-nav class="fr">
        <b-nav-item to="/">Token广场</b-nav-item>
        <b-nav-item to="/generatewhc">生成WHC</b-nav-item>
        <b-nav-item to="/sendtoken">发行Token</b-nav-item>
        <b-nav-item to="/contact">联系我们</b-nav-item>
      </b-nav>
     </div>
  </header>
</template>

<style lang="scss" scoped>
  .header{
    width: 65%;
    margin:0 auto;
    .logo{
      font-size: 32px;
      font-weight: bold;
      color:orange;
      font-style: italic;
    }
    .nav-link {
      display: block;
      padding: 8px 25px;
      padding: 0.5rem 3rem;
      &:last-child{
        padding-right: 0;
      }
    }
    .nav-link.active{
      color:#1e73a2;
    }
    .develop{
      display:inline-block;
      font-weight:bold;
      padding-top:5px;
      margin-left:6px;
      color:#8c8c8c;
      font-size:14px;
    }
    .nav{
      margin-top: 8px;
      .nav-item{
        font-size: 16px;
      }
    }
  }
</style>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default {
  data() {
    return {}
  },
  computed:{
    hash(){
      if(process.browser){
        return location.hash
      }
    }
  },
  mounted(){
  }
};
</script>
