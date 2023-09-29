import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionParagraphDefaultProps, QuestionParagraphPropsType } from './interface'

const { Paragraph } = Typography

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props }

  // 把内容拆分为数组，循环表示出来
  const textList = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textList.map((text, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {text}
        </span>
      ))}
    </Paragraph>
  )
}

export default Component
