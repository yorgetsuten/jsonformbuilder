import { s, type Infer } from 'src/shared/validation'

export type FormConfig = Infer<typeof formConfigSchema>
export type Item<T extends FormConfig['fields'][number]['type']> = Omit<
  Extract<FormConfig['fields'][number], { type: T }>,
  'type'
>

export const formConfigSchema = s.object({
  title: s.optional(s.string()),
  buttons: s.array(
    s.object({
      text: s.string(),
    })
  ),
  fields: s.array(
    s.discriminatedUnion('type', {
      'string': s.object({
        type: s.literal('string'),
        name: s.string(),
        label: s.string(),
        required: s.optional(s.boolean()),
        defaultValue: s.optional(s.string()),
        placeholder: s.optional(s.string()),
        autoComplete: s.optional(s.string()),
        minLength: s.optional(s.number()),
        maxLength: s.optional(s.number())
      }),
      'number': s.object({
        type: s.literal('number'),
        name: s.string(),
        label: s.string(),
        required: s.optional(s.boolean()),
        defaultValue: s.optional(s.number()),
        placeholder: s.optional(s.string()),
        min: s.optional(s.number()),
        max: s.optional(s.number()),
        step: s.optional(s.number())
      }),
      'multi-line': s.object({
        type: s.literal('multi-line'),
        name: s.string(),
        label: s.string(),
        required: s.optional(s.boolean()),
        defaultValue: s.optional(s.string()),
        placeholder: s.optional(s.string()),
        autoComplete: s.optional(s.string()),
        rows: s.optional(s.number()),
        minLength: s.optional(s.number()),
        maxLength: s.optional(s.number())
      }),
      'boolean': s.object({
        type: s.literal('boolean'),
        name: s.string(),
        label: s.string(),
        required: s.optional(s.boolean()),
        defaultValue: s.optional(s.boolean())
      }),
      'date': s.object({
        type: s.literal('date'),
        name: s.string(),
        label: s.string(),
        required: s.optional(s.boolean()),
        defaultValue: s.optional(s.dateString()),
        min: s.optional(s.dateString()),
        max: s.optional(s.dateString())
      }),
      'enum': s.object({
        type: s.literal('enum'),
        name: s.string(),
        title: s.string(),
        required: s.optional(s.boolean()),
        // TODO: implement defaultValue for 'enum'
        // defaultValue: s.optional(s.string()),
        options: s.array(
          s.object({
            label: s.string(),
            value: s.string()
          })
        )
      })
    })
  )
})