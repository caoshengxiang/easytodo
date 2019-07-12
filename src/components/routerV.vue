<template>
  <div class="page">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            style="border: 0"
            :router="true"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="home">
              <i class="el-icon-menu"></i>
              <span slot="title">缺勤通报</span>
            </el-menu-item>
            <el-menu-item index="attendanceRecord">
              <i class="el-icon-document"></i>
              <span slot="title">考勤记录</span>
            </el-menu-item>
            <el-submenu index="set">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统配置</span>
              </template>
              <el-menu-item index="setAccount">账号设置</el-menu-item>
              <el-menu-item index="setAttendance">考勤修改</el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="4">-->
            <!--<i class="el-icon-setting"></i>-->
            <!--<span slot="title">系统配置</span>-->
            <!--</el-menu-item>-->
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <transition name="component-fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'index.vue',
    data () {
      return {
        defaultActive: 'home',
      }
    },
    methods: {
      handleCommand (command) {
        this.$message('click on item ' + command)
      },
    },
    created () {
      let name = this.$route.name
      console.log(name)
      this.defaultActive = name
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
  }
</style>
