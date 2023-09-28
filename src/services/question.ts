import instance from './ajax'
import type { ResDataType } from './ajax'

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export async function getQuestionInfoApi(id: string): Promise<ResDataType> {
  const url = `/question/${id}`
  const data = (await instance.get(url)) as ResDataType
  return data
}

// 新建问卷
export async function createQuestionApi(): Promise<ResDataType> {
  const url = '/question'
  const data = (await instance.post(url)) as ResDataType
  return data
}

// 获取问卷列表
export async function getQuestionListApi(params: Partial<SearchOption> = {}): Promise<ResDataType> {
  const url = '/question'
  const data = (await instance.get(url, { params })) as ResDataType
  return data
}

// 更新单个问卷
export async function updateQuestionApi(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/question/${id}`
  const data = (await instance.post(url, opt)) as ResDataType
  return data
}

// 复制问卷
export async function duplicateQuestionApi(id: string): Promise<ResDataType> {
  const url = `/question/duplicate/${id}`
  const data = (await instance.post(url)) as ResDataType
  return data
}

// 批量彻底删除
export async function deleteQuestionApi(ids: string[]): Promise<ResDataType> {
  const url = '/question/delete'
  const data = (await instance.post(url, { ids })) as ResDataType
  return data
}
