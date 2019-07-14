<template>
  <div class="page">
    <el-container style="height: 100%">
      <el-header style="background-color: #ecf8ff">Header</el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #545c64">
          <main-menu></main-menu>
        </el-aside>
        <el-container>
          <el-header height="30px" style="background-color: #FFFFFF;padding-top: 6px;border-bottom: 1px solid #e6e6e6;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item, index) in $route.meta.pos"
                                  :key="index"
                                  :to="{ name: item.name }">{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>
          <el-main style="height: 100%;overflow: auto;">
            <transition name="component-fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
          <el-footer style="background-color: #e6e6e6;">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import mainMenu from './mainMenu'

  export default {
    name: 'index.vue',
    components: {
      mainMenu,
    },
    data () {
      return {

      }
    },
    methods: {
    },
    created () {
    },
  }
</script>

<style scoped lang="less">
  @import url('../styles/var');

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }

  .page {
    width: 100vw;
    height: 100vh;
  }
</style>
