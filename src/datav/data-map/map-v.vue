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
      <div v-if="checkedId===10">
        <bml-heatmap :data="hot_data1" :max="10" :radius="20">
        </bml-heatmap>
      </div>
      <div v-if="checkedId===11">
        <bml-heatmap :data="hot_data2" :max="10" :radius="20">
        </bml-heatmap>
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

      <!---->
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

    </baidu-map>
    <!--bar 栏目-->
    <div class="bar">
      <div class="title">图层筛选</div>
      <div class="con">
        <div class="box">
          <div class="b-t">分布图：</div>
          <div class="b-item">
            <div @click="checkHandle(item.id)" class="check-item" v-for="item in option" :key="item.id">
              <img v-if="isCheck(item.id)" src="./img/check-active.png" alt="">
              <img v-else src="./img/check.png" alt="">
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="b-t">热力图：</div>
          <div class="b-item2">
            <div @click="checkHandle2(item.id)" class="check-item" v-for="item in hotMap" :key="item.id">
              <img v-if="checkedId === item.id" src="./img/check-active.png" alt="">
              <img v-else src="./img/check.png" alt="">
              <span>{{item.name}}</span>
            </div>
          </div>
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
    },
    data () {
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
        option: [
          { id: 999, name: '全部' },
          { id: 1, name: '摄像头' },
          { id: 2, name: '电子围栏' },
          { id: 3, name: '停车点' },
          { id: 4, name: '城管人员' },
          { id: 5, name: '运营人员' },
        ],
        hotMap: [
          { id: 10, name: '违章热力图' },
          { id: 11, name: '停车热力图' },
        ],
        checked: [1,2,3,4,5],
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
          { 'lng': 104.072896, 'lat': 30.659407, count: 8  },
          { 'lng': 104.072896, 'lat': 30.659407, count: 3  },
          { 'lng': 104.068896, 'lat': 30.659407, count: 6  },
          { 'lng': 104.068896, 'lat': 30.659407, count: 10  },
          { 'lng': 104.072896, 'lat': 30.659407, count: 5  },
          { 'lng': 104.072896, 'lat': 30.659407, count: 8  },
          { 'lng': 104.072896, 'lat': 30.659307, count: 5  },
          { 'lng': 104.069896, 'lat': 30.659457, count: 10  },
          { 'lng': 104.071796, 'lat': 30.659207, count: 3  },
          { 'lng': 104.070796, 'lat': 30.659287, count: 10  },
          { 'lng': 104.071796, 'lat': 30.659007, count: 3  },
          { 'lng': 104.071196, 'lat': 30.65957, count: 7  },
          { 'lng': 104.073796, 'lat': 30.659457, count: 3  },
          { 'lng': 104.070796, 'lat': 30.659307, count: 8  },
          { 'lng': 104.071796, 'lat': 30.659507 , count: 1 },
          { 'lng': 104.071296, 'lat': 30.659287, count: 8  },
          { 'lng': 104.071396, 'lat': 30.659207, count: 3  },
          { 'lng': 104.070796, 'lat': 30.659107, count: 10  },
        ],
        hot_data2: [
          { 'lng': 104.070896, 'lat': 30.659407,count: 3},
          { 'lng': 104.072896, 'lat': 30.659457, count: 9  },
          { 'lng': 104.073796, 'lat': 30.659207, count: 6  },
          { 'lng': 104.076796, 'lat': 30.659287, count: 10  },
          { 'lng': 104.070796, 'lat': 30.659007, count: 5  },
          { 'lng': 104.075796, 'lat': 30.65957, count: 7  },
        ]
      }
    },
    methods: {
      handler ({ BMap, map }) {
        //   map.setMapStyle(this.mapStyle)
      },
      checkHandle (id) {
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
      isCheck (id) {
        return this.checked.includes(id)
      },
      checkHandle2 (id) {
        if (this.checkedId === id) {
          this.checkedId = null
        } else {
          this.checkedId = id
        }
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
      width: 300px;
      position: absolute;
      right: 40px;
      top: 40px;
      color: #FFFFFF;
      font-size: 14px;

      .title {
        width: 300px;
        height: 45px;
        background-image: url("./img/bar-1.png");
        background-size: 100% 100%;
        line-height: 50px;
        padding-left: 30px;
        box-sizing: border-box;
      }

      .con {
        width: 100%;
        background-image: url("./img/bar-2.png");
        background-size: 100%;
        background-repeat: no-repeat;
        padding-top: 20px;
        margin-top: -10px;

        .box {
          display: flex;

          .b-t {
            width: 100px;
            box-sizing: border-box;
            padding-left: 20px;
          }

          .b-item {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            margin-bottom: 20px;

            .check-item {
              width: 100px;
              display: flex;
              align-items: center;
              margin-bottom: 10px;

              img {
                width: 20px;
                margin-right: 5px;
                margin-top: -2px;
              }
            }
          }

          .b-item2 {
            flex: 1;
            margin-bottom: 20px;

            .check-item {
              width: 100px;
              display: flex;
              align-items: center;
              margin-bottom: 10px;

              img {
                width: 20px;
                margin-right: 5px;
                margin-top: -2px;
              }
            }
          }
        }
      }
    }
  }
</style>
