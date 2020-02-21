<template>
  <div class="b-c2">
    <dv-scroll-board :config="config" class="table"/>
  </div>
</template>

<script>
  import API from '../../../utils/api'
  import { apiTime } from './config'

  export default {
    name: 'Bottomchart3',
    data () {
      return {
        config: {
          //   header: ['任务描述', '时间'],
          //   columnWidth: [140, 100],
          //   headerBGC: '',
          //   oddRowBGC: '',
          //   evenRowBGC: '',
          //   data: [
          //     ['天府三街出现爆仓', '2020-02-12'],
          //     ['世纪城违章停车', '2020-02-12'],
          //     ['天府三街出现爆仓', '2020-02-12'],
          //     ['世纪城违章停车', '2020-02-12'],
          //     ['天府三街出现爆仓', '2020-02-12'],
          //     ['高新违章停车', '2020-02-12'],
          //     ['世纪城违章停车', '2020-02-12'],
          //     ['高新出现爆仓', '2020-02-12'],
          //     ['世纪城违章停车', '2020-02-12'],
          //     ['世纪城违章停车', '2020-02-12']
          //   ]
          // }
        }
      }
    },
    methods: {
      getData () {
        API.v1.bottom4({
          // time: this.$moment(new Date()),
          // days: 7
        }).then(da => {
          this.config = {
            header: ['任务描述', '时间'],
            columnWidth: [140, 100],
            headerBGC: '',
            oddRowBGC: '',
            evenRowBGC: '',
            data: da.data.data
          }
        })
      }
    },
    created () {
      this.getData()
      setInterval(() => {
        this.getData()
      }, apiTime)
    },
  }
</script>

<style scoped lang="less">
  .b-c2 {
    width: calc(100% + 20px);
    margin-left: -10px;
    height: 100%;

    .table {
      width: 100%;
      height: 100%;
    }
  }
</style>
