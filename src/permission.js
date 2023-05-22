// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // 进度条样式
// import store from './store'
import { getToken } from '@/utils/auth'

import router from '@/router'
// 白名单
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = getToken()
  // console.log(token)
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
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
