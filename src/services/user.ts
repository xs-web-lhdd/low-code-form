import instance from './ajax'
import type { ResDataType } from './ajax'

// 获取用户信息
export async function getUserInfoApi(): Promise<ResDataType> {
  const url = '/user/info'
  const data = (await instance.get(url)) as ResDataType
  return data
}

// 注册用户
export async function registerApi(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = '/user/register'
  const body = {
    username,
    password,
    nickname: nickname || username,
  }
  const data = (await instance.post(url, body)) as ResDataType
  return data
}

// 登陆
export async function loginApi(username: string, password: string): Promise<ResDataType> {
  const url = '/user/login'
  const body = {
    username,
    password,
  }
  const data = (await instance.post(url, body)) as ResDataType
  return data
}
