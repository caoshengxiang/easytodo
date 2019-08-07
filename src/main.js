import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './config/mixin'
import './config'

Vue.config.productionTip = false

new Vue({
  mixins: [mixin],
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 在创建 Vue 实例之前全局定义过滤器, 暂时未在config/index.js 引入
