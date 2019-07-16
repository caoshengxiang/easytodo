<template>
  <el-menu
    style="border: 0"
    :router="true"
    :unique-opened="true"
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="home">
      <i class="el-icon-menu"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-submenu index="10">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>css 动画</span>
      </template>
      <el-menu-item index="animatecss">animate.css</el-menu-item>
      <el-menu-item index="hovercss">hover.css</el-menu-item>
    </el-submenu>
    <el-submenu index="20">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>element ui</span>
      </template>
      <el-submenu index="elForm">
        <template slot="title">表单</template>
        <el-menu-item index="elFormFieldValidation">验证</el-menu-item>
        <el-menu-item index="elFormCustom">自定义表单</el-menu-item>
      </el-submenu>
      <el-menu-item index="elTable">表格</el-menu-item>
    </el-submenu>
    <el-submenu index="30">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>vue 组件库</span>
      </template>
      <el-menu-item index="externalComponent">外部组件</el-menu-item>
      <el-menu-item index="customComponent">封装组件</el-menu-item>
    </el-submenu>
    <el-submenu index="40">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>js 库</span>
      </template>
      <el-menu-item index="contTo">js-md5</el-menu-item>
      <el-menu-item index="vueCookies">qs</el-menu-item>
    </el-submenu>

    <el-submenu index="50">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>h5 移动端</span>
      </template>
      <el-menu-item index="frame">架构</el-menu-item>
      <el-menu-item index="ui">ui</el-menu-item>
    </el-submenu>
    <el-menu-item index="60">
      <i class="el-icon-setting"></i>
      <span slot="title">小程序</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'mainMenu',
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
      this.defaultActive = name
    }
  }
</script>

<style scoped>

</style>
