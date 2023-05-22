import Cookies from 'js-cookie'

const TokenKey = 'likeDe_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const userInfo = 'myLikeUser'
export function getUserInfo() {
  return Cookies.get(userInfo)
}

export function setUserInfo(info) {
  return Cookies.set(userInfo, info)
}

export function removeUserInfo() {
  return Cookies.remove(userInfo)
}
