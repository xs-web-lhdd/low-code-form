# 介绍此项目安装的包

## immer
### 使用原因：
+ state 是不可变数据
+ 操作成本较高，有很大的不稳定性
+ 使用 immer 可避免这一问题

### 安装 immer：
`npm i immer --save`


### 示例：
```tsx
// immer 改造前
import React, { FC, useState } from 'react';

const Demo: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: '刘豪', age: 20 })

  function changeAge() {
    // 不能 userInfo.age = 22 这样写
    setUserInfo({ ...userInfo, age: 22 })
  }

  return (
    <>
      <div>
        <h2>不可变数据</h2>
        <div>{JSON.stringify(userInfo)}</div>
        <button onClick={changeAge}>change Age</button>
      </div>
    </>
  )
}

export default Demo
```
```tsx
// immer 改造后
import React, { FC, useState } from 'react';
import { produce } from 'immer';

const ImmerDemo: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: '刘豪', age: 20 })

  function changeAge() {
    setUserInfo(produce(draft => {
      draft.age = 21
      draft.name = 'hello'
    }))
  }

  return (
    <>
      <div>
        <h2>不可变数据</h2>
        <div>{JSON.stringify(userInfo)}</div>
        <button onClick={changeAge}>change Age</button>
      </div>
    </>
  )
}

export default ImmerDemo
```

### 历史：
在 immer 之前，使用的是 `immutable.js`，被淘汰的原因是它有自己的一套 API 学习成本比较高

## ahooks
### 使用原因
+ ahooks 是一个第三方的 hooks 库，包含常用的第三方 hooks
### 安装
`npm i ahooks --dev`

## classname
### 官方文档：
[classname](https://github.com/JedWatson/classnames)
### 用法：
```ts
var classNames = require('classnames')
classNames('foo', 'bar')  // => 'foo bar'
```

## axios
### 介绍
网络请求库
### 安装
`npm i axios --save`

## mock.js
### 模拟 ajax 请求
### 安装
+ 安装库 `npm i mockjs --save`
+ 安装类型 `npm i --save-dev @types/mockjs`

## craco.js
### 介绍
+ 使用 craco.js 扩展 webpack 配置，使用 devServer 解决跨域
+ [github地址](https://github.com/dilanx/craco)

### 配置 devServer 解决跨域
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001/',
    },
  },
}
```

## Redux
### 介绍
+ 使用 redux 进行状态管理, Mbox 也是状态管理

## nanoid
+ 生成一个不重复的 id

## 拖拽库选择
### React-dnd
+ github star 多,代码更新及时
+ npm 下载量大
+ 文档已读,demo 较复杂

### React-beautiful-dnd
+ github star 多,代码更新不及时
+ npm 下载量大(但提示暂无精力维护)
+ demo 好理解(但不支持 React18 严格模式)

### Sortable.js
+ 老牌拖拽排序 lib,不依赖于 React 和 Vue
+ 官方提供了 React 版本,但提示不建议用于生产环境

### Dnd-kit
+ github star 不是非常多 6k,代码更新及时
+ npm 周下载量 48 万
+ 文档和 Demo 比较好理解