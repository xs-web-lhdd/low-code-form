import React, { FC } from 'react'
// Outlet 就相当于 Vue 中的 slot
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Styles from './MainLayout.module.scss'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import { useNavPage } from '../hooks/useNavPage'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

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
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={Styles.footer}>小慕问卷 &copy; 2023 - present. Created by 刘豪</Footer>
    </Layout>
  )
}

export default MainLayout
