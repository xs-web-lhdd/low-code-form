import React, { FC } from 'react'
import { useParams } from 'react-router-dom'

const Edit: FC = () => {
  // 解析获取动态路由中的 id
  const { id = '' } = useParams()

  return <p>Edit {id}</p>
}

export default Edit
