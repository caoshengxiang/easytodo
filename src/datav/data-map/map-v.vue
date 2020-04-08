<template>
  <div class="page">
    <baidu-map :style="{width:map.width,height:map.height}"
               :mapStyle="mapStyle"
               class="map"
               :ak="ak"
               :zoom="map.zoom"
               :center="{lng: map.center.lng, lat: map.center.lat}"
               @ready="handler"
               :scroll-wheel-zoom="true"
               :mapClick="false"
    >
      <!--摄像头-->
      <div v-if="isCheck(1)">
        <overlay-camera
          v-for="(item, index) in camera_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="{}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </overlay-camera>
      </div>
      <!--围栏-->
      <div v-if="isCheck(2)">
        <bm-polygon
          :key="'10000'+index"
          v-for="(item, index) in border2_Data"
          :path="item.paths"
          stroke-color="#FF5E5E"
          :stroke-opacity="0.8"
          :stroke-weight="1"
          fillColor="#FF5E5E"
          :fillOpacity="0.3"
          :editing="false"
        />
      </div>
      <!--点位-->
      <div v-if="isCheck(3)">
        <!--多边形，地图边界-->
        <bm-polygon
          :key="'100'+index"
          v-for="(item, index) in border1_Data"
          :path="item.paths"
          stroke-color="#91DF74"
          :stroke-opacity="0.8"
          :stroke-weight="1"
          fillColor="#91DF74"
          :fillOpacity="0.3"
          :editing="false"
        />
      </div>
      <!--城管人员-->
      <div v-if="isCheck(4)">
        <overlay-user1
          v-for="(item, index) in user1_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="{}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </overlay-user1>
      </div>
      <!--运营人员-->
      <div v-if="isCheck(5)">
        <overlay-user2
          v-for="(item, index) in user2_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="{}"
          @mouseover.native="active = true"
          @mouseleave.native="active = false">
        </overlay-user2>
      </div>
      <!--异常车-->
      <div v-if="isCheck(6)">
        <overlay-bike
          v-for="(item, index) in bike_data"
          :key="index"
          :position="{lng: item.lng, lat: item.lat}"
          :data="item.data"
        ></overlay-bike>
      </div>

      <!--热力图-->
      <div v-if="isCheck(8)">
        <bml-heatmap :data="hot_data1" :max="10" :radius="20">
        </bml-heatmap>
      </div>
      <div v-if="isCheck(9)">
        <bml-heatmap :data="hot_data2" :max="10" :radius="20">
        </bml-heatmap>
      </div>

    </baidu-map>
    <!--bar 栏目-->
    <div class="bar">
      <div class="title">图层筛选</div>
      <div class="con">
        <div class="check-item" :class="{active: isCheck(1)}" @click="checkHandle(1)">
          <img class="icon" src="./image/bar/bar-1.png" alt="">
          <span class="text">摄像头</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(2)}" @click="checkHandle(2)">
          <img class="icon" src="./image/bar/bar-2.png" alt="">
          <span class="text">电子围栏</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(3)}" @click="checkHandle(3)">
          <img class="icon" src="./image/bar/bar-3.png" alt="">
          <span class="text">停车点</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(4)}" @click="checkHandle(4)">
          <img class="icon" src="./image/bar/bar-4.png" alt="">
          <span class="text">城管人员</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(5)}" @click="checkHandle(5)">
          <img class="icon" src="./image/bar/bar-5.png" alt="">
          <span class="text">运营人员</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(6)}" @click="checkHandle(6)">
          <img class="icon" src="./image/bar/bar-6.png" alt="">
          <span class="text">异常车</span>
          <span class="value">95</span>
        </div>

        <div class="check-item" :class="{active: isCheck(7)}" @click="checkHandle(7)">
          <img class="icon" src="./image/bar/bar-7.png" alt="">
          <span class="text">违章投放</span>
          <span class="value">9500</span>
        </div>

        <div class="check-item" :class="{active: isCheck(8)}" @click="checkHandle(8)">
          <img class="icon" src="./image/bar/bar-8.png" alt="">
          <span class="text">违章热力图</span>
          <span class="value"></span>
        </div>

        <div class="check-item" :class="{active: isCheck(9)}" @click="checkHandle(9)">
          <img class="icon" src="./image/bar/bar-9.png" alt="">
          <span class="text">停放热力图</span>
          <span class="value"></span>
        </div>

      </div>
    </div>

    <!--底部-->
    <div class="bottom">
      <div class="b-item">
        <img class="icon" src="./image/bottom/b1.png" alt="">
        <div class="t-box">
          <div class="t-title">辖区任务</div>
          <div class="t1"><span class="t2">125</span>个</div>
        </div>
        <div class="up-box">
          <img class="up-icon" src="./image/bottom/up.png" alt="">
        </div>
      </div>

      <div class="b-item">
        <img class="icon" src="./image/bottom/b1.png" alt="">
        <div class="t-box">
          <div class="t-title">辖区任务</div>
          <div class="t1"><span class="t2">125</span>个</div>
        </div>
        <div class="up-box">
          <img class="up-icon" src="./image/bottom/up.png" alt="">
        </div>
      </div>

      <div class="b-item">
        <img class="l-icon" src="./image/bottom/b1.png" alt="">
        <div class="t-box">
          <div class="t-title">辖区任务</div>
          <div class="t1"><span class="t2">125</span>个</div>
        </div>
        <div class="up-box">
          <img class="up-icon" src="./image/bottom/down.png.png" alt="">
        </div>
      </div>

      <div class="b-item">
        <img class="icon" src="./image/bottom/b1.png" alt="">
        <div class="t-box">
          <div class="t3">任务下发</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 百度地图
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmPolygon, BmlHeatmap } from 'vue-baidu-map'
  import { ak } from './config'
  import styleJson from './styleJson' // 地图样式
  // 百度地图 end
  import overlayCamera from './components/overlay-camera'
  import overlayUser1 from './components/overlay-user1'
  import overlayUser2 from './components/overlay-user2'
  import overlayBike from './components/overlay-bike'
  import { mapdata } from '../../demo/border/styleJson'

  export default {
    name: 'map-v',
    components: {
      BaiduMap,
      BmPolygon,
      BmlHeatmap,
      overlayCamera,
      overlayUser1,
      overlayUser2,
      overlayBike,
    },
    data() {
      return {
        mapStyle: {
          styleJson: styleJson
        },
        ak: ak,
        map: {
          width: '100vw',
          height: '100vh',
          center: {
            lng: 104.0703534685,
            lat: 30.6711884335,
          },
          zoom: 19, // 范围 1-19
        },
        checked: [1, 2, 3, 4, 5],
        checkedId: '',
        camera_data: [
          {
            lng: 104.07,
            lat: 30.6710,
          },
          {
            lng: 104.07200,
            lat: 30.6716,
          },
          {
            lng: 104.071012,
            lat: 30.6709,
          },
          {
            lng: 104.070301,
            lat: 30.6720,
          }
        ],
        user1_data: [
          { lng: 104.06401, lat: 30.67002 },
          { lng: 104.06801, lat: 30.66002 },
          { lng: 104.07151, lat: 30.67502 },
        ],
        user2_data: [
          { lng: 104.06952, lat: 30.66801 },
          { lng: 104.058556, lat: 30.67721 },
          { lng: 104.070542, lat: 30.66601 },
        ],
        bike_data: [
          // { lng: 104.03952, lat: 30.63801 },
          // { lng: 104.054556, lat: 30.65721 },
          { lng: 104.077542, lat: 30.67601, data: {type: 'h', title: '哈罗单车', detail: '故障车'} },
          { lng: 104.077942, lat: 30.67101, data: {type: 'm', title: '哈罗单车', detail: '僵尸车'} },
          { lng: 104.078042, lat: 30.67201, data: {type: 'o', title: '哈罗单车', detail: '僵尸车'} },
          { lng: 104.077942, lat: 30.67901, data: {type: 'q', title: '哈罗单车', detail: '故障车'} },
        ],
        border1_Data: [
          {
            name: 'xx点位',
            paths: [{ 'lng': 104.064748, 'lat': 30.607802 }, {
              'lng': 104.064461,
              'lat': 30.605315
            }, { 'lng': 104.067479, 'lat': 30.605937 }, { 'lng': 104.066904, 'lat': 30.608672 }, {
              'lng': 104.064748,
              'lat': 30.608424
            }]
          },
          {
            name: 'xx22点位',
            paths: [{ 'lng': 104.07268, 'lat': 30.662203 }, { 'lng': 104.072752, 'lat': 30.65891 }, {
              'lng': 104.075411,
              'lat': 30.658879
            }, { 'lng': 104.077226, 'lat': 30.661629 }, { 'lng': 104.077261, 'lat': 30.662374 }, {
              'lng': 104.07277,
              'lat': 30.66225
            }]
          }
        ],
        border2_Data: [
          {
            name: 'xx围栏',
            paths: [{ 'lng': 104.064928, 'lat': 30.607748 }, {
              'lng': 104.065071,
              'lat': 30.608478
            }, { 'lng': 104.066491, 'lat': 30.60854 }, { 'lng': 104.066509, 'lat': 30.607919 }, {
              'lng': 104.06561,
              'lat': 30.607903
            }, { 'lng': 104.065179, 'lat': 30.607794 }]
          },
          {
            name: 'xx22围栏',
            paths: [{ 'lng': 104.072896, 'lat': 30.659407 }, { 'lng': 104.07295, 'lat': 30.660138 }, {
              'lng': 104.07401,
              'lat': 30.659252
            }, { 'lng': 104.073812, 'lat': 30.658957 }]
          }
        ],
        hot_data1: [
          { 'lng': 104.072896, 'lat': 30.659407, count: 3 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 8 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 3 },
          { 'lng': 104.068896, 'lat': 30.659407, count: 6 },
          { 'lng': 104.068896, 'lat': 30.659407, count: 10 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 5 },
          { 'lng': 104.072896, 'lat': 30.659407, count: 8 },
          { 'lng': 104.072896, 'lat': 30.659307, count: 5 },
          { 'lng': 104.069896, 'lat': 30.659457, count: 10 },
          { 'lng': 104.071796, 'lat': 30.659207, count: 3 },
          { 'lng': 104.070796, 'lat': 30.659287, count: 10 },
          { 'lng': 104.071796, 'lat': 30.659007, count: 3 },
          { 'lng': 104.071196, 'lat': 30.65957, count: 7 },
          { 'lng': 104.073796, 'lat': 30.659457, count: 3 },
          { 'lng': 104.070796, 'lat': 30.659307, count: 8 },
          { 'lng': 104.071796, 'lat': 30.659507, count: 1 },
          { 'lng': 104.071296, 'lat': 30.659287, count: 8 },
          { 'lng': 104.071396, 'lat': 30.659207, count: 3 },
          { 'lng': 104.070796, 'lat': 30.659107, count: 10 },
        ],
        hot_data2: [
          { 'lng': 104.070896, 'lat': 30.659407, count: 3 },
          { 'lng': 104.072896, 'lat': 30.659457, count: 9 },
          { 'lng': 104.073796, 'lat': 30.659207, count: 6 },
          { 'lng': 104.076796, 'lat': 30.659287, count: 10 },
          { 'lng': 104.070796, 'lat': 30.659007, count: 5 },
          { 'lng': 104.075796, 'lat': 30.65957, count: 7 },
        ]
      }
    },
    methods: {
      handler({ BMap, map }) {
        //   map.setMapStyle(this.mapStyle)
      },
      checkHandle(id) { /// 999 代表全部
        let index = this.checked.indexOf(id)
        if (index > -1) {
          this.checked.splice(index, 1)
          let index999 = this.checked.indexOf(999)
          if (index999 > -1) {
            this.checked.splice(index999, 1)
          }
        } else {
          if (id === 999) {
            this.checked = [999, 1, 2, 3, 4, 5]
          } else {
            this.checked.push(id)
          }
        }
      },
      isCheck(id) {
        return this.checked.includes(id)
      },
    }
  }
</script>
<style>
  /*去除百度地图logo和文字*/
  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }

  /*去除百度地图logo和文字*/

</style>
<style scoped lang="less">
  .page {
    width: 100vw;
    height: 100vh;
    position: relative;

    .bar {
      position: absolute;
      right: 16/9.6vw;
      top: 30/9.6vw;
      color: #FFFFFF;

      .title {
        font-size: 10/9.6vw;
        width: 134/9.6vw;
        height: 25/9.6vw;
        background-image: url("image/bar/bar-bg-1.png");
        background-size: 100% 100%;
        line-height: 25/9.6vw;
        padding-left: 23/9.6vw;

      }

      .con {
        width: 100%;
        background-image: url("image/bar/bar-bg-2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding: 10/9.6vw 6/9.6vw;
        margin-top: -10/9.6vw;
        font-size: 9/9.6vw;

        .check-item {
          background-image: url("image/bar/item-bg.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          padding: 8/9.6vw 13.5/9.6vw;
          height: 40/9.6vw;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &.active {
            background-image: url("image/bar/item-bg-ac.png");
          }
          .icon {
            width: 15/9.6vw;
          }
          .text {
            width: 50/9.6vw;
            display: inline-block;
          }
          .value {
            font-size: 15/9.6vw;
            color: #03F7FC;
            width: 30/9.6vw;
            display: inline-block;
          }
        }
      }
    }

    .bottom {
      background-image: url("./image/box.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .b-item {
        .l-icon {}
        .t-box {
          .t-title{}
          .t1 {}
          .t2 {}
          .t3{}
        }
        .up-box{
          .up-icon{}
        }
      }
    }
  }
</style>
