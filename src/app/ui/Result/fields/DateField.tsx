import type { Item } from 'src/app/model/schema'
import { useId } from 'react'

export function Date({
  max,
  min,
  name,
  label,
  required,
  defaultValue
}: Item<'date'>) {
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
        type='date'
        id={id}
        min={min}
        max={max}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-required={required ?? false}
      />
    </div>
  )
}
