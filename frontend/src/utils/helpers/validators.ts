import * as yup from 'yup'
import { validationMessages } from '@/locales'

const EMAIL_REGEX = /^[a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()-_=+.]+$/
const PASSWORD_REGEX = /^[a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()-_=+]+$/
const COMMON_REGEX = /^[a-zA-Zа-яА-ЯёЁ0-9-]+$/

const MIN_PASSWORD_LENGTH = 8
const MIN_TEXT_LENGTH = 3

const MIN_QUALITIES_COUNT = 1

const emailSchema = () =>
  yup
    .string()
    .trim()
    .required(validationMessages.email.required)
    .matches(EMAIL_REGEX, validationMessages.common.notSpecialSymbols)
    .email(validationMessages.email.invalid)

const nameSchema = (minLength: number = MIN_TEXT_LENGTH) =>
  yup
    .string()
    .trim()
    .required(validationMessages.name.required)
    .matches(COMMON_REGEX, validationMessages.common.notSpecialSymbols)
    .min(minLength, validationMessages.name.minLength(minLength))

const passwordSchema = (minLength: number = MIN_PASSWORD_LENGTH) =>
  yup
    .string()
    .trim()
    .required(validationMessages.password.required)
    .matches(PASSWORD_REGEX, validationMessages.common.notSpecialSymbols)
    .min(minLength, validationMessages.password.minLength(minLength))

const professionSchema = () =>
  yup.string().required(validationMessages.profession.required)

const sexSchema = () => yup.string().required(validationMessages.sex.required)

const qualitiesSchema = (minCount: number = MIN_QUALITIES_COUNT) =>
  yup
    .array()
    .required()
    .of(yup.string())
    .min(minCount, validationMessages.qualities.minCount(minCount))

const licenseSchema = () =>
  yup.boolean().required().oneOf([true], validationMessages.license.required)

const commentContentSchema = () =>
  yup.string().trim().required(validationMessages.comment.required)

export const loginSchema = yup.object({
  email: emailSchema(),
  password: passwordSchema()
})

export const signupSchema = yup.object({
  email: emailSchema(),
  name: nameSchema(),
  password: passwordSchema(),
  profession: professionSchema(),
  sex: sexSchema(),
  qualities: qualitiesSchema(),
  license: licenseSchema()
})

export const editProfileSchema = yup.object({
  email: emailSchema(),
  name: nameSchema(),
  profession: professionSchema(),
  sex: sexSchema(),
  qualities: qualitiesSchema()
})

export const commentSchema = yup.object({
  content: commentContentSchema()
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type SignupFormData = yup.InferType<typeof signupSchema>
export type EditProfileFormData = yup.InferType<typeof editProfileSchema>
export type CommentFormData = yup.InferType<typeof commentSchema>
