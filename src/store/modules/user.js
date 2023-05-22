import { setToken, getToken, getUserInfo, setUserInfo } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { login } from '@/api/user'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: getUserInfo(),
    random: ''
    // userInfo: {
    //   regionId: '1357163508105482242',
    //   repair: false,
    //   roleCode: '1001',
    //   userId: 63
    // }
  }
}

const state = getDefaultState()

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  upUserInfo: (state, userInfo) => {
    state.userInfo = userInfo.userName
    setUserInfo(userInfo.userName)
  },

  upRandom: (state, random) => {
    state.random = random
  },
  logout(state) {
    state.token = ''
  }
}

const actions = {
  async login(ctx, form) {
    const data = await login(form)
    console.log(data)
    if (data.success) {
      ctx.commit('setToken', data.token)
      ctx.commit('upUserInfo', data)
      console.log('成功')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }
    // this.$message(data.msg)
  }

  // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  // user logout
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     removeToken() // must remove  token  first
  //     commit('RESET_STATE')
  //     resolve()
  //   })
  // }
}
// const getters = {
//   userInfo(state) {
//     console.log(JSON.parse(state.userInfo))
//     return JSON.parse(state.userInfo)
//   }
// }

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

