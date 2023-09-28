/**
 * @description 存储/获取 token
 * @author 氧化氢
 */

const KEY = 'USER_TOKEN'

export function setToken(token: string) {
  localStorage.setItem(KEY, token)
}

export function getToken() {
  return localStorage.getItem(KEY) || ''
}

export function removeToken() {
  localStorage.removeItem(KEY)
}
