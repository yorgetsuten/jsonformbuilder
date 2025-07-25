import type { Dispatch, KeyboardEvent, SetStateAction } from 'react'
import type { FormConfig } from '../../model/schema'
import type { Tabs } from 'src/app/App'

import clsx from 'clsx'
import styles from './styles.module.css'
import { useEffect, useRef, useState } from 'react'
import { formConfigSchema } from '../../model/schema'
import { Button } from '../Button'

interface Props {
  setActiveTab: Dispatch<SetStateAction<Tabs>>
  setFormConfig: Dispatch<SetStateAction<FormConfig | null>>
  containerClassName: string
}

export function Config({
  setActiveTab,
  setFormConfig,
  containerClassName: connatinerClassName
}: Props) {
  const textarea = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (textarea.current) {
      textarea.current.value = sessionStorage.getItem('textarea') ?? ''
    }
  }, [])

  function onTextareaChange() {
    if (errors.length > 0) setErrors([])
    sessionStorage.setItem(
      'textarea',
      textarea.current?.value ? textarea.current.value : ''
    )
  }

  function onTextareaDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const current = textarea.current

    if (current && event.key === 'Tab') {
      event.preventDefault()

      const start = current.selectionStart
      const end = current.selectionEnd
      const tab = '  '

      const newValue =
        current.value.substring(0, start) + tab + current.value.substring(end)

      current.value = newValue
      current.selectionStart = current.selectionEnd = start + tab.length
    }
  }

  function onApplyClick() {
    if (textarea.current === null) return

    try {
      if (textarea.current.value === '') throw new Error('Nothing to apply!')

      const parsedJSON = JSON.parse(textarea.current.value)
      const validationErrors = formConfigSchema.validate(parsedJSON)

      if (validationErrors.length === 0) {
        setFormConfig(parsedJSON)
        setActiveTab('result')
      } else {
        setErrors(
          validationErrors.map((error) => {
            return `${error.path}: ${error.message}`
          })
        )
      }
    } catch (e: unknown) {
      if (e instanceof Error) setErrors([...errors, e.message])
    }
  }

  return (
    <div
      className={clsx(
        connatinerClassName,
        styles['container'],
        errors.length > 0 && styles['has-errors']
      )}
    >
      <textarea
        ref={textarea}
        onKeyDown={onTextareaDown}
        onChange={onTextareaChange}
        spellCheck={false}
        placeholder='Put your JSON configuration here!'
      />

      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}

      <Button onClick={onApplyClick} disabled={errors.length > 0}>
        Apply
      </Button>
    </div>
  )
}
