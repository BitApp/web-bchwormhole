<template>
  <div class="vincent-slide-options">
    <div class="vincent-slide-options-cover"
         @touchstart="start"
         @touchmove="move"
         @touchend="end"
         @touchcancel="end"
         :style="coverStyle"
    >
      <slot name="cover"></slot>
    </div>
    <div class="vincent-slide-options-opt-ctn" ref="vincentSlideOptionsChildren">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      threshold: {
        type: Number,
        default: 0.5
      },
      speed: {
        type: Number,
        default: 0.2
      }
    },
    data: function () {
      return {
        // use transition?
        isAnimate: false,
        touchX: undefined,
        moveX: undefined,
        translateX: 0,
        lastTranslateX: 0,
        optCtnWidth: undefined
      }
    },
    computed: {
      coverStyle () {
        let style = {}
        if (this.isAnimate) {
          style.transition = 'all ' + this.speed + 's'
        }
        style.transform = 'translateX(' + this.translateX + 'px)'
        return style
      }
    },
    methods: {
      start: function (event) {
        this.$data.pageX = event.touches[0].pageX
        // 禁止动画
        this.$data.isAnimate = false
        this.$data.lastTranslateX = this.$data.translateX
        if (this.$data.optCtnWidth === undefined) {
          this.$data.optCtnWidth = this.$refs.vincentSlideOptionsChildren.offsetWidth
        }
        return
      },
      move: function (event) {
        this.$data.moveX = event.touches[0].pageX - this.$data.pageX
        // 比较左右
        let isRight = this.$data.moveX > 0
        if (isRight) {
          this.$data.isAnimate = false
          if (this.$data.translateX >= 0) {
            this.$data.translateX = 0
          } else {
            this.$data.translateX = this.$data.lastTranslateX + this.$data.moveX
          }
        } else {
          if (this.$data.moveX <= -this.$data.optCtnWidth) {
            this.$data.translateX = -this.$data.optCtnWidth
          } else {
            this.$data.isAnimate = false
            this.$data.translateX = this.$data.lastTranslateX + this.$data.moveX
          }
        }
        return
      },
      end: function () {
        if (this.$data.moveX > 0) {
          this.$data.isAnimate = true
          this.$data.translateX = 0
        } else {
          if (this.$data.translateX <= (-1 * this.$props.threshold * this.$data.optCtnWidth)) {
            this.$data.isAnimate = true
            this.$data.translateX = -this.$data.optCtnWidth
          } else {
            this.$data.isAnimate = true
            this.$data.translateX = 0
          }
        }
        return
      },
      close: function () {
        this.$data.isAnimate = true
        this.$data.translateX = 0
      }
    }
  }
</script>

<style scoped>
  .vincent-slide-options{
    position: relative;
  }
  .vincent-slide-options-cover{
    position: relative;
  }
  .vincent-slide-options-opt-ctn{
    position: absolute;
    top:0px;
    right: 0px;
    height: 100%;
    z-index: -1;
  }
</style>
