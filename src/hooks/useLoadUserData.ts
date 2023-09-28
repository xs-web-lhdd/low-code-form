import { useState, useEffect } from 'react'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { getUserInfoApi } from '../services/user'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

/**
 * 数据加载完之后放在 redux 不用统一返回，返回一个状态即可
 * @returns
 */
function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()

  const { run: loadUserData } = useRequest(getUserInfoApi, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      // 存储在 redux 中
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  useEffect(() => {
    if (username) {
      setWaitingUserData(false)
      return
    }
    // 加载用户信息
    loadUserData()
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
