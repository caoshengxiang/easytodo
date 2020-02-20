import Vue from 'vue'
import Router from 'vue-router'
import mainPage from './components/mainPage'
// import VueCookies from 'vue-cookies'
// import API from './utils/api'
// import { Loading } from 'element-ui'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      name: 'root',
      redirect: '/data/v',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/signin'),
      meta: {
        title: '登录',
        authKey: false,
      },
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('./views/error/error'),
      meta: {
        authKey: false,
      },
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('./demo/router-v'),
      children: [
        {
          path: 'v',
          name: 'v',
          component: () => import('./datav/data-bicycle/data-v'),
          meta: {
            title: '高新区共享单车智慧治理平台',
          },
        },
        {
          path: 'map',
          name: 'map',
          component: () => import('./datav/data-map/map-v'),
          meta: {
            title: '高新区共享单车智慧治理平台',
          },
        },
      ]},
    {
      path: '/demo',
      name: 'demo',
      component: () => import('./demo/router-v'),
      children: [
        {
          path: 'test',
          name: 'test',
          component: () => import('./demo/border/test'),
          meta: {
            title: '地图',
            pos: [{ title: '地图', name: 'map' }]
          },
        },
        {
          path: 'map',
          name: 'map',
          component: () => import('./demo/map/map'),
          meta: {
            title: '地图',
            pos: [{ title: '地图', name: 'map' }]
          },
        }, {
          path: 'border',
          name: 'border',
          component: () => import('./demo/border/border'),
          meta: {
            title: '边界',
            pos: [{ title: '边界', name: 'map' }]
          },
        },
      ]
    },
    {
      path: '/web',
      name: 'web',
      component: mainPage,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/home/home'),
          meta: {
            pos: [{ title: '首页', name: 'home' }]
          },
        },
        {
          path: 'animatecss',
          name: 'animatecss',
          component: () => import('./views/css/animatecss/animatecss'),
          meta: {
            pos: [
              { title: '首页', name: 'home' },
              { title: 'css 动画', name: 'animatecss' },
              { title: 'animate.css', name: 'animatecss' },
            ]
          },
        },
        {
          path: 'hovercss',
          name: 'hovercss',
          component: () => import('./views/css/hovercss/hovercss'),
          meta: {
            pos: [
              { title: '首页', name: 'home' },
              { title: 'css 动画', name: 'hovercss' },
              { title: 'hover.css', name: 'hovercss' },
            ]
          },
        },
        {
          path: 'magiccss',
          name: 'magiccss',
          component: () => import('./views/css/magiccss/magiccss'),
          meta: {
            pos: [
              { title: '首页', name: 'home' },
              { title: 'css 动画', name: 'magiccss' },
              { title: 'magic.css', name: 'magiccss' },
            ]
          },
        },
        { // 表单验证
          path: 'elFormFieldValidation',
          name: 'elFormFieldValidation',
          component: () => import('./views/element/elForm/elFormFieldValidation'),
          meta: {
            pos: [
              { title: '首页', name: 'home' },
              { title: 'element ui', name: 'elFormFieldValidation' },
              { title: '表单', name: 'elFormFieldValidation' },
              { title: '验证', name: 'elFormFieldValidation' },
            ]
          },
        },
        { // 自定义表单
          path: 'elFormCustom',
          name: 'elFormCustom',
          component: () => import('./views/element/elForm/elFormCustom'),
          meta: {
            pos: [
              { title: '首页', name: 'home' },
              { title: 'element ui', name: 'elFormCustom' },
              { title: '表单', name: 'elFormCustom' },
              { title: '自定义表单', name: 'elFormCustom' },
            ]
          },
        },
        {
          path: '*',
          name: '404',
          // redirect: '/',
          component: () => import('./views/404/404.vue'),
          meta: {
            title: '404',
          },
        },
      ],
    },
    {
      path: '*',
      name: '404',
      // redirect: '/',
      component: () => import('./views/404/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title // 在路由里面写入的meta里面的title字段
  } else {
    document.title = 'easy todo'
  }
  // if (to.query.token) { // 获取token
  //   const Token = to.query.token
  //   if (Token) {
  //     VueCookies.set('token', Token, 6 * 60 * 60)
  //   }
  // }
  if (to.meta.authKey) {
    /* let token = VueCookies.get('token')
     if (token) {
       const loading = Loading.service({
         lock: true,
         text: 'Loading',
         spinner: 'el-icon-loading',
         background: 'rgba(0, 0, 0, 0.7)'
       })
       API.other.checkToken({token: token}).then( // 检测token
         da => {
           if (da) {
             loading.close()
             next()
           } else {
             loading.close()
             next({
               path: '/error',
               // query: {
               //   backUrl: to.fullPath,
               // }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
             })
           }
         },
       )
     } else {
       next({
         path: '/error',
         // query: {
         //   backUrl: to.fullPath,
         // }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
       })
     } */
    next()
  } else {
    next()
  }
})

// 路由切换时回到页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
