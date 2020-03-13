<template>
  <div class="left-chart2">
    <div id="leftChart2"></div>
  </div>
</template>

<script>
  import chartColors from './chartColors'
  import API from '../../../utils/api'
  import { apiTime } from './config'

  export default {
    name: 'leftChart2',
    data () {
      return {
        chart: '',
        options: {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              var htmlStr = ''
              for (var i = 0; i < params.length; i++) {
                var param = params[i]
                var xName = param.name//x轴的名称
                var seriesName = param.seriesName//图例名称
                var value = param.value//y轴值
                var color = param.color//图例颜色

                if (i === 0) {
                  htmlStr += xName + '<br/>'//x轴的名称
                }
                htmlStr += '<div>'
                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>'

                //圆点后面显示的文本
                htmlStr += seriesName + '：' + value + 'h'

                htmlStr += '</div>'
              }
              return htmlStr
            }
          },
          legend: {
            textStyle: {
              // fontSize: 14, // 字体大小
              color: '#ffffff' // 字体颜色
            },
            data: []
          },
          grid: {
            top: '30px',
            left: '0%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              // saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff'
              }
            },
            boundaryGap: false,
            // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            data: []
          },
          yAxis: {
            name: '时间(h)',
            nameTextStyle: {
              color: '#ffffff',
            },
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#ffffff'
              }
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#1e2c4a'],
                width: 1,
                type: 'solid'
              }
            }
          },
          series: [
            // {
            //   name: '哈罗',
            //   type: 'line',
            //   stack: '总量1',
            //   data: [12, 13, 10, 13, 9, 23, 21],
            //   itemStyle: { // 折线样式
            //     normal: {
            //       color: chartColors[0], // 折点样式
            //       lineStyle: {
            //         color: chartColors[0]
            //       }
            //     }
            //   },
            //   symbol: 'none', //去掉折线图中的节点
            //   smooth: true  //true 为平滑曲线，false为直线
            // },
            // {
            //   name: '美团',
            //   type: 'line',
            //   stack: '总量2',
            //   data: [22, 18, 19, 23, 29, 33, 31],
            //   itemStyle: { // 折线样式
            //     normal: {
            //       color: chartColors[1],
            //       lineStyle: {
            //         color: chartColors[1]
            //       }
            //     }
            //   },
            //   symbol: 'none', //去掉折线图中的节点
            //   smooth: true  //true 为平滑曲线，false为直线
            // },
            // {
            //   name: '青桔',
            //   type: 'line',
            //   stack: '总量3',
            //   data: [15, 23, 20, 15, 19, 33, 41],
            //   itemStyle: { // 折线样式
            //     normal: {
            //       color: chartColors[2],
            //       lineStyle: {
            //         color: chartColors[2]
            //       }
            //     }
            //   },
            //   symbol: 'none', //去掉折线图中的节点
            //   smooth: true  //true 为平滑曲线，false为直线
            // },
            // {
            //   name: '摩拜',
            //   type: 'line',
            //   stack: '总量4',
            //   data: [32, 33, 30, 33, 39, 33, 32],
            //   itemStyle: { // 折线样式
            //     normal: {
            //       color: chartColors[3],
            //       lineStyle: {
            //         color: chartColors[3]
            //       }
            //     }
            //   },
            //   symbol: 'none', //去掉折线图中的节点
            //   smooth: true  //true 为平滑曲线，false为直线
            // }
          ]
        }
      }
    },
    methods: {
      getData () {
        API.v1.left2({
          // time: this.$moment(new Date()),
          // days: 7
        }).then(da => {
          this.options.xAxis.data = da.data.outData
          let names = []
          this.options.series = da.data.value.map((item, index) => {
            names.push(item.name)
            return {
              name: item.name,
              type: 'line',
              stack: '总量'+ index,
              data: item.data,
              itemStyle: { // 折线样式
                normal: {
                  color: chartColors[index], // 折点样式
                  lineStyle: {
                    color: chartColors[index]
                  }
                }
              },
              symbol: 'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            }
          })
          this.options.legend.data = names
          this.chart.setOption(this.options)
        })
      }
    },
    created () {

    },
    mounted () {
      this.chart = this.$echarts.init(document.getElementById('leftChart2'))
      this.getData()
      setInterval(() => {
        this.getData()
      }, apiTime)
    }
  }
</script>

<style scoped lang="less">
  .left-chart2 {
    width: 100%;
    height: 100%;

    #leftChart2 {
      width: 100%;
      height: 100%;
    }
  }

</style>
