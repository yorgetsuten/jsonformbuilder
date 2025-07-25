import type { FormConfig } from 'src/app/model/schema'

import styles from './styles.module.css'
import clsx from 'clsx'

import { Enum } from './fields/EnumField'
import { Date } from './fields/DateField'
import { String } from './fields/StringField'
import { Number } from './fields/NumberField'
import { Boolean } from './fields/BooleanField'
import { MultiLine } from './fields/MultiLineField'
import { Button } from '../Button'

interface Props {
  config: FormConfig | null
  containerClassName: string
}

export function Result({ config, containerClassName }: Props) {
  return config === null ? (
    <div className={clsx(containerClassName, styles['container'])}>
      <h1>Nothing here yet, JSON first!</h1>
    </div>
  ) : (
    <form className={clsx(containerClassName, styles['container'])}>
      {config.title && <h1>{config.title}</h1>}

      {config.fields.map((field, index) => {
        switch (field.type) {
          case 'enum':
            return <Enum key={`${field.name}_${index}`} {...field} />
          case 'date':
            return <Date key={`${field.name}_${index}`} {...field} />
          case 'string':
            return <String key={`${field.name}_${index}`} {...field} />
          case 'number':
            return <Number key={`${field.name}_${index}`} {...field} />
          case 'boolean':
            return <Boolean key={`${field.name}_${index}`} {...field} />
          case 'multi-line':
            return <MultiLine key={`${field.name}_${index}`} {...field} />
        }
      })}

      <div>
        {config.buttons.map((field, index) => (
          <Button key={`${field.text}_${index}`}>{field.text}</Button>
        ))}
      </div>
    </form>
  )
}
