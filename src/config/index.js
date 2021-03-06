import Vue from 'vue'

import '../registerServiceWorker'
import '../styles/basic.css'
import './element_ui' // element
import animated from 'animate.css'

// 引入弹窗组件
import vDialogs from 'v-dialogs'

// monment 作为全局方法
import moment from 'moment'
import webStorage from 'webStorage'
import VueCookies from 'vue-cookies'

// 将自动注册所有组件为全局组件 data-v
import dataV from '@jiaminghi/data-view'

// echarts
import echarts from 'echarts'

Vue.use(vDialogs)
Vue.use(animated)
Vue.use(dataV)

Vue.prototype.$moment = (t, format) => {
  if (!t) {
    return ''
  }
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  // console.log(moment(t).format(format))
  return moment(t).format(format)
}
Vue.prototype.$webStorage = webStorage
VueCookies.config(60 * 24 * 60 * 60) // 单位秒，配置默认有效期
Vue.prototype.$VueCookies = VueCookies
Vue.prototype.$echarts = echarts
