import type { Item } from 'src/app/model/schema'
import { useId } from 'react'

export function MultiLine({
  rows,
  name,
  label,
  required,
  maxLength,
  minLength,
  placeholder,
  defaultValue,
  autoComplete
}: Item<'multi-line'>) {
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
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-required={required ?? false}
      />
    </div>
  )
}