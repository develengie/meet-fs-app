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

interface PasswordFieldProps<
  TFieldValues extends FieldValues
> extends InputProps {
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  label?: string
}

const PasswordField = <TFieldValues extends FieldValues>(
  props: PasswordFieldProps<TFieldValues>
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
          <Input.Password
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

export default PasswordField
