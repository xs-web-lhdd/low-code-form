import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '../router'
import { getUserInfoApi } from '../services/user'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import { removeToken } from '../utils/user-token'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const { data } = useRequest(getUserInfoApi)
  const { username, nickname } = data || {}

  function logout() {
    removeToken()
    message.success('退出成功!')
    nav('/login')
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button onClick={logout} type="link">
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登陆</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
