import type { Infer, InferShape, Validator, ValidationError } from './types'

import {
  isObject,
  formatValue,
  isValidISODate,
  createValidator,
  getTypeDescription
} from './lib'

export type { Infer, ValidationError }

export const s = {
  string: () =>
    createValidator<string>((value, path) => {
      if (typeof value === 'string') {
        return []
      } else {
        const received = getTypeDescription(value)
        const message = `Expected string, received ${received}`

        return [{ path, message }]
      }
    }),

  number: () =>
    createValidator<number>((value, path) => {
      if (typeof value === 'number') {
        return []
      } else {
        const received = getTypeDescription(value)
        const message = `Expected number, received ${received}`

        return [{ path, message }]
      }
    }),

  boolean: () =>
    createValidator<boolean>((value, path) => {
      if (typeof value === 'boolean') {
        return []
      } else {
        const received = getTypeDescription(value)
        const message = `Expected boolean, received ${received}`

        return [{ path, message }]
      }
    }),

  literal: <T extends string | number | boolean>(expected: T) =>
    createValidator<T>((value, path) => {
      if (value === expected) {
        return []
      } else {
        const received = formatValue(value)
        const formattedExpected = formatValue(expected)
        const message = `Expected ${formattedExpected}, received ${received}`

        return [{ path, message }]
      }
    }),

  dateString: () =>
    createValidator<string>((value, path) => {
      if (typeof value !== 'string') {
        const received = getTypeDescription(value)
        const message = `Expected date string (YYYY-MM-DD), received ${received}`

        return [{ path, message }]
      } else if (!isValidISODate(value)) {
        const message = `Expected valid date string in format YYYY-MM-DD, received "${value}"`
        return [{ path, message }]
      } else {
        return []
      }
    }),

  optional: <T>(validator: Validator<T>) =>
    createValidator<T | undefined>((value, path) =>
      value === undefined ? [] : validator.validate(value, path)
    ),

  array: <T>(itemValidator: Validator<T>) =>
    createValidator<T[]>((value, path) => {
      if (!Array.isArray(value)) {
        const received = getTypeDescription(value)
        const message = `Expected array, received ${received}`

        return [{ path, message }]
      }

      let errors: ValidationError[] = []
      value.forEach((item, i) => {
        errors = [...errors, ...itemValidator.validate(item, `${path}[${i}]`)]
      })
      return errors
    }),

  object: <T extends Record<string, Validator<unknown>>>(shape: T) => {
    type ObjType = InferShape<T>

    return createValidator<ObjType>((value, path) => {
      if (!isObject(value)) {
        const message = `Expected object, received ${getTypeDescription(value)}`
        return [{ path, message }]
      }

      let errors: ValidationError[] = []
      for (const key in shape) {
        const val = value[key]
        const validator = shape[key]
        const isOptional = validator.validate(undefined).length === 0

        if (!isOptional && (val === undefined || val === null)) {
          const message = `Field "${key}" is required`
          errors = [...errors, { path: `${path}.${key}`, message }]
          continue
        }

        errors = [
          ...errors,
          ...validator.validate(val, path ? `${path}.${key}` : key)
        ]
      }

      return errors
    })
  },

  union: <T extends Validator<unknown>[]>(...validators: T) => {
    type UnionType = Infer<T[number]>

    return createValidator<UnionType>((value, path) => {
      for (const validator of validators) {
        if (validator.validate(value, path).length === 0) {
          return []
        }
      }

      return [
        { path, message: `Value does not match any of the expected types` }
      ]
    })
  },

  discriminatedUnion: <
    K extends string,
    T extends Record<string, Validator<unknown>>
  >(
    discriminator: K,
    options: T
  ) => {
    type DiscriminatedType = {
      [P in keyof T]: T[P] extends Validator<infer U> ? U : never
    }[keyof T]

    return createValidator<DiscriminatedType>((value, path) => {
      if (!isObject(value)) {
        const received = getTypeDescription(value)
        const message = `Expected object, received ${received}`

        return [{ path, message }]
      } else if (value[discriminator] === undefined) {
        const expected = Object.keys(options).join(', ')
        const message = `Missing required field "${discriminator}". Expected one of: ${expected}`

        return [{ path: `${path}.${discriminator}`, message }]
      } else if (!options[value[discriminator] as keyof T]) {
        const expected = Object.keys(options).join(', ')
        const message = `Invalid value "${value[discriminator]}" for field "${discriminator}". Expected one of: ${expected}`

        return [{ path: `${path}.${discriminator}`, message }]
      } else {
        return options[value[discriminator] as keyof T].validate(value, path)
      }
    })
  }
}