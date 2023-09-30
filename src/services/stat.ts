import instance from './ajax'
import type { ResDataType } from './ajax'

/**
 * 获取问卷统计列表
 * @param questionId 问卷 id
 * @param opt
 */
export async function getQuestionStatListApi(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `/question/stat/${questionId}`
  const data = (await instance.get(url, { params: opt })) as ResDataType
  return data
}
