<template>
  <!-- 	https://likede2-admin.itheima.net/img/background.be4fae7d.png -->
  <div class="login-container">
    <img src="https://likede2-admin.itheima.net/img/logo.595745bd.png" class="login-logo" alt="">
    <el-card shadow="never" class="login-form">
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.loginName" placeholder="请输入用户名" style="width : 100%" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" show-password placeholder="请输入密码" style="width : 100%" />
        </el-form-item>
        <el-form-item>
          <div class="CaptchaBox">
            <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width : 70%" />
            <div class="Captcha" @click="refresh">
              <img :src="imageCode" alt="">
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import store from '@/store'
import { login } from '@/api/user'
// import { mapActions } from 'vuex'
// import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        loginName: 'demo',
        password: '888itcast.CN764%...',
        clientToken: '',
        code: '',
        loginType: 0
      },
      imageCode: '',
      rules: {
        mobile: [{
          required: true,
          message: '请输入用户名号',
          trigger: 'blur'
        }, {
          pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{4,12}$/,
          message: '用户名格式不正确',
          trigger: 'blur'

        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, {
          min: 6,
          max: 16,
          message: '密码长度应该为6-16位之间',
          trigger: 'blur'

        }]

      }
    }
  },
  async created() {
    this.refresh()
  },
  methods: {
    // 随机字符串
    randomString(e) {
      e = e || 32
      var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var a = t.length
      var n = ''
      for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
      return n
    },
    async login() {
      const data = await login(this.loginForm)
      console.log(data)
      this.$message(data.msg)
      console.log(store.getters.token)
      if (data.success) {
        store.commit('user/setToken', data.token)
        console.log('成功')
        setTimeout(() => {
          this.$router.push('./')
        }, 1500)
      }
    },
    refresh() {
      const random = this.randomString(30)
      store.commit('user/upRandom', random)
      this.imageCode = `https://likede2-java.itheima.net/api/user-service/user/imageCode/${random}`
      this.loginForm.clientToken = random
    }

  }
}
</script>
<style lang="scss">
.login-container {
    position: relative;
    height: 100%;
    width: 100%;
    // overflow: hidden;
    background-image: url('https://likede2-admin.itheima.net/img/background.be4fae7d.png');
    background-repeat: no-repeat;
    background-size: cover;
    .login-form{
          position: absolute;
          width: 518px;
          height: 450px;
          top: 50%;
          left: 50%;
          margin-top: -225px;
          margin-left: -259px;
          padding: 76px 35px 0;
          background: #fff;
          -webkit-box-shadow: 0 3px 70px 0 rgba(30,111,72,.35);
          box-shadow: 0 3px 70px 0 rgba(30,111,72,.35);
          border-radius: 10px;
          .el-card__body{
            margin-top: 20px;
            .el-button{
              width: 100%;
              height: 50px;
            }
            .el-input__inner{
              height: 50px;
            }
            .CaptchaBox{
              display: flex;
              .Captcha{
                flex: 1;
                height: 50px;
                overflow: hidden;
                // background-color: aquamarine;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
    }
          .login-logo{
                position: absolute;
                width: 96px;
                height: 96px;
                top: 18%;
                left: 50%;
                margin-left: -48px;
                z-index: 999;
          }
}
</style>
