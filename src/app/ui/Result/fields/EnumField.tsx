import type { Item } from 'src/app/model/schema'

export function Enum({ name, title, options, required }: Item<'enum'>) {
  return (
    <fieldset>
      <legend>
        {title}
        {required && (
          <abbr title='required' aria-label='required'>
            *
          </abbr>
        )}
      </legend>
      {options.map((item, index) => {
        const id = `${name}_${index}`
        const { label, value } = item

        return (
          <div key={id}>
            <input
              type='radio'
              id={id}
              name={name}
              value={value}
              required={required}
              aria-required={required ?? false}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        )
      })}
    </fieldset>
  )
}