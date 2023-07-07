import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import Styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={Styles.header}>
        <div className={Styles.left}>
          <Logo />
        </div>
        <div className={Styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={Styles.main}>
        <Outlet />
      </Content>
      <Footer className={Styles.footer}>小慕问卷 &copy; 2023 - present. Created by 刘豪</Footer>
    </Layout>
  )
}

export default MainLayout
