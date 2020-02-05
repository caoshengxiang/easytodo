<template>
  <bm-overlay
    ref="customOverlay"
    :class="{block: true, active}"
    pane="labelPane"
    @draw="draw">
    <div style="text-align: left;">
      <p style="font-weight: bold"> {{data.name}}</p>
      <p> xxx：</p>
      <p> xxx：{{$moment(new Date().getTime())}}</p>
    </div>
  </bm-overlay>
</template>

<script>
  import { BmOverlay } from 'vue-baidu-map'

  export default {
    props: {
      position: {},
      active: {
        default: false
      },
      data: {
        default () {
          return {}
        }
      }
    },
    computed: {
      bikeNum () {
        return this.data.recordModelList[this.data.recordModelList.length - 1].bikeNum
      },
      recordTime () {
        return this.data.recordModelList[this.data.recordModelList.length - 1].recordTime
      }
    },
    components: {
      BmOverlay,
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
      draw ({ el, BMap, map }) {
        const { lng, lat } = this.position
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
        el.style.left = pixel.x - 70 + 'px'
        el.style.top = pixel.y - 108 + 'px'
      }
    }
  }
</script>

<style lang="less" scoped>
  .block {
    width: 240px;
    background-color: #ffffff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    color: #000000;
    text-align: center;
    padding: 10px;
    position: absolute;
    border-radius: 10px;
  }

  .block.active {
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    z-index: 99;
  }
</style>
