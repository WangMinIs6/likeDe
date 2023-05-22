import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', component: () => import('@/views/login') },
    {
      path: '/',
      component: () => import('@/views/layout'),
      redirect: '/home',
      children: [
        { path: 'home', component: () => import('@/views/home') },
        { path: 'article', component: () => import('@/views/WorkOrder') }, // 运营工单
        { path: 'maintenance', component: () => import('@/views/WorkOrder/modules/maintenance.vue') }, // 运维工单
        { path: 'area', component: () => import('@/views/Pt/index.vue') }, // 区域管理
        { path: 'point', component: () => import('@/views/Pt/modules/Point .vue') }, // 点位管理
        { path: 'cooperation', component: () => import('@/views/Pt/modules/cooperation.vue') }, // 合作商管理
        { path: 'equipment', component: () => import('@/views/equipment') }, // 设备管理
        { path: 'status', component: () => import('@/views/equipment/modules/status.vue') }, // 设备状态
        { path: 'type', component: () => import('@/views/equipment/modules/type.vue') }, // 设备类型管理
        { path: 'people', component: () => import('@/views/people') }, // 人员列表
        { path: 'statistics', component: () => import('@/views/people/modules/statistics.vue') }, // 人员统计
        { path: 'WorkloadList', component: () => import('@/views/people/modules/WorkloadList.vue') }, // 工作量列表
        { path: 'goodsType', component: () => import('@/views/goods') }, // 商品类型
        { path: 'commodity', component: () => import('@/views/goods/modules/commodity.vue') }, // 商品管理
        { path: 'strategic', component: () => import('@/views/strategic') }, // 策略管理
        { path: 'order', component: () => import('@/views/order') }, // 订单管理
        { path: 'reconciliation', component: () => import('@/views/Reconciliation') } // 对账统计

      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (!store.state.user.token && to.path !== '/login') return next('/login')
//   next()
// })
export default router
