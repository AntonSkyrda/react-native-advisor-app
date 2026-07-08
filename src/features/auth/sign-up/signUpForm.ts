import type {RegisterOptions} from 'react-hook-form';

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export const signUpDefaultValues: SignUpFormValues = {
  name: '',
  email: '',
  password: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?`~]).{8,64}$/;

export const nameRules: RegisterOptions<SignUpFormValues, 'name'> = {
  required: 'Name is required',
  validate: value => value.trim().length > 0 || 'Name is required',
};

export const emailRules: RegisterOptions<SignUpFormValues, 'email'> = {
  required: 'E-mail is required',
  pattern: {
    value: emailPattern,
    message: 'Enter a valid e-mail',
  },
};

export const passwordRules: RegisterOptions<SignUpFormValues, 'password'> = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Use 8-64 characters',
  },
  maxLength: {
    value: 64,
    message: 'Use 8-64 characters',
  },
  pattern: {
    value: passwordPattern,
    message: 'Use uppercase, lowercase and special character',
  },
};
