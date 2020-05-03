import { extend } from 'vee-validate'
import { email, required } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'Invalid email format'
})
