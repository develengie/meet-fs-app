import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { formMessages } from '@/locales'
import { PrimaryButton, TextAreaField } from '@/ui'
import { commentSchema, type CommentFormData } from '@/utils/helpers'
import { useCreateCommentMutation } from '@/store/comments'
import type { User } from '@/types'

interface CommentFormProps {
  userId: User['_id']
}

const CommentForm = ({ userId }: CommentFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<CommentFormData>({
    resolver: yupResolver(commentSchema),
    mode: 'onChange',
    defaultValues: {
      content: ''
    }
  })
  const [createComment] = useCreateCommentMutation()

  const onSubmit = async (data: CommentFormData) => {
    const createdComment = { ...data, pageId: userId }
    await createComment(createdComment).unwrap()
    reset()
  }

  return (
    <form
      className="form  form--mb"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="form__group">
        <TextAreaField
          fieldName="content"
          control={control}
          errors={errors}
          label={formMessages.comments.commentLabel}
        />
      </div>
      <PrimaryButton
        type="submit"
        text={formMessages.comments.submit}
        isDisabled={!isValid}
      />
    </form>
  )
}

export default CommentForm
