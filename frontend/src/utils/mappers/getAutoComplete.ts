export const getAutoComplete = (name: string) => {
  switch (name) {
    case 'email':
      return 'email'

    case 'name':
      return 'given-name'

    default:
      return 'off'
  }
}
