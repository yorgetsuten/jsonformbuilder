import type { Item } from 'src/app/model/schema'
import { useId } from 'react'

export function Boolean({
  name,
  label,
  required,
  defaultValue
}: Item<'boolean'>) {
  const id = useId()

  return (
    <div>
      <input
        type='checkbox'
        id={id}
        name={name}
        required={required}
        defaultChecked={defaultValue}
        aria-required={required ?? false}
      />
      <label htmlFor={id}>
        {label}
        {required && (
          <abbr title='required' aria-label='required'>
            *
          </abbr>
        )}
      </label>
    </div>
  )
}
