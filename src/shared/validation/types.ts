export type ValidationError = {
  path: string
  message: string
}

export type Validator<T> = {
  validate(value: unknown, path?: string): ValidationError[]
  readonly _type: T
}

type ExpandArray<T> = T extends Array<infer U> ? Array<ExpandObject<U>> : T
type ExpandObject<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type Infer<T> = T extends Validator<infer U>
  ? ExpandArray<ExpandObject<U>>
  : never

export type InferShape<T extends Record<string, Validator<unknown>>> = {
  [K in keyof T as undefined extends T[K]['_type'] ? K : never]?: Infer<T[K]>
} & {
  [K in keyof T as undefined extends T[K]['_type'] ? never : K]: Infer<T[K]>
}
