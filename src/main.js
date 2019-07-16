import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './styles/basic.css'
import './element_ui' // element
import animated from 'animate.css'

// 引入弹窗组件
import vDialogs from 'v-dialogs'

// monment 作为全局方法
import moment from 'moment'
import webStorage from 'webStorage'
import VueCookies from 'vue-cookies'

Vue.use(vDialogs)
Vue.use(animated)

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
VueCookies.config(2 * 60 * 60) // 单位秒，配置默认有效期
Vue.prototype.$VueCookies = VueCookies

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
