import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path
} from 'react-hook-form'
import { Radio, type RadioGroupProps } from 'antd'
import { ErrorMessage } from '@/components/common'
import type { Option } from '../types'
import '../style.scss'

interface RadioFieldProps<
  TFieldValues extends FieldValues
> extends RadioGroupProps {
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  label?: string
  options: Option[]
}

const RadioField = <TFieldValues extends FieldValues>(
  props: RadioFieldProps<TFieldValues>
) => {
  const { fieldName, control, errors, label, options } = props
  const error = errors?.[fieldName]?.message as string | undefined

  return (
    <>
      {label && <label className="label">{label}</label>}
      <div>
        <Controller
          control={control}
          name={fieldName}
          render={({ field }) => (
            <Radio.Group {...field}>
              {options.map((option) => (
                <Radio
                  key={option.value}
                  value={option.value}
                  style={{
                    fontSize: 'var(--font-size)',
                    color: 'var(--text-color)'
                  }}
                >
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          )}
        />
      </div>
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default RadioField
