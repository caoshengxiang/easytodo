import Vue from 'vue'
import Router from 'vue-router'
import mainPage from './components/mainPage'
// import VueCookies from 'vue-cookies'
// import API from './utils/api'
// import { Loading } from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld
      name: 'root',
      redirect: '/web/home',
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
      path: '/web',
      name: 'web',
      component: mainPage,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/home/home'),
          meta: {
            pos: [{title: '首页', name: 'home'}]
          },
        },
        {
          path: 'animatecss',
          name: 'animatecss',
          component: () => import('./views/css/animatecss/animatecss'),
          meta: {
            pos: [
              {title: '首页', name: 'home'},
              {title: 'css 动画', name: 'animatecss'},
              {title: 'animate.css', name: 'animatecss'},
            ]
          },
        },
        {
          path: 'hovercss',
          name: 'hovercss',
          component: () => import('./views/css/hovercss/hovercss'),
          meta: {
            pos: [
              {title: '首页', name: 'home'},
              {title: 'css 动画', name: 'hovercss'},
              {title: 'hover.css', name: 'hovercss'},
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
