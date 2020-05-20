export const required = (
  text: string | number | undefined | null
): true | 'This filed is required' => {
  return !!text || 'This filed is required'
}

const isEmail = (text: string): boolean => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    text
  )
}

export const isValidEmail = (
  text: string | undefined | null
): true | 'Invalid Email format' => {
  return text && isEmail(text) ? true : 'Invalid Email format'
}
