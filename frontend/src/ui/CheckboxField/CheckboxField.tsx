import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path
} from 'react-hook-form'
import { Checkbox, type CheckboxProps } from 'antd'
import { ErrorMessage } from '@/components/common'

interface CheckboxFieldProps<
  TFieldValues extends FieldValues
> extends CheckboxProps {
  fieldName: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  text: string
}

const CheckboxField = <TFieldValues extends FieldValues>(
  props: CheckboxFieldProps<TFieldValues>
) => {
  const { fieldName, control, errors, text } = props
  const error = errors?.[fieldName]?.message as string | undefined

  return (
    <>
      <Controller
        control={control}
        name={fieldName}
        render={({ field }) => (
          <Checkbox
            checked={field.value ?? false}
            style={{
              fontSize: 'var(--font-size)',
              color: 'var(--text-color)'
            }}
            {...field}
          >
            {text}
          </Checkbox>
        )}
      />
      {error && (
        <div style={{ paddingLeft: '2.4rem' }}>
          <ErrorMessage error={error} />
        </div>
      )}
    </>
  )
}

export default CheckboxField
