<template>
  <div class="bottom-chart2">
    <div id="bottomChart2"></div>
  </div>
</template>

<script>
  export default {
    name: 'BottomChart2',
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
                htmlStr += seriesName + '：' + value + '%'

                htmlStr += '</div>'
              }
              return htmlStr
            }
          },
          legend: {
            data: ['天府五街', '天府三街', '世纪城', '高新', '孵化园'],
            textStyle: {
              // fontSize: 14, // 字体大小
              color: '#ffffff' // 字体颜色
            },
          },
          grid: {
            left: '3%',
            right: '4%',
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
            boundaryGap: false,
            data: ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04', '2020-01-05', '2020-01-06', '2020-01-07'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff'
              }
            },
          },
          yAxis: {
            name: '使用率(%)',
            type: 'value',
            nameTextStyle: {
              color: '#ffffff',
            },
            axisLabel: {
              textStyle: {
                color: '#ffffff'
              }
            },
            //网格样式
            splitLine: {
              show: true,
              lineStyle:{
                color: ['#1e2c4a'],
                width: 1,
                type: 'solid'
              }
            }
          },
          series: [
            {
              name: '天府五街',
              type: 'line',
              // stack: '总量1',
              data: [12, 13, 10, 13, 9, 23, 21],
              symbol:'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            },
            {
              name: '天府三街',
              type: 'line',
              // stack: '总量2',
              data: [22, 18, 19, 23, 29, 33, 31],
              symbol:'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            },
            {
              name: '世纪城',
              type: 'line',
              // stack: '总量3',
              data: [15, 23, 20, 15, 19, 33, 41],
              symbol:'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            },
            {
              name: '高新',
              type: 'line',
              // stack: '总量4',
              data: [32, 33, 30, 33, 39, 33, 32],
              symbol:'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            },
            {
              name: '孵化园',
              type: 'line',
              // stack: '总量5',
              data: [10, 12, 18, 20, 21, 19, 30],
              symbol:'none', //去掉折线图中的节点
              smooth: true  //true 为平滑曲线，false为直线
            }
          ]
        }
      }
    },
    mounted () {
      this.chart = this.$echarts.init(document.getElementById('bottomChart2'))
      this.chart.setOption(this.options)
    }
  }
</script>

<style scoped lang="less">
  .bottom-chart2 {
    width: 100%;
    height: 100%;

    #bottomChart2 {
      width: 100%;
      height: 100%;
    }
  }

</style>
