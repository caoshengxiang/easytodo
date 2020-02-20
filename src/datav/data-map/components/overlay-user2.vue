<template>
  <bm-overlay
    ref="customOverlay"
    pane="labelPane"
    class="sample"
    @draw="draw">
    <div class="item">
      <img class="icon" src="../img/user2.png" alt="">
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
      }
    }
  }
</script>

<style scoped lang="less">
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
      top: 10px;
      left: 10px;
      width: 18px;
    }
  }
</style>
