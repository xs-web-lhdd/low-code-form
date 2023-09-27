import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    error: 0,
    data: {
      name: `test ajax ${Date.now()}`,
    },
  }
})
