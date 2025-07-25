import type { Item } from 'src/app/model/schema'
import { useId } from 'react'

export function String({
  name,
  label,
  required,
  maxLength,
  minLength,
  placeholder,
  defaultValue,
  autoComplete
}: Item<'string'>) {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && (
          <abbr title='required' aria-label='required'>
            *
          </abbr>
        )}
      </label>
      <input
        type='text'
        id={id}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-required={required ?? false}
      />
    </div>
  )
}
