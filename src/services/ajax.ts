import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const instance = axios.create({
  // mock 地址：
  baseURL: 'https://www.fastmock.site/mock/ffa4b681f01ac3ea64cd89b5a68b0e25/api',
  timeout: 10 * 1000,
})

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { code, data, message: msg } = resData
  if (code !== 200) {
    // 错误提示
    if (msg) {
      message.error(msg)
    }
    // throw new Error(msg)
    return
  }

  return data as any
})

export default instance

export type ResType = {
  code: number
  data?: ResDataType
  message?: string
}

export type ResDataType = {
  [key: string]: any
}
