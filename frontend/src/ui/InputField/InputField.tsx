import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path
} from 'react-hook-form'
import { Input, type InputProps } from 'antd'
import { ErrorMessage } from '@/components/common'
import { getAutoComplete } from '@/utils/mappers'
import '../style.scss'

interface InputFieldProps<TFieldValues extends FieldValues> extends InputProps {
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  label?: string
}

const InputField = <TFieldValues extends FieldValues>(
  props: InputFieldProps<TFieldValues>
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
        render={({ field }) => (
          <Input
            id={fieldName}
            autoComplete={getAutoComplete(fieldName)}
            {...field}
          />
        )}
      />
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default InputField
