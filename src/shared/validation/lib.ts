import type { ValidationError, Validator } from './types'

export function createValidator<T>(
  fn: (value: unknown, path: string) => ValidationError[]
): Validator<T> {
  return {
    validate(value, path = '') {
      return fn(value, path)
    },
    _type: undefined as T
  }
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function getTypeDescription(value: unknown): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  return typeof value
}

export function formatValue(value: unknown): string {
  if (typeof value === 'string') return `"${value}"`
  if (value === null) return 'null'
  return String(value)
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(value + 'T00:00:00.000Z')
  return date.toISOString().slice(0, 10) === value
}
