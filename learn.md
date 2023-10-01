# JSX 的基础语法
+ JSX - JS的扩展，写在 JS 代码里面，组件的 UI 结构
+ 语法和 HTML 很相似，学起来容易
+ 已成为 ES 规范（不是 React 独有）可用于其他框架，如 Vue3

### 标签和 HTML 的区别：
+ 首字母大小写的区别，大写是自定义组件
+ 标签必须要闭合，如 <input> 在 JSX 中是非法的
+ 每段 JSX 只能有一个根节点，可以使用 Fragment(空标签`<></>`) 来定义多个节点
```tsx
const list = (
  <>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <p>Hello world!</p>
  </p>
)
```

### 属性：
+ class 要改成 className，在 tsx 中属性不能使用 class，因为 class 是一个关键字
+ style 要使用 JS 对象（不能是 string）而且 key 用驼峰写法
```tsx
const list = (
   <p style={{color: 'red', backgroundColor: 'blue'}}>world!</p>
)
```
+ for 要改为 htmlFor（避免关键字）
```tsx
const list = (
  <div>
    <label htmlFor="input">姓名</label>
    <input id="input" />
  </div>
)
```

### 事件：
+ 使用 onXxx 的形式
+ 必须传入函数（是 fn 而非 fn()）
+ 注意 typescript 类型
```tsx
<div>
  <button onClick={() => {console.log('click')}}>click</button>
</div>
```

### 条件判断：
+ 使用 &&
+ 使用三元表达式
+ 使用函数
```tsx
const flag = true
function Hello() {
  if (flag) return <p>hello</p>
  return <p>你好</p>
}
<div>
  {flag && <p>Hello</p>}
  {flag ? <p>Hello</p> : <p>你好</p>}
  <Hello></Hello>
</div>
```
### 循环：
+ 使用数组 map
+ 每个 item 元素需要 key 属性
+ key 在同一级唯一



# eslint + prettier 规范代码：
1、使用 prettier
`npm install prettier eslint-config-prettier eslint-plugin-config`

2、进行配置：

3、vscode安装 prettier 的插件

4、添加 format 命令
`"format": "prettier --write src/**/*.{js,jsx,ts,tsx}"`
5、定义自己的 prettier 文件，在项目根目录新建 .prettier.js 文件
```js
module.exports = {
  // 箭头函数只有一个参数的时候可以忽略括号
  arrowParens: 'avoid',
  // 括号内不出现空格
  bracketSpacing: true,
  // 行结束符号用 unix
  endOfLine: 'auto',
  jsxBracketSameLine: false,
  printWidth: 100,
  // 换行方式
  proseWrap: 'preserve',
  // 分号
  semi: false,
  // 单引号
  singleQuote: true,
  // 缩进
  tabWidth: 2,
  // 使用 tabs 缩进
  useTabs: false,
  trailingComma: 'es5',
  parser: 'typescript'
}
```

# git 提交规范
## husky 用来规范流程
1. 一个 git hook 工具
2. 在 git commit 之前执行自定义命令
3. 如执行代码风格的检查，避免提交非规范代码

git commit -m ""

## 使用 husky
1. 安装：`npm install husky -D`
2. 使用 husky

## 使用 commitlint 来规范提交的 commit 格式
1. 文档: `https://github.com/conventional-changelog/commitlint`
2. 在项目根目录下配置 `commitlint.config.js`
```js
module.exports = { extends: ['@commitlint/config-conventional'] }
```

### webpack 和 vite 的区别：
#### 是什么？
+ webpack 是一个非常流行的前端打包工具
+ create-react-app 内部使用 webpack 进行打包，是一个构建工具
+ vite 既是构建工具，又是打包工具

#### vite 特点：
1. vite 比 CRA 打包项目更快（启动时，代码更新时）
2. vite 使用了 ES Module 的语法（仅开发环境）

> 注：但技术选型需要综合考虑，包括稳定性、成本、效率等等



# React Hooks
### 目标：
+ 学会 React 内置 Hooks
+ 学会自定义 Hooks（复用代码）
+ 学会使用第三方 Hooks（提高效率）

### 内置 Hooks：
+ useState
+ useEffect
+ 其他内置 Hooks
  + useRef

#### useState：
+ 使用 useState 可以使页面随着数据的变化而更新，普通变量无法实现
+ useState 触发组件的更新（如果说一个变量不用于 JSX 中显示，那就不要用 setState 来管理它， 用 useRef）
```tsx
import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0)

  function add() {
    setCount(count + 1)
  }


  return (
    <>
      <div>
        <button onClick={add}>add {count}</button>
      </div>
    </>
  );
}

export default App;
```

+ props：父组件传递过来的信息
+ state：组件内部的状态信息，不对外
+ state变化，出发组件更新，重新渲染页面

##### state 特点：
+ 异步更新，无法拿到最新的 state 值
+ 可能会被合并（通过值会合并，但是通过函数是不会被合并的）
+ 不可变数据（重要！！！），不去直接修改 state 的值，而是要传入一个新的值

#### useEffect:
+ 在 React18开始，useEffect 在开发环境下会执行两次
+ 模拟组件创建、销毁、再创建的完整流程，及早暴露问题
+ 生产环境下会执行一次
##### 副作用：
+ 当组件渲染完成时，加载一个 Ajax 网络请求
+ 当某个 state 更新时，加载一个 Ajax 网络请求
+ 使用 useEffect 实现

#### useRef:
+ 一般用于操作 DOM
+ 也可以传入普通 JS 变量(通过 .current 取到值)，但更新不会触发页面更新 rerender
+ 要和 Vue3 ref 区分开

```tsx
// 示例
import React, { FC, useState, useRef } from 'react';

const UseRefDemo: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  function selectInput() {
    const inputElem = inputRef.current
    if (inputElem) {
      inputElem.select()
    }
  }

  return (
    <>
      <div>
        <input ref={inputRef} defaultValue='hello world' />
        <button onClick={selectInput}>选中 Input</button>
      </div>
    </>
  )
}

export default UseRefDemo
```

#### useMemo：
+ 函数组件，每次 state 更新都会重新执行函数
+ useMemo 可以缓存数据，不用每次执行函数都重新生成
+ 可用于计算量较大的场景，提升性能
```tsx
import React, { FC, useState, useMemo } from 'react';

const UseRefDemo: FC = () => {
  console.log('demo 执行...');
  const [num1, setNum1] = useState(10)
  const [num2, setNum2] = useState(20)
  const [text, setText] = useState('hello world')

  const sum = useMemo(() =>  {
    console.log('useMemo 执行...');
    return num1 + num2
  }, [num1, num2])

  return (
    <>
      <p>{ sum }</p>
      <p>
        { num1 } : <button onClick={() => setNum1(num1 + 1)}>add num1</button>
      </p>
      <p>
        { num2 } : <button onClick={() => setNum2(num2 + 1)}>add num2</button>
      </p>
      <div>
        <input onChange={e => setText(e.target.value)} value={text} />
      </div>
    </>
  )
}

export default UseRefDemo
```

#### useCallback:
+ 专门用来缓存函数

### 自定义 Hooks
+ 内置 Hooks 保证基础功能
+ 内置 Hooks 灵活配合，实现业务功能
+ 抽离公共部分，自定义 Hooks 或者 第三方 Hooks ———— 复用代码
#### React 组件公共逻辑的抽离和复用
+ 之前是 class 组件，现在是函数组件
+ class 组件：Mixin HOC render-props 来复用公共逻辑
+ 函数组件：使用 Hooks ———— 当前最完美的解决方案，Vue3 也参考
```ts
// 自定义 useMouseHooks
import { useState, useEffect } from 'react';

function useMouse() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const mouseMoveHandler = (event: MouseEvent) => {
    setX(event.clientX)
    setY(event.clientY)
  }

  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandler)

    return () => {
      window.addEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return { x, y }
}

export default useMouse
```

### 第三方 Hooks，提高效率
+ [ahooks](https://ahooks.js.org/zh-CN)
+ [react-use](https://github.com/streamich/react-use)

### Hooks 使用规则
+ 必须用 useXxx 格式来命名
+ 只能在两个地方调用 Hook（组件内，其他 Hook 内）
+ 必须保证每次的调用顺序一致（不能放在 if for 内部，提前 return）

```tsx
// 错误示例：放在 if 语句内
import { useEffect } from 'react'
function App() {
  const b = true
  if (b) {
    useEffect(() => {
      // code...
    }, [])
  }

  // 提前 return
  const c = false
  if c return null
  useEffect(() => {
    // code...
  }, [])

  return (
    <>
      <div>Demo</div>
    </>
  )
}

export default App
```


### 闭包陷阱：
+ 当异步函数获取 state 时，可能不是当前最新的 state
+ 可以使用 useRef 来解决


# CSS
## 元素内联 style
+ 和 HTML 元素的 style 类似
+ 但必须是 JS 对象的写法，不能是字符串
+ 名字要用驼峰式的写法：fontSize
## 尽量不要使用内联 style
+ 内联 style 代码多，性能差，扩展不好
+ 外联 css 文件可复用代码，可单独缓存文件
## 使用 CSS Module （解决 className 可能会重复的问题）
+ 每个 CSS 文件都当作单独的模块，命令：xxx.module.css
+ 为每个 className 增加后缀名，不让它们重复
+ Create-React-App 原生支持 CSS Module
## 使用 Sass
+ CSS 语法比较原始，如不能嵌套
+ 现在开发一般使用 `less sass` 等预处理语言
+ CRA 原生支持 Sass Module，后缀改为 `.scss` 即可
## CSS in JS
+ 一种解决方案（而非工具名称），有好几个工具
+ 在 JS 中写 CSS，带来极大的灵活性
+ 它和内联 style 完全不一样，也不会有内联 style 的问题


# 路由
### 背景
+ web 系统需要多个页面
+ 多页面就需要用路由来管理

### 基本用法
+ 配置路由文件
```tsx
import { RouterProvider } from 'react-router-dom'
import router from './router'
// 在 App.tsx 中使用
function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
```
+ 跳转
```tsx
// 1 通过 Link 跳转，Link 需要从 react-router-dom 导入
<Link to={REGISTER_PATHNAME}>去注册新用户</Link>
// 2 通过 useNavigate 进行跳转
const nav = useNavigate()
// 不携带参数版
nav(`/question`)}
// 携带参数版
nav({
  pathname: '/login',
  search: 'b=21'
})
// 等同于
nav('login?b=21')
```
+ 获取参数
```tsx
import { useParams, useSearchParams } from 'react-router-dom'
// code...
// 获取动态 id
const { id } = useParams()
// 获取传递的其他参数
const [searchParams] = useSearchParams()
// 拿到传递建为 keyword 的值
console.log(searchParams.get('keyword'))
```


# mock 服务
+ 使用 mock.js [mock.js 官网](http://mockjs.com/)
  + 前端代码引入 mock.js
  + 定义要模拟的路由，返回结果
  + mock.js 劫持 ajax 请求，得到模拟的结果（只能劫持 XMLHttpRequest 不能劫持 fetch）
  + 要在生产环境下注释掉，否则线上请求也被接触
  + 结论：不建议在项目中直接使用 mock.js
+ 使用 nodejs 服务 + mock.js
  + mock.js 两大功能：劫持 Ajax + 全面的 Random 能力
  + 把 mock.js 用于 nodejs 服务端，使用 Random 能力
+ 使用在线 mock 平台
  + 如: [fastmock](https://www.fastmock.site/#/)
  + 可能不稳定、不维护，或者网络不稳定
  + 可能存在敏感数据泄露的风险（如果是公司内部的可以尝试）
  + 优点就是快，配置完即可使用

# 设计相关
1. 搜索输入框和列表不要有直接的联系，而是通过改变 url 参数，然后 url 参数改变带动列表变化
2. 分页组件，与 url 参数关联在一块，url 参数改变从而带动列表发生变化
3. 上滑加载更多就不能改变分页这种形式
+ 扩展性
  + 从最简单的组件开始
  + 定义好规则，跑通流程
  + 增加其他组件，不改变编辑器的规则（开放封闭原则，对扩展开放，对修改封闭）

# 状态相关
+ Context+

## Context
+ 可跨层级传递,而不像 props 层层传递
+ 类似 Vue 的 provide/inject
```tsx
// 祖先组件
const value = {}
const ThemeContext = createContext()
const Demo = () => {
  return (
    <context.Provider value={value}>
    </context.Provider>
  )
}
```
```tsx
// 子孙组件
import { FC, useContext } from 'react'
import { ThemeContext } from '祖先组件'

const ThemeBtn: FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <>
      <button>xxx</button>
    </>
  )
}
```

## useReducer
+ useState 的代替方案
+ 数据结构简单时用 useState,复杂时用的 useReducer
+ 简化版的 redux

```tsx
// 使用 useState 版
import React, { FC, useState } from 'react'

const CountReducer: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <span>count: {count}</span>
      <button onClick={() => setCount(count + 1)}></button>
      <button onClick={() => setCount(count - 1)}></button>
    </>
  )
}
```

```tsx
// 使用 useReducer 版
import React, { FC, useReducer } from 'react'

type StateType = { count: number }
type ActionType = { type: string }

const initialState: StateType = { count: 100 }
// 根据传入的 action 返回新的 state(不可变数据)
function reducer(state: StateType, action: ActionType) {
  switch action.type {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const CountReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <span>count: {state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}
```

# 选择第三方插件的依据
+ 看 github star 和 npm 下载量
+ 看 github 代码更新,和 npm 发布频率
+ 看文档和 demo 是否通俗易懂

# 优化
## 优化代码体积
+ 分析代码体积 [Analyzing-the-bundle-size](https://create-react-app.dev/docs/analyzing-the-bundle-size)
  + 安装 `npm install --save source-map-explorer`
  + 添加脚本 
      ```js
          "scripts": {
        +    "analyze": "source-map-explorer 'build/static/js/*.js'",
             "start": "react-scripts start",
             "build": "react-scripts build",
             "test": "react-scripts test",
          }
      ```
  + 执行命令
      ```bash
          npm run build
          npm run analyze
      ```

+ 路由懒加载，拆分 bundle，优化首页体积

# 测试
+ 单元测试
  + 针对一个一个独立的单元，而非整体
  + 单元测试，某个模块、函数、组件，开发人员编写
  + 系统测试，整个系统的功能流程，专业测试人员做
+ 自动化测试
+ 可视化测试
> 1. 自动化测试非常重要（流程 + 工具，而非依赖人的主观）
> 2. 前端，不是所有的组件都适合测试

[jest](https://jestjs.cn/docs/getting-started)

## 测试文件的位置
+ 选择1：统一放在 __test__ 目录下
+ 选择2：和源码文件放在一起，使用 .test.ts 后缀
+ 建议后者：可读性好，不容易忘记

