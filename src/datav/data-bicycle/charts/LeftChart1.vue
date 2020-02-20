<template>
  <div class="left-chart-1">
    <div class="num">
      违章总数
      <span class="span">
        <countTo :startVal='startVal' :endVal='endVal' :duration='2000'></countTo>
      </span>
    </div>
    <dv-capsule-chart class="lc1-chart" :config="config"/>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'
  import chartColors from './chartColors'

  export default {
    name: 'LeftChart1',
    components: {
      countTo
    },
    data () {
      return {
        config: {
          data: [
            {
              name: '哈罗',
              value: 167
            },
            {
              name: '美团',
              value: 67
            },
            {
              name: '青桔',
              value: 123
            },
            {
              name: '摩拜',
              value: 55
            }
          ],
          colors: chartColors,
          unit: '件'
        },
        startVal: 0,
        endVal: 238,
      }
    },
    mounted () {
      setInterval(() => {
        this.startVal = this.endVal
        this.endVal += 13
      }, 5000)
    }
  }
</script>

<style lang="less">
  .left-chart-1 {
    width: 100%;
    height: 37%;
    display: flex;
    flex-grow: 0;
    flex-direction: column;

    .num {
      font-size: 21px;
      line-height: 70px;
      box-sizing: border-box;

      .span {
        background: #272e51;
        letter-spacing: 6px;
        padding: 5px 10px;
        margin-left: 30px;
        font-size: 28px;
      }
    }

    .lc1-chart {
      flex: 1;
    }
  }
</style>
