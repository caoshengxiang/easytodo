<template>
  <div class="com-pages"
       v-loading="loading"
       element-loading-text="加载中..."
  >
  </div>
</template>

<script>
  // @ is an alias to /src

  export default {
    components: {},
    name: 'home',
    data () {
      return {
        userInfo: this.$webStorage.getItem('userInfo'),
        loading: false,
      }
    },
    computed: {},
    methods: {},
    beforeCreate () {

    },
    created () {
    },
  }
</script>

<style scoped lang="less">
  @import "../../styles/common";

  .inline-box-item {
    margin: 20px;

    .total {
      padding: 0 0px 0 0px;
      width: 70%;

      .right {
        float: right;
      }
    }

    .progress-box {
      display: flex;
      align-items: center;

      .progress {
        height: 40px;
        width: 70%;
        display: inline-block;
      }

      .progress-2 {
        height: 40px;
        width: 70%;
        display: inline-block;
        background-color: #ebeef5;

        div {
          display: inline-block;
        }
      }

      .name {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }

  .alert-msg-item {
    margin: 10px;
  }

  .history-search {
    .search-item {
      margin-right: 20px;
      margin-bottom: 10px;
      display: inline-block;
    }
  }

  .table {
    margin-top: 20px;
  }
</style>
