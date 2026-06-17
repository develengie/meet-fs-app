import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path
} from 'react-hook-form'
import { Input } from 'antd'
import { ErrorMessage } from '@/components/common'
import type { TextAreaProps } from 'antd/es/input'
import '../style.scss'

interface TextAreaFieldProps<
  TFieldValues extends FieldValues
> extends TextAreaProps {
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  label?: string
}

const { TextArea } = Input

const TextAreaField = <TFieldValues extends FieldValues>(
  props: TextAreaFieldProps<TFieldValues>
) => {
  const { fieldName, control, errors, label } = props
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
        render={({ field }) => <TextArea id={fieldName} {...field} />}
      />
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default TextAreaField
