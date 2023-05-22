const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  random: state => state.user.random,
  userInfo: state => state.user.userInfo
}
export default getters
