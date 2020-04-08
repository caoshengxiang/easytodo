<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    class="sample"
    @draw="draw">
    <div class="item" @click="showTips = !showTips" >
      <img class="icon" v-if="data.type === 'h'" src="../image/bike/h.png" alt="">
      <img class="icon" v-if="data.type === 'o'" src="../image/bike/o.png" alt="">
      <img class="icon" v-if="data.type === 'm'" src="../image/bike/m.png" alt="">
      <img class="icon" v-if="data.type === 'q'" src="../image/bike/q.png" alt="">
      <div class="user-tips" v-if="showTips">
        <div class="line"></div>
        <div class="tip-con">
<!--          <div>{{data.detail}}</div>-->
          <div>{{data.detail}}</div>
        </div>
      </div>
    </div>
  </bm-overlay>
</template>

<script>
  import { BmOverlay } from 'vue-baidu-map'
  export default {
    components: {
      BmOverlay,
    },
    props: ['data', 'position'],
    data() {
      return {
        px: 0,
        py: 0,
        showTips: true
      }
    },
    watch: {
      position: {
        handler () {
          this.$refs.customOverlay.reload()
        },
        deep: true
      }
    },
    methods: {
      handleClick () {
      },
      draw ({el, BMap, map}) {
        const {lng, lat} = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.left = pixel.x - 20 + 'px'
        el.style.top = pixel.y - 30 + 'px'
        this.px = pixel.x
        this.py = pixel.y
      }
    }
  }
</script>

<style scoped lang="less">
  @import "tips";
  .sample {
    position: absolute;
  }
  .item {
    width: 37px;
    height: 53px;
    position: relative;
    img.icon {
      position: absolute;
      width: 34px;
    }
  }
</style>
