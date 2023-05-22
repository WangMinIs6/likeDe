<template>
  <el-container class=" operation-wrapper" style="height: 500px;">
    <el-header style="text-align: right; font-size: 12px">
      <img src="https://likede2-admin.itheima.net/img/logo.3673fab5.png" alt="">
      <div class="el-dropdown">
        <img style="width: 35px;margin-right:15px" src="data:image/png;base64,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" alt="">
        <span style="font-size: 18px; margin-right: 20px; color: #fff ">欢迎您:{{ name }}</span>
        <span style="font-size: 18px; color:#fff" @click="userBtn('loginOut')">退出<i class="el-icon-caret-bottom" /></span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="170px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['0', '8']" active-text-color="#6984ff" popper-class @select="pushBtn">
          <el-menu-item index="0">
            <i class="el-icon-s-home" />
            <span slot="title" class="spanitem"> 帝可得</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-order" /><span class="spanitem">工单管理</span></template>
            <el-menu-item-group>
              <template slot="title" />
              <el-menu-item index="1-1"><span class="spanitem item">运营工单</span></el-menu-item>
              <el-menu-item index="1-2"><span class="spanitem item">运维工单</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-location" /><span class="spanitem">点位管理</span></template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="2-1"><span class="spanitem item">区域管理</span></el-menu-item>
              <el-menu-item index="2-2"><span class="spanitem item">点位管理</span></el-menu-item>
              <el-menu-item index="2-3"><span class="spanitem item">合作商管理</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" translate="">
            <template slot="title"><i class="el-icon-s-cooperation" /><span class="spanitem">设备管理</span></template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="3-1"><span class="spanitem item">设备管理</span></el-menu-item>
              <el-menu-item index="3-2"><span class="spanitem item">设备状态</span></el-menu-item>
              <el-menu-item index="3-3"><span class="spanitem item">设备类型管理</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-custom" /><span class="spanitem">人员管理</span></template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="4-1"><span class="spanitem item">人员列表</span></el-menu-item>
              <el-menu-item index="4-2"><span class="spanitem item">人效统计</span></el-menu-item>
              <el-menu-item index="4-3"><span class="spanitem item">工作量列表</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-goods" /><span class="spanitem">商品管理</span></template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="5-1"><span class="spanitem item">商品类型</span></el-menu-item>
              <el-menu-item index="5-2"><span class="spanitem item">商品管理</span></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="6">
            <i class="el-icon-s-opportunity" />
            <span slot="title" class="spanitem">策略管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-s-order" />
            <span slot="title" class="spanitem">订单管理</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-edit" />
            <span slot="title" class="spanitem">对账统计</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 路由主体 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { removeToken, removeUserInfo } from '@/utils/auth'
export default {
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = store.getters.userInfo
  },
  methods: {
    userBtn(type) {
      if (type === 'loginOut') {
        console.log('退出')
        removeToken()
        removeUserInfo()
        router.push('/login')
      }
    },
    pushBtn(index) {
      console.log(index)
      if (index === '0') return router.push('/home')
      if (index === '1-1') return router.push('/article')
      if (index === '1-2') return router.push('/maintenance')
      if (index === '2-1') return router.push('/area')
      if (index === '2-2') return router.push('/point')
      if (index === '2-3') return router.push('/cooperation')
      if (index === '3-1') return router.push('/equipment')
      if (index === '3-2') return router.push('/status')
      if (index === '3-3') return router.push('/type')
      if (index === '4-1') return router.push('/people')
      if (index === '4-2') return router.push('/statistics')
      if (index === '4-3') return router.push('/WorkloadList')
      if (index === '5-1') return router.push('/goodsType')
      if (index === '5-2') return router.push('/commodity')
      router.push(index === '6' ? '/strategic' : index === '7' ? '/order' : index === '8' ? '/reconciliation' : '/')
    }
  }

}
</script>

<style lang="scss">

  .operation-wrapper {
  width: 100% !important;
  .el-header {
    background-color: #5373e0;
    width: 100%;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-dropdown{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    img{
      width: 90px;
    }
  }
  .el-aside {
    // width:170px;
    height: calc(100vh - 61px); //61px为顶部header盒子高度
    //主体滚动
    overflow-y: auto;
    overflow-x: hidden;
    // display: none;
    color: #333;
    background-color: #fff!important;
    // overflow: hidden;
    .el-menu{
    font-size: 16px;
    .spanitem{
      padding-left: 10px;
        }
    .item{
      padding-left: 42px;
    }
    i{
      margin-right:7px ;
      padding-left: 5px;
    }
    .el-submenu__title{
      padding-left: 15px!important;
    }
    .el-menu-item{
      // width: 120px!important;
      padding-right: 0 !important;
      padding-left: 15px!important;
      // overflow: hidden!important;;

    }
  }
  }
    .el-aside::-webkit-scrollbar {
    display: none;
}
  .el-main {
    padding: 20px!important;
    height: calc(100vh - 61px); //61px为顶部header盒子高度
    overflow-y: auto;
    background-color: #f8fafd!important;
  }
   /* 修改滚动条宽度 */
::-webkit-scrollbar {
  width: 8px;
  border-radius:50%; /* 设置圆角半径 */
  background-color: #ddd;
  }
  /* 修改滚动条轨道颜色 */
::-webkit-scrollbar-track {

  background-color: #F5F5F5;
 }
 /* 修改滚动条滑块颜色 */
::-webkit-scrollbar-thumb {
  background-color: #ddd;
}
/* 鼠标停留在滑块上的颜色 */
::-webkit-scrollbar-thumb:hover {
  background-color: #bbbbbb;
}

  // 侧边滚动条
  .el-aside::-webkit-scrollbar {
  display: none;
}

}

</style>
