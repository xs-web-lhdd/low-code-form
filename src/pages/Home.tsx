import React, { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'

const Home: FC = () => {
  const nav = useNavigate()

  function clickHandler() {
    // nav('/login?b=20')
    nav({
      pathname: '/login',
      search: 'b=21',
    })
  }

  return (
    <div>
      <p>
        Home <Button>antd button</Button>
      </p>
      <Button onClick={clickHandler}>登陆</Button>
      <Link to="/register?a=10">注册</Link>
    </div>
  )
}

export default Home
