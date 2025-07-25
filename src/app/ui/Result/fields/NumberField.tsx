import type { Item } from 'src/app/model/schema'
import { useId } from 'react'

export function Number({
  max,
  min,
  step,
  name,
  label,
  required,
  placeholder,
  defaultValue
}: Item<'number'>) {
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
        type='number'
        id={id}
        min={min}
        max={max}
        step={step}
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-required={required ?? false}
      />
    </div>
  )
}