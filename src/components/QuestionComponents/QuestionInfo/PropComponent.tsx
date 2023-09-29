import React, { FC, useEffect } from 'react'
import { QuestionInfoPropsType, QuestionInfoDefaultProps } from './interface'
import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', desc = '', onChange, disabled } = { ...QuestionInfoDefaultProps, ...props }

  const [form] = Form.useForm()

  // 监听变化
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }

  return (
    <Form
      onValuesChange={handleValueChange}
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
