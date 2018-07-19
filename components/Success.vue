<template>
	<div class="f_bd">
		<div class="f_wrapper">
			<div class="successBox">
				<i :class="[!error?'i_success':'i_warning', 'resultIcon']" aria-hidden="true"></i>
				<div v-if="!error">
					<p class="resultTitle">{{successTitle}}</p>
					<p class="resultInfo">
						<span v-if="!disableCountDown">{{countDown}}{{$t("success.countdowntext")}}</span>
						<span v-else> {{subTitle}} </span>
						<nuxt-link :to="linkHref?linkHref:''"> {{linkText}} </nuxt-link></p>
					</p>
					<p class="extraInfo" v-if="extraLinkText">
						<nuxt-link v-if="extraLinkHref" :to="extraLinkHref?extraLinkHref:''">{{extraLinkText}}</nuxt-link>
						<a href="javascript:;" v-if="extraLinkFunc" @click="extraLinkFunc">{{extraLinkText}}</a>
					</p>
				</div>
				<div v-else>
					<p class="resultTitle">{{error}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.resultIcon{font-size: 104px;display: block;margin: 0 auto 50px;}
	.fa-check-circle{color: #4a90e2;}
	.successBox{background-color: #fff;border: 1px solid #ddd;width: 450px;margin: 0 auto;padding: 90px 50px 30px;text-align: center;}
	.resultTitle{font-size: 28px;margin-bottom: 10px;}
	.resultInfo{font-size: 14px;color: #aaa;}
	.extraInfo{margin-top: 30px;font-size: 16px;color: #535353;}
</style>

<script>
	export default {
		data (){
			return {
				countDown:5
			}
		},
        props:["linkText","linkHref","extraLinkText","extraLinkHref","extraLinkFunc","successTitle","subTitle","disableCountDown", "callback","error"],
		mounted (){
			if(!this.disableCountDown){
				const _this = this
				var inter = setInterval(function(){
					if(--_this.countDown<=0){
						clearInterval(inter)
						_this.callback && _this.callback()
						_this.$router.push(_this.linkHref)
					}
				},1000)
			}
		},
		methods:{
			//内置方法
		}
	}
</script>