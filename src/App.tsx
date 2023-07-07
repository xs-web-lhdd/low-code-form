import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
// * 引入全局 UI 组件库的重置全局样式样式
import 'antd/dist/reset.css'

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
