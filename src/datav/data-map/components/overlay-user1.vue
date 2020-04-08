<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    class="sample"
    @draw="draw">
    <div class="item" @click="showTips = !showTips">
      <img class="icon" src="../img/user1.png" alt="">
      <div class="user-tips" v-if="showTips">
        <div class="line"></div>
        <div class="tip-con">
          <div>桂溪街道</div>
          <div>李四</div>
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
        global.alert('Well done.')
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
    background-image: url("../img/1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    img.icon {
      position: absolute;
      top: 7px;
      left: 10px;
      width: 18px;
    }
  }
</style>
