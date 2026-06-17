export const validationMessages = {
  email: {
    required: 'Электронная почта обязательна для заполнения!',
    invalid: 'Некорректная электронная почта!'
  },
  name: {
    required: 'Имя обязательно для заполнения!',
    minLength: (minLength: number) =>
      `Имя должно содержать минимум ${minLength} символа!`
  },
  password: {
    required: 'Пароль обязателен для заполнения!',
    minLength: (minLength: number) =>
      `Длина пароля не может быть меньше ${minLength} символов!`
  },
  profession: {
    required: 'Профессия обязательна для заполнения!'
  },
  sex: {
    required: 'Пол обязателен для заполнения!'
  },
  qualities: {
    minCount: (minCount: number) => `Выберите как минимум ${minCount} качество!`
  },
  license: {
    required:
      'Вы не можете зарегистрироваться без подтверждения лицензионного соглашения!'
  },
  common: {
    notSpecialSymbols: 'Поле не может содержать специальные символы!'
  },
  comment: {
    required: 'Комментарий не может быть пустым!'
  }
}
