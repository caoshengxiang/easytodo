<template>
  <div class="b-c2">
    <dv-scroll-ranking-board :config="config" class="top"/>
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
          data: [
            {
              name: '天府五街',
              value: 55
            },
            {
              name: '天府三街',
              value: 120
            },
            {
              name: '世纪城',
              value: 78
            },
            {
              name: '高新',
              value: 66
            },
            {
              name: '孵化园',
              value: 80
            },
          ]
        }
      }
    },
    methods: {
      getData () {
        API.v1.bottom3({
          // time: this.$moment(new Date()),
          // days: 7
        }).then(da => {
          this.config = {
            data: da.data
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
    width: 100%;
    height: 100%;
    .top {
      width: 100%;
      height: 100%;
    }
  }
</style>
