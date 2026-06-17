import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path
} from 'react-hook-form'
import { Select, type SelectProps } from 'antd'
import { ErrorMessage } from '@/components/common'
import type { Option } from '../types'
import '../style.scss'

interface MultiSelectFieldProps<
  TFieldValues extends FieldValues
> extends SelectProps {
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  label?: string
  options: Option[]
  placeholder?: string
}

const MultiSelectField = <TFieldValues extends FieldValues>(
  props: MultiSelectFieldProps<TFieldValues>
) => {
  const { fieldName, control, errors, label, options, placeholder } = props
  const error = errors?.[fieldName]?.message as string | undefined

  return (
    <>
      {label && (
        <label className="label" htmlFor={fieldName}>
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Select
            mode="multiple"
            options={options}
            id={fieldName}
            placeholder={placeholder}
            style={{ width: '100%' }}
            notFoundContent="Нет данных"
            {...field}
          />
        )}
      />
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default MultiSelectField
