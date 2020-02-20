<template>
  <div class="right-chart-2">
    <div class="f-1">
      <dv-active-ring-chart class="rc2-chart" :config="config"/>
    </div>
    <div class="f-2">
      <div class="num">无牌照投放<span>21000</span>辆</div>
      <div class="rc-chart" id="rcChart"></div>
    </div>
  </div>
</template>

<script>
  import chartColors from './chartColors'

  export default {
    name: 'RightChart2',
    data () {
      return {
        chart: '',
        config: {
          data: [
            {
              name: '哈罗',
              value: 1315
            },
            {
              name: '美团',
              value: 415
            },
            {
              name: '青桔',
              value: 90
            },
            {
              name: '摩拜',
              value: 317
            }
          ],
          color: chartColors,
          lineWidth: 20,
          radius: '55%',
          activeRadius: '60%',
          digitalFlopStyle: {
            fontSize: 20
          }
        },
        options: {
          grid: {
            top: '0',
            left: '3%',
            right: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              show: true,
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
          yAxis: {
            type: 'category',
            data: ['哈罗', '美团', '青桔', '摩拜'],
            axisLabel: {
              textStyle: {
                color: '#ffffff'
              }
            },
          },
          series: [{
            data: [120, 200, 600, 800],
            type: 'bar',
            barWidth: '50%',
            itemStyle: {
              normal: {
                //每根柱子颜色设置
                color: function (params) {
                  let colorList = chartColors
                  return colorList[params.dataIndex]
                }
              }
            }
          }]
        }
      }
    },
    mounted () {
      this.chart = this.$echarts.init(document.getElementById('rcChart'))
      this.chart.setOption(this.options)
    }
  }
</script>

<style lang="less">
  .right-chart-2 {
    width: 100%;
    height: 100%;
    display: flex;

    .rc2-chart {
      height: calc(~"100% - 10px");
    }

    .f-1 {
      width: 50%;
    }

    .f-2 {
      width: 50%;

      .num {
        height: 30px;

        span {
          color: #1ed9fc;
          font-size: 18px;
          padding: 0 5px;
        }
      }

      .rc-chart {
        /*height: calc(~"100% - 30px");*/
        height: 100%;
      }
    }
  }
</style>
