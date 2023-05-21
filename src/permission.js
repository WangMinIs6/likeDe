// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // 进度条样式
import store from './store'
// import { getToken } from '@/utils/auth'

import router from '@/router'
// 白名单
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  // console.log(token)
  if (token) {
    if (to.path === './login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // 使用await的目的：接口返回用户信息以后，再跳转页面，确保跳到了目标页面一定是有用户信息的
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
