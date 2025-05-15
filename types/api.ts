export type ApiResArray<T> = {
  status: Boolean
  result: T[]
}

export type ApiTransform<T> = (res: ApiResArray<T>) => T[]
