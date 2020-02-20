<template>
  <div class="b-c2">
    <dv-scroll-ranking-board :config="config" class="top"/>
  </div>
</template>

<script>
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
    }
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
