<template>
  <div>
    <baidu-map :style="{width:map.width,height:map.height}"
               :mapStyle="mapStyle"
               class="map"
               ak="QESRXGTH3unGiZpCnns1bep6hOCH7erg"
               :zoom="map.zoom"
               :center="{lng: map.center.lng, lat: map.center.lat}"
               @ready="handler"
               :scroll-wheel-zoom="true"
               :mapClick="false"
               @mousemove="syncPolyline"
               @click="paintPolyline"
               @rightclick="newPolyline"
    >
      <!--绘制边际-->
      <bm-boundary v-for="(item, index) in chengdus"
                   :key="index+item.name"
                   :name="item.name"
                   :strokeWeight="3"
                   strokeStyle="dashed"
                   strokeColor="#a1a1a1"
                   :fillColor="item.bg"
                   @mouseover="item.active = true"
                   @mouseout="item.active = false"
                   :fillOpacity="item.active ? 0.8 : 0.6">

      </bm-boundary>

      <!--        <bm-boundary name="成都市武侯区" :strokeWeight="2" strokeColor="blue" fillColor="red" :fillOpacity="0.1"></bm-boundary>-->

      <!--标注-->
      <bm-marker v-for="(item, index) in infoWindows"
                 :key="index+'id'"
                 :position="item.position"
                 :dragging="true"
      ></bm-marker>
      <my-overlay
        v-for="(item, index) in infoWindows" :key="index"
        :position="item.position"
        :data="item.data"
        :active="item.active"
        @mouseover.native="item.active = true"
        @mouseleave.native="item.active = false"
        @click.native="overlayClick(item)"
      ></my-overlay>

      <!--折线-->
      <bm-control offset="20">
        <button class="btn-1" @click.stop="toggle('polyline')">{{ polyline.editing ? '停止绘制(先鼠标右键完成当前区域)' : '绘制边界' }}
        </button>
        <button class="btn-2" v-if="!polyline.editing && polyline.paths.length" @click.stop="drowPolygon">生成边界</button>
      </bm-control>
      <bm-polyline strokeColor="#801915" :strokeWeight="1" :path="path" :key="'101'+index"
                   v-for="(path, index) in polyline.paths">
      </bm-polyline>
      <!--多边形，地图边界-->
      <bm-polygon
        :key="'100'+index"
        v-for="(item, index) in polygonPaths"
        :path="item.paths"
        stroke-color="blue"
        :stroke-opacity="0.8"
        :stroke-weight="1"
        fillColor="#ffffff"
        :fillOpacity="0.3"
        :editing="item.editing"
        @click="(e)=>editPolygonPath(e,item, index)"
        @lineupdate="(e)=>updatePolygonPath(e,item)"/>
    </baidu-map>


    <el-dialog
      title="操作"
      :visible.sync="dialogVisible"
      width="300px"
    >
      <p>
        <el-button style="width: 100%" type="primary" @click="edit" v-if="editPolygItem.editing">确定</el-button>
        <el-button style="width: 100%" type="primary" @click="edit" v-else>编辑</el-button>
      </p>
      <!--      <p style="margin: 10px;" v-if="editPolygItem.editing">-->
      <!--        <el-button style="width: 100%" type="primary" @click="delPoint">删除最后一个点</el-button>-->
      <!--      </p>-->
      <p style="margin: 10px;">
        <el-button style="width: 100%" type="danger" @click="del">删除</el-button>
      </p>
      <p style="margin: 10px;">
        <el-button style="width: 100%" @click="dialogVisible = false">取消</el-button>
      </p>

    </el-dialog>
  </div>
</template>

<script>
  // 百度地图
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import { BmBoundary, BmMarker, BmControl, BmPolyline, BmPolygon } from 'vue-baidu-map'
  import myOverlay from './myOverlay'
  // 百度地图 end
  import { styleJson, mapdata, coordinates } from './styleJson'

  export default {
    name: 'map-test',
    components: {
      BaiduMap,
      BmBoundary,
      myOverlay,
      BmMarker,
      BmControl,
      BmPolyline,
      BmPolygon,
    },
    data () {
      return {
        dialogVisible: false,
        editPolygItem: '',
        editPolygIndex: 0,
        mapStyle: {
          styleJson: styleJson
        },
        infoWindows: [{
          position: {
            lng: 104.0703534685,
            lat: 30.6711884335,
          },
          data: {
            name: '时间'
          },
          active: false,
        }],
        map: {
          width: '100vw',
          height: '100vh',
          center: {
            lng: 104.0703534685,
            lat: 30.6711884335,
          },
          zoom: 12, // 范围 1-19
        },
        chengdus: [
          {
            name: '成都市锦江区',
            bg: '#0F9E5E',
            active: false,
          }, {
            name: '成都市青羊区',
            bg: '#899e46',
            active: false,
          }, {
            name: '成都市金牛区',
            bg: '#9e5f46',
            active: false,
          }, {
            name: '成都市武侯区',
            bg: '#9e2768',
            active: false,
          }, {
            name: '成都市成华区',
            bg: '#357c9e',
            active: false,
          }
        ],
        /*绘制折线*/
        polyline: {
          editing: false,
          paths: []
        },
        /*绘制折线*/
        /*多边形*/
        polygonPaths: [
          {
            editing: false,
            paths: mapdata
          }
        ],
        /*多边形*/
      }
    },
    methods: {
      handler ({ BMap, map }) {
        // eslint-disable-next-line no-console
        console.log('ok')
        // let mapStyle = { style: 'midnight' }
        // map.setMapStyle(mapStyle)
      },
      overlayClick (item) {

      },
      /*折线*/
      toggle (name) {
        this[name].editing = !this[name].editing
      },
      syncPolyline (e) {
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        if (!paths.length) {
          return
        }
        const path = paths[paths.length - 1]
        if (!path.length) {
          return
        }
        if (path.length === 1) {
          path.push(e.point)
        }
        this.$set(path, path.length - 1, e.point)
      },
      newPolyline (e) {
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        if (!paths.length) {
          paths.push([])
        }
        const path = paths[paths.length - 1]
        path.pop()
        if (path.length) {
          paths.push([])
        }
      },
      paintPolyline (e) {
        // eslint-disable-next-line no-console
        console.log(e.point)
        if (!this.polyline.editing) {
          return
        }
        const { paths } = this.polyline
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
      },
      /*折线*/
      /*多边形*/
      updatePolygonPath (e, item) {
        item.paths = e.target.getPath()
        // eslint-disable-next-line no-console
        // console.info(JSON.stringify(this.polygonPath))
      },
      editPolygonPath (e, item, index) {
        this.dialogVisible = true
        this.editPolygItem = item
        this.editPolygIndex = index
      },
      edit () {
        this.editPolygItem.editing = !this.editPolygItem.editing
        this.dialogVisible = false
      },
      delPoint () {
        if (!this.editPolygItem.paths) {
          return
        }
        this.editPolygItem.paths.pop()
        this.dialogVisible = false
      },
      del () {
        this.polygonPaths.splice(this.editPolygIndex, 1)
        this.dialogVisible = false
      },
      drowPolygon () {
        if (!this.polyline.paths.length) {
          return
        }
        this.polyline.paths.forEach(item => {
          if (item.length) {
            this.polygonPaths.push({
              editing: false,
              paths: item
            })
          }
        })
        console.log(this.polygonPaths)
        this.polyline = {
          editing: false,
          paths: []
        }
      }
      /*多边形*/
    },
    created () {
      let paths = []
      coordinates.forEach(item => {

        paths.push({
          lng: item[0],
          lat: item[1]
        })
      })
      this.polygonPaths.push({
        editing: false,
        paths: paths
      })
      // eslint-disable-next-line no-console
      console.log(this.polygonPaths)
    }
  }
</script>

<style scoped lang="less">
  .test {
    color: #357c9e;
  }

  .map {
    width: 100%;
    height: 300px;
  }

  .btn-1 {
    position: relative;
    top: 20px;
    left: 20px;
    padding: 4px 6px;
    background: green;
    border: 0;
    font-size: 12px;
    color: #ffffff;
  }

  .btn-2 {
    position: relative;
    top: 20px;
    left: 30px;
    padding: 4px 6px;
    background: green;
    border: 0;
    font-size: 12px;
    color: #ffffff;
  }
</style>
