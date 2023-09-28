import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '../router/index'

export function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    if (isNoNeedUserInfo(pathname)) return
    else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, pathname, username])
}
