import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Styles from './Login.module.scss'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { REGISTER_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import { loginApi } from '../services/user'
import { useRequest } from 'ahooks'
import { setToken } from '../utils/user-token'

type FormType = {
  username: string
  password: string
  remember: boolean
}

const USERNAME_KEY = 'username'
const PASSWORD_KEY = 'password'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
function deleteUserFormStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
function getUserInfoFormStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const { Title } = Typography

const Login: FC = () => {
  const nav = useNavigate()
  const { run: login } = useRequest(
    async (username, password) => await loginApi(username, password),
    {
      manual: true,
      onSuccess(result) {
        // 获取 token 进行存储
        const { token = '' } = result
        setToken(token)
        message.success('登陆成功!')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )
  const [form] = Form.useForm()
  useEffect(() => {
    const { username, password } = getUserInfoFormStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const onFinish = (values: FormType) => {
    const { username, password, remember } = values
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFormStorage()
    }
    // 进行登陆请求
    login(username, password)
  }

  return (
    <div className={Styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登陆</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="true"
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入你的用户名！' },
              { type: 'string', min: 5, max: 20, message: '字符长度在5到20之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入你的密码！' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登陆
              </Button>
              <Link to={REGISTER_PATHNAME}>去注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
