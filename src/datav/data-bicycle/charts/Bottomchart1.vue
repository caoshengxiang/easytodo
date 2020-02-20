<template>
  <div class="bottom-chart1">
    <div id="bottomChart1"></div>
  </div>
</template>

<script>
  export default {
    name: 'Bottomchart1',
    data () {
      return {
        chart: '',
        options: {
          title: {
            text: '',
            subtext: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['已完成', '未完成'],
            textStyle:{
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
          xAxis: {
            type: 'category',
            data: ['哈罗', '美团', '青桔', '摩拜'],
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff'
              }
            },
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            name: '数量',
            nameTextStyle:{
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
              name: '已完成',
              type: 'bar',
              data: [182, 234, 290, 109],
              itemStyle : { // 折线样式
                normal : {
                  color:'#3468FF', // 折点样式
                  lineStyle:{
                    color:'#3468FF'
                  }
                }
              },
            },
            {
              name: '未完成',
              type: 'bar',
              data: [135, 138, 131, 194],
              itemStyle : { // 折线样式
                normal : {
                  color:'#86F3FF', // 折点样式
                  lineStyle:{
                    color:'#86F3FF'
                  }
                }
              },
            }
          ]
        }
      }
    },
    mounted () {
      this.chart = this.$echarts.init(document.getElementById('bottomChart1'))
      this.chart.setOption(this.options)
    }
  }
</script>

<style scoped lang="less">
  .bottom-chart1 {
    width: 100%;
    height: 100%;

    #bottomChart1 {
      width: 100%;
      height: 100%;
    }
  }
</style>
