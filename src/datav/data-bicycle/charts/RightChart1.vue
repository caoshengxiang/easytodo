<template>
  <div class="right-chart-1">
    <dv-charts class="rc1-chart" :option="option"/>
    <div class="text">
      总投放量：<span>{{total}}</span>辆
    </div>
  </div>
</template>

<script>
  import chartColors from './chartColors'
  import API from '../../../utils/api'
  import { apiTime } from './config'

  export default {
    name: 'RightChart1',
    data () {
      return {
        option: {
          series: [
            {
              type: 'pie',
              data: [
                // { name: '哈罗', value: 60000 },
                // { name: '美团', value: 70000 },
                // { name: '青桔', value: 50000 },
                // { name: '摩拜', value: 30000 },
              ],
              radius: ['45%', '65%'],
              insideLabel: {
                show: false
              },
              outsideLabel: {
                labelLineEndLength: 10,
                formatter: '{percent}%\n{name}',
                style: {
                  fontSize: 14,
                  fill: '#fff'
                }
              }
            }
          ],
          color: chartColors,
        },
        total: 0
      }
    },
    methods: {
      getData () {
        API.v1.right1({
          // time: this.$moment(new Date()),
          // days: 7
        }).then(da => {
          let sum = 0
          let data = da.data.map(item => {
            let value = parseInt(item.value, 10)
            sum += value
            return {
              name: item.name,
              value: value
            }
          })
          this.total = sum
          this.option = {
            series: [
              {
                type: 'pie',
                data: data,
                radius: ['45%', '65%'],
                insideLabel: {
                  show: false
                },
                outsideLabel: {
                  labelLineEndLength: 10,
                  formatter: '{percent}%\n{name}',
                  style: {
                    fontSize: 14,
                    fill: '#fff'
                  }
                }
              }
            ],
            color: chartColors,
          }
        })
      }
    },
    mounted () {
      this.getData()
      setInterval(() => {
        this.getData()
      }, apiTime * 6 * 60)
    },
  }
</script>

<style lang="less">
  .right-chart-1 {
    width: 100%;
    height: 100%;

    .rc1-chart {
      height: calc(~"100% - 30px");
    }

    .text {
      text-align: center;

      span {
        font-size: 28px;
        padding: 0 3px;
        color: #1ed9fc;
      }
    }
  }
</style>
