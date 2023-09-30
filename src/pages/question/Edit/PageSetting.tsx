import React, { FC, useEffect } from 'react'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch } from 'react-redux'
import { resetPageInfo } from '../../../store/pageInfoReducer'

const PageSetting: FC = () => {
  const { title, desc, js, css } = useGetPageInfo()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue({ title, desc, js, css })
  }, [title, desc, js, css])

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc, js, css }}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="请输入问卷描述" />
      </Form.Item>
      <Form.Item label="样式代码" name="css">
        <TextArea placeholder="请输入样式代码" />
      </Form.Item>
      <Form.Item label="脚本代码" name="js">
        <TextArea placeholder="请输入脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
